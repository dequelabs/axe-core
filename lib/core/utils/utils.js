import aggregate from './aggregate';
import aggregateChecks from './aggregate-checks';
import aggregateNodeResults from './aggregate-node-results';
import aggregateResult from './aggregate-result';
import areStylesSet from './are-styles-set';
import assert from './assert';
import checkHelper from './check-helper';
import clone from './clone';
import closest from './closest';
import collectResultsFromFrames from './collect-results-from-frames';
import contains from './contains';
import cssParser from './css-parser';
import DqElement from './dq-element';
import matchesSelector from './element-matches';
import escapeSelector from './escape-selector';
import extendMetaData from './extend-meta-data';
import finalizeRuleResult from './finalize-result';
import findBy from './find-by';
import getFlattenedTree from './get-flattened-tree';
import getAllChecks from './get-all-checks';
import getBaseLang from './get-base-lang';
import getCheckMessage from './get-check-message';
import getCheckOption from './get-check-option';
import getFriendlyUriEnd from './get-friendly-uri-end';
import getNodeAttributes from './get-node-attributes';
import getNodeFromTree from './get-node-from-tree';
import getRootNode from './get-root-node';
import getScrollState from './get-scroll-state';
import getScroll from './get-scroll';
import getSelector, { getSelectorData } from './get-selector';
import getStyleSheetFactory from './get-stylesheet-factory';
import getXpath from './get-xpath';
import injectStyle from './inject-style';
import isHidden from './is-hidden';
import isHtmlElement from './is-html-element';
import isNodeInContext from './is-node-in-context';
import isShadowRoot from './is-shadow-root';
import isXHTML from './is-xhtml';
import matches, { matchesExpression, convertSelector } from './matches';
import memoize from './memoize';
import mergeResults from './merge-results';
import nodeSorter from './node-sorter';
import parseCrossOriginStylesheet from './parse-crossorigin-stylesheet';
import parseSameOriginStylesheet from './parse-sameorigin-stylesheet';
import parseStylesheet from './parse-stylesheet';
import performanceTimer from './performance-timer';
import { pollyfillElementsFromPoint } from './pollyfills';
import preloadCssom from './preload-cssom';
import preloadMedia from './preload-media';
import preload, { shouldPreload, getPreloadConfig } from './preload';
import processMessage from './process-message';
import publishMetaData from './publish-metadata';
import querySelectorAllFilter from './query-selector-all-filter';
import querySelectorAll from './query-selector-all';
import queue from './queue';
import respondable from './respondable';
import ruleShouldRun from './rule-should-run';
import select from './select';
import sendCommandToFrame from './send-command-to-frame';
import setScrollState from './set-scroll-state';
import toArray from './to-array';
import tokenList from './token-list';
import uniqueArray from './unique-array';
import validInputTypes from './valid-input-type';
import validLangs from './valid-langs';

/**
 * Namespace for utility helper methods.
 * @namespace utils
 * @memberof axe
 */

axe.utils = {
	aggregate,
	aggregateChecks,
	aggregateNodeResults,
	aggregateResult,
	areStylesSet,
	assert,
	checkHelper,
	clone,
	closest,
	collectResultsFromFrames,
	sendCommandToFrame,
	contains,
	cssParser,
	DqElement,
	matchesSelector,
	escapeSelector,
	extendMetaData,
	finalizeRuleResult,
	findBy,
	getFlattenedTree,
	getNodeFromTree,
	getAllChecks,
	getBaseLang,
	getCheckMessage,
	getCheckOption,
	getFriendlyUriEnd,
	getNodeAttributes,
	getRootNode,
	getScroll,
	getSelector,
	getSelectorData,
	getStyleSheetFactory,
	getXpath,
	injectStyle,
	isHidden,
	isHtmlElement,
	isNodeInContext,
	isShadowRoot,
	isXHTML,
	matches,
	convertSelector,
	matchesExpression,
	memoize,
	mergeResults,
	nodeSorter,
	parseCrossOriginStylesheet,
	parseSameOriginStylesheet,
	parseStylesheet,
	performanceTimer,
	// Spelled incorrectly intentionally (backwards compatibility).
	pollyfillElementsFromPoint,
	preloadCssom,
	preloadMedia,
	preload,
	shouldPreload,
	getPreloadConfig,
	processMessage,
	publishMetaData,
	querySelectorAll,
	querySelectorAllFilter,
	queue,
	respondable,
	ruleShouldRun,
	getScrollState,
	setScrollState,
	select,
	uniqueArray,
	toArray,
	tokenList,
	validInputTypes,
	validLangs
};

export {
	aggregate,
	aggregateChecks,
	aggregateNodeResults,
	aggregateResult,
	areStylesSet,
	assert,
	checkHelper,
	clone,
	closest,
	collectResultsFromFrames,
	sendCommandToFrame,
	contains,
	cssParser,
	DqElement,
	matchesSelector,
	escapeSelector,
	extendMetaData,
	finalizeRuleResult,
	findBy,
	getFlattenedTree,
	getNodeFromTree,
	getAllChecks,
	getBaseLang,
	getCheckMessage,
	getCheckOption,
	getFriendlyUriEnd,
	getNodeAttributes,
	getRootNode,
	getScroll,
	getSelector,
	getSelectorData,
	getStyleSheetFactory,
	getXpath,
	injectStyle,
	isHidden,
	isHtmlElement,
	isNodeInContext,
	isShadowRoot,
	isXHTML,
	matches,
	convertSelector,
	matchesExpression,
	memoize,
	mergeResults,
	nodeSorter,
	parseCrossOriginStylesheet,
	parseSameOriginStylesheet,
	parseStylesheet,
	performanceTimer,
	// Spelled incorrectly intentionally (backwards compatibility).
	pollyfillElementsFromPoint,
	preloadCssom,
	preloadMedia,
	preload,
	shouldPreload,
	getPreloadConfig,
	processMessage,
	publishMetaData,
	querySelectorAll,
	querySelectorAllFilter,
	queue,
	respondable,
	ruleShouldRun,
	getScrollState,
	setScrollState,
	select,
	uniqueArray,
	toArray,
	tokenList,
	validInputTypes,
	validLangs
};
