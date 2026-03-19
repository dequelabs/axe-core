# Code Pattern Examples

Quick-reference examples for axe-core coding conventions.

## Default Export at Top

```javascript
// GOOD: Default export right after imports
import { getRole } from '../../commons/aria';
import { isVisible } from '../../commons/dom';

export default function myFunction(node, options) {
  // function body
}

// BAD: Export buried at bottom of file
import { getRole } from '../../commons/aria';

function myFunction(node, options) {
  // body
}

// ... more code ...

export default myFunction; // Too far from top
```

## Return Early Pattern

```javascript
// GOOD: Main path left-aligned, edge cases exit early
export default function processValue(value) {
  if (!value) {
    return null;
  }

  if (value.length < 3) {
    throw new Error('Value too short');
  }

  const normalized = normalize(value);
  const result = transform(normalized);
  return result;
}

// BAD: Nested conditionals
export default function processValue(value) {
  let result;
  if (value) {
    if (value.length >= 3) {
      const normalized = normalize(value);
      result = transform(normalized);
    } else {
      throw new Error('Value too short');
    }
  } else {
    result = null;
  }
  return result;
}
```

## Import Restrictions

```javascript
// GOOD: commons importing from core/utils via index
import { getNodeFromTree } from '../../core/utils';

// GOOD: commons importing other commons directly
import getExplicitRole from '../aria/get-explicit-role';

// BAD: core/utils importing from commons — NEVER DO THIS
import { isDisabled } from '../../commons/forms';

// BAD: importing from index in core/utils — use direct path
import { someUtil } from './index'; // Use: import someUtil from './some-util';
```

## JSDoc Comments

### Standard function

```javascript
/**
 * Determines if an element is a native select element
 * @method isNativeSelect
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if select
 * @returns {Boolean}
 */
import nodeLookup from '../../core/utils/node-lookup';

function isNativeSelect(node) {
  const { vNode } = nodeLookup(node);
  const nodeName = vNode.props.nodeName;
  return nodeName === 'select';
}
```

### Check evaluate function

```javascript
/**
 * Check if an element's `role` attribute uses any abstract role values.
 *
 * Abstract roles are taken from the `ariaRoles` standards object from the roles `type` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all abstract roles</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element uses an `abstract` role. False otherwise.
 */
function abstractroleEvaluate(node, options, virtualNode) {
  // implementation
}
```

## Virtual Node vs HTMLElement

```javascript
// Use Virtual Node for attribute access and property reads
function myCheck(node, options, virtualNode) {
  const role = virtualNode.attr('role'); // Cached attribute access
  const nodeName = virtualNode.props.nodeName;

  // Only access real node when you need DOM APIs
  const rect = node.getBoundingClientRect();
  const rootNode = node.getRootNode();
}

// Convert ambiguous input using nodeLookup
import nodeLookup from '../../core/utils/node-lookup';

function myFunction(nodeOrVirtual) {
  const { vNode, domNode } = nodeLookup(nodeOrVirtual);
  // vNode = VirtualNode, domNode = real DOM node
}
```
