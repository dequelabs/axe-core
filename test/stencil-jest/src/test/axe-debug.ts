/**
 * Debug instrumentation for axe-core running inside Stencil's Jest environment.
 *
 * Each function probes a specific aspect of the DOM/axe pipeline and logs
 * detailed diagnostic information to the console.
 */

const SEPARATOR = '─'.repeat(60);

function section(title: string) {
  console.log(`\n${SEPARATOR}`);
  console.log(`  ${title}`);
  console.log(SEPARATOR);
}

function safeStringify(obj: unknown): string {
  try {
    const seen = new WeakSet();
    return JSON.stringify(
      obj,
      (_key, val) => {
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) return '[Circular]';
          seen.add(val);
          // Don't expand DOM nodes deeply
          if (val.nodeType)
            return `[${val.nodeName || 'Node'} nodeType=${val.nodeType}]`;
        }
        return val;
      },
      2
    ).slice(0, 500);
  } catch {
    return '[unserializable object]';
  }
}

function logEntry(label: string, value: unknown) {
  const display =
    value === undefined
      ? 'undefined'
      : value === null
        ? 'null'
        : typeof value === 'function'
          ? `[Function: ${(value as Function).name || 'anonymous'}]`
          : typeof value === 'object'
            ? safeStringify(value)
            : String(value);
  console.log(`  ${label.padEnd(40)} ${display}`);
}

// ─── a. Globals / Environment ───────────────────────────────────────────────

export function logEnvironmentCapabilities(win: Window, doc: Document) {
  section('ENVIRONMENT CAPABILITIES');

  // Core globals
  logEntry('typeof window', typeof win);
  logEntry('typeof document', typeof doc);
  logEntry('typeof window.Node', typeof (win as any).Node);
  logEntry('typeof window.NodeList', typeof (win as any).NodeList);
  logEntry('typeof window.HTMLElement', typeof (win as any).HTMLElement);
  logEntry('typeof window.Element', typeof (win as any).Element);
  logEntry('typeof window.ShadowRoot', typeof (win as any).ShadowRoot);

  // Document basics
  logEntry('document.documentElement tag', doc.documentElement?.tagName);
  logEntry('document.documentElement nodeType', doc.documentElement?.nodeType);
  logEntry('document.body exists', !!doc.body);
  logEntry('document.body tag', doc.body?.tagName);

  // Shadow DOM APIs
  logEntry(
    'typeof Element.prototype.attachShadow',
    typeof (win as any).Element?.prototype?.attachShadow
  );
  logEntry(
    'typeof Element.prototype.assignedSlot',
    typeof (win as any).HTMLSlotElement?.prototype?.assignedNodes
  );

  // Layout APIs
  logEntry('typeof window.getComputedStyle', typeof win.getComputedStyle);
  logEntry(
    'typeof document.elementsFromPoint',
    typeof (doc as any).elementsFromPoint
  );
  logEntry('typeof document.elementFromPoint', typeof doc.elementFromPoint);
  logEntry('typeof window.innerWidth', typeof win.innerWidth);
  logEntry('window.innerWidth value', win.innerWidth);
  logEntry('window.innerHeight value', win.innerHeight);

  // TreeWalker / NodeIterator
  logEntry('typeof document.createTreeWalker', typeof doc.createTreeWalker);
  logEntry('typeof document.createNodeIterator', typeof doc.createNodeIterator);

  // Range / Selection
  logEntry('typeof document.createRange', typeof doc.createRange);
  logEntry('typeof window.getSelection', typeof win.getSelection);

  // MutationObserver
  logEntry('typeof MutationObserver', typeof (win as any).MutationObserver);
}

// ─── b. Context construction ────────────────────────────────────────────────

export function logContextConstruction(
  contextSpec: unknown,
  rootNode: Node | null
) {
  section('CONTEXT CONSTRUCTION');

  logEntry('contextSpec type', typeof contextSpec);
  logEntry('contextSpec value', contextSpec);
  logEntry('rootNode exists', !!rootNode);
  if (rootNode) {
    logEntry('rootNode nodeType', rootNode.nodeType);
    logEntry('rootNode nodeName', rootNode.nodeName);
    logEntry('rootNode childNodes.length', rootNode.childNodes?.length);
  }
}

// ─── c. Virtual tree inspection ─────────────────────────────────────────────

interface VirtualNode {
  actualNode: Node;
  shadowId?: string;
  children: VirtualNode[];
  _hasShadowRoot?: boolean;
  parent?: VirtualNode;
}

