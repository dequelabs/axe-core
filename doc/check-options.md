# Check Options

## Table of Contents

- [How Checks Work](#how-checks-work)
- [Options](#options)
  - [aria-allowed-role](#aria-allowed-role)
  - [aria-required-children](#aria-required-children)
  - [aria-roledescription](#aria-roledescription)
  - [color-contrast](#color-contrast)
  - [page-has-heading-one](#page-has-heading-one)
  - [page-has-main](#page-has-main)
  - [page-no-duplicate-banner](#page-no-duplicate-banner)
  - [page-no-duplicate-contentinfo](#page-no-duplicate-contentinfo)
  - [page-no-duplicate-main](#page-no-duplicate-main)
  - [duplicate-img-label](#duplicate-img-label)
  - [label-content-name-mismatch](#label-content-name-mismatch)
  - [has-lang](#has-lang)
  - [valid-lang](#valid-lang)
  - [frame-tested](#frame-tested)
  - [no-autoplay-audio](#no-autoplay-audio)
  - [css-orientation-lock](#css-orientation-lock)
  - [meta-viewport-large](#meta-viewport-large)
  - [meta-viewport](#meta-viewport)
  - [header-present](#header-present)
  - [landmark](#landmark)
  - [p-as-heading](#p-as-heading)
  - [avoid-inline-spacing](#avoid-inline-spacing)
  - [scope-value](#scope-value)

## How Checks Work

[Rules in axe-core](../lib/rules) are made up of one or more individual checks that dictate how the rule works. Each check is typically designed to look for a specific requirement and report back its findings to the rule.

For example, the rule [image-alt](../lib/rules/image-alt.json) uses the checks `has-alt`, `aria-label`, `aria-labelledby`, and `non-empty-title` to determine if the image has an accessible name from an `alt`, `aria-label`, `aria-labelledby`, or `title` attribute (respectively).

Many checks allow you to change how they work through `options` properties. These options can be found in the [checks metadata file](../lib/checks).

For example, the check [has-lang](../lib/checks/language/has-lang.json) takes an `attributes` option which dictates which attributes to check for a lang value.

To customize a check's options, you can use [`axe.configure`](./API.md#api-name-axeconfigure) to configure the check and modify the options as desired.

```js
// configure has-lang check to look at the `hreflang` attribute as well
axe.configure({
	checks: [
		{
			id: 'has-lang',
			options: {
				attributes: ['lang', 'xml:lang', 'hreflang']
			}
		}
	]
});
```

## Options

### aria-allowed-role

| Option          | Default | Description                                                       |
| --------------- | :------ | :---------------------------------------------------------------- |
| `allowImplicit` | `true`  | Allow the explicit role to match the implicit role of the element |
| `ignoredTags`   | `[]`    | Do not check for allowed roles in the provided HTML elements list        |

### aria-required-children

| Option        | Default                                                                                                               | Description                                                                                                            |
| ------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `reviewEmpty` | `['doc-bibliography', 'doc-endnotes', 'grid', 'list', 'listbox', 'table', 'tablist', 'tree', 'treegrid', 'rowgroup']` | List of ARIA roles that should be flagged as Needs Review rather than a violation if the element has no owned children |

### aria-roledescription

| Option           | Default                                                                                   | Description                                                          |
| ---------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `supportedRoles` | `['button', 'img', 'checkbox', 'radio', 'combobox', 'menuitemcheckbox', 'menuitemradio']` | List of ARIA roles that support the `aria-roledescription` attribute |

### color-contrast

| Option                             | Default | Description                                                                                    |
| ---------------------------------- | :------ | :--------------------------------------------------------------------------------------------- |
| `ignoreUnicode`                    | `true`  | If unicode characters should not be checked for contrast                                       |
| `ignoreLength`                     | `false` | If short text content should not be checked for color contrast                                 |
| `boldValue`                        | `700`   | The minimum CSS `font-weight` value that designates bold text |
| `boldTextPt`                       | `14`    | The minimum CSS `font-size` pt value that designates bold text as being large                  |
| `largeTextPt`                      | `18`    | The minimum CSS `font-size` pt value that designates text as being large                       |
| `contrastRatio`                    | N/A     | Contrast ratio options                                                                         |
| `contrastRatio.normal`             | N/A     | Contrast ratio requirements for normal text (non-bold text or text smaller than `largeTextPt`) |
| `contrastRatio.normal.expected`    | `4.5`   | The expected contrast ratio for normal text                                                    |
| `contrastRatio.normal.minThreshold` | N/A     | The minimum ratio the check will apply to. Ratios less than this number will be ignored        |
| `contrastRatio.normal.maxThreshold` | N/A     | The maximum ratio the check will apply to. Ratios greater than this number will be ignored     |
| `contrastRatio.large`              | N/A     | Contrast ratio requirements for large text (bold text or text larger than `largeTextPt`)       |
| `contrastRatio.large.expected`     | `4.5`   | The expected contrast ratio for large text                                                     |
| `contrastRatio.large.minThreshold`  | N/A     | The minimum ratio the check will apply to. Ratios less than this number will be ignored        |
| `contrastRatio.large.maxThreshold`  | N/A     | The maximum ratio the check will apply to. Ratios greater than this number will be ignored     |

### page-has-heading-one

| Option     | Default                                                                                                                                                                                                                                              | Description                                                  |
| ---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `selector` | `h1:not([role]):not([aria-level]), h1:not([role])[aria-level=1], h2:not([role])[aria-level=1], h3:not([role])[aria-level=1], h4:not([role])[aria-level=1], h5:not([role])[aria-level=1], h6:not([role])[aria-level=1], [role=heading][aria-level=1]` | Selector used to determine if a page has a level one heading |

### page-has-main

| Option     | Default                           | Description                                              |
| ---------- | :-------------------------------- | :------------------------------------------------------- |
| `selector` | `main:not([role]), [role='main']` | Selector used to determine if a page has a main landmark |

### page-no-duplicate-banner

| Option              | Default                              | Description                                                                           |
| ------------------- | :----------------------------------- | :------------------------------------------------------------------------------------ |
| `selector`          | `header:not([role]), [role=banner]`  | Selector used to determine if a page has a banner landmark                            |
| `nativeScopeFilter` | `article, aside, main, nav, section` | Selector used to ignore banner landmarks that have a parent that matches the selector |

### page-no-duplicate-contentinfo

| Option              | Default                                  | Description                                                                                |
| ------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------- |
| `selector`          | `footer:not([role]), [role=contentinfo]` | Selector used to determine if a page has a contentinfo landmark                            |
| `nativeScopeFilter` | `article, aside, main, nav, section`     | Option values used to ignore contentinfo landmarks that have a selector matching the parent element |

### page-no-duplicate-main

| Option     | Default                           | Description                                              |
| ---------- | :-------------------------------- | :------------------------------------------------------- |
| `selector` | `main:not([role]), [role='main']` | Selector used to determine if a page has a main landmark |

### duplicate-img-label

| Option           | Default                                         | Description                                                                           |
| ---------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------ |
| `parentSelector` | `button, [role=button], a[href], p, li, td, th` | Selector used to look for the parent of an image that could duplicate the image label |

### label-content-name-mismatch

| Option               | Default | Description                                                                                                                                                               |
| -------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pixelThreshold`     | `0.1`   | Percent of difference in pixel data or pixel width required to determine if a font is a ligature font. Ligature fonts are ignored when comparing the label to the content |
| `occuranceThreshold` | `3`     | Number of times the font is encountered before auto-assigning the font as a ligature or not                                                                               |

### has-lang

| Option       | Default                | Description                         |
| ------------ | :--------------------- | :---------------------------------- |
| `attributes` | `['lang', 'xml:lang']` | Attributes to check for lang values |

### valid-lang

| Option       | Default                | Description                               |
| ------------ | :--------------------- | :---------------------------------------- |
| `attributes` | `['lang', 'xml:lang']` | Attributes to check for valid lang values |

### frame-tested

| Option        | Default | Description                                                |
| ------------- | :------ | :--------------------------------------------------------- |
| `isViolation` | `false` | If an iframe without axe should be reported as a violation |

### no-autoplay-audio

| Option            | Default | Description                                                                   |
| ----------------- | :------ | :---------------------------------------------------------------------------- |
| `allowedDuration` | `3`     | Maximum time in seconds an audio clip may autoplay before being marked as violation |

### css-orientation-lock

| Option            | Default | Description                                                                                                                            |
| ----------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `degreeThreshold` | `3`     | The difference of degrees from 180 and 90 that are considered orientation lock (for example, 93° is orientation locked but 94° is not) |

### meta-viewport-large

| Option         | Default | Description                                                                                                |
| -------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `scaleMinimum` | `5`     | The `scale-maximum` CSS value of the check applies to. Values above this number will be ignored |
| `lowerBound`   | `2`     | The `scale-minimum` CSS value the check applies to. Values below this number will be ignored |

### meta-viewport

| Option         | Default | Description                                                                                                |
| -------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `scaleMinimum` | `2`     | The `scale-maximum` CSS value the check applies to. Values above this number will be ignored |

### header-present

| Option     | Default                                                                                                          | Description                                        |
| ---------- | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `selector` | `h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role=heading]` | Selector used to determine if a page has a heading |

### landmark

| Option     | Default             | Description                                                |
| ---------- | :------------------ | :--------------------------------------------------------- |
| `selector` | `main, [role=main]` | Selector used to determine if a page has a landmark region |

### p-as-heading

| Option | Default | Description |
| ------ | :------ | :---------- |


???

### avoid-inline-spacing

| Option          | Default                                             | Description                                      |
| --------------- | :-------------------------------------------------- | :----------------------------------------------- |
| `cssProperties` | `['line-height', 'letter-spacing', 'word-spacing']` | List of inline spacing CSS properties to flag |

### scope-value

| Option   | Default                                  | Description                |
| -------- | :--------------------------------------- | :------------------------- |
| `values` | `['row', 'col', 'rowgroup', 'colgroup']` | List of valid scope values |
