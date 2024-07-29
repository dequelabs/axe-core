// Source: https://www.w3.org/TR/html-aam-1.0/#element-mapping-table
// Source: https://www.w3.org/TR/html-aria/
import getElementsByContentType from './get-elements-by-content-type';
import getGlobalAriaAttrs from './get-global-aria-attrs';
import arialabelledbyText from '../aria/arialabelledby-text';
import arialabelText from '../aria/arialabel-text';
import idrefs from '../dom/idrefs';
import isColumnHeader from '../table/is-column-header';
import isRowHeader from '../table/is-row-header';
import sanitize from '../text/sanitize';
import isFocusable from '../dom/is-focusable';
import { closest } from '../../core/utils';
import cache from '../../core/base/cache';
import getExplicitRole from '../aria/get-explicit-role';

// Sectioning content elements: article, aside, nav, section
// https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
const getSectioningContentSelector = () => {
  return cache.get('sectioningContentSelector', () => {
    return (
      getElementsByContentType('sectioning')
        .map(nodeName => `${nodeName}:not([role])`)
        .join(', ') +
      ' , [role=article], [role=complementary], [role=navigation], [role=region]'
    );
  });
};

const getSectioningContentPlusMainSelector = () => {
  // Why is there this similar but slightly different selector?
  // ->
  // Asides can be scoped to body or main, but headers and footers must be
  // scoped **only** to body (for landmark role mapping).
  //   - Header: https://w3c.github.io/html-aam/#el-header-ancestorbody
  //   - Footer: https://w3c.github.io/html-aam/#el-footer-ancestorbody
  //   - Aside: https://w3c.github.io/html-aam/#el-aside-ancestorbodymain
  return cache.get('sectioningContentPlusMainSelector', () => {
    return getSectioningContentSelector() + ' , main:not([role]), [role=main]';
  });
};

// sectioning elements only have an accessible name if the
// aria-label, aria-labelledby, or title attribute has valid
// content.
// can't go through the normal accessible name computation
// as it leads into an infinite loop of asking for the role
// of the element while the implicit role needs the name.
// Source: https://www.w3.org/TR/html-aam-1.0/#section-and-grouping-element-accessible-name-computation
//
// form elements also follow this same pattern although not
// specifically called out in the spec like section elements
// (per Scott O'Hara)
// Source: https://web-a11y.slack.com/archives/C042TSFGN/p1590607895241100?thread_ts=1590602189.217800&cid=C042TSFGN
//
// `checkTitle` means - also check the title attribute and
// return true if the node has a non-empty title
function hasAccessibleName(vNode, { checkTitle = false } = {}) {
  // testing for when browsers give a <section> a region role:
  // chrome - always a region role
  // firefox - if non-empty aria-labelledby, aria-label, or title
  // safari - if non-empty aria-labelledby or aria-label
  //
  // we will go with safaris implementation as it is the least common
  // denominator
  return !!(
    sanitize(arialabelledbyText(vNode)) ||
    sanitize(arialabelText(vNode)) ||
    (checkTitle && vNode?.props.nodeType === 1 && sanitize(vNode.attr('title')))
  );
}

const implicitHtmlRoles = {
  a: vNode => {
    return vNode.hasAttr('href') ? 'link' : null;
  },
  area: vNode => {
    return vNode.hasAttr('href') ? 'link' : null;
  },
  article: 'article',
  aside: vNode => {
    if (
      closest(vNode.parent, getSectioningContentSelector()) &&
      // An aside within sectioning content can still be mapped to
      // role=complementary if it has an accessible name
      !hasAccessibleName(vNode, { checkTitle: true })
    ) {
      return null;
    }

    return 'complementary';
  },
  body: 'document',
  button: 'button',
  datalist: 'listbox',
  dd: 'definition',
  dfn: 'term',
  details: 'group',
  dialog: 'dialog',
  dt: 'term',
  fieldset: 'group',
  figure: 'figure',
  footer: vNode => {
    const sectioningElement = closest(
      vNode,
      getSectioningContentPlusMainSelector()
    );

    return !sectioningElement ? 'contentinfo' : null;
  },
  form: vNode => {
    return hasAccessibleName(vNode) ? 'form' : null;
  },
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  h5: 'heading',
  h6: 'heading',
  header: vNode => {
    const sectioningElement = closest(
      vNode,
      getSectioningContentPlusMainSelector()
    );

    return !sectioningElement ? 'banner' : null;
  },
  hr: 'separator',
  img: vNode => {
    // an images role is considered implicitly presentation if the
    // alt attribute is empty. But that shouldn't be the case if it
    // has global aria attributes or is focusable, so we need to
    // override the role back to `img`
    // e.g. <img alt="" aria-label="foo"></img>
    const emptyAlt = vNode.hasAttr('alt') && !vNode.attr('alt');
    const hasGlobalAria = getGlobalAriaAttrs().find(attr =>
      vNode.hasAttr(attr)
    );

    return emptyAlt && !hasGlobalAria && !isFocusable(vNode)
      ? 'presentation'
      : 'img';
  },
  input: vNode => {
    // Source: https://www.w3.org/TR/html52/sec-forms.html#suggestions-source-element
    let suggestionsSourceElement;
    if (vNode.hasAttr('list')) {
      const listElement = idrefs(vNode.actualNode, 'list').filter(
        node => !!node
      )[0];
      suggestionsSourceElement =
        listElement && listElement.nodeName.toLowerCase() === 'datalist';
    }

    switch (vNode.props.type) {
      case 'checkbox':
        return 'checkbox';
      case 'number':
        return 'spinbutton';
      case 'radio':
        return 'radio';
      case 'range':
        return 'slider';
      case 'search':
        return !suggestionsSourceElement ? 'searchbox' : 'combobox';

      case 'button':
      case 'image':
      case 'reset':
      case 'submit':
        return 'button';

      case 'text':
      case 'tel':
      case 'url':
      case 'email':
      case '':
        return !suggestionsSourceElement ? 'textbox' : 'combobox';

      default:
        return 'textbox';
    }
  },
  // Note: if an li (or some other elms) do not have a required
  // parent, Firefox ignores the implicit semantic role and treats
  // it as a generic text.
  li: 'listitem',
  main: 'main',
  math: 'math',
  menu: 'list',
  meter: 'meter',
  nav: 'navigation',
  ol: 'list',
  optgroup: 'group',
  option: 'option',
  output: 'status',
  progress: 'progressbar',
  search: 'search',
  section: vNode => {
    return hasAccessibleName(vNode) ? 'region' : null;
  },
  select: vNode => {
    return vNode.hasAttr('multiple') || parseInt(vNode.attr('size')) > 1
      ? 'listbox'
      : 'combobox';
  },
  summary: 'button',
  table: 'table',
  tbody: 'rowgroup',
  td: vNode => {
    const table = closest(vNode, 'table');
    const role = getExplicitRole(table);

    return ['grid', 'treegrid'].includes(role) ? 'gridcell' : 'cell';
  },
  textarea: 'textbox',
  tfoot: 'rowgroup',
  th: vNode => {
    if (isColumnHeader(vNode)) {
      return 'columnheader';
    }
    if (isRowHeader(vNode)) {
      return 'rowheader';
    }
  },
  thead: 'rowgroup',
  tr: 'row',
  ul: 'list'
};

export default implicitHtmlRoles;
