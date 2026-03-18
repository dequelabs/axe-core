import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MyShadowComponent } from '../components/my-shadow-component/my-shadow-component';
import { MyScopedComponent } from '../components/my-scoped-component/my-scoped-component';
import { MyNestedComponent } from '../components/my-nested-component/my-nested-component';
import {
  logEnvironmentCapabilities,
  logContextConstruction,
  logVirtualTree,
  logLayoutAPIs,
  logAxeResults,
  logDOMStructure,
  instrumentAxeInternals,
  logTestSummary
} from './axe-debug';

// We import axe-core dynamically so we can catch import-time errors
let axe: any;

beforeAll(async () => {
  try {
    axe = await import('axe-core');
    // Handle both default export and named export patterns
    if (axe.default) {
      axe = axe.default;
    }
    console.log(`axe-core loaded successfully, version: ${axe.version}`);
  } catch (e: any) {
    console.error('Failed to import axe-core:', e.message);
    throw e;
  }
});

afterEach(() => {
  if (axe && axe.teardown) {
    try {
      axe.teardown();
    } catch (e: any) {
      console.log(`axe.teardown() error (non-fatal): ${e.message}`);
    }
  }
});

describe('axe-core in Stencil Jest', () => {
  // ─── Test 1: Environment Capabilities ───────────────────────────────────

  it('debug: environment capabilities', async () => {
    const page = await newSpecPage({
      components: [MyShadowComponent],
      html: '<my-shadow-component></my-shadow-component>'
    });

    const win = page.win as unknown as Window;
    const doc = page.doc as unknown as Document;

    // Probe environment
    logEnvironmentCapabilities(win, doc);

    // Probe the rendered component specifically
    const component = doc.querySelector('my-shadow-component');
    logLayoutAPIs(component, win);

    // Also probe a child element inside shadow DOM (if accessible)
    if (component?.shadowRoot) {
      const button = component.shadowRoot.querySelector('button');
      if (button) {
        console.log('\n  --- Layout APIs on shadow DOM child (button) ---');
        logLayoutAPIs(button, win);
      }
    }

    // This test is purely diagnostic — no assertions
    expect(true).toBe(true);
  });

  // ─── Test 2: Shadow component — axe.run on page.doc ────────────────────

  it('shadow component - axe.run on page.doc', async () => {
    const page = await newSpecPage({
      components: [MyShadowComponent],
      html: '<my-shadow-component></my-shadow-component>'
    });
    await page.waitForChanges();

    const win = page.win as unknown as Window;
    const doc = page.doc as unknown as Document;

    logDOMStructure(doc.documentElement, 'page.doc.documentElement');

    // Log shadow DOM specifically
    const component = doc.querySelector('my-shadow-component');
    if (component?.shadowRoot) {
      logDOMStructure(
        component.shadowRoot as unknown as Element,
        'shadow root (via innerHTML)'
      );
    }

    // Instrument axe internals for detailed logging
    instrumentAxeInternals(axe);

    // Log context construction info
    logContextConstruction(doc.documentElement, doc.documentElement);

    let results: any = null;
    let error: Error | null = null;

    try {
      // Configure axe to use the page's window
      axe.configure({ allowedOrigins: ['<unsafe_all_origins>'] });
      results = await axe.run(doc.documentElement);
      logAxeResults(results);
    } catch (e: any) {
      error = e;
      console.error('axe.run() threw an error:', e.message);
      console.error('Stack:', e.stack?.slice(0, 800));
    }

    logTestSummary('shadow component - page.doc', error, results);

    // We expect either results or a well-understood error
    if (error) {
      console.log('TEST OUTCOME: axe.run() failed — see error above');
    } else {
      expect(results).toBeTruthy();
      expect(results.violations).toBeDefined();
    }
  });

  // ─── Test 3: Shadow component — axe.run on page.body ───────────────────

  it('shadow component - axe.run on page.body', async () => {
    const page = await newSpecPage({
      components: [MyShadowComponent],
      html: '<my-shadow-component></my-shadow-component>'
    });
    await page.waitForChanges();

    const win = page.win as unknown as Window;
    const doc = page.doc as unknown as Document;

    logDOMStructure(doc.body, 'page.body');

    instrumentAxeInternals(axe);

    let results: any = null;
    let error: Error | null = null;

    try {
      results = await axe.run(doc.body);
      logAxeResults(results);
    } catch (e: any) {
      error = e;
      console.error('axe.run(page.body) threw an error:', e.message);
      console.error('Stack:', e.stack?.slice(0, 800));
    }

    logTestSummary('shadow component - page.body', error, results);

    if (error) {
      console.log('TEST OUTCOME: axe.run(page.body) failed — see error above');
    } else {
      expect(results).toBeTruthy();
    }
  });

  // ─── Test 4: Scoped component — axe.run ────────────────────────────────

  it('scoped component - axe.run', async () => {
    const page = await newSpecPage({
      components: [MyScopedComponent],
      html: '<my-scoped-component></my-scoped-component>'
    });
    await page.waitForChanges();

    const win = page.win as unknown as Window;
    const doc = page.doc as unknown as Document;

    logDOMStructure(doc.documentElement, 'scoped component DOM');

    instrumentAxeInternals(axe);

    let results: any = null;
    let error: Error | null = null;

    try {
      results = await axe.run(doc.documentElement);
      logAxeResults(results);
    } catch (e: any) {
      error = e;
      console.error('axe.run() on scoped component threw an error:', e.message);
      console.error('Stack:', e.stack?.slice(0, 800));
    }

    logTestSummary('scoped component', error, results);

    // Compare: scoped components don't use shadow DOM, so axe should work better
    if (error) {
      console.log(
        'TEST OUTCOME: scoped component also failed — see error above'
      );
    } else {
      expect(results).toBeTruthy();
      console.log(
        `COMPARISON: Scoped component produced ${results.violations.length} violations, ` +
          `${results.passes.length} passes`
      );
    }
  });

  // ─── Test 5: Nested components with slots ──────────────────────────────

  it('nested components with slots', async () => {
    const page = await newSpecPage({
      components: [MyNestedComponent, MyShadowComponent],
      html: '<my-nested-component></my-nested-component>'
    });
    await page.waitForChanges();

    const win = page.win as unknown as Window;
    const doc = page.doc as unknown as Document;

    logDOMStructure(doc.documentElement, 'nested component DOM');

    // Log each shadow root
    const outer = doc.querySelector('my-nested-component');
    if (outer?.shadowRoot) {
      console.log('\n  Outer shadow root innerHTML:');
      console.log('  ' + (outer.shadowRoot as any).innerHTML);

      const inner = outer.shadowRoot.querySelector('my-shadow-component');
      if (inner?.shadowRoot) {
        console.log('\n  Inner shadow root innerHTML:');
        console.log('  ' + (inner.shadowRoot as any).innerHTML);
      } else {
        console.log('  Inner my-shadow-component has no shadowRoot');
      }
    }

    instrumentAxeInternals(axe);

    let results: any = null;
    let error: Error | null = null;

    try {
      results = await axe.run(doc.documentElement);
      logAxeResults(results);
    } catch (e: any) {
      error = e;
      console.error('axe.run() on nested component threw an error:', e.message);
      console.error('Stack:', e.stack?.slice(0, 800));
    }

    logTestSummary('nested components with slots', error, results);

    if (error) {
      console.log('TEST OUTCOME: nested component failed — see error above');
    } else {
      expect(results).toBeTruthy();
    }
  });

  // ─── Test 6: Structure-only rules (disable layout rules) ───────────────

  it('structure-only rules (disable layout rules)', async () => {
    const page = await newSpecPage({
      components: [MyShadowComponent],
      html: '<my-shadow-component></my-shadow-component>'
    });
    await page.waitForChanges();

    const doc = page.doc as unknown as Document;

    logDOMStructure(doc.documentElement, 'structure-only test DOM');

    instrumentAxeInternals(axe);

    // Disable rules that require layout/visual information
    const layoutRules: Record<string, { enabled: false }> = {};
    const layoutRuleIds = [
      'color-contrast',
      'color-contrast-enhanced',
      'target-size',
      'link-in-text-block',
      'meta-viewport',
      'meta-viewport-large',
      'focus-order-semantics'
    ];
    for (const id of layoutRuleIds) {
      layoutRules[id] = { enabled: false };
    }

    let results: any = null;
    let error: Error | null = null;

    try {
      results = await axe.run(doc.documentElement, {
        rules: layoutRules
      });
      logAxeResults(results);
    } catch (e: any) {
      error = e;
      console.error(
        'axe.run() with structure-only rules threw an error:',
        e.message
      );
      console.error('Stack:', e.stack?.slice(0, 800));
    }

    logTestSummary('structure-only rules', error, results);

    if (error) {
      console.log(
        'TEST OUTCOME: Even structure-only rules failed — problem is in core pipeline'
      );
    } else {
      expect(results).toBeTruthy();
      console.log(
        `STRUCTURE-ONLY RESULTS: ${results.violations.length} violations, ` +
          `${results.passes.length} passes, ` +
          `${results.incomplete.length} incomplete`
      );

      // Log which rules produced violations (these are the structural ones that work)
      if (results.violations.length > 0) {
        console.log('\n  Structure-only violations detected:');
        for (const v of results.violations) {
          console.log(
            `    - ${v.id}: ${v.description} (${v.nodes.length} nodes)`
          );
        }
      }

      // Expect at least some violations (missing alt, missing label)
      console.log(
        '\n  Expected violations: image-alt (missing alt on img), ' +
          'label (missing label on input)'
      );
    }
  });
});
