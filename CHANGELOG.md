# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.6.1"></a>
# [2.6.1](https://github.com/dequelabs/axe-core/compare/v2.6.0...v2.6.1) (2017-12-28)

### Bug Fixes

* Remove console.log statement


<a name="2.6.0"></a>
# [2.6.0](https://github.com/dequelabs/axe-core/compare/v2.5.0...v2.6.0) (2017-12-19)


### Bug Fixes

* Added message about expected contrast ratio ([#381](https://github.com/dequelabs/axe-core/issues/381)) ([#562](https://github.com/dequelabs/axe-core/issues/562)) ([a34c023](https://github.com/dequelabs/axe-core/commit/a34c023))
* color contrast misc ([#639](https://github.com/dequelabs/axe-core/issues/639)) Closes [#607](https://github.com/dequelabs/axe-core/issues/607), [#556](https://github.com/dequelabs/axe-core/issues/556) ([7cb0325](https://github.com/dequelabs/axe-core/commit/7cb0325))
* copy precommit hook as file, not a link ([b3bf3d4](https://github.com/dequelabs/axe-core/commit/b3bf3d4))
* **aria-allowed-attr:** align rowcount, colcount, and colindex with 1.1 spec ([#555](https://github.com/dequelabs/axe-core/issues/555)) ([320ef55](https://github.com/dequelabs/axe-core/commit/320ef55))
* Ensure overloaded Array.prototype won't crash axe ([8086a67](https://github.com/dequelabs/axe-core/commit/8086a67))
* **check:** fix bug with async checks ([34bc4f8](https://github.com/dequelabs/axe-core/commit/34bc4f8))
* **commons/aria:** allow aria-required on checkbox role ([0d7a9a1](https://github.com/dequelabs/axe-core/commit/0d7a9a1))
* **commons/aria:** allow aria-required on radio role ([31e9f4c](https://github.com/dequelabs/axe-core/commit/31e9f4c))
* **helpUrl:** Properly parse x.0 versions ([#550](https://github.com/dequelabs/axe-core/issues/550)) ([6457ba4](https://github.com/dequelabs/axe-core/commit/6457ba4))
* **postinstall:** use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([54f7ddd](https://github.com/dequelabs/axe-core/commit/54f7ddd))
* **rule/dlitem:** use a case-insenstive `tagName` test ([#652](https://github.com/dequelabs/axe-core/issues/652)) ([e67a913](https://github.com/dequelabs/axe-core/commit/e67a913)), closes [#581](https://github.com/dequelabs/axe-core/issues/581)
* **rules/region:** Treat `<section>` as a landmark if it has an accessible name [#640](https://github.com/dequelabs/axe-core/issues/640) ([#642](https://github.com/dequelabs/axe-core/issues/642)) ([0131458](https://github.com/dequelabs/axe-core/commit/0131458))
* Polyfills are made non-enumerable [#648](https://github.com/dequelabs/axe-core/issues/648). ([#649](https://github.com/dequelabs/axe-core/issues/649)) ([1ab4629](https://github.com/dequelabs/axe-core/commit/1ab4629))
* Return inapplicable results ([#473](https://github.com/dequelabs/axe-core/issues/473)). ([0a2a5cc](https://github.com/dequelabs/axe-core/commit/0a2a5cc))
* try telling circle to skip .git/hooks ([3b88acd](https://github.com/dequelabs/axe-core/commit/3b88acd))
* update main rules/tests for 2x branch ([b128e92](https://github.com/dequelabs/axe-core/commit/b128e92))


### Features

* **landmark-one-main:** add rule ensuring one main landmark in document ([#498](https://github.com/dequelabs/axe-core/issues/498)) ([ff0a1b8](https://github.com/dequelabs/axe-core/commit/ff0a1b8))
* add precommit hook on npm postinstall ([122c475](https://github.com/dequelabs/axe-core/commit/122c475))
* Add rule, landmark-main-is-top-level ([#462](https://github.com/dequelabs/axe-core/issues/462)) ([f007b47](https://github.com/dequelabs/axe-core/commit/f007b47))
* Improve generated selectors for namespaced elements in XHTML ([#582](https://github.com/dequelabs/axe-core/issues/582)) ([dbe63eb](https://github.com/dequelabs/axe-core/commit/dbe63eb)), closes [#563](https://github.com/dequelabs/axe-core/issues/563)
* docs: rename `aria._lut`, add to developer guide


<a name="2.5.0"></a>
# [2.5.0](https://github.com/dequelabs/axe-core/compare/v2.4.2...v2.5.0) (2017-11-06)


### Bug Fixes

* **aria-errormessage:** adds support for aria-errormessage ([#517](https://github.com/dequelabs/axe-core/issues/517)) ([465d41d](https://github.com/dequelabs/axe-core/commit/465d41d))
* adjust aria-errormessage for the 2x branch ([19232e5](https://github.com/dequelabs/axe-core/commit/19232e5))
* Merge options.resultTypes ([7b28c22](https://github.com/dequelabs/axe-core/commit/7b28c22))
* Merge required-children.js fix into v2 ([86b4a0e](https://github.com/dequelabs/axe-core/commit/86b4a0e))


### Features

* **reporter:** return one result of each type instead of zero when resultTypes is used ([#606](https://github.com/dequelabs/axe-core/issues/606)) ([482374f](https://github.com/dequelabs/axe-core/commit/482374f)), closes [#605](https://github.com/dequelabs/axe-core/issues/605)



<a name="2.4.2"></a>
## [2.4.2](https://github.com/dequelabs/axe-core/compare/v2.4.1...v2.4.2) (2017-09-25)


### Bug Fixes

* **aria:** adding support for aria-expanded in menuitem ([#521](https://github.com/dequelabs/axe-core/issues/521)) ([b4c42fe](https://github.com/dequelabs/axe-core/commit/b4c42fe))
* Match prerelease versions for helpUrl ([#546](https://github.com/dequelabs/axe-core/issues/546)) ([c166708](https://github.com/dequelabs/axe-core/commit/c166708))
* fix(node4): use var to declare variables ([#541](https://github.com/dequelabs/axe-core/issues/541)) ([c72badb](https://github.com/dequelabs/axe-core/commit/c72badbd55ef0b56b97f0c64a4eb544e31b4b3f1))


<a name="2.4.1"></a>
## [2.4.1](https://github.com/dequelabs/axe-core/compare/v2.4.0...v2.4.1) (2017-09-12)


### Bug Fixes

* fix(postinstall): use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([98fac8a](https://github.com/dequelabs/axe-core/commit/98fac8a))



<a name="2.4.0"></a>
## [2.4.0](https://github.com/dequelabs/axe-core/compare/v2.3.1-alpha.2...v2.4.0) (2017-09-08)

### Bug fixes:

* fix(color-contrast): Include `THEAD` and `TBODY` in contrast checks (#514) ([f98f8bd](https://github.com/dequelabs/axe-core/commit/f98f8bdacc551579c259aefd88bef41ed8157b68))
* fix(responsible): Restrict error construction to known errors (#513) ([0128a7e](https://github.com/dequelabs/axe-core/commit/0128a7ea47847b9fa04dbf98327f4bc1760c5e11))

### Features:

* docs: Document how to propose axe-core rules (#507) ([cabd329](https://github.com/dequelabs/axe-core/commit/cabd3297afbbfe9dbcc41a168b5529ba52f408ba))


<a name="2.4.0-alpha.2"></a>
## [2.4.0-alpha.2](https://github.com/dequelabs/axe-core/compare/v2.4.0-alpha.1...v2.4.0-alpha.2) (2017-09-06)

### Bug fixes:

* test(aria): aria-haspopup, aria-modal for 1.1
* style(test/aria): add line breaks for readability
* test(aria): add missing roles and properties
* fix: RestoreScroll was running  out of sync (#508)

### Features:

* feat(ARIA 1.1): Allow row-index, setsize and posinset on more roles


<a name="2.4.0-alpha.1"></a>
## [2.4.0-alpha.1](https://github.com/dequelabs/axe-core/compare/v2.3.0...v2.4.0-alpha.1) (2017-08-31)

### Bug fixes:

* chore: add help text for testconfig Grunt task
* fix: Properly output error stack
* doc: Add 'on mobile' to viewport rule
* fix: Ensure all tests pass in Chrome
* fix: Minimise scrolling in getBackgroundColor
* chore: Minor build chores for whitespace and lockfile
* fix: Align impact levels with Deque Way
* fix: Set relatedNodes on color/link-in-block rules
* fix: incomplete results should have impact
* fix(aria): Allow implicit attribute values
* chore: ignore growl in retire
* fix: Use getAttribute(id) over .id
* fix: Exclude `any` checks from output if one passed
* fix(aria): Treegrid should own rows, not treeitems
* fix(aria): add exception for native input combobox missing textbox. Fixes #160
* test: fix aria/required-children for jshint
* feat: allow link text from single-cell layout table
* fix: expand tr support for color contrast
* chore: ignore node_modules in examples when linting

### Features:

* feat: Add option `restoreScroll`
* doc: add more info on testing hidden regions
* feat: add S.C. 2.4.4 to link-name rule. Fixes #369
* feat: Add Japanese localisation
* doc: Add instructions on debugging on CircleCI
* test: add unit tests for button-has-visible-text
* chore: add descriptions to Grunt tasks
* feat(aria): Support progressive ARIA 1.1 attributes / roles
* feat: Add new ARIA 1.1 values for haspopup
* feat: Add aria-orientation to additional roles


<a name="2.3.1"></a>
## [2.3.1](https://github.com/dequelabs/axe-core/compare/v2.3.0...v2.3.1) (2017-06-15)

### Bug fixes:

* Improvements to hidden-content rule
* Deduplicated langs in valid-lang options

<a name="2.3.0"></a>
## [2.3.0](https://github.com/dequelabs/axe-core/compare/v2.2.3...v2.3.0) (2017-06-14)

### Bug fixes:

* Overhaul of selectors API
* New experimental rule for hidden-content
* New rule for flagging aria-hidden="true" on document.body
* Color-contrast rule impact is now serious
* Color-contrast fixes for implicit labels and TR elements
* Color-contrast puts 1:1 ratio elements into Needs Review/incomplete
* List category mappings in docs
* Update axe.source to work with Firefox webdriver

<a name="2.2.3"></a>
## [2.2.3](https://github.com/dequelabs/axe-core/compare/v2.2.2...v2.2.3) (2017-06-01)

### Bug fixes:
* Removed the disable property from link-in-text-block

<a name="2.2.2"></a>
## [2.2.2](https://github.com/dequelabs/axe-core/compare/2.2.1...v2.2.2) (2017-05-25)

### Bug fixes
* Stabilize incompleteData API for backwards compatibility
* Change impact of duplicate-id rule to moderate

<a name="2.2.2"></a>
## [2.2.1](https://github.com/dequelabs/axe-core/compare/2.2.0...2.2.1) (2017-05-19)

### Bug fixes
* Remove nodes from the color contrast incompleteData API to avoid circular references

<a name="2.2.0"></a>
## 2.2.0 (2017-04-24)

### Changes

* Add configuration options for iframes: false, selectors: false, and elementRef: true
* Improve color-contrast rule for disabled elements
* Add webdriver task for testing mobile viewports
* Improve audio/video captioning rules
* Improve th-has-data-cells rule
* Expose incomplete reasons for color contrast rule as part of Needs Review
* Implement rule groupings as tags
* Allow building of axe in multiple languages
* Empty-heading rule has impact: moderate

<a name="2.1.8"></a>
## 2.1.8 (2017-05-21)

### Changes

* Move from Snyk to Retire.js
* Make CI run test-fast task instead of parallel
* Add documentation on writing integration tests and rules
* Allow a larger list of languages for HTML-valid-lang rule
* Add support for [role=img] in image-alt rule
* Fix bug with innerHeight in get-background-color
* Improve dom.is-offscreen function
* Integrate optional performance timer
* Empty include defaults to document

<a name="2.1.7"></a>
## 2.1.7 (2016-12-13)

### Changes

* Add promise-based axe.run API method in favor of axe.a11yCheck
* Move TypeScript definition to root of project
* Add Inapplicable and Can't Tell results
* New rule: frame-title-unique
* Improvements to table rules: td-has-header, th-has-data-cells
* Color contrast rule performance improvements using polyfilled elementsFromPoint
* Add better support for implicit roles
* DQElement supports xPath

<a name="2.0.7"></a>
## 2.0.7 (2016-09-28)

### Changes

* Add TypeScript definition v1

<a name="2.0.5"></a>
## 2.0.5 (2016-04-20)

### Changes
* Support for UMD pattern
* Adds 508 tagging for table rules
* Fixes race condition for iframes
* Exclude actual nodes from array checking

<a name="2.0.5"></a>
## 2.0.5 (2016-04-13)

### Changes

* Improvements to messaging for extensions

<a name="2.0.3"></a>
## 2.0.3 (2016-04-12)

### Changes

* Security improvements
* Build includes Babel/ES6
* Improvements to table rules
* aXe can be loaded in Node

<a name="2.0.0"></a>
## 2.0.0 (2016-03-01)

### Changes

* Adds support for AMD modules
* Fixes incompatibility with Webpack
* Improvements to rules and checks
* Help urls no longer hard-coded
* Improved error handling

<a name="1.1.1"></a>
## 1.1.1 (2015-09-04)

### Changes

* Adds Travis hooks
* Adds Sauce Labs
* Encodes HTML in descriptions
* Updates messages and help URLs

<a name="1.0.1"></a>
## 1.0.1 (2015-06-10)

### Changes

* Initial public release
