describe('angular-ng-click', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if Angular 2 button', function () {
		fixture.innerHTML = '<button (click)="func()">button</button>';
		var node = fixture.querySelector('button');
		assert.isTrue(checks['angular-ng-click'].evaluate(node));
	});

	it('should pass if Angular 1 button', function () {
		fixture.innerHTML = '<button ng-click="func()">button</button>';
		var node = fixture.querySelector('button');
		assert.isTrue(checks['angular-ng-click'].evaluate(node));
	});
	
	it('should pass if Angular 1 role=button', function () {
		fixture.innerHTML = '<div role="button" tabindex="0" ng-click="func()">div button</div>';
		var node = fixture.querySelector('div');
		assert.isTrue(checks['angular-ng-click'].evaluate(node));
	});

	it('should pass if Angular 2 role=button', function () {
		fixture.innerHTML = '<div role="button" tabindex="0" (click)="func()">div button</div>';
		var node = fixture.querySelector('div');
		assert.isTrue(checks['angular-ng-click'].evaluate(node));
	});

	it('should fail if Angular 1 role=button is missing tabindex', function () {
		fixture.innerHTML = '<div role="button" ng-click="func()">div button</div>';
		var node = fixture.querySelector('div');
		assert.isFalse(checks['angular-ng-click'].evaluate(node));
	});

	it('should fail if Angular 2 role=button is missing tabindex', function () {
		fixture.innerHTML = '<div role="button" (click)="func()">div button</div>';
		var node = fixture.querySelector('div');
		assert.isFalse(checks['angular-ng-click'].evaluate(node));
	});

	it('should fail if Angular 1 DIV', function () {
		fixture.innerHTML = '<div ng-click="func()"></div>';
		var node = fixture.querySelector('div');
		assert.isFalse(checks['angular-ng-click'].evaluate(node));
	});

	it('should fail if Angular 2 DIV', function () {
		fixture.innerHTML = '<div (click)="func()"></div>';
		var node = fixture.querySelector('div');
		assert.isFalse(checks['angular-ng-click'].evaluate(node));
	});

	it('should pass if ng-click function on wrapper is also provided on child interactive element', function () {
		fixture.innerHTML = '<div ng-click="func()"><button ng-click="func()">button</button></div>';
		var node = fixture.querySelector('div');
		assert.isTrue(checks['angular-ng-click'].evaluate(node));
	});

	it('should fail if ng-click function on wrapper is not provided on child interactive element', function () {
		fixture.innerHTML = '<div ng-click="func()"><button ng-click="otherFunc()">button</button></div>';
		var node = fixture.querySelector('div');
		assert.isFalse(checks['angular-ng-click'].evaluate(node));
	});
});