describe('group-labelledby', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupport = axe.testUtils.shadowSupport.v1;

	var checkContext = axe.testUtils.MockCheckContext();

	beforeEach(function() {
		axe._tree = undefined;
	});

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	function tests(type) {
		return function() {
			var check = checks['group-labelledby'];

			it(
				'should return true if there is only one ' +
					type +
					' element with the same name',
				function() {
					fixtureSetup(
						'<input type="' +
							type +
							'" id="target" name="groupname">' +
							'<input type="' +
							type +
							'" name="differentname">'
					);

					var node = fixture.querySelector('#target');
					assert.isTrue(check.evaluate.call(checkContext, node));
				}
			);

			it(
				'should return false if there are two ungrouped ' +
					type +
					' elements with the same name',
				function() {
					fixtureSetup(
						'<input type="' +
							type +
							'" id="target" name="groupname">' +
							'<input type="' +
							type +
							'" name="groupname">'
					);

					var node = fixture.querySelector('#target');
					assert.isFalse(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type
					});
				}
			);

			it(
				'should return false if there are ungrouped ' +
					type +
					' elements with the same name and without shared labelledby',
				function() {
					fixtureSetup(
						'<input type="' +
							type +
							'" id="target" aria-labelledby="unique one" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="notshared two" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="different three" name="groupname">'
					);
					var node = fixture.querySelector('#target');
					assert.isFalse(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type
					});
				}
			);

			it(
				'should return false if there are ungrouped ' +
					type +
					' elements with the same name and with shared labelledby but no unique label',
				function() {
					fixtureSetup(
						'<p id="shared">Shared label</p>' +
							'<input type="' +
							type +
							'" id="target" aria-labelledby="shared" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared" name="groupname">'
					);
					var node = fixture.querySelector('#target');
					assert.isFalse(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type,
						failureCode: 'no-unique-label'
					});
				}
			);

			it(
				'should return false if there are ungrouped ' +
					type +
					' elements with the same name and with unique labelledby but no shared label',
				function() {
					fixtureSetup(
						'<p id="one">Label 1</p>' +
							'<p id="two">Label 2</p>' +
							'<p id="three">Label 3</p>' +
							'<input type="' +
							type +
							'" id="target" aria-labelledby="one" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="two" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="three" name="groupname">'
					);
					var node = fixture.querySelector('#target');
					assert.isFalse(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type,
						failureCode: 'no-shared-label'
					});
				}
			);

			it(
				'should return false if there are ungrouped ' +
					type +
					' elements with the same name and with shared labelledby ' +
					'pointing to no real node',
				function() {
					fixtureSetup(
						'<input type="' +
							type +
							'" id="target" aria-labelledby="shared one" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared two" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared three" name="groupname">'
					);

					var node = fixture.querySelector('#target');
					assert.isFalse(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type
					});
				}
			);

			it(
				'should return false if there are ungrouped ' +
					type +
					' elements with the same name and with shared labelledby ' +
					'pointing to an empty node',
				function() {
					fixtureSetup(
						'<p id="shared"></p>' +
							'<input type="' +
							type +
							'" id="target" aria-labelledby="shared one" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared two" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared three" name="groupname">'
					);

					var node = fixture.querySelector('#target');
					assert.isFalse(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type
					});
				}
			);

			it(
				'should return true if there are ungrouped ' +
					type +
					' elements with the same name and with shared and unique labelledby ' +
					'pointing to a node with text content',
				function() {
					fixtureSetup(
						'<p id="one">Label 1</p>' +
							'<p id="two">Label 2</p>' +
							'<p id="three">Label 3</p>' +
							'<p id="shared">Shared label</p>' +
							'<input type="' +
							type +
							'" id="target" aria-labelledby="shared one" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared two" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared three" name="groupname">'
					);

					var node = fixture.querySelector('#target');
					assert.isTrue(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type
					});
				}
			);

			it(
				'should return true if there are ungrouped ' +
					type +
					' elements with the same hidden name and with shared labelledby' +
					'pointing to a node with text content',
				function() {
					fixtureSetup(
						'<div style="display:none">' +
							'  <p id="one">Label 1</p>' +
							'  <p id="two">Label 2</p>' +
							'  <p id="three">Label 3</p>' +
							'  <p id="shared">Shared label</p>' +
							'</div>' +
							'<input type="' +
							type +
							'" id="target" aria-labelledby="shared one" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared two" name="groupname">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared three" name="groupname">'
					);

					var node = fixture.querySelector('#target');
					assert.isTrue(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type
					});
				}
			);

			it(
				'should return true if there are ungrouped ' +
					type +
					' elements with the same name and with shared labelledby ' +
					'pointing to a node with text content - SPECIAL CHARACTERS',
				function() {
					fixtureSetup(
						'<p id="one">Label 1</p>' +
							'<p id="two">Label 2</p>' +
							'<p id="three">Label 3</p>' +
							'<p id="shared">Shared label</p>' +
							'<input type="' +
							type +
							'" id="target" aria-labelledby="shared one" name="s$.#0">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared two" name="s$.#0">' +
							'<input type="' +
							type +
							'" aria-labelledby="shared three" name="s$.#0">'
					);

					var node = fixture.querySelector('#target');
					assert.isTrue(check.evaluate.call(checkContext, node));
					assert.deepEqual(checkContext._data, {
						name: 's$.#0',
						type: type
					});
				}
			);

			(shadowSupport ? it : xit)(
				'should return false if the shared label is outside of shadow boundary',
				function() {
					fixture.innerHTML =
						'<div id="container">' +
						'  <p id="shared">Shared label</p>' +
						'</div>';
					var shadowRoot = fixture
						.querySelector('#container')
						.attachShadow({ mode: 'open' });
					shadowRoot.innerHTML =
						'<p id="one">Label 1</p>' +
						'<p id="two">Label 2</p>' +
						'<p id="three">Label 3</p>' +
						'<input type="' +
						type +
						'" id="target" aria-labelledby="shared one" name="groupname">' +
						'<input type="' +
						type +
						'" aria-labelledby="shared two" name="groupname">' +
						'<input type="' +
						type +
						'" aria-labelledby="shared three" name="groupname">';

					var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
					var shadowContent = shadowRoot.querySelector('#target');
					var virtualTarget = axe.utils.getNodeFromTree(tree[0], shadowContent);

					var params = [shadowContent, undefined, virtualTarget];
					assert.isFalse(check.evaluate.apply(checkContext, params));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type,
						failureCode: 'no-shared-label'
					});
				}
			);

			(shadowSupport ? it : xit)(
				'should return false if the unique label is outside of shadow boundary',
				function() {
					fixture.innerHTML =
						'<div id="container">' +
						'  <p id="one">Label 1</p>' +
						'  <p id="two">Label 2</p>' +
						'  <p id="three">Label 3</p>' +
						'</div>';
					var shadowRoot = fixture
						.querySelector('#container')
						.attachShadow({ mode: 'open' });
					shadowRoot.innerHTML =
						'<p id="shared">Shared label</p>' +
						'<input type="' +
						type +
						'" id="target" aria-labelledby="shared one" name="groupname">' +
						'<input type="' +
						type +
						'" aria-labelledby="shared two" name="groupname">' +
						'<input type="' +
						type +
						'" aria-labelledby="shared three" name="groupname">';

					var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
					var shadowContent = shadowRoot.querySelector('#target');
					var virtualTarget = axe.utils.getNodeFromTree(tree[0], shadowContent);

					var params = [shadowContent, undefined, virtualTarget];
					assert.isFalse(check.evaluate.apply(checkContext, params));
					assert.deepEqual(checkContext._data, {
						name: 'groupname',
						type: type,
						failureCode: 'no-unique-label'
					});
				}
			);

			(shadowSupport ? it : xit)(
				'should return true if all ' +
					type +
					' components are in the shadow boundary',
				function() {
					fixture.innerHTML = '<div id="container"></div>';

					var shadowRoot = fixture
						.querySelector('#container')
						.attachShadow({ mode: 'open' });
					shadowRoot.innerHTML =
						'<p id="one">Label 1</p>' +
						'<p id="two">Label 2</p>' +
						'<p id="three">Label 3</p>' +
						'<p id="shared">Shared label</p>' +
						'<input type="' +
						type +
						'" name="samename" aria-labelledby="shared one">' +
						'<input type="' +
						type +
						'" id="target" name="samename" aria-labelledby="shared two">' +
						'<input type="' +
						type +
						'" id="target" name="samename" aria-labelledby="shared three">';

					var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
					var shadowContent = shadowRoot.querySelector('#target');
					var virtualTarget = axe.utils.getNodeFromTree(tree[0], shadowContent);

					var params = [shadowContent, undefined, virtualTarget];
					assert.isTrue(check.evaluate.apply(checkContext, params));
				}
			);
		};
	}

	describe('radio', tests('radio'));
	describe('checkbox', tests('checkbox'));
});
