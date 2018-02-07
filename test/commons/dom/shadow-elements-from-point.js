describe('dom.shadowElementsFromPoint', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	(shadowSupported ? it : xit)
	('should return an array from inside and outside of shadow dom', function () {
		fixture.innerHTML = '<div id="container" style="background-color:#000;position:relative;"></div>';
		var container = fixture.querySelector('#container');
		var shadow1 = container.attachShadow({ mode: 'open' });
		shadow1.innerHTML = '<p style="background-color:red;">Text</p>' +
			'<div id="shadowHost2" style="position:absolute;"></div>';
		var paragraph = shadow1.querySelector('p');
		var container2 = shadow1.querySelector('#shadowHost2');
		var shadow2 = container2.attachShadow({ mode: 'open' });
		shadow2.innerHTML = '<span>Text</span>';
		var shadowSpan = shadow2.querySelector('span');

		container.scrollIntoView();

		var spanCoords = shadowSpan.getBoundingClientRect();
		var result = axe.commons.dom.shadowElementsFromPoint(spanCoords.x, spanCoords.y);
		var pCoords = paragraph.getBoundingClientRect();
		var result2 = axe.commons.dom.shadowElementsFromPoint(pCoords.x, pCoords.y);

		assert.includeMembers(result, [shadowSpan, container2]);
		assert.notInclude(result, paragraph);
		assert.includeMembers(result2, [paragraph, container]);
		assert.notInclude(result2, shadowSpan);
	});
});
