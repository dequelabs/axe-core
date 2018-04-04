describe('color-contrast shadow dom test', function () {
	'use strict';

	var shadowSupported = axe.testUtils.shadowSupport.v1;

	before(function() {
		var  fixture = document.querySelector('#fixture');
		if (shadowSupported) {
			var  shadow = fixture.attachShadow({mode: 'open'});
			shadow.innerHTML = '<button style="background-color:red;color:white;">Go!</button>' +
			'<span style="color:#ccc;">Text</span>' +
			'<div><label style="color:#ccc;">Text<input type="text"></label></div>' +
			'<div style="background-color:black; height:20px;">' +
				'<div style="color:#666; position:absolute;">Text</div>' +
			'</div>';
		}
	});

	describe('violations', function () {
		(shadowSupported ? it : xit)('should find issues in shadow tree', function (done) {
			axe.run('#fixture', { runOnly: { type: 'rule', values: ['color-contrast'] } }, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1);
				assert.lengthOf(results.violations[0].nodes, 2);
				assert.equal(results.violations[0].nodes[1].any[0].data.bgColor, '#000000');
				assert.lengthOf(results.incomplete, 0);
				done();
			});
		});
	});

});
