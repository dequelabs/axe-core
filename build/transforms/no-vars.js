const TOP_LEVEL_TYPES = [
	'Function',
	'FunctionDeclaration',
	'FunctionExpression',
	'ArrowFunctionExpression',
	'Program'
];
const FOR_STATEMENTS = ['ForStatement', 'ForOfStatement', 'ForInStatement'];

// Original: https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js
// MIT License
module.exports = function(file, api) {
	const j = api.jscodeshift;
	const root = j(file.source);
	const getScopeNode = blockScopeNode => {
		let scopeNode = blockScopeNode;
		let isInFor = FOR_STATEMENTS.indexOf(blockScopeNode.value.type) !== -1;
		while (TOP_LEVEL_TYPES.indexOf(scopeNode.node.type) === -1) {
			scopeNode = scopeNode.parentPath;
			isInFor = isInFor || FOR_STATEMENTS.indexOf(scopeNode.value.type) !== -1;
		}
		return { scopeNode, isInFor };
	};
	const findFunctionDeclaration = (node, container) => {
		while (node.value.type !== 'FunctionDeclaration' && node !== container) {
			node = node.parentPath;
		}
		return node !== container ? node : null;
	};
	const isForLoopDeclarationWithoutInit = declaration => {
		const parentType = declaration.parentPath.value.type;
		return parentType === 'ForOfStatement' || parentType === 'ForInStatement';
	};

	const extractNamesFromIdentifierLike = id => {
		if (!id) {
			return [];
		} else if (id.type === 'ObjectPattern') {
			return id.properties
				.map(
					d =>
						d.type === 'SpreadProperty'
							? [d.argument.name]
							: extractNamesFromIdentifierLike(d.value)
				)
				.reduce((acc, val) => acc.concat(val), []);
		} else if (id.type === 'ArrayPattern') {
			return id.elements
				.map(extractNamesFromIdentifierLike)
				.reduce((acc, val) => acc.concat(val), []);
		} else if (id.type === 'Identifier') {
			return [id.name];
		} else if (id.type === 'RestElement') {
			return [id.argument.name];
		} else {
			return [];
		}
	};
	const getDeclaratorNames = declarator => {
		return extractNamesFromIdentifierLike(declarator.id);
	};
	const isIdInDeclarator = (declarator, name) => {
		return getDeclaratorNames(declarator).indexOf(name) !== -1;
	};
	const getLocalScope = (scope, parentScope) => {
		const names = [];
		while (scope !== parentScope) {
			if (Array.isArray(scope.value.body)) {
				scope.value.body.forEach(node => {
					if (node.type === 'VariableDeclaration') {
						node.declarations.map(getDeclaratorNames).forEach(dNames => {
							dNames.forEach(name => {
								if (names.indexOf(name) === -1) {
									names.push(name);
								}
							});
						});
					}
				});
			}
			if (Array.isArray(scope.value.params)) {
				scope.value.params.forEach(id => {
					extractNamesFromIdentifierLike(id).forEach(name => {
						if (names.indexOf(name) === -1) {
							names.push(name);
						}
					});
				});
			}
			scope = scope.parentPath;
		}
		return names;
	};
	const hasLocalDeclarationFor = (nodePath, parentScope, name) => {
		return getLocalScope(nodePath, parentScope).indexOf(name) !== -1;
	};

	const isTruelyVar = (node, declarator) => {
		const blockScopeNode = node.parentPath;
		const { scopeNode, isInFor } = getScopeNode(blockScopeNode);

		// if we are in a for loop of some kind, and the variable
		// is referenced within a closure, rever to `var`
		// It would be safe to do the conversion if you can verify
		// that the callback is run synchronously
		const isUsedInClosure =
			isInFor &&
			j(blockScopeNode)
				.find(j.Function)
				.filter(
					functionNode =>
						j(functionNode)
							.find(j.Identifier)
							.filter(id => isIdInDeclarator(declarator, id.value.name))
							.size() !== 0
				)
				.size() !== 0;

		// if two attempts are made to declare the same variable,
		// revert to `var`
		// TODO: if they are in different block scopes, it may be
		//       safe to convert them anyway
		const isDeclaredTwice =
			j(scopeNode)
				.find(j.VariableDeclarator)
				.filter(otherDeclarator => {
					return (
						otherDeclarator.value !== declarator &&
						getScopeNode(otherDeclarator).scopeNode === scopeNode &&
						getDeclaratorNames(otherDeclarator.value).some(name =>
							isIdInDeclarator(declarator, name)
						)
					);
				})
				.size() !== 0;

		return (
			isUsedInClosure ||
			isDeclaredTwice ||
			j(scopeNode)
				.find(j.Identifier)
				.filter(n => {
					if (!isIdInDeclarator(declarator, n.value.name)) {
						return false;
					}
					// If the variable is used in a function declaration that gets
					// hoisted, it could get called early
					const functionDeclaration = findFunctionDeclaration(n, scopeNode);
					const isCalledInHoistedFunction =
						functionDeclaration &&
						j(scopeNode)
							.find(j.Identifier)
							.filter(n => {
								return (
									n.value.name === functionDeclaration.value.id.name &&
									n.value.start < declarator.start
								);
							})
							.size() !== 0;
					if (isCalledInHoistedFunction) {
						return true;
					}
					const referenceScope = getScopeNode(n.parent).scopeNode;
					if (
						referenceScope === scopeNode ||
						!hasLocalDeclarationFor(n, scopeNode, n.value.name)
					) {
						// if the variable is referenced outside the current block
						// scope, revert to using `var`
						const isOutsideCurrentScope =
							j(blockScopeNode)
								.find(j.Identifier)
								.filter(innerNode => innerNode.node.start === n.node.start)
								.size() === 0;

						// if a variable is used before it is declared, rever to
						// `var`
						// TODO: If `isDeclaredTwice` is improved, and there is
						//       another declaration for this variable, it may be
						//       safe to convert this anyway
						const isUsedBeforeDeclaration = n.value.start < declarator.start;

						return isOutsideCurrentScope || isUsedBeforeDeclaration;
					}
				})
				.size() > 0
		);
	};

	/**
	 * isMutated utility function to determine whether a VariableDeclaration
	 * contains mutations. Takes an optional VariableDeclarator node argument to
	 * return only whether that specific Identifier is mutated
	 *
	 * @param {ASTPath} node VariableDeclaration path
	 * @param {ASTNode} [declarator] VariableDeclarator node
	 * @return {Boolean}
	 */
	const isMutated = (node, declarator) => {
		const scopeNode = node.parent;

		const hasAssignmentMutation =
			j(scopeNode)
				.find(j.AssignmentExpression)
				.filter(n => {
					return extractNamesFromIdentifierLike(n.value.left).some(name => {
						return isIdInDeclarator(declarator, name);
					});
				})
				.size() > 0;

		const hasUpdateMutation =
			j(scopeNode)
				.find(j.UpdateExpression)
				.filter(n => {
					return isIdInDeclarator(declarator, n.value.argument.name);
				})
				.size() > 0;

		return hasAssignmentMutation || hasUpdateMutation;
	};

	const updatedAnything =
		root
			.find(j.VariableDeclaration)
			.filter(dec => dec.value.kind === 'var')
			.filter(declaration => {
				return declaration.value.declarations.every(declarator => {
					return !isTruelyVar(declaration, declarator);
				});
			})
			.forEach(declaration => {
				const forLoopWithoutInit = isForLoopDeclarationWithoutInit(declaration);
				if (
					declaration.value.declarations.some(declarator => {
						return (
							(!declarator.init && !forLoopWithoutInit) ||
							isMutated(declaration, declarator)
						);
					})
				) {
					declaration.value.kind = 'let';
				} else {
					declaration.value.kind = 'const';
				}
			})
			.size() !== 0;
	return updatedAnything ? root.toSource() : null;
};
