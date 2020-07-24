# Customizing Axe-core

Axe cores provides a variety of ways to customize the experience to meet your needs.

## Table of Contents

1. [Standards Object](#standards-object)
   1. [ARIA Attrs](#aria-attrs)
   1. [ARIA Roles](#aria-roles)
   1. [DPUB Roles](#dpub-roles)
   1. [HTML Elms](#html-elms)
   1. [CSS Colors](#css-colors)
1. [Axe.configure](#axeconfigure)
1. [Check Options](#check-options)
1. [Custom Rules](#custom-rules)
1. [Custom Checks](#custom-checks)

## Standards Object

The [standards object](../lib/standards) is JSON object of ARIA and HTML spec information that axe-core uses to validate ARIA roles, attributes, and use.

For example, the `aria-valid-attr` rule uses the [`ariaAttrs`](../lib/standards/aria-attrs.js) object to determine if the aria attribute is a valid ARIA attribute.

To configure how axe-core validates ARIA information, you'll most likely configure the standards object to your needs. Below is a list of each object and its structure, as well as which rules will use that information

### Aria Attrs

The [`ariaAttrs`](../lib/standards/aria-attrs.js) object defines valid ARIA attributes, their allowed value types, and if it is a global attribute.

#### Used by Rules

- `aria-valid-attr` - Checks if the attribute name exists in the object
- `aria-valid-attr-value` - Checks if the attribute value is valid for its type
- `aria-unsupported-attr` - Checks if the attribute has the `unsupported` property

#### Structure

- `type` - string(required). The attribute type which dictates the valid values of the attribute. Valid types are:
  - `boolean` - Boolean attributes only accept `true` or `false` as valid values (e.g. `aria-selected`).
  - `nmtoken` - Name token attributes accept a single value from a list of valid values (e.g. `aria-orientation`.
  - `mntokens` - Name tokens attributes accept a space separated list of values from a list of valid values (e.g. `aria-relevant`).
  - `idref` - ID reference attributes accept an ID to point to another element in the DOM (e.g. `aria-activedescendant`).
  - `idrefs` - ID references attributes accept a space separated list of IDs that point to multiple elements in the DOM (e.g. `aria-labelledby`).
  - `string` - String attributes accept any string (e.g. `aria-label`).
  - `decimal` - Decimal attributes accept any number or decimal value (e.g. `aria-valuemax`).
  - `int` - Integer attributes only accept whole number values (e.g. `aria-level`).
- `values` - array(required for only `mntoken` and `mntokens`). The list of valid values for the attribute
- `allowEmpty` - boolean(optional, default `false`). If the attribute is allowed to have no value.
- `global` - boolean(optional, default `false`). If the attribute is a [global ARIA attribute](https://www.w3.org/TR/wai-aria-1.1/#global_states).
- `unsupported` - boolean(optional, default `false`). If the attribute is unsupported. Use this property to disable an attribute.

### Aria Roles

The [`ariaRoles`](../lib/standards/aria-roles.js) object defines valid ARIA roles and their use.

### Used by Rules

- `aria-allowed-attr` - Checks if the attribute can be used on the role from the `allowedAttrs` and `requiredAttrs` properties, as well as any global ARIA attributes (from the `ariaAttrs` standard).
- `aria-required-attr` - Checks if the role has at least one required attribute listed in the `requiredAttrs` property
- `aria-required-context` - Checks if the role has at least one required parent role listed in the `requiredContext` property
- `aria-required-owned` - Checks if the role has at least one required owned role listed in the `requiredOwned` property
- `unsupportedrole` - Checks if the role has the `unsupported` property

#### Structure

- `type` - string(required). [The role type](https://www.w3.org/TR/wai-aria-1.1/#roles_categorization). Valid types are:
  - `abstract`
  - `widget`
  - `structure`
  - `landmark`
- `requiredContext` - array(optional). List of required parent roles
- `requiredOwned` - array(optional). List of required owned roles
- `requiredAttrs` - array(optional). List of required attributes
- `allowedAttrs` - array(optional). List of allowed attributes (besides any required and global ARIA attributes)
- `nameFromContent` - boolean(optional. Default `false`). If the role allows name from content when calculating the accessible name.
- `unsupported` - boolean(optional. Default `false`). If the role role is unsupported. Use this property to disable a role.

### Dpub Roles

Dpub roles are defined in the [dpub-roles](../lib/standards/dpub-roles.js) file. Their structure is the exact same as the aria roles standard (albeit they have different `type`s). They are only separated for organizational purposes.

### HTML Elms

The [`htmlElms`](../lib/standards/html-elms.js) object defines valid HTML elements, they content type, and if they are allowed ARIA roles or attributes.

#### Used by Rules

- `aria-allowed-attr` - Checks if the attribute can be used on the element from the `noAriaAttrs` property
- `aria-allowed-role` - Checks if the role can be used on the HTML element from the `allowedRoles` property
- `aria-required-attrs` - Checks if any required attrs are defied implicitly on the element from the `implicitAttrs` property

#### Structure

- `contentTypes` - array(required). List of [content models](https://html.spec.whatwg.org/multipage/dom.html#content-models) for the element. Valid values are:
  - `flow`
  - `sectioning`
  - `heading`
  - `phrasing`
  - `embedded`
  - `interactive`
- `allowedRoles` - boolean or array(required). If element is allowed to use ARIA roles. A value of `true` means any role while a list of roles means only those are allowed. A value of `false` means no roles are allowed.
- `noAriaAttrs` - boolean(optional. Defaults `true`). If the element is allowed to use global ARIA attributes and any allowed for the elements role.
- `shadowRoot` - boolean(optional. Default `false`). If the element is allowed to have a shadow root.
- `implicitAttrs` - object(optional. Default `{}`). Any implicit ARIA attributes for the element and their default value.
- `namingMethods` - array(optional. Default `[]`). The [native text method](../lib/commons/text/native-text-methods.js) used to calculate the accessible name of the element.
- `variant` - object(optional). Sometimes an element can have different properties based on which attributes are defined on it. For example, an `img` is only considered interactive if it has the `usemap` attribute.

  For these cases, the `variant` property allows different definitions for the element. The `variant` object gives a name to each variant, defines when the variant applies through the `matches` property (a `matcher` object), and provides a `default` variant in the case none of the other variants match. A variant should only define what can change based on the attributes. Any properties that always apply regardless should be defined at the top level.

  Below is an example for the `meta` element which only has a `contentType` when it has the `itemprop` attribute.

  ```js
  meta: {
      variant: {
          itemprop: {
              matches: '[itemprop]',
              contentTypes: ['phrasing', 'flow']
          }
      },
      allowedRoles: false,
      noAriaAttrs: true
  }
  ```

### CSS Colors

The [`cssColors`](../lib/standards/css-colors.js) object defines the list of valid CSS color names and their equivalent RGB values.

#### Used by Rules

- `color-contrast` - Gets the RGB color from the CSS color name.

#### Structure

Each entry is the name of the CSS color and the value is an array of numbers consisting of the RGB values for the color respectively.

## Axe.configure

See the [API docs on `axe.configure`](./API.md#api-name-axeconfigure) for how to configure axe.

## Check Options

See the [Check Option docs](./check-options.md) for all check options.

## Custom Rules

Axe-core allows you to create your own custom rules. To do so, you'll pass a new rule into the `rules` array of `axe.configure`. Use the `all`, `any`, and/or `none` arrays to specify which axe-core checks to use. All checks can be found in the [checks directory](../lib/checks). You are also allowed to use the ID of any custom checks.

For example, to create a custom rule that checks if the `hreflang` attribute is valid on a `link` element. You would do the follow:

```js
axe.configure({
	rules: [
		{
			id: 'valid-hreflang',
			selector: 'link',
			excludeHidden: false,
			none: ['valid-lang']
		}
	],
	checks: [
		{
			id: 'valid-lang',
			options: {
				attributes: ['lang', 'xml:lang', 'hreflang']
			}
		}
	]
});
```

See the [API docs on `axe.configure`](./API.md#api-name-axeconfigure) for more information on how to configure a custom rule.

## Custom Checks

Axe-core also allows you to create your own custom checks. To do so, you'll pass a new check into the `checks` array of `axe.configure`. Use the `evaluate` property to define which check evaluate method to use. All `evaluate` and `after` function IDs can be found in the [`metadata-function-map`](../lib/core/base/metadata-function-map.js) file.

For example, to create a custom check that checks if that the

### Generic Checks
