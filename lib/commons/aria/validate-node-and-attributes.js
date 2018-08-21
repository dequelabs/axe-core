/* global aria */
/**
 * @description Method that validates a given node against a list of constraints.
 * @param {HTMLElement} node node to verify attributes against constraints
 * @param {Array<String|Object>} constraintsArray an array containing TAGNAME or an OBJECT abstraction with conditions and attributes
 * @return {Boolean} true/ false based on if node passes the constraints expected
 */
aria.validateNodeAndAttributes = function validateNodeAndAttributes(
	node,
	constraintsArray
) {
	const tagName = node.nodeName.toUpperCase();

	// get all constraints from the list that are of type string
	// these string are tag names which can then be validated against the node's tag name
	const stringConstraints = constraintsArray.filter(c => typeof c === 'string');

	// if tag name of the node is part of listed constraints - return true
	if (stringConstraints.includes(tagName)) {
		return true;
	}

	// get all constraints from the list that are of type object
	// the further filter the constraints to those that match the given nodes tag name
	const objectConstraints = constraintsArray
		.filter(c => typeof c === 'object')
		.filter(c => {
			return c.tagName === tagName;
		});

	// get all attrubutes that are applied on the given node
	const nodeAttrs = Array.from(node.attributes).map(a => a.name.toUpperCase());

	// iterate through all object constraints
	// to filter only constraints that have valid attributes and or conditions that are applicable to the given node
	const validConstraints = objectConstraints.filter(c => {
		// if the constraints does not have any attribtues return false
		if (!c.attributes) {
			// edge case, where constraints does not have attribute
			// but has condition - keep the object - return true
			if (c.condition) {
				return true;
			}
			return false;
		}

		// get all attributes from constraints
		const keys = Object.keys(c.attributes);
		if (!keys.length) {
			return false;
		}

		let keepConstraint = false;
		// iterate through each attribute and validate the same on the node
		keys.forEach(k => {
			if (!nodeAttrs.includes(k)) {
				return;
			}
			// get value of attribute on the given node
			const attrValue = node
				.getAttribute(k)
				.trim()
				.toUpperCase();
			// validate a match in the value
			if (attrValue === c.attributes[k]) {
				keepConstraint = true;
			}
		});
		return keepConstraint;
	});

	// if not valid constraints to validate against, return
	if (!validConstraints.length) {
		return false;
	}

	// at this juncture there is a match
	// only thing to evaluate is a condition on the constraint against the node
	let out = true;

	validConstraints.forEach(c => {
		if (c.condition && typeof c.condition === 'function') {
			out = c.condition(node);
		}
	});

	// return
	return out;
};