export function logVirtualTree(tree: VirtualNode[] | null, maxDepth = 4) {
  section('VIRTUAL TREE INSPECTION');

  if (!tree) {
    console.log('  Tree is null/undefined');
    return;
  }

  logEntry('tree length (root nodes)', tree.length);
  if (tree[0]) {
    logEntry('tree[0]._hasShadowRoot', (tree[0] as any)._hasShadowRoot);
  }

  let totalNodes = 0;
  let shadowNodes = 0;
  let slotNodes = 0;

  function walkTree(node: VirtualNode, depth: number) {
    totalNodes++;
    const el = node.actualNode as Element;
    const name = el.nodeName || '#text';
    const shadowId = node.shadowId || '(none)';

    if (node.shadowId) shadowNodes++;
    if (name === 'SLOT') slotNodes++;

    if (depth <= maxDepth) {
      const indent = '  '.repeat(depth + 1);
      const childCount = node.children ? node.children.length : 0;
      console.log(
        `${indent}${name} | shadowId=${shadowId} | children=${childCount}`
      );
    }

    if (node.children) {
      for (const child of node.children) {
        walkTree(child, depth + 1);
      }
    }
  }

  for (const root of tree) {
    walkTree(root, 0);
  }

  console.log('');
  logEntry('Total virtual nodes', totalNodes);
  logEntry('Nodes with shadowId', shadowNodes);
  logEntry('Slot elements', slotNodes);
}

// ─── d. Layout API probing ──────────────────────────────────────────────────

export function logLayoutAPIs(element: Element | null, win: Window) {
  section('LAYOUT API PROBING');

  if (!element) {
    console.log('  No element provided for layout probing');
    return;
  }

  logEntry('element tag', element.tagName);

  // getBoundingClientRect
  try {
    const rect = element.getBoundingClientRect();
    logEntry('getBoundingClientRect()', {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    });
    logEntry(
      'rect is all zeros',
      rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0
    );
  } catch (e: any) {
    logEntry('getBoundingClientRect() ERROR', e.message);
  }

  // getClientRects
  try {
    const rects = element.getClientRects();
    logEntry('getClientRects() length', rects.length);
    if (rects.length > 0) {
      logEntry('getClientRects()[0]', {
        width: rects[0].width,
        height: rects[0].height
      });
    }
  } catch (e: any) {
    logEntry('getClientRects() ERROR', e.message);
  }

  // getComputedStyle
  try {
    const style = win.getComputedStyle(element);
    logEntry('getComputedStyle().display', style.display);
    logEntry('getComputedStyle().visibility', style.visibility);
    logEntry('getComputedStyle().color', style.color);
    logEntry('getComputedStyle().backgroundColor', style.backgroundColor);
    logEntry('getComputedStyle().position', style.position);
    logEntry('getComputedStyle().overflow', style.overflow);
    logEntry('getComputedStyle().width', style.width);
    logEntry('getComputedStyle().height', style.height);
  } catch (e: any) {
    logEntry('getComputedStyle() ERROR', e.message);
  }

  // offsetWidth/offsetHeight
  logEntry('element.offsetWidth', (element as HTMLElement).offsetWidth);
  logEntry('element.offsetHeight', (element as HTMLElement).offsetHeight);
  logEntry('element.clientWidth', (element as HTMLElement).clientWidth);
  logEntry('element.clientHeight', (element as HTMLElement).clientHeight);
  logEntry('element.scrollWidth', (element as HTMLElement).scrollWidth);
  logEntry('element.scrollHeight', (element as HTMLElement).scrollHeight);

  // Shadow root probing on the element
  logEntry('element.shadowRoot', element.shadowRoot ? '[ShadowRoot]' : null);
  if (element.shadowRoot) {
    logEntry(
      'shadowRoot.childNodes.length',
      element.shadowRoot.childNodes.length
    );
    logEntry(
      'shadowRoot.innerHTML length',
      (element.shadowRoot as any).innerHTML?.length
    );
  }
}

// ─── e. Rule execution results ──────────────────────────────────────────────

interface AxeResult {
  violations: any[];
  passes: any[];
  incomplete: any[];
  inapplicable: any[];
}

export function logAxeResults(results: AxeResult | null) {
  section('AXE-CORE RESULTS');

  if (!results) {
    console.log('  Results are null/undefined');
    return;
  }

  logEntry('violations count', results.violations.length);
  logEntry('passes count', results.passes.length);
  logEntry('incomplete count', results.incomplete.length);
  logEntry('inapplicable count', results.inapplicable.length);

  if (results.violations.length > 0) {
    console.log('\n  VIOLATIONS:');
    for (const v of results.violations) {
      console.log(`    - ${v.id}: ${v.description}`);
      console.log(`      impact: ${v.impact} | nodes: ${v.nodes.length}`);
      for (const node of v.nodes) {
        console.log(`      target: ${JSON.stringify(node.target)}`);
        console.log(`      html: ${node.html?.slice(0, 120)}`);
      }
    }
  }

  if (results.incomplete.length > 0) {
    console.log('\n  INCOMPLETE:');
    for (const inc of results.incomplete) {
      console.log(`    - ${inc.id}: ${inc.description}`);
      console.log(`      nodes: ${inc.nodes.length}`);
      for (const node of inc.nodes) {
        console.log(`      target: ${JSON.stringify(node.target)}`);
        if (node.message) {
          console.log(`      message: ${node.message}`);
        }
        // Log incompleteData reason if available
        for (const check of [
          ...(node.any || []),
          ...(node.all || []),
          ...(node.none || [])
        ]) {
          if (check.data && check.data.messageKey) {
            console.log(`      incompleteData key: ${check.data.messageKey}`);
          }
          if (check.message) {
            console.log(`      check message: ${check.message}`);
          }
        }
      }
    }
  }

  if (results.passes.length > 0) {
    console.log('\n  PASSES (first 10):');
    for (const p of results.passes.slice(0, 10)) {
      console.log(`    - ${p.id}: nodes=${p.nodes.length}`);
    }
    if (results.passes.length > 10) {
      console.log(`    ... and ${results.passes.length - 10} more`);
    }
  }
}

