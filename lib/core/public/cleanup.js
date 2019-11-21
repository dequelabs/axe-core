// TODO: axe._audit

import {
	queue,
	getFlattenedTree,
	querySelectorAll,
	sendCommandToFrame
} from '../utils';
import { plugins } from './plugins';
import log from '../log';

function cleanup(resolve, reject) {
	'use strict';
	resolve = resolve || function() {};
	reject = reject || log;

	if (!axe._audit) {
		throw new Error('No audit configured');
	}

	var q = queue();
	// If a plugin fails it's cleanup, we still want the others to run
	var cleanupErrors = [];

	Object.keys(plugins).forEach(function(key) {
		q.defer(function(res) {
			var rej = function(err) {
				cleanupErrors.push(err);
				res();
			};
			try {
				plugins[key].cleanup(res, rej);
			} catch (err) {
				rej(err);
			}
		});
	});

	var flattenedTree = getFlattenedTree(document.body);

	querySelectorAll(flattenedTree, 'iframe, frame').forEach(function(node) {
		q.defer(function(res, rej) {
			return sendCommandToFrame(
				node.actualNode,
				{
					command: 'cleanup-plugin'
				},
				res,
				rej
			);
		});
	});

	q.then(function(results) {
		if (cleanupErrors.length === 0) {
			resolve(results);
		} else {
			reject(cleanupErrors);
		}
	}).catch(reject);
}

export default cleanup;
