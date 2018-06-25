/*global sinon */

describe('axe.utils.xhrQ', function () {
	'use strict';

	beforeEach(function () {
		this.xhr = sinon.useFakeXMLHttpRequest();
		this.requests = [];
		this.xhr.onCreate = function (xhr) {
			this.requests.push(xhr);
		}.bind(this);
	});

	afterEach(function () {
		this.xhr.restore();
	});

	it('should reject queue on 500 error', function (done) {
		var config = {
			url: '/kaBoom'
		};
		var fakeResponse = {
			status: 500,
			contentType: { 'Content-Type': 'text/json' },
			dataJson: { message: 'some dummy data.' }
		};

		axe.utils.xhrQ(config)
			.then(function () {
				assert.fail('should not have resolved the queue');
				done();
			})
			.catch(function (err) {
				assert.equal(err.status, 500);
				done();
			});

		this.requests[0]
			.respond(
				fakeResponse.status,
				fakeResponse.contentType,
				JSON.stringify(fakeResponse.dataJson)
			);
	});

	it('should resolve queue for status 200', function (done) {
		var config = {
			url: '/gotMe'
		};
		var fakeResponse = {
			status: 200,
			contentType: { 'Content-Type': 'text/json' },
			dataJson: { message: 'some dummy data.' }
		};

		axe.utils.xhrQ(config)
			.then(function (results) {
				var response = results[0];
				assert.equal(response.status, 200);
				done();
			})
			.catch(function () {
				assert.fail('should not have rejected the queue.')
				done();
			});

		this.requests[0]
			.respond(
				fakeResponse.status,
				fakeResponse.contentType,
				JSON.stringify(fakeResponse.dataJson)
			);
	});

	it('should populate response', function (done) {
		var config = {
			url: '/gotMe'
		};
		var fakeResponse = {
			status: 200,
			contentType: { 'Content-Type': 'text/json' },
			dataJson: {
				status: 200,
				responseText: 'My Expected Data!',
			}
		};

		axe.utils.xhrQ(config)
			.then(function (results) {
				var response = results[0];
				assert.isObject(response);
				assert.deepEqual(JSON.parse(response.responseText), fakeResponse.dataJson);
				done();
			})
			.catch(function () {
				assert.fail('should not have rejected the queue.');
				done();
			});

		this.requests[0]
			.respond(
				fakeResponse.status,
				fakeResponse.contentType,
				JSON.stringify(fakeResponse.dataJson)
			);
	});

});