// ─── DOM structure logging ──────────────────────────────────────────────────

export function logDOMStructure(element: Element | null, label = 'DOM') {
  section(`DOM STRUCTURE: ${label}`);

  if (!element) {
    console.log('  Element is null/undefined');
    return;
  }

  const html = element.outerHTML || '(no outerHTML)';
  // Truncate very large DOM trees
  if (html.length > 3000) {
    console.log(html.slice(0, 3000));
    console.log(`  ... (truncated, total length: ${html.length})`);
  } else {
    console.log(html);
  }
}

// ─── Axe-core internal monkey-patching for extra diagnostics ────────────────

let _instrumented = false;

export function instrumentAxeInternals(axe: any) {
  section('INSTRUMENTING AXE-CORE INTERNALS');

  if (_instrumented) {
    console.log('  (already instrumented, skipping wrapping)');
  }

  // Log axe version
  logEntry('axe.version', axe.version);

  // Log available utils
  logEntry('axe._tree exists', !!axe._tree);
  logEntry(
    'axe.utils.getFlattenedTree exists',
    typeof axe.utils?.getFlattenedTree
  );
  logEntry('axe.commons.dom exists', typeof axe.commons?.dom);

  if (!_instrumented) {
    // Wrap getFlattenedTree to add logging
    // axe-core exports are getter-only, so use Object.defineProperty
    if (axe.utils && axe.utils.getFlattenedTree) {
      const originalGetFlattenedTree = axe.utils.getFlattenedTree;
      try {
        Object.defineProperty(axe.utils, 'getFlattenedTree', {
          value: function (...args: any[]) {
            console.log('\n  [INSTRUMENTED] getFlattenedTree called');
            logEntry('  arg[0] (node) nodeName', args[0]?.nodeName);
            logEntry('  arg[0] nodeType', args[0]?.nodeType);
            logEntry(
              '  arg[0] shadowRoot',
              args[0]?.shadowRoot ? 'exists' : 'null'
            );

            try {
              const result = originalGetFlattenedTree.apply(this, args);
              console.log('  [INSTRUMENTED] getFlattenedTree succeeded');
              logEntry('  result length', result?.length);
              if (result && result[0]) {
                logEntry(
                  '  result[0]._hasShadowRoot',
                  result[0]._hasShadowRoot
                );
              }
              return result;
            } catch (e: any) {
              console.log('  [INSTRUMENTED] getFlattenedTree FAILED');
              logEntry('  error', e.message);
              logEntry('  stack', e.stack?.slice(0, 500));
              throw e;
            }
          },
          writable: true,
          configurable: true
        });
        console.log('  Wrapped axe.utils.getFlattenedTree');
      } catch (e: any) {
        console.log(`  Could not wrap getFlattenedTree: ${e.message}`);
      }
    }

    // Wrap isShadowRoot if accessible
    if (axe.commons && axe.commons.dom && axe.commons.dom.isShadowRoot) {
      const originalIsShadowRoot = axe.commons.dom.isShadowRoot;
      let isShadowRootCallCount = 0;
      try {
        Object.defineProperty(axe.commons.dom, 'isShadowRoot', {
          value: function (node: any) {
            const result = originalIsShadowRoot(node);
            isShadowRootCallCount++;
            // Only log positives and first few calls to avoid spam
            if (result || isShadowRootCallCount <= 5) {
              console.log(
                `  [INSTRUMENTED] isShadowRoot(${node?.nodeName}) = ${result}` +
                  ` (call #${isShadowRootCallCount})`
              );
            }
            return result;
          },
          writable: true,
          configurable: true
        });
        console.log('  Wrapped axe.commons.dom.isShadowRoot');
      } catch (e: any) {
        console.log(`  Could not wrap isShadowRoot: ${e.message}`);
      }
    }

    _instrumented = true;
  }

  console.log('  Instrumentation complete');
}

// ─── Summary helper ─────────────────────────────────────────────────────────

export function logTestSummary(
  testName: string,
  error: Error | null,
  results: AxeResult | null
) {
  section(`TEST SUMMARY: ${testName}`);

  if (error) {
    logEntry('STATUS', 'ERROR');
    logEntry('error message', error.message);
    logEntry('error stack (first 300)', error.stack?.slice(0, 300));
  } else if (results) {
    logEntry('STATUS', 'COMPLETED');
    logEntry('violations', results.violations.length);
    logEntry('passes', results.passes.length);
    logEntry('incomplete', results.incomplete.length);
    logEntry('inapplicable', results.inapplicable.length);
  } else {
    logEntry('STATUS', 'NO RESULTS');
  }
}
