import { createFrameContext } from './context/create-frame-context';
import { normalizeContext } from './context/normalize-context';
import { parseSelectorArray } from './context/parse-selector-array';
import {
  findBy,
  getFlattenedTree,
  select,
  isNodeInContext,
  nodeSorter,
  respondable,
  clone
} from '../utils';
import { isVisibleToScreenReaders } from '../../commons/dom';

/**
 * Holds context of includes, excludes and frames for analysis.
 *
 * @todo  clarify and sync changes to design doc
 * Context : {IncludeStrings} || {
 *   // defaults to document/all
 *   include: {IncludeStrings},
 *   exclude : {ExcludeStrings}
 * }
 *
 * IncludeStrings : [{CSSSelectorArray}] || Node
 * ExcludeStrings : [{CSSSelectorArray}]
 * `CSSSelectorArray` an Array of selector strings that addresses a Node in a multi-frame document. All addresses
 * are in this form regardless of whether the document contains any frames.To evaluate the selectors to
 * find the node referenced by the array, evaluate the selectors in-order, starting in window.top. If N
 * is the length of the array, then the first N-1 selectors should result in an iframe and the last
 * selector should result in the specific node.
 *
 * @param {Object} spec Configuration or "specification" object
 */
export default function Context(spec, flatTree) {
  spec = clone(spec);
  this.frames = [];
  this.page = typeof spec?.page === 'boolean' ? spec.page : undefined;
  this.initiator = typeof spec?.initiator === 'boolean' ? spec.initiator : true;
  this.focusable = typeof spec?.focusable === 'boolean' ? spec.focusable : true;
  this.size = typeof spec?.size === 'object' ? spec.size : {};

  spec = normalizeContext(spec);

  // cache the flattened tree
  this.flatTree = flatTree ?? getFlattenedTree(getRootNode(spec));
  this.exclude = spec.exclude;
  this.include = spec.include;

  this.include = parseSelectorArray(this, 'include');
  this.exclude = parseSelectorArray(this, 'exclude');

  select('frame, iframe', this).forEach(frame => {
    if (isNodeInContext(frame, this)) {
      pushUniqueFrame(this, frame.actualNode);
    }
  });

  if (typeof this.page === 'undefined') {
    // Figure out if the entire page is in scope
    this.page = isPageContext(this);
    this.frames.forEach(frame => {
      frame.page = this.page;
    });
  }

  // Validate outside of a frame
  validateContext(this);

  if (!Array.isArray(this.include)) {
    this.include = Array.from(this.include);
  }
  this.include.sort(nodeSorter); // ensure that the order of the include nodes is document order
}

/**
 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
 * @private
 * @param  {Object} Context      Parent context for the frame
 * @param  {HTMLElement} frame   The frame to push onto Context
 */
function pushUniqueFrame(context, frame) {
  if (
    !isVisibleToScreenReaders(frame) ||
    findBy(context.frames, 'node', frame)
  ) {
    return;
  }
  context.frames.push(createFrameContext(frame, context));
}

/**
 * Check if a normalized context tests the full page
 * @private
 */
function isPageContext({ include }) {
  return (
    include.length === 1 && include[0].actualNode === document.documentElement
  );
}

/**
 * Check that the context, as well as each frame includes at least 1 element
 * @private
 * @param  {context} context
 * @return {Error}
 */
function validateContext(context) {
  if (context.include.length === 0 && context.frames.length === 0) {
    const env = respondable.isInFrame() ? 'frame' : 'page';
    throw new Error('No elements found for include in ' + env + ' Context');
  }
}

/**
 * For a context-like object, find its shared root node
 */
function getRootNode({ include, exclude }) {
  const selectors = Array.from(include).concat(Array.from(exclude));
  // Find the first Element.ownerDocument or Document
  for (let i = 0; i < selectors.length; i++) {
    const item = selectors[i];
    if (item instanceof window.Element) {
      return item.ownerDocument.documentElement;
    }

    if (item instanceof window.Document) {
      return item.documentElement;
    }
  }
  return document.documentElement;
}
