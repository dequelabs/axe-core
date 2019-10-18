/*eslint no-unused-vars: 0*/
/* exported utils */

/**
 * Namespace for utility helper methods.
 * @namespace utils
 * @memberof axe
 */

import aggregateChecks from './aggregate-checks.js';
import aggregateNodeResults from './aggregate-node-results.js';
import aggregateResult from './aggregate-result.js';
import aggregate from './aggregate.js';
import areStylesSet from './are-styles-set.js';
import assert from './assert.js';
import checkHelper from './check-helper.js';
import clone from './clone.js';
import collectResultsFromFrames from './collect-results-from-frames.js';
import contains from './contains.js';
import cssParser from './css-parser.js';
import DqElement from './dq-element.js';
import escapeSelector from './escape-selector.js';
import extendMetaData from './extend-meta-data.js';
import finalizeResult from './finalize-result.js';
import findBy from './find-by.js';
import flattenedTree from './flattened-tree.js';
import getAllChecks from './get-all-checks.js';
import getBaseLang from './get-base-lang.js';
import getCheckOption from './get-check-option.js';
import getFriendlyUriEnd from './get-friendly-uri-end.js';
import getNodeAttributes from './get-node-attributes.js';
import getNodeFromTree from './get-node-from-tree.js';
import getPreloadConfig from './get-preload-config.js';
import getRootNode from './get-root-node.js';
import getScroll from './get-scroll.js';
import { getSelectorData, getSelector } from './get-selector.js';
import getStyleSheetFactory from './get-stylesheet-factory.js';
import getXpath from './get-xpath.js';
import injectStyle from './inject-style.js';
import isHidden from './is-hidden.js';
import isHtmlElement from './is-html-element.js';
import isShadowRoot from './is-shadow-root.js';
import isXHTML from './is-xhtml.js';
import matchesSelector from './matches-selector.js';
import mergeResults from './merge-results.js';
import nodeSorter from './node-sorter.js';
import parseCrossOriginStylesheet from './parse-crossorigin-stylesheet.js';
import parseSameOriginStylesheet from './parse-sameorigin-stylesheet.js';
import parseStylesheet from './parse-stylesheet.js';
import performanceTimer from './performance-timer.js';
import { pollyfillElementsFromPoint } from './pollyfills.js';
import preloadCssom from './preload-cssom.js';
import preload from './preload.js';
import publishMetaData from './publish-metadata.js';
import { querySelectorAll, querySelectorAllFilter } from './qsa.js';
import queue from './queue.js';
import respondable from './respondable.js';
import ruleShouldRun from './rule-should-run.js';
import scrollState from './scroll-state.js';
import select from './select.js';
import sendCommandToFrame from './send-command-to-frame.js';
import setScrollState from './set-scroll-state.js';
import shouldPreload from './should-preload.js';
import toArray from './to-array.js';
import tokenList from './token-list.js';
import uniqueArray from './unique-array.js';
import uuid from './uuid.js';
import validInputTypes from './valid-input-type.js';
import validLangs from './valid-langs.js';

const utils = {
	aggregateChecks,
	aggregateNodeResults,
	aggregateResult,
	aggreate,
	areStylesSet,
	assert,
	checkHelper,
	clone,
	collectResultsFromFrames,
	contains,
	cssParser,
	DqElement,
	escapeSelector,
	extendMetaData,
	finalizeResult,
	findBy,
	flattenedTree,
	getAllChecks,
	getBaseLang,
	getCheckOption,
	getFriendlyUriEnd,
	getNodeAttributes,
	getNodeFromTree,
	getPreloadConfig,
	getRootNode,
	getScroll,
	getSelectorData,
	getSelector,
	getStyleSheetFactory,
	getXpath,
	injectStyle,
	isHidden,
	isHtmlElement,
	isShadowRoot,
	isXHTML,
	matchesSelector,
	mergeResults,
	nodeSorter,
	parseCrossOriginStylesheet,
	parseSameOriginStylesheet,
	parseStylesheet,
	performanceTimer,
	pollyfillElementsFromPoint,
	preloadCssom,
	preload,
	publishMetaData,
	querySelectorAll,
	querySelectorAllFilter,
	queue,
	respondable,
	ruleShouldRun,
	scrollState,
	select,
	sendCommandToFrame,
	setScrollState,
	shouldPreload,
	toArray,
	tokenList,
	uniqueArray,
	uuid,
	validInputTypes,
	validLangs
};

export default utils;
