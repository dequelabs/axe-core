<a name="3.0.0-beta.2"></a>
# [3.0.0-beta.2](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.9...v3.0.0-beta.2) (2018-03-01)


### Bug Fixes

* **perf:** Improve getSelector performance ([737c81c](https://github.com/dequelabs/axe-core/commit/737c81c))
* Delete Selenium example, use grunt-axe-selenium instead ([063e701](https://github.com/dequelabs/axe-core/commit/063e701))


### Features

* Update Jasmin example ([72d49d5](https://github.com/dequelabs/axe-core/commit/72d49d5))
* Update Jest+React example ([5b35322](https://github.com/dequelabs/axe-core/commit/5b35322))
* Update Mocha example ([cf70f9f](https://github.com/dequelabs/axe-core/commit/cf70f9f))
* Update PhantomJS example ([641b5e6](https://github.com/dequelabs/axe-core/commit/641b5e6))
* Update QUnit example ([028ae51](https://github.com/dequelabs/axe-core/commit/028ae51))


# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.0-beta.1"></a>
# [3.0.0-beta.1](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.9...v3.0.0-beta.1) (2018-02-19)


### Bug Fixes

* **audio-caption:** Change tag wcag122 to wcag121 [#686](https://github.com/dequelabs/axe-core/issues/686) ([#721](https://github.com/dequelabs/axe-core/issues/721)) ([9c7b9f1](https://github.com/dequelabs/axe-core/commit/9c7b9f1))
* **empty-heading:** Skip headings with the role changed [#645](https://github.com/dequelabs/axe-core/issues/645) ([#722](https://github.com/dequelabs/axe-core/issues/722)) ([80ef961](https://github.com/dequelabs/axe-core/commit/80ef961))
* **image-alt:** Exclude svg[role="img"] elements ([#683](https://github.com/dequelabs/axe-core/issues/683)) ([0fe74d8](https://github.com/dequelabs/axe-core/commit/0fe74d8))
* **label:** Prevent label rule from crashing on input without type [#678](https://github.com/dequelabs/axe-core/issues/678) ([#730](https://github.com/dequelabs/axe-core/issues/730)) ([4498680](https://github.com/dequelabs/axe-core/commit/4498680))
* **perf:** improve select performance fixes [#702](https://github.com/dequelabs/axe-core/issues/702) ([3274919](https://github.com/dequelabs/axe-core/commit/3274919))
* **perf:** memoize axe.utils.select ([c9cd122](https://github.com/dequelabs/axe-core/commit/c9cd122))
* **perf:** normalize all selectors for better cache utilization ([189c165](https://github.com/dequelabs/axe-core/commit/189c165))
* **perf:** remove need for node sorting from select completely ([7677a6a](https://github.com/dequelabs/axe-core/commit/7677a6a))
* **performance:** significantly improve the performance of the dom.findUp utility fixes [#696](https://github.com/dequelabs/axe-core/issues/696) ([9197e03](https://github.com/dequelabs/axe-core/commit/9197e03))
* add shadow dom coverage to all checks ([0e48413](https://github.com/dequelabs/axe-core/commit/0e48413)), closes [#690](https://github.com/dequelabs/axe-core/issues/690)
* bug-705: cleanupPlugins() should not throw exception when no arguments are provided ([#709](https://github.com/dequelabs/axe-core/issues/709)) ([fb1d2f7](https://github.com/dequelabs/axe-core/commit/fb1d2f7))
* Remove axe.a11yCheck() ([88d039f](https://github.com/dequelabs/axe-core/commit/88d039f))
* use virtual methods where applicable ([6ddc4e5](https://github.com/dequelabs/axe-core/commit/6ddc4e5))
* **type-checking:** Improve typescript axe.run call signature ([#707](https://github.com/dequelabs/axe-core/issues/707)) ([de45ee3](https://github.com/dequelabs/axe-core/commit/de45ee3))


### Performance Improvements

* Add performance metrics in Rule.runChecks ([#701](https://github.com/dequelabs/axe-core/issues/701)) ([27fdc2f](https://github.com/dequelabs/axe-core/commit/27fdc2f))



<a name="3.0.0-alpha.9"></a>
# [3.0.0-alpha.9](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.8...v3.0.0-alpha.9) (2018-01-18)


### Bug Fixes

* **aria-errormessage:** adds support for aria-errormessage ([#517](https://github.com/dequelabs/axe-core/issues/517)) ([c96f58c](https://github.com/dequelabs/axe-core/commit/c96f58c))
* **check:** fix bug with async checks ([441ca95](https://github.com/dequelabs/axe-core/commit/441ca95))
* **color-contrast:** allow disabled label children ([db26bc9](https://github.com/dequelabs/axe-core/commit/db26bc9))
* **color-contrast:** incl. elements w/ line breaks ([a464918](https://github.com/dequelabs/axe-core/commit/a464918))
* **commons/aria:** allow aria-required on checkbox role ([3e21c6e](https://github.com/dequelabs/axe-core/commit/3e21c6e))
* adjust color algorithm for inline elements ([7f8491e](https://github.com/dequelabs/axe-core/commit/7f8491e))
* Allow checkbox and radio groups with hidden aria-labelledby targets [#188](https://github.com/dequelabs/axe-core/issues/188) ([6149bde](https://github.com/dequelabs/axe-core/commit/6149bde))
* Ensure overloaded Array.prototype won't crash axe ([ea57ef2](https://github.com/dequelabs/axe-core/commit/ea57ef2))
* handle contrast of multiline inline el's ([f9d565f](https://github.com/dequelabs/axe-core/commit/f9d565f))
* Polyfills are made non-enumerable [#648](https://github.com/dequelabs/axe-core/issues/648). ([#649](https://github.com/dequelabs/axe-core/issues/649)) ([48d8703](https://github.com/dequelabs/axe-core/commit/48d8703))
* Remove href-no-hash rule ([342cb6e](https://github.com/dequelabs/axe-core/commit/342cb6e))
* Return inapplicable results ([#473](https://github.com/dequelabs/axe-core/issues/473)). ([c9caeff](https://github.com/dequelabs/axe-core/commit/c9caeff))
* Several of fixes for IE and Edge ([#577](https://github.com/dequelabs/axe-core/issues/577)) ([63e1272](https://github.com/dequelabs/axe-core/commit/63e1272))
* skip-link rule now checks if a target exists ([f7f9cf3](https://github.com/dequelabs/axe-core/commit/f7f9cf3))
* **commons/aria:** allow aria-required on radio role ([58b76a6](https://github.com/dequelabs/axe-core/commit/58b76a6))
* **commons/dom:** fix isFocusable functions by checking screenreader ([#658](https://github.com/dequelabs/axe-core/issues/658)) ([c665d0b](https://github.com/dequelabs/axe-core/commit/c665d0b)), closes [#647](https://github.com/dequelabs/axe-core/issues/647)
* **core/utils/querySelectorAll:** Ensure that elements do not get tested twice ([#666](https://github.com/dequelabs/axe-core/issues/666)) ([a76a454](https://github.com/dequelabs/axe-core/commit/a76a454))
* **required-children:** add combobox > listbox exception ([#559](https://github.com/dequelabs/axe-core/issues/559)) ([8d0991f](https://github.com/dequelabs/axe-core/commit/8d0991f))
* **rules/region:** Treat `<section>` as a landmark if it has an accessible name [#640](https://github.com/dequelabs/axe-core/issues/640) ([#642](https://github.com/dequelabs/axe-core/issues/642)) ([c11b442](https://github.com/dequelabs/axe-core/commit/c11b442))


### Features

* Add rule, landmark-main-is-top-level ([#462](https://github.com/dequelabs/axe-core/issues/462)) ([63040bd](https://github.com/dequelabs/axe-core/commit/63040bd))
* **collect-results-from-frames:** add frameWaitTime option ([#661](https://github.com/dequelabs/axe-core/issues/661)) ([8016ad1](https://github.com/dequelabs/axe-core/commit/8016ad1))
* **landmark-one-main:** add rule ensuring one main landmark in document ([#498](https://github.com/dequelabs/axe-core/issues/498)) ([dfc6069](https://github.com/dequelabs/axe-core/commit/dfc6069))
* **reporter:** return one result of each type instead of zero when resultTypes is used ([#604](https://github.com/dequelabs/axe-core/issues/604)) ([216a83b](https://github.com/dequelabs/axe-core/commit/216a83b)), closes [#603](https://github.com/dequelabs/axe-core/issues/603)
* **rule:** Flag div/p/spans/headings in focus order ([ce5f3dc](https://github.com/dequelabs/axe-core/commit/ce5f3dc)), closes [#632](https://github.com/dequelabs/axe-core/issues/632)
* allow options in aria-allowed-attr, aria-required-attr ([#673](https://github.com/dequelabs/axe-core/issues/673)) ([61ac303](https://github.com/dequelabs/axe-core/commit/61ac303))
* Enable all rules by default ([18263eb](https://github.com/dequelabs/axe-core/commit/18263eb))
* Improve generated selectors for namespaced elements in XHTML ([#582](https://github.com/dequelabs/axe-core/issues/582)) ([9e3ca45](https://github.com/dequelabs/axe-core/commit/9e3ca45)), closes [#563](https://github.com/dequelabs/axe-core/issues/563)


### BREAKING CHANGES

* Skip-link rule no longer requires skip lins with a focusable target.



<a name="3.0.0-alpha.8"></a>
# [3.0.0-alpha.8](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.7...v3.0.0-alpha.8) (2017-10-20)


### Bug Fixes

* **aria-allowed-attr:** align rowcount, colcount, and colindex with 1.1 spec ([#555](https://github.com/dequelabs/axe-core/issues/555)) ([10efa88](https://github.com/dequelabs/axe-core/commit/10efa88))
* **required-children:** add combobox > listbox exception ([#559](https://github.com/dequelabs/axe-core/issues/559)) ([8d0991f](https://github.com/dequelabs/axe-core/commit/8d0991f))
* Added message about expected contrast ratio ([#381](https://github.com/dequelabs/axe-core/issues/381)) ([#562](https://github.com/dequelabs/axe-core/issues/562)) ([9e30d64](https://github.com/dequelabs/axe-core/commit/9e30d64))


<a name="3.0.0-alpha.7"></a>
# [3.0.0-alpha.7](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.6...v3.0.0-alpha.7) (2017-10-20)


### Bug Fixes

* **aria-allowed-attr:** align rowcount, colcount, and colindex with 1.1 spec ([#555](https://github.com/dequelabs/axe-core/issues/555)) ([10efa88](https://github.com/dequelabs/axe-core/commit/10efa88))
* **required-children:** add combobox > listbox exception ([#559](https://github.com/dequelabs/axe-core/issues/559)) ([8d0991f](https://github.com/dequelabs/axe-core/commit/8d0991f))
* Added message about expected contrast ratio ([#381](https://github.com/dequelabs/axe-core/issues/381)) ([#562](https://github.com/dequelabs/axe-core/issues/562)) ([9e30d64](https://github.com/dequelabs/axe-core/commit/9e30d64))


### Performance Improvements

* **reporter:** add option to limit result types to be processed ([#568](https://github.com/dequelabs/axe-core/issues/568)) ([42b46d9](https://github.com/dequelabs/axe-core/commit/42b46d9)), closes [#512](https://github.com/dequelabs/axe-core/issues/512)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.0-alpha.6"></a>
# [3.0.0-alpha.6](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.3...v3.0.0-alpha.6) (2017-09-27)


### Bug Fixes

* **aria:** adding support for aria-expanded in menuitem ([#521](https://github.com/dequelabs/axe-core/issues/521)) ([b30b451](https://github.com/dequelabs/axe-core/commit/b30b451))
* **color-contrast:** Include `THEAD` and `TBODY` in contrast checks ([#514](https://github.com/dequelabs/axe-core/issues/514)) ([f98f8bd](https://github.com/dequelabs/axe-core/commit/f98f8bd))
* Match prerelease versions for helpUrl ([#546](https://github.com/dequelabs/axe-core/issues/546)) ([5300577](https://github.com/dequelabs/axe-core/commit/5300577))
* **helpUrl:** Properly parse x.0 versions ([#550](https://github.com/dequelabs/axe-core/issues/550)) ([a51c5ce](https://github.com/dequelabs/axe-core/commit/a51c5ce))
* **postinstall:** use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([f5b5299](https://github.com/dequelabs/axe-core/commit/f5b5299))
* **responsible:** Restrict error construction to known errors ([0128a7e](https://github.com/dequelabs/axe-core/commit/0128a7e))



<a name="3.0.0-alpha.5"></a>
# [3.0.0-alpha.5](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.4...v3.0.0-alpha.5) (2017-09-25)


### Bug Fixes

* **aria:** adding support for aria-expanded in menuitem ([#521](https://github.com/dequelabs/axe-core/issues/521)) ([b30b451](https://github.com/dequelabs/axe-core/commit/b30b451))
* **postinstall:** use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([f5b5299](https://github.com/dequelabs/axe-core/commit/f5b5299))
* Match prerelease versions for helpUrl ([#546](https://github.com/dequelabs/axe-core/issues/546)) ([5300577](https://github.com/dequelabs/axe-core/commit/5300577))



<a name="3.0.0-alpha.4"></a>
## [3.0.0-alpha.4](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.3...v3.0.0-alpha.4) (2017-09-08)

### Bug fixes:

* fix(color-contrast): Include `THEAD` and `TBODY` in contrast checks (#514) ([f98f8bd](https://github.com/dequelabs/axe-core/commit/f98f8bdacc551579c259aefd88bef41ed8157b68))
* fix(responsible): Restrict error construction to known errors (#513) ([0128a7e](https://github.com/dequelabs/axe-core/commit/0128a7ea47847b9fa04dbf98327f4bc1760c5e11))

### Features:

* docs: Document how to propose axe-core rules (#507) ([cabd329](https://github.com/dequelabs/axe-core/commit/cabd3297afbbfe9dbcc41a168b5529ba52f408ba))

<a name="3.0.0-alpha.3"></a>
## [3.0.0-alpha.3](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2017-09-06)

### Bug fixes:

* Additional ARIA 1.1. support and tests (#509) ([9b4d2ee](https://github.com/dequelabs/axe-core/commit/9b4d2eea4fcb2c48bab71e442da3a588b3893853))
* fix: RestoreScroll was running  out of sync (#508) ([ff3df2d](https://github.com/dequelabs/axe-core/commit/ff3df2d9b2c01c1ca0d12c1fcaf136528287fb6d))


<a name="3.0.0-alpha.2"></a>
## [3.0.0-alpha.2](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2017-09-01)

### Bug Fixes

* copy precommit hook as file, not a link ([16f2f76](https://github.com/dequelabs/axe-core/commit/16f2f76))
* expand tr support for color contrast ([5a77c2f](https://github.com/dequelabs/axe-core/commit/5a77c2f))
* Ignore shadowRoots on elements that don't allow them ([7f66ee8](https://github.com/dequelabs/axe-core/commit/7f66ee8))
* only run postinstall if .git exists ([1107783](https://github.com/dequelabs/axe-core/commit/1107783))
* try telling circle to skip .git/hooks ([674408f](https://github.com/dequelabs/axe-core/commit/674408f))
* Use frame query that supports shadow dom ([#492](https://github.com/dequelabs/axe-core/issues/492)) ([94008ff](https://github.com/dequelabs/axe-core/commit/94008ff))

### Features

* feat: Add sri-history file and update process ([25ddb47](https://github.com/dequelabs/axe-core/commit/25ddb47ec4eec565da330558ee061fd6e34a7c24))
* feat: add standard-version ([e1e067d](https://github.com/dequelabs/axe-core/commit/e1e067d8f4445042360b2bef957037d5cdd0b7db))


<a name="3.0.0-alpha.1"></a>
## [3.0.0-alpha.1](https://github.com/dequelabs/axe-core/compare/v2.3.1...v3.0.0-alpha.1) (2017-08-16)

### Bug Fixes

* add copyright banner back in to axe.js ([2aac29a](https://github.com/dequelabs/axe-core/commit/2aac29a))
* Adjust if formatting ([2211d78](https://github.com/dequelabs/axe-core/commit/2211d78))
* Align impact levels with Deque Way ([28f4477](https://github.com/dequelabs/axe-core/commit/28f4477))
* Allow <track> to have no kind attribute ([f996d0f](https://github.com/dequelabs/axe-core/commit/f996d0f))
* complete shadow support for color matches ([f0fe551](https://github.com/dequelabs/axe-core/commit/f0fe551))
* **aria:** Allow implicit attribute values ([b949749](https://github.com/dequelabs/axe-core/commit/b949749))
* Set relatedNodes on color/link-in-block rules ([#407](https://github.com/dequelabs/axe-core/issues/407)) ([7fde0fe](https://github.com/dequelabs/axe-core/commit/7fde0fe))
* **aria:** Treegrid should own rows, not treeitems ([645d1fa](https://github.com/dequelabs/axe-core/commit/645d1fa))
* Correct flattened tree algorithm to include the shadow host ([#405](https://github.com/dequelabs/axe-core/issues/405)) ([70985b0](https://github.com/dequelabs/axe-core/commit/70985b0))
* Ensure all tests pass in Chrome ([0b0240f](https://github.com/dequelabs/axe-core/commit/0b0240f))
* ensure document is fetched from correct node ([b28597c](https://github.com/dequelabs/axe-core/commit/b28597c))
* Exclude `any` checks from output if one passed ([#466](https://github.com/dequelabs/axe-core/issues/466)) ([2dd3d68](https://github.com/dequelabs/axe-core/commit/2dd3d68))
* get tests all passing ([#457](https://github.com/dequelabs/axe-core/issues/457)) ([4874327](https://github.com/dequelabs/axe-core/commit/4874327))
* get virtualNode with getNodeFromTree  ([9bf2870](https://github.com/dequelabs/axe-core/commit/9bf2870))
* getComposedParent should not return slot nodes ([#438](https://github.com/dequelabs/axe-core/issues/438)) ([0478cbd](https://github.com/dequelabs/axe-core/commit/0478cbd))
* Have table rules use shadow DOM ([453be1b](https://github.com/dequelabs/axe-core/commit/453be1b))
* help-same-as-label for shadow DOM ([dbbc544](https://github.com/dequelabs/axe-core/commit/dbbc544))
* incomplete results should have impact ([fcc51eb](https://github.com/dequelabs/axe-core/commit/fcc51eb))
* Let findUp work on shadow root children ([0252218](https://github.com/dequelabs/axe-core/commit/0252218))
* Let findUp work on shadow root children ([#447](https://github.com/dequelabs/axe-core/issues/447)) ([0f98481](https://github.com/dequelabs/axe-core/commit/0f98481))
* Minimise scrolling in getBackgroundColor ([f4551bb](https://github.com/dequelabs/axe-core/commit/f4551bb))
* Pass all tests that use accessibleText ([7ea8d6b](https://github.com/dequelabs/axe-core/commit/7ea8d6b))
* **checks/aria/required-children:** add exception for native input combobox missing textbox ([81ee2e4](https://github.com/dequelabs/axe-core/commit/81ee2e4))
* use virtualNode in duplicate-img-label ([82e51bc](https://github.com/dequelabs/axe-core/commit/82e51bc))
* **is-in-text-block:** Add Shadow DOM support ([a125f79](https://github.com/dequelabs/axe-core/commit/a125f79))
* pass virtualNode to Rule.run ([4534e86](https://github.com/dequelabs/axe-core/commit/4534e86))
* Properly output error stack ([56f1867](https://github.com/dequelabs/axe-core/commit/56f1867))
* Remove log statements ([6a6bd73](https://github.com/dequelabs/axe-core/commit/6a6bd73))
* Solve a few tests ([02daad1](https://github.com/dequelabs/axe-core/commit/02daad1))
* Use getAttribute(id) over .id ([#374](https://github.com/dequelabs/axe-core/issues/374)) ([353b53f](https://github.com/dequelabs/axe-core/commit/353b53f))
* Use testUtils in table tests ([364d5cd](https://github.com/dequelabs/axe-core/commit/364d5cd))
* use virtualNode in title-only check ([5fb06e3](https://github.com/dequelabs/axe-core/commit/5fb06e3))
* whitespace in hidden-content test ([99e8b73](https://github.com/dequelabs/axe-core/commit/99e8b73))


### Features

* Add aria-orientation to additional roles ([bb07c2d](https://github.com/dequelabs/axe-core/commit/bb07c2d))
* add check testUtils ([6f53279](https://github.com/dequelabs/axe-core/commit/6f53279))
* Add dom.getComposedParent function ([aac57c0](https://github.com/dequelabs/axe-core/commit/aac57c0))
* Add Japanese localisation ([5f8c9c8](https://github.com/dequelabs/axe-core/commit/5f8c9c8))
* Add new ARIA 1.1 values for haspopup ([9f7da56](https://github.com/dequelabs/axe-core/commit/9f7da56))
* Add option restoreScroll ([d55f3cd](https://github.com/dequelabs/axe-core/commit/d55f3cd))
* add S.C. 2.4.4 to link-name rule. Fixes [#369](https://github.com/dequelabs/axe-core/issues/369) ([70728e6](https://github.com/dequelabs/axe-core/commit/70728e6))
* add SD support to color-contrast-matches ([b595b42](https://github.com/dequelabs/axe-core/commit/b595b42))
* Add shadow DOM support to list checks ([#439](https://github.com/dequelabs/axe-core/issues/439)) ([d92c1a1](https://github.com/dequelabs/axe-core/commit/d92c1a1))
* Add shadow DOM to duplicate-img-label check ([#443](https://github.com/dequelabs/axe-core/issues/443)) ([2c0b075](https://github.com/dequelabs/axe-core/commit/2c0b075))
* Add shadow DOM to landmark check ([98f6023](https://github.com/dequelabs/axe-core/commit/98f6023))
* add shadow support to aria-required-children ([f729e25](https://github.com/dequelabs/axe-core/commit/f729e25))
* add shadow support to group-labelledby ([e2a9642](https://github.com/dequelabs/axe-core/commit/e2a9642))
* Add sri-history file and update process ([#476](https://github.com/dequelabs/axe-core/issues/476)) ([25ddb47](https://github.com/dequelabs/axe-core/commit/25ddb47))
* Allow hidden-content to work through shadow DOM bounds ([789d62e](https://github.com/dequelabs/axe-core/commit/789d62e))
* fieldset check shadow DOM ([da148d3](https://github.com/dequelabs/axe-core/commit/da148d3))
* Make explicit check consider shadow DOM ([#442](https://github.com/dequelabs/axe-core/issues/442)) ([9ddfc0f](https://github.com/dequelabs/axe-core/commit/9ddfc0f))
* Make region check work with shadow DOM ([ecd222f](https://github.com/dequelabs/axe-core/commit/ecd222f))
* Run text.accessibleText() on virtual elements ([#420](https://github.com/dequelabs/axe-core/issues/420)) ([414fcbe](https://github.com/dequelabs/axe-core/commit/414fcbe))
* ShadowDOM support for media checks ([0f21574](https://github.com/dequelabs/axe-core/commit/0f21574))
* **aria:** Support progressive ARIA 1.1 attributes / roles ([#468](https://github.com/dequelabs/axe-core/issues/468)) ([ebb2a5d](https://github.com/dequelabs/axe-core/commit/ebb2a5d))
* **aria-required-parent:** add Shadow DOM support ([6ed29f0](https://github.com/dequelabs/axe-core/commit/6ed29f0))
* **duplicate-id:** Add shadow DOM support ([439bc71](https://github.com/dequelabs/axe-core/commit/439bc71))
* **link-in-text-block:** Add shadow DOM support ([46a2cca](https://github.com/dequelabs/axe-core/commit/46a2cca))
* **shadow DOM:** Create commons virtual methods, for backward compatibility ([86a4c25](https://github.com/dequelabs/axe-core/commit/86a4c25))


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
