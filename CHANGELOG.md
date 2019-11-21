# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.4.0](https://github.com/dequelabs/axe-core/compare/v3.3.2...v3.4.0) (2019-10-18)

### Bug Fixes

- **aria-allowed-attr:** allow 'aria-readonly' on listbox ([#1825](https://github.com/dequelabs/axe-core/issues/1825)) ([15f5d2d](https://github.com/dequelabs/axe-core/commit/15f5d2d))
- **aria-form-field-name-matches:** don't test combobox elements when they have a child input ([#1742](https://github.com/dequelabs/axe-core/issues/1742)) ([f0be6dc](https://github.com/dequelabs/axe-core/commit/f0be6dc))
- **aria-required-children:** allow combobox to own a searchbox ([#1708](https://github.com/dequelabs/axe-core/issues/1708)) ([42158ac](https://github.com/dequelabs/axe-core/commit/42158ac))
- **aria-required-children:** allow reviewEmpty nodes to have empty children ([#1791](https://github.com/dequelabs/axe-core/issues/1791)) ([a5d727c](https://github.com/dequelabs/axe-core/commit/a5d727c))
- **aria-valid-attr-value:** fix incomplete translation message ([#1739](https://github.com/dequelabs/axe-core/issues/1739)) ([a0f3eef](https://github.com/dequelabs/axe-core/commit/a0f3eef))
- **color-contrast:** ignore nodes that don't contain text ([#1837](https://github.com/dequelabs/axe-core/issues/1837)) ([223a4bc](https://github.com/dequelabs/axe-core/commit/223a4bc))
- **color-contrast-matches:** don't check aria-disabled explicit label element ([#1741](https://github.com/dequelabs/axe-core/issues/1741)) ([5bb566f](https://github.com/dequelabs/axe-core/commit/5bb566f))
- **configure:** use translations for failure summaries ([#1808](https://github.com/dequelabs/axe-core/issues/1808)) ([5e53d7b](https://github.com/dequelabs/axe-core/commit/5e53d7b))
- **flatten-tree:** do not call deprecated getDistributedNodes ([#1729](https://github.com/dequelabs/axe-core/issues/1729)) ([46a5d11](https://github.com/dequelabs/axe-core/commit/46a5d11))
- **form-field-multiple-label:** incomplete rather than fail for multiple labels ([#1798](https://github.com/dequelabs/axe-core/issues/1798)) ([0bdaa2b](https://github.com/dequelabs/axe-core/commit/0bdaa2b))
- **get-background-color:** scroll element into view horizontally ([#1845](https://github.com/dequelabs/axe-core/issues/1845)) ([50df70a](https://github.com/dequelabs/axe-core/commit/50df70a))
- **get-selector:** don't throw error for disconnected fragment ([#1802](https://github.com/dequelabs/axe-core/issues/1802)) ([bb6591b](https://github.com/dequelabs/axe-core/commit/bb6591b))
- **label-content-name-mismatch:** ignore ligature fonts ([#1829](https://github.com/dequelabs/axe-core/issues/1829)) ([683e005](https://github.com/dequelabs/axe-core/commit/683e005))
- allows all roles on img tag with no alt attribute ([929085a](https://github.com/dequelabs/axe-core/commit/929085a))
- replace incorrect tag for meta-refresh rule ([#1844](https://github.com/dequelabs/axe-core/issues/1844)) ([754d56b](https://github.com/dequelabs/axe-core/commit/754d56b))
- update tags to wcag21aa for rule avoid-inline-spacing ([#1757](https://github.com/dequelabs/axe-core/issues/1757)) ([973d48f](https://github.com/dequelabs/axe-core/commit/973d48f))
- **label-content-name-mismatch:** ignore private space unicode ([#1822](https://github.com/dequelabs/axe-core/issues/1822)) ([b634c34](https://github.com/dequelabs/axe-core/commit/b634c34))
- **scrollable-region-focus:** ignore scrollable regions without content ([#1788](https://github.com/dequelabs/axe-core/issues/1788)) ([b36754e](https://github.com/dequelabs/axe-core/commit/b36754e))
- **utils:** Fix error in IE when getting scroll state on page with SVG elements. Closes [#525](https://github.com/dequelabs/axe-core/issues/525) ([#1820](https://github.com/dequelabs/axe-core/issues/1820)) ([9a32f6f](https://github.com/dequelabs/axe-core/commit/9a32f6f))

### Features

- **audit:** add lang query paramenter to help urls ([#1794](https://github.com/dequelabs/axe-core/issues/1794)) ([2d1c8a6](https://github.com/dequelabs/axe-core/commit/2d1c8a6))
- **configure:** accept ver property as axeVersion fallback ([#1812](https://github.com/dequelabs/axe-core/issues/1812)) ([4ebcde8](https://github.com/dequelabs/axe-core/commit/4ebcde8))
- **configure:** add axeVersion property that checks compatibility of axe.version ([#1793](https://github.com/dequelabs/axe-core/issues/1793)) ([18fb8c8](https://github.com/dequelabs/axe-core/commit/18fb8c8))
- **fieldset, group-labelledby:** deprecate fieldset and group-labelledby checks ([#1740](https://github.com/dequelabs/axe-core/issues/1740)) ([ec9b762](https://github.com/dequelabs/axe-core/commit/ec9b762))
- **i18n:** add spanish translation ([#1758](https://github.com/dequelabs/axe-core/issues/1758)) ([e9f821d](https://github.com/dequelabs/axe-core/commit/e9f821d)), closes [#1757](https://github.com/dequelabs/axe-core/issues/1757)
- Add axe.utils.assert method ([2f10d24](https://github.com/dequelabs/axe-core/commit/2f10d24))
- **is-visible:** add support for clip-path techniques ([#1706](https://github.com/dequelabs/axe-core/issues/1706)) ([8ab262a](https://github.com/dequelabs/axe-core/commit/8ab262a))
- **radiogroup, checkboxgroup:** deprecate radiogroup and checkboxgroup rules ([#1640](https://github.com/dequelabs/axe-core/issues/1640)) ([6d30880](https://github.com/dequelabs/axe-core/commit/6d30880))
- Add SerialVirtualNode class ([82d01b0](https://github.com/dequelabs/axe-core/commit/82d01b0))
- pt_BR localization ([#1756](https://github.com/dequelabs/axe-core/issues/1756)) ([330e2ec](https://github.com/dequelabs/axe-core/commit/330e2ec))
- **rule:** aria-roledescription ([#1745](https://github.com/dequelabs/axe-core/issues/1745)) ([16682fd](https://github.com/dequelabs/axe-core/commit/16682fd))
- **runVirtualNode:** Allow serialised nodes [experimental](<[512d51b](https://github.com/dequelabs/axe-core/commit/512d51b)>)
- **video-description:** deprecate video-description rule ([#1737](https://github.com/dequelabs/axe-core/issues/1737)) ([e91c25f](https://github.com/dequelabs/axe-core/commit/e91c25f))

### [3.3.2](https://github.com/dequelabs/axe-core/compare/v3.3.1...v3.3.2) (2019-08-12)

### Bug Fixes

- **aria-form-field-name-matches:** don't test combobox elements when they have a child input ([#1742](https://github.com/dequelabs/axe-core/issues/1742)) ([5ac278f](https://github.com/dequelabs/axe-core/commit/5ac278f))
- **aria-valid-attr-value:** fix incomplete translation message ([#1739](https://github.com/dequelabs/axe-core/issues/1739)) ([6909604](https://github.com/dequelabs/axe-core/commit/6909604))
- **flatten-tree:** do not call deprecated getDistributedNodes ([#1729](https://github.com/dequelabs/axe-core/issues/1729)) ([48ddf9d](https://github.com/dequelabs/axe-core/commit/48ddf9d))
- update tags to wcag21aa for rule avoid-inline-spacing ([#1757](https://github.com/dequelabs/axe-core/issues/1757)) ([f534a6b](https://github.com/dequelabs/axe-core/commit/f534a6b))

## [3.3.1](https://github.com/dequelabs/axe-core/compare/v3.3.0...v3.3.1) (2019-07-23)

### Bug Fixes

- **accessible-text-virtual:** sanitize attributes on start node ([#1694](https://github.com/dequelabs/axe-core/issues/1694)) ([c0bb08c](https://github.com/dequelabs/axe-core/commit/c0bb08c))
- **axe.d.ts:** add optional xpath property to NodeResult ([#1642](https://github.com/dequelabs/axe-core/issues/1642)) ([287ef9c](https://github.com/dequelabs/axe-core/commit/287ef9c))
- **get-background-color:** No longer calculate color from non-opaque overlapping element ([#1644](https://github.com/dequelabs/axe-core/issues/1644)) ([d45f81e](https://github.com/dequelabs/axe-core/commit/d45f81e))
- **get-background-color:** No longer calculate color from non-opaque overlapping elm ([f1c2310](https://github.com/dequelabs/axe-core/commit/f1c2310))
- **get-background-color:** process tbody, thead, and tfoot when getting background color ([#1653](https://github.com/dequelabs/axe-core/issues/1653)) ([e114bfd](https://github.com/dequelabs/axe-core/commit/e114bfd))
- enable running axe-core in strict CSPs ([#1707](https://github.com/dequelabs/axe-core/issues/1707)) ([cc5bd59](https://github.com/dequelabs/axe-core/commit/cc5bd59))
- **image-redundant-alt:** check for parent before calculating text ([#1705](https://github.com/dequelabs/axe-core/issues/1705)) ([1adbd02](https://github.com/dequelabs/axe-core/commit/1adbd02))
- **th-has-data-cells:** empty cells will now pass ([#1659](https://github.com/dequelabs/axe-core/issues/1659)) ([c7489ab](https://github.com/dequelabs/axe-core/commit/c7489ab))
- **types:** add new properties to RunOptions ([#1697](https://github.com/dequelabs/axe-core/issues/1697)) ([02aa36c](https://github.com/dequelabs/axe-core/commit/02aa36c)), closes [#1696](https://github.com/dequelabs/axe-core/issues/1696)
- **valid-attr-value:** allow aria-describedby to return needs review ([#1671](https://github.com/dequelabs/axe-core/issues/1671)) ([2390925](https://github.com/dequelabs/axe-core/commit/2390925))
- **color-contrast:** add px unit to error messages ([#1634](https://github.com/dequelabs/axe-core/issues/1634)) ([1712e46](https://github.com/dequelabs/axe-core/commit/1712e46))

### Tests

- **examples:** do not fail tests if deque.com has violations ([#1686](https://github.com/dequelabs/axe-core/issues/1686)) ([2118360](https://github.com/dequelabs/axe-core/commit/2118360))
- ensure locale files are valid ([#1673](https://github.com/dequelabs/axe-core/issues/1673)) ([588f9b5](https://github.com/dequelabs/axe-core/commit/588f9b5))
- require new release rule help docs to be active before creating release ([#1700](https://github.com/dequelabs/axe-core/issues/1700)) ([e9f9c18](https://github.com/dequelabs/axe-core/commit/e9f9c18))

## [3.3.0](https://github.com/dequelabs/axe-core/compare/v3.2.2...v3.3.0) (2019-07-08)

### Bug Fixes

- add SC 131 to rule aria hidden focus ([#1474](https://github.com/dequelabs/axe-core/issues/1474)) ([8da9a0d](https://github.com/dequelabs/axe-core/commit/8da9a0d))
- Add treegrid as allowed parent to rowgroup ([#1435](https://github.com/dequelabs/axe-core/issues/1435)) ([94e9893](https://github.com/dequelabs/axe-core/commit/94e9893)), closes [#1386](https://github.com/dequelabs/axe-core/issues/1386)
- arguments for gather function in build template ([#1605](https://github.com/dequelabs/axe-core/issues/1605)) ([753ecf4](https://github.com/dequelabs/axe-core/commit/753ecf4))
- check if property exists in cache of flattenedTree ([#1536](https://github.com/dequelabs/axe-core/issues/1536)) ([51c2e19](https://github.com/dequelabs/axe-core/commit/51c2e19))
- **aria-valid-attr-value:** allow aria-owns to pass when element is not in the DOM ([#1526](https://github.com/dequelabs/axe-core/issues/1526)) ([f835ed8](https://github.com/dequelabs/axe-core/commit/f835ed8))
- deprecate na reporter ([#1625](https://github.com/dequelabs/axe-core/issues/1625)) ([3e807f0](https://github.com/dequelabs/axe-core/commit/3e807f0))
- Exclude iframe for html-has-lang rule (Issue 1424) ([#1430](https://github.com/dequelabs/axe-core/issues/1430)) ([98b5ed2](https://github.com/dequelabs/axe-core/commit/98b5ed2))
- Include body as part of background color checks when element does not intersect ([#1520](https://github.com/dequelabs/axe-core/issues/1520)) ([55820cf](https://github.com/dequelabs/axe-core/commit/55820cf))
- make nullable impact properties have nullable types to match API docs ([#1477](https://github.com/dequelabs/axe-core/issues/1477)) ([efaed91](https://github.com/dequelabs/axe-core/commit/efaed91))
- Only load Promise polyfill if window.Promise is missing [[#1468](https://github.com/dequelabs/axe-core/issues/1468)](<[#1470](https://github.com/dequelabs/axe-core/issues/1470)>) ([1d70306](https://github.com/dequelabs/axe-core/commit/1d70306))
- Prevent error when using `<select name="attributes">` [[#1397](https://github.com/dequelabs/axe-core/issues/1397)](<[#1432](https://github.com/dequelabs/axe-core/issues/1432)>) ([b477e0d](https://github.com/dequelabs/axe-core/commit/b477e0d))
- remove unnecessary comments ([6ed71c9](https://github.com/dequelabs/axe-core/commit/6ed71c9))
- role=radio should not require aria-checked ([#1448](https://github.com/dequelabs/axe-core/issues/1448)) ([0643cbd](https://github.com/dequelabs/axe-core/commit/0643cbd))
- Scroll state had top and left properties flipped ([#1469](https://github.com/dequelabs/axe-core/issues/1469)) ([2ba83d3](https://github.com/dequelabs/axe-core/commit/2ba83d3))
- **skip-link,region:** Allow multiple skiplinks at page top ([#1496](https://github.com/dequelabs/axe-core/issues/1496)) ([642c8f1](https://github.com/dequelabs/axe-core/commit/642c8f1))
- use execa instead of child_process.spawn ([461ce83](https://github.com/dequelabs/axe-core/commit/461ce83))
- **aria-allowed-attr:** allow figure role ([#1558](https://github.com/dequelabs/axe-core/issues/1558)) ([a4b5240](https://github.com/dequelabs/axe-core/commit/a4b5240))
- **aria-required-attr:** allow aria-valuenow to pass on elements with value ([#1579](https://github.com/dequelabs/axe-core/issues/1579)) ([3893e04](https://github.com/dequelabs/axe-core/commit/3893e04))
- **aria-required-attr:** don't require aria-valuemin/max ([#1529](https://github.com/dequelabs/axe-core/issues/1529)) ([80ae444](https://github.com/dequelabs/axe-core/commit/80ae444))
- **aria-valid-attr-value:** allow aria-controls to pass when element is not in the DOM ([a7842e5](https://github.com/dequelabs/axe-core/commit/a7842e5))
- **flatten-tree:** do not call deprecated getDistributedNodes ([#1577](https://github.com/dequelabs/axe-core/issues/1577)) ([93d59f4](https://github.com/dequelabs/axe-core/commit/93d59f4))
- **image-redundant-alt:** prevent redundant issues of image tree ([#1616](https://github.com/dequelabs/axe-core/issues/1616)) ([af81897](https://github.com/dequelabs/axe-core/commit/af81897))
- **isSkipLink:** cache first page link ([#1525](https://github.com/dequelabs/axe-core/issues/1525)) ([6a1bcba](https://github.com/dequelabs/axe-core/commit/6a1bcba))
- **matches-selector:** don't call matches function if none exist on the element ([#1613](https://github.com/dequelabs/axe-core/issues/1613)) ([7581592](https://github.com/dequelabs/axe-core/commit/7581592))
- **multiple-label:** considers explicit labels in the same shadow tree ([#1584](https://github.com/dequelabs/axe-core/issues/1584)) ([b9a324a](https://github.com/dequelabs/axe-core/commit/b9a324a))
- **multiple-label:** no longer raises issue when aria-labelledby overrides how AT views multiple labels ([#1538](https://github.com/dequelabs/axe-core/issues/1538)) ([fbae36b](https://github.com/dequelabs/axe-core/commit/fbae36b))
- **prettier:** ignore generated api doc files ([#1522](https://github.com/dequelabs/axe-core/issues/1522)) ([c118da0](https://github.com/dequelabs/axe-core/commit/c118da0))
- **raw-reporter:** do not output `DqElement`s ([#1513](https://github.com/dequelabs/axe-core/issues/1513)) ([3babcb6](https://github.com/dequelabs/axe-core/commit/3babcb6))
- **scrollable-region-focusable:** exclude overflow:hidden as not scrollable ([#1599](https://github.com/dequelabs/axe-core/issues/1599)) ([940de07](https://github.com/dequelabs/axe-core/commit/940de07))
- **utils:** make cache global instead of only setup in axe.run ([#1535](https://github.com/dequelabs/axe-core/issues/1535)) ([91a04c5](https://github.com/dequelabs/axe-core/commit/91a04c5))
- **virtual-node:** fix hasClass to work with svg elements ([#1603](https://github.com/dequelabs/axe-core/issues/1603)) ([9d83662](https://github.com/dequelabs/axe-core/commit/9d83662))

### Features

- **autocomplete-matches:** use virtualNode only lookups ([#1604](https://github.com/dequelabs/axe-core/issues/1604)) ([b32d4fe](https://github.com/dequelabs/axe-core/commit/b32d4fe))
- **autocomplete-valid:** allow autocomplete-valid to be run entirely off of a virtual node ([#1591](https://github.com/dequelabs/axe-core/issues/1591)) ([b3e0873](https://github.com/dequelabs/axe-core/commit/b3e0873))
- **qsa, flatten-tree:** abstract Node and Element apis in virtual tree ([#1562](https://github.com/dequelabs/axe-core/issues/1562)) ([2f2e590](https://github.com/dequelabs/axe-core/commit/2f2e590))
- **reporter:** adds the rawEnv reporter which wraps raw and env data ([#1556](https://github.com/dequelabs/axe-core/issues/1556)) ([ed15ed3](https://github.com/dequelabs/axe-core/commit/ed15ed3))
- **role-img-alt:** Split rule for role=img with no accessible name ([#1586](https://github.com/dequelabs/axe-core/issues/1586)) ([2416ed3](https://github.com/dequelabs/axe-core/commit/2416ed3))
- **rule:** add additional elements to check for incomplete with required children ([#1547](https://github.com/dequelabs/axe-core/issues/1547)) ([3726901](https://github.com/dequelabs/axe-core/commit/3726901))
- **rule:** add more perf timing metrics to rules ([#1472](https://github.com/dequelabs/axe-core/issues/1472)) ([98646e5](https://github.com/dequelabs/axe-core/commit/98646e5))
- **rule,check:** add new apis to run a rule synchronously ([#1467](https://github.com/dequelabs/axe-core/issues/1467)) ([84094a1](https://github.com/dequelabs/axe-core/commit/84094a1))
- add AbstractVirtualNode for linting ([#1627](https://github.com/dequelabs/axe-core/issues/1627)) ([a072ed2](https://github.com/dequelabs/axe-core/commit/a072ed2))
- **rule:** Adding landmark-is-unique rule ([#1394](https://github.com/dequelabs/axe-core/issues/1394)) ([0088e94](https://github.com/dequelabs/axe-core/commit/0088e94))
- **rule:** Inline text spacing must be adjustable with custom stylesheets ([#1446](https://github.com/dequelabs/axe-core/issues/1446)) ([430b07f](https://github.com/dequelabs/axe-core/commit/430b07f))
- Improve perf of axe.run [WWD-1821](<[#1503](https://github.com/dequelabs/axe-core/issues/1503)>) ([a84431a](https://github.com/dequelabs/axe-core/commit/a84431a))
- **rule:** New aria-input-field-label rule ([#1610](https://github.com/dequelabs/axe-core/issues/1610)) ([73d5273](https://github.com/dequelabs/axe-core/commit/73d5273))
- **rule:** New aria-toggle-field-label rule ([#1450](https://github.com/dequelabs/axe-core/issues/1450)) ([69a9c3b](https://github.com/dequelabs/axe-core/commit/69a9c3b))
- **rule:** Scrollable region focusable ([#1396](https://github.com/dequelabs/axe-core/issues/1396)) ([861371a](https://github.com/dequelabs/axe-core/commit/861371a))
- **rules:** split button name rule into button only and button input rules ([#1615](https://github.com/dequelabs/axe-core/issues/1615)) ([ce20fbf](https://github.com/dequelabs/axe-core/commit/ce20fbf))
- **run-virtual-rule:** new api to run rules using only virtual nodes ([#1594](https://github.com/dequelabs/axe-core/issues/1594)) ([4e12217](https://github.com/dequelabs/axe-core/commit/4e12217))
- **utils:** add support for complex CSS selectors ([#1494](https://github.com/dequelabs/axe-core/issues/1494)) ([a9f9ee5](https://github.com/dequelabs/axe-core/commit/a9f9ee5)), closes [#1493](https://github.com/dequelabs/axe-core/issues/1493)
- **utils:** Update CSSOM for nested [@import](https://github.com/import) computation ([#1339](https://github.com/dequelabs/axe-core/issues/1339)) ([a4e177b](https://github.com/dequelabs/axe-core/commit/a4e177b))

### Tests

- createHTMLDocument needs mandatory title when invoked in IE ([#1442](https://github.com/dequelabs/axe-core/issues/1442)) ([8542773](https://github.com/dequelabs/axe-core/commit/8542773))
- disable es6 syntax usage within tests directory ([#1569](https://github.com/dequelabs/axe-core/issues/1569)) ([9b13508](https://github.com/dequelabs/axe-core/commit/9b13508))
- fix flakey test ([#1573](https://github.com/dequelabs/axe-core/issues/1573)) ([fb38ce7](https://github.com/dequelabs/axe-core/commit/fb38ce7))
- Fix invalid test html ([#1502](https://github.com/dequelabs/axe-core/issues/1502)) ([8d85082](https://github.com/dequelabs/axe-core/commit/8d85082))
- fix test for Safari ([#1557](https://github.com/dequelabs/axe-core/issues/1557)) ([1bac69e](https://github.com/dequelabs/axe-core/commit/1bac69e))
- fix tests failing in IE11 ([#1570](https://github.com/dequelabs/axe-core/issues/1570)) ([2102eca](https://github.com/dequelabs/axe-core/commit/2102eca))
- only run IE11 tests in appveyor ([#1571](https://github.com/dequelabs/axe-core/issues/1571)) ([35261ef](https://github.com/dequelabs/axe-core/commit/35261ef))
- watch integration html and json files ([#1598](https://github.com/dequelabs/axe-core/issues/1598)) ([3de0b05](https://github.com/dequelabs/axe-core/commit/3de0b05))

## [3.2.2](https://github.com/dequelabs/axe-core/compare/v3.2.0...v3.2.2) (2019-03-07)

### Bug Fixes

- Avoid "screen is not defined" error [[#1404](https://github.com/dequelabs/axe-core/issues/1404)](<[#1415](https://github.com/dequelabs/axe-core/issues/1415)>) ([c9653a5](https://github.com/dequelabs/axe-core/commit/c9653a5))

## [3.2.1](https://github.com/dequelabs/axe-core/compare/v3.2.0...v3.2.1) (2019-03-06)

### Bug Fixes

- Avoid require conflict with Cypress [[#1405](https://github.com/dequelabs/axe-core/issues/1405)](<[#1406](https://github.com/dequelabs/axe-core/issues/1406)>) ([30aa570](https://github.com/dequelabs/axe-core/commit/30aa570))

# [3.2.0](https://github.com/dequelabs/axe-core/compare/v3.0.3...v3.2.0) (2019-03-04)

### Bug Fixes

- **aria-allowed-role:** Allow iframe role=none ([a4fa44d](https://github.com/dequelabs/axe-core/commit/a4fa44d))
- **color-contrast:** Prevent crash on large inline elments [#1306](https://github.com/dequelabs/axe-core/issues/1306) ([#1341](https://github.com/dequelabs/axe-core/issues/1341)) ([e1bcafc](https://github.com/dequelabs/axe-core/commit/e1bcafc))
- **commons:** Allow any node in aria.getRole ([#1258](https://github.com/dequelabs/axe-core/issues/1258)) ([26fa49a](https://github.com/dequelabs/axe-core/commit/26fa49a)), closes [#1163](https://github.com/dequelabs/axe-core/issues/1163)
- **i18n:** Fix and add Japanese translation ([#1368](https://github.com/dequelabs/axe-core/issues/1368)) ([74fa0a4](https://github.com/dequelabs/axe-core/commit/74fa0a4), [#1291](https://github.com/dequelabs/axe-core/issues/1291)) ([f450176](https://github.com/dequelabs/axe-core/commit/f450176), [#1332](https://github.com/dequelabs/axe-core/issues/1332)) ([0a03c8f](https://github.com/dequelabs/axe-core/commit/0a03c8f), [#1107](https://github.com/dequelabs/axe-core/issues/1107)) ([8138e55](https://github.com/dequelabs/axe-core/commit/8138e55))
- **messages:** Change messages from "page" to "document" where appropriate ([#1156](https://github.com/dequelabs/axe-core/issues/1156)) ([49dff2b](https://github.com/dequelabs/axe-core/commit/49dff2b)), closes [#983](https://github.com/dequelabs/axe-core/issues/983) [#983](https://github.com/dequelabs/axe-core/issues/983)
- **rule:** Frame-title applies to wcag242 ([#1312](https://github.com/dequelabs/axe-core/issues/1312)) ([9225ae0](https://github.com/dequelabs/axe-core/commit/9225ae0))
- **rule:** Prevent th-has-data-cells from crashing on empty rows ([#1285](https://github.com/dequelabs/axe-core/issues/1285)) ([88017be](https://github.com/dequelabs/axe-core/commit/88017be))
- **typedefs:** Do not require brand and application ([#1264](https://github.com/dequelabs/axe-core/issues/1264)) ([59465dc](https://github.com/dequelabs/axe-core/commit/59465dc)), closes [/github.com/dequelabs/axe-webdriverjs/blob/v2.0.1/lib/axe-injector.js#L28](https://github.com//github.com/dequelabs/axe-webdriverjs/blob/v2.0.1/lib/axe-injector.js/issues/L28)
- Add Banner comment in generated axe files ([#1112](https://github.com/dequelabs/axe-core/issues/1112)) ([e4788bf](https://github.com/dequelabs/axe-core/commit/e4788bf))
- Allow div groups for dlitem rule ([#1284](https://github.com/dequelabs/axe-core/issues/1284)) ([d76cd36](https://github.com/dequelabs/axe-core/commit/d76cd36))
- Allow role presentation and none on object-alt rule ([#1224](https://github.com/dequelabs/axe-core/issues/1224)) ([d475a17](https://github.com/dequelabs/axe-core/commit/d475a17))
- Avoid IE problems by using nodeName instead of tagName ([#1219](https://github.com/dequelabs/axe-core/issues/1219)) ([cf86ff5](https://github.com/dequelabs/axe-core/commit/cf86ff5))
- Better unsupported attribute support for aria-roledescription ([#1382](https://github.com/dequelabs/axe-core/issues/1382)) ([93f721e](https://github.com/dequelabs/axe-core/commit/93f721e)), closes [#1216](https://github.com/dequelabs/axe-core/issues/1216)
- Consider element's accessible names when labels are hidden ([#1187](https://github.com/dequelabs/axe-core/issues/1187)) ([b91b624](https://github.com/dequelabs/axe-core/commit/b91b624)), closes [#1176](https://github.com/dequelabs/axe-core/issues/1176)
- Correct autocomplete appropriate to handle state terms ([#1121](https://github.com/dequelabs/axe-core/issues/1121)) ([35a4d11](https://github.com/dequelabs/axe-core/commit/35a4d11))
- Correct autocomplete street address ([#1217](https://github.com/dequelabs/axe-core/issues/1217)) ([27fce9d](https://github.com/dequelabs/axe-core/commit/27fce9d))
- Correct autocomplete-appropriate node type resolution ([#1318](https://github.com/dequelabs/axe-core/issues/1318)) ([2fc3eeb](https://github.com/dequelabs/axe-core/commit/2fc3eeb))
- CSSOM generation for shadowRoot in Safari ([#1113](https://github.com/dequelabs/axe-core/issues/1113)) ([a51ae03](https://github.com/dequelabs/axe-core/commit/a51ae03))
- Don't flag invalid roles in unsupportedrole ([#1328](https://github.com/dequelabs/axe-core/issues/1328)) ([2dfcbaa](https://github.com/dequelabs/axe-core/commit/2dfcbaa))
- Escape href attribute when generating a CSS selector [[#1137](https://github.com/dequelabs/axe-core/issues/1137)](<[#1366](https://github.com/dequelabs/axe-core/issues/1366)>) ([0c2f42d](https://github.com/dequelabs/axe-core/commit/0c2f42d))
- Flag hidden elms with disallowed role(s) for review ([#1225](https://github.com/dequelabs/axe-core/issues/1225)) ([bdff141](https://github.com/dequelabs/axe-core/commit/bdff141))
- Handle noscript and template in dom.isVisible ([#1257](https://github.com/dequelabs/axe-core/issues/1257)) ([e67fc65](https://github.com/dequelabs/axe-core/commit/e67fc65))
- html-lang-valid should consider xml:lang ([#1152](https://github.com/dequelabs/axe-core/issues/1152)) ([4279c72](https://github.com/dequelabs/axe-core/commit/4279c72))
- Ignore invalid and allow redundant role in aria-allowed-role ([#1118](https://github.com/dequelabs/axe-core/issues/1118)) ([a0f9b31](https://github.com/dequelabs/axe-core/commit/a0f9b31))
- Introduce dom.isHiddenWithCSS for use in dom.isFocusable ([#1211](https://github.com/dequelabs/axe-core/issues/1211)) ([2cff417](https://github.com/dequelabs/axe-core/commit/2cff417))
- Log instead of error on unknown tag ([#1290](https://github.com/dequelabs/axe-core/issues/1290)) ([f82d773](https://github.com/dequelabs/axe-core/commit/f82d773))
- Prevent TypeErrors in color-contrast checks ([#1320](https://github.com/dequelabs/axe-core/issues/1320)) ([a34165c](https://github.com/dequelabs/axe-core/commit/a34165c)), closes [#1306](https://github.com/dequelabs/axe-core/issues/1306) [#1259](https://github.com/dequelabs/axe-core/issues/1259)
- Respect preload set to false ([#1298](https://github.com/dequelabs/axe-core/issues/1298)) ([e847d38](https://github.com/dequelabs/axe-core/commit/e847d38))
- Set preload:true as default ([#1281](https://github.com/dequelabs/axe-core/issues/1281)) ([c9731c8](https://github.com/dequelabs/axe-core/commit/c9731c8))
- Support skiplinks starting with "/#" ([#1286](https://github.com/dequelabs/axe-core/issues/1286)) ([f93c0c9](https://github.com/dequelabs/axe-core/commit/f93c0c9))
- Update SC to wcag134 for CSS Orientation Rule ([d3f90df](https://github.com/dequelabs/axe-core/commit/d3f90df))

### Features

- **commons:** Add matches methods ([#1270](https://github.com/dequelabs/axe-core/issues/1270)) ([986c97a](https://github.com/dequelabs/axe-core/commit/986c97a)), closes [#1163](https://github.com/dequelabs/axe-core/issues/1163)
- **image-alt:** require alt text or empty strings ([#1260](https://github.com/dequelabs/axe-core/issues/1260)) ([e24cea9](https://github.com/dequelabs/axe-core/commit/e24cea9))
- **new-rule:** New aria-hidden-focus rule ([#1166](https://github.com/dequelabs/axe-core/issues/1166)) ([4489965](https://github.com/dequelabs/axe-core/commit/4489965))
- **new-rule:** Separate form-field-multiple-label from label rule ([#1226](https://github.com/dequelabs/axe-core/issues/1226)) ([0e0063c](https://github.com/dequelabs/axe-core/commit/0e0063c))
- **new-rule:** Label and Name from Content mismatch WCAG21 (Issue [#1149](https://github.com/dequelabs/axe-core/issues/1149)) ([#1335](https://github.com/dequelabs/axe-core/issues/1335)) ([a4255da](https://github.com/dequelabs/axe-core/commit/a4255da))
- **rule:** Require unique aria labels in checkboxgroup & radiogroup ([#1316](https://github.com/dequelabs/axe-core/issues/1316)) ([c9b310d](https://github.com/dequelabs/axe-core/commit/c9b310d))
- Add a reference to the `node` a rule failed on ([#1321](https://github.com/dequelabs/axe-core/issues/1321)) ([68741de](https://github.com/dequelabs/axe-core/commit/68741de)), closes [#1317](https://github.com/dequelabs/axe-core/issues/1317)
- Add allowEmpty option for aria-valid-attr-value ([#1154](https://github.com/dequelabs/axe-core/issues/1154)) ([89d18d0](https://github.com/dequelabs/axe-core/commit/89d18d0)), closes [#994](https://github.com/dequelabs/axe-core/issues/994)
- Add environment details to results ([#1353](https://github.com/dequelabs/axe-core/issues/1353)) ([e795f7d](https://github.com/dequelabs/axe-core/commit/e795f7d))
- ARIA supported checks ([#1254](https://github.com/dequelabs/axe-core/issues/1254)) ([51a18a8](https://github.com/dequelabs/axe-core/commit/51a18a8)), closes [#918](https://github.com/dequelabs/axe-core/issues/918)
- New rule landmark-complementary-is-top-level ([#1239](https://github.com/dequelabs/axe-core/issues/1239)) ([328ca2c](https://github.com/dequelabs/axe-core/commit/328ca2c))
- Pass context argument to rule matches ([#1370](https://github.com/dequelabs/axe-core/issues/1370)) ([b374669](https://github.com/dequelabs/axe-core/commit/b374669))
- Rebuild the accessible text algorithm ([#1163](https://github.com/dequelabs/axe-core/issues/1163)) ([5f420e5](https://github.com/dequelabs/axe-core/commit/5f420e5))
- Tag review-items rule as 'best-practice' ([#1344](https://github.com/dequelabs/axe-core/issues/1344)) ([05f37de](https://github.com/dequelabs/axe-core/commit/05f37de))

### Performance Improvements

- Defer rules rather than checks ([#1308](https://github.com/dequelabs/axe-core/issues/1308)) ([80c1c74](https://github.com/dequelabs/axe-core/commit/80c1c74)), closes [#1172](https://github.com/dequelabs/axe-core/issues/1172)
- Speed up getNodeFromTree ([#1302](https://github.com/dequelabs/axe-core/issues/1302)) ([5f834ed](https://github.com/dequelabs/axe-core/commit/5f834ed))
- Update performanceTimer end mark for rules ([#1303](https://github.com/dequelabs/axe-core/issues/1303)) ([a28674e](https://github.com/dequelabs/axe-core/commit/a28674e)), closes [#701](https://github.com/dequelabs/axe-core/issues/701) [#1172](https://github.com/dequelabs/axe-core/issues/1172)

### Deprecate

- Deprecate axe.commons.utils namespace ([#1330](https://github.com/dequelabs/axe-core/issues/1330)) ([df93272](https://github.com/dequelabs/axe-core/commit/df93272))

<a name="3.1.2"></a>

## [3.1.2](https://github.com/dequelabs/axe-core/compare/v3.0.3...v3.1.2) (2018-09-07)

### Bug Fixes

- **i18n:** Update Japanese locale ([#1107](https://github.com/dequelabs/axe-core/issues/1107)) ([8138e55](https://github.com/dequelabs/axe-core/commit/8138e55))
- autocomplete appropriate to handle state terms ([#1121](https://github.com/dequelabs/axe-core/issues/1121)) ([35a4d11](https://github.com/dequelabs/axe-core/commit/35a4d11))
- banner comment in generated axe files ([#1112](https://github.com/dequelabs/axe-core/issues/1112)) ([e4788bf](https://github.com/dequelabs/axe-core/commit/e4788bf))
- ignore invalid and allow redundant role in aria-allowed-role ([#1118](https://github.com/dequelabs/axe-core/issues/1118)) ([a0f9b31](https://github.com/dequelabs/axe-core/commit/a0f9b31))

<a name="3.1.1"></a>

## [3.1.1](https://github.com/dequelabs/axe-core/compare/v3.0.3...v3.1.1) (2018-08-28)

### Bug Fixes

- Fix broken 3.1.0 release script ([c3b2a52](https://github.com/dequelabs/axe-core/commit/c3b2a52))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/dequelabs/axe-core/compare/v3.0.3...v3.1.0) (2018-08-28)

### Bug Fixes

- **rule fix:** Allow fallback labels when input has id ([#951](https://github.com/dequelabs/axe-core/issues/951)) ([54fa569](https://github.com/dequelabs/axe-core/commit/54fa569))
- **rule fix:** Updating aria 1.1 allowed attributes ([#964](https://github.com/dequelabs/axe-core/issues/964)) ([c3249c1](https://github.com/dequelabs/axe-core/commit/c3249c1))
- **rule fix:** Allow aria-errormessage with fallback ([17608b6](https://github.com/dequelabs/axe-core/commit/17608b6))
- **rule fix:** Ignore abstracts in determining element roles ([1af6088](https://github.com/dequelabs/axe-core/commit/1af6088))
- **rule fix:** Add combobox and radio required properties ([e80af7a](https://github.com/dequelabs/axe-core/commit/e80af7a))
- **rule fix:** Allow all ARIA idref(s) to be empty ([1498696](https://github.com/dequelabs/axe-core/commit/1498696))
- **rule fix:** Allow divs as groups in dl ([#1076](https://github.com/dequelabs/axe-core/issues/1076)) ([f4f6df6](https://github.com/dequelabs/axe-core/commit/f4f6df6)), closes [#262](https://github.com/dequelabs/axe-core/issues/262)
- **rule fix:** Allow live-region and dialog in `region` rule ([#1073](https://github.com/dequelabs/axe-core/issues/1073)) ([fb6438b](https://github.com/dequelabs/axe-core/commit/fb6438b))
- **rule fix:** Allow only-dlitem / only-listitem to have any hidden content ([#1098](https://github.com/dequelabs/axe-core/issues/1098)) ([6034aae](https://github.com/dequelabs/axe-core/commit/6034aae)), closes [#1021](https://github.com/dequelabs/axe-core/issues/1021)
- **rule fix:** Do not flag font icons in color-contrast rule ([#1095](https://github.com/dequelabs/axe-core/issues/1095)) ([b6ac084](https://github.com/dequelabs/axe-core/commit/b6ac084)), closes [#1068](https://github.com/dequelabs/axe-core/issues/1068)
- **rule fix:** Do not require media captions / descriptions ([#1075](https://github.com/dequelabs/axe-core/issues/1075)) ([289f623](https://github.com/dequelabs/axe-core/commit/289f623)), closes [#816](https://github.com/dequelabs/axe-core/issues/816)
- **rule fix:** improve messaging for hidden labels ([ae07b8e](https://github.com/dequelabs/axe-core/commit/ae07b8e))
- **rule fix:** Ignore abstracts in determining element roles ([e3b1e1d](https://github.com/dequelabs/axe-core/commit/e3b1e1d))
- **rule fix:** Correctly handle role attribute on lists and listitems. ([#949](https://github.com/dequelabs/axe-core/issues/949)) ([3a8729b](https://github.com/dequelabs/axe-core/commit/3a8729b))
- **core:** allow returning a Promise in jsdom from axe.run ([#943](https://github.com/dequelabs/axe-core/issues/943)) ([3858a1f](https://github.com/dequelabs/axe-core/commit/3858a1f))
- **typescript:** Correct `Check.evaluate` and `Check.after` type definitions ([#976](https://github.com/dequelabs/axe-core/issues/976)) ([db3ed40](https://github.com/dequelabs/axe-core/commit/db3ed40)), closes [#974](https://github.com/dequelabs/axe-core/issues/974)
- **typescript:** Typescript interface updates ([#973](https://github.com/dequelabs/axe-core/issues/973)) ([f8c9905](https://github.com/dequelabs/axe-core/commit/f8c9905)), closes [#972](https://github.com/dequelabs/axe-core/issues/972)
- **messages:** Clearer fail message for aria-labelledby ([956281b](https://github.com/dequelabs/axe-core/commit/956281b))
- **messages:** Consistent landmark rule/check descriptions ([#1003](https://github.com/dequelabs/axe-core/issues/1003)) ([d792970](https://github.com/dequelabs/axe-core/commit/d792970))
- **messages:** Show attribute in message ([#1061](https://github.com/dequelabs/axe-core/issues/1061)) ([9ff5d54](https://github.com/dequelabs/axe-core/commit/9ff5d54))
- Check data is an array of IDs ([d64bc5f](https://github.com/dequelabs/axe-core/commit/d64bc5f))
- Don't crash with slot elements without shadowDOM ([#977](https://github.com/dequelabs/axe-core/issues/977)) ([cc044af](https://github.com/dequelabs/axe-core/commit/cc044af))
- Generate jsdoc(umentation) ([9f9b15b](https://github.com/dequelabs/axe-core/commit/9f9b15b))
- Stop `indexOf` override from crashing Axe ([#968](https://github.com/dequelabs/axe-core/issues/968)) ([e3329ce](https://github.com/dequelabs/axe-core/commit/e3329ce))
- Use `node.matches*` in place of `prototype.matches*` to prevent IE crash ([#956](https://github.com/dequelabs/axe-core/issues/956)) ([ebdb590](https://github.com/dequelabs/axe-core/commit/ebdb590))

### Features

- **new rule:** Added new html-xml-lang-mismatch rule ([#999](https://github.com/dequelabs/axe-core/issues/999)) ([7452a51](https://github.com/dequelabs/axe-core/commit/7452a51))
- **new rule:** aria-allowed-role ([#945](https://github.com/dequelabs/axe-core/issues/945)) ([c270a46](https://github.com/dequelabs/axe-core/commit/c270a46))
- **new rule:** css-orientation-lock (wcag21) ([#1081](https://github.com/dequelabs/axe-core/issues/1081)) ([4ae4ea0](https://github.com/dequelabs/axe-core/commit/4ae4ea0))
- **new rule:** Add WCAG 2.1 autocomplete-valid rule ([e6189ce](https://github.com/dequelabs/axe-core/commit/e6189ce))
- **rule fix:** Flag unsupported roles ([#1064](https://github.com/dequelabs/axe-core/issues/1064)) ([5515ee6](https://github.com/dequelabs/axe-core/commit/5515ee6))
- **rule fix:** Remove non-existing "text" role ([#1069](https://github.com/dequelabs/axe-core/issues/1069)) ([67ec1f5](https://github.com/dequelabs/axe-core/commit/67ec1f5))
- **rule fix:** Break up duplicate-id rule for ARIA+labels and active elements ([2ecfea7](https://github.com/dequelabs/axe-core/commit/2ecfea7))
- **rule fix:** Tag aria rules as WCAG 2, SC4.1.2 issues ([e7816c0](https://github.com/dequelabs/axe-core/commit/e7816c0))
- **core:** Allow rules to access CSSOM assets ([#958](https://github.com/dequelabs/axe-core/issues/958)) ([5d6c1fa](https://github.com/dequelabs/axe-core/commit/5d6c1fa))
- **core:** Add `doT` template engine ([#1024](https://github.com/dequelabs/axe-core/issues/1024)) ([f6f08d4](https://github.com/dequelabs/axe-core/commit/f6f08d4))
- **commons:** Add aria.getRole method ([1d2a0e4](https://github.com/dequelabs/axe-core/commit/1d2a0e4))
- **commons:** Add text.isValidAutocomplete method ([8d44fe4](https://github.com/dequelabs/axe-core/commit/8d44fe4))
- **i18n:** Add runtime localization support ([#1036](https://github.com/dequelabs/axe-core/issues/1036)) ([7d4b70f](https://github.com/dequelabs/axe-core/commit/7d4b70f))
- **i18n:** Update FR (french) translation file for 3.1 release ([#1089](https://github.com/dequelabs/axe-core/issues/1089)) ([4a5cad0](https://github.com/dequelabs/axe-core/commit/4a5cad0))
- **i18n:** Update ja (Japanese) locale for 3.1 release ([#1101](https://github.com/dequelabs/axe-core/issues/1101)) ([ef6cd86](https://github.com/dequelabs/axe-core/commit/ef6cd86))
- **deprecate:** Deprecate audio-caption rule ([#1071](https://github.com/dequelabs/axe-core/issues/1071)) ([3b05fee](https://github.com/dequelabs/axe-core/commit/3b05fee))

<a name="3.0.3"></a>

## [3.0.3](https://github.com/dequelabs/axe-core/compare/v3.0.2...v3.0.3) (2018-06-04)

### Bug Fixes

- Resolve markdown lint errors. ([efdad94](https://github.com/dequelabs/axe-core/commit/efdad94)) ([aa90155](https://github.com/dequelabs/axe-core/commit/aa90155))
- Don't require all ARIA IDREFS to exist ([#921](https://github.com/dequelabs/axe-core/issues/921)) ([130efed](https://github.com/dequelabs/axe-core/commit/130efed))
- generate unsupported aria roles and attributes. ([7315662](https://github.com/dequelabs/axe-core/commit/7315662))
- Make empty role=lisbox elements as incomplete ([#927](https://github.com/dequelabs/axe-core/issues/927)) ([87e979f](https://github.com/dequelabs/axe-core/commit/87e979f))
- Prevent axe-core crashing on “-“ as a class name ([#884](https://github.com/dequelabs/axe-core/issues/884)) ([9c4d84e](https://github.com/dequelabs/axe-core/commit/9c4d84e))
- Right trim URLs before outputting them in getSelector ([#924](https://github.com/dequelabs/axe-core/issues/924)) ([4775a23](https://github.com/dequelabs/axe-core/commit/4775a23)), closes [#788](https://github.com/dequelabs/axe-core/issues/788)
- td-has-heading to ignore td with its role changed ([#928](https://github.com/dequelabs/axe-core/issues/928)) ([d68af4c](https://github.com/dequelabs/axe-core/commit/d68af4c))
- Update tags for frame-title rule ([#935](https://github.com/dequelabs/axe-core/issues/935)) ([6436bbf](https://github.com/dequelabs/axe-core/commit/6436bbf))
- **core:** Define 'axe-core' as an AMD module ([#859](https://github.com/dequelabs/axe-core/issues/859)) ([7b46f63](https://github.com/dequelabs/axe-core/commit/7b46f63)), closes [#849](https://github.com/dequelabs/axe-core/issues/849) [#856](https://github.com/dequelabs/axe-core/issues/856) [#861](https://github.com/dequelabs/axe-core/issues/861) [#847](https://github.com/dequelabs/axe-core/issues/847) [#844](https://github.com/dequelabs/axe-core/issues/844) [#871](https://github.com/dequelabs/axe-core/issues/871) [#849](https://github.com/dequelabs/axe-core/issues/849) [#849](https://github.com/dequelabs/axe-core/issues/849)
- Update tags to accesskey & link-name rules ([#922](https://github.com/dequelabs/axe-core/issues/922)) ([a8e801c](https://github.com/dequelabs/axe-core/commit/a8e801c))
- **rule:** Layout-table does not match presentation / none roles ([#828](https://github.com/dequelabs/axe-core/issues/828)) ([5651ecc](https://github.com/dequelabs/axe-core/commit/5651ecc))
- **rule:** restore labelledBy on unlabeled select ([b7bdf66](https://github.com/dequelabs/axe-core/commit/b7bdf66))
- **rules:** Allow focusable role=application elements ([b5de450](https://github.com/dequelabs/axe-core/commit/b5de450))
- **typescript:** Update ElementContext type ([#822](https://github.com/dequelabs/axe-core/issues/822)) ([eb09248](https://github.com/dequelabs/axe-core/commit/eb09248))

### Features

- generate ARIA supported documentation for roles and attributes. ([6f095dd](https://github.com/dequelabs/axe-core/commit/6f095dd))
- generated impacts as a part of rule descriptions ([#898](https://github.com/dequelabs/axe-core/issues/898)) ([6265608](https://github.com/dequelabs/axe-core/commit/6265608))

<a name="3.0.2"></a>

## [3.0.2](https://github.com/dequelabs/axe-core/compare/v3.0.0-beta.2...v3.0.2) (2018-04-24)

### Bug Fixes

- **rule:** Allow empty aria-labelledby values ([#829](https://github.com/dequelabs/axe-core/issues/829)) ([d280c5f](https://github.com/dequelabs/axe-core/commit/d280c5f))
- Prevent color rules from crashing Chrome 66+ [#856](https://github.com/dequelabs/axe-core/issues/856) ([#861](https://github.com/dequelabs/axe-core/issues/861)) ([147b665](https://github.com/dequelabs/axe-core/commit/147b665))
- **respondable:** Identify the current axe instance by its application name when it exists ([affd75c](https://github.com/dequelabs/axe-core/commit/affd75c))
- **respondable:** Use the hard-coded axe.application name as default ([ab4a49f](https://github.com/dequelabs/axe-core/commit/ab4a49f))
- **rule:** Ignore hashbang URLs for skiplinks ([#827](https://github.com/dequelabs/axe-core/issues/827)) ([e1f0c57](https://github.com/dequelabs/axe-core/commit/e1f0c57))
- **rule:** Tag video-caption only as SC 1.2.2 ([87818e7](https://github.com/dequelabs/axe-core/commit/87818e7))

<a name="3.0.1"></a>

## [3.0.1](https://github.com/dequelabs/axe-core/compare/v3.0.0...v3.0.1) (2018-04-03)

### Bug Fixes

- allow mixed casing of caption/summary ([ca091ac](https://github.com/dequelabs/axe-core/commit/ca091ac))
- Allow title on button-name ([#794](https://github.com/dequelabs/axe-core/issues/794)) ([e31fe9a](https://github.com/dequelabs/axe-core/commit/e31fe9a))
- **sri:** Fix incorrect sri-history entries ([#789](https://github.com/dequelabs/axe-core/issues/789)) ([f5f55f3](https://github.com/dequelabs/axe-core/commit/f5f55f3))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/dequelabs/axe-core/compare/v3.0.0-beta.2...v3.0.0) (2018-03-19)

### Bug Fixes

- Allow exclusion of Shadow DOM content ([cc66eb2](https://github.com/dequelabs/axe-core/commit/cc66eb2))
- Avoid flatTree memory leak ([a902e80](https://github.com/dequelabs/axe-core/commit/a902e80))
- **main-is-top-level:** Rename check to landmark-is-top-level for greater reuse ([b405af1](https://github.com/dequelabs/axe-core/commit/b405af1))
- Avoid timing issue with axe cleanup method ([24ea6a7](https://github.com/dequelabs/axe-core/commit/24ea6a7))
- correct misnamed check ([1e709e0](https://github.com/dequelabs/axe-core/commit/1e709e0))
- Correct runOnly object for TypeScript definition ([571e984](https://github.com/dequelabs/axe-core/commit/571e984))
- **has-at-least-one-main:** Rename check to page-has-main, for reusability ([9a9c283](https://github.com/dequelabs/axe-core/commit/9a9c283))
- **has-no-more-than-one-main:** Rename check to page-no-duplicate for better reuse ([e75324b](https://github.com/dequelabs/axe-core/commit/e75324b))
- **region:** Ignore forms without accessible name as landmarks ([8ad2718](https://github.com/dequelabs/axe-core/commit/8ad2718))
- **rule:** skip-link rule doesn't decode URI encoded href's ([818b5cd](https://github.com/dequelabs/axe-core/commit/818b5cd))
- Ensure all rules have a category tag ([d61e67d](https://github.com/dequelabs/axe-core/commit/d61e67d))
- make getSelector work with URIs that cannot be shortened ([a113555](https://github.com/dequelabs/axe-core/commit/a113555))

### Features

- Make aria-level required with role=heading [#740](https://github.com/dequelabs/axe-core/issues/740) ([64b743f](https://github.com/dequelabs/axe-core/commit/64b743f))
- **aria:** allow DPUB ARIA roles ([70b48f6](https://github.com/dequelabs/axe-core/commit/70b48f6))
- **frame-tested:** Use this new rule to test if all frames are available, instead of axe.log ([83cd17d](https://github.com/dequelabs/axe-core/commit/83cd17d))
- **landmark-contentinfo-is-top-level:** add rule ensuring top level contentinfo ([5692e7d](https://github.com/dequelabs/axe-core/commit/5692e7d))
- **landmark-no-more-than-one-banner:** add rule ensuring no more than one banner ([6617800](https://github.com/dequelabs/axe-core/commit/6617800))
- **landmark-no-more-than-one-contentinfo:** add rule ensuring no more than one contentinfo ([82217ef](https://github.com/dequelabs/axe-core/commit/82217ef))
- **page-has-heading-one:** Added new best-practice rule ([cb8f261](https://github.com/dequelabs/axe-core/commit/cb8f261))
- **rules:** add new rule aria-dpub-role-fallback ([9470c02](https://github.com/dequelabs/axe-core/commit/9470c02))
- Make options.runOnly more forgiving about plurality ([fa81f9d](https://github.com/dequelabs/axe-core/commit/fa81f9d))
- Translated all 3.0 rules to Japanese ([3862e7e](https://github.com/dequelabs/axe-core/commit/3862e7e))

### BREAKING CHANGES

- Incorrect use of runOnly now throws errors
- **main-is-top-level:** The check main-is-top-level is no longer available
- **has-at-least-one-main:** Original has-at-least-one-main check is no longer available

<a name="3.0.0-beta.3"></a>

# [3.0.0-beta.3](https://github.com/dequelabs/axe-core/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2018-03-08)

### Bug Fixes

- Correct runOnly object for TypeScript definition ([571e984](https://github.com/dequelabs/axe-core/commit/571e984))
- **has-at-least-one-main:** Rename check to page-has-main, for reusability ([9a9c283](https://github.com/dequelabs/axe-core/commit/9a9c283))
- **has-no-more-than-one-main:** Rename check to page-no-duplicate for better reuse ([e75324b](https://github.com/dequelabs/axe-core/commit/e75324b))
- **main-is-top-level:** Rename check to landmark-is-top-level for greater reuse ([b405af1](https://github.com/dequelabs/axe-core/commit/b405af1))
- **region:** Ignore forms without accessible name as landmarks ([8ad2718](https://github.com/dequelabs/axe-core/commit/8ad2718))

### Features

- **aria-required-attr:** Make aria-level required with role=heading [#740](https://github.com/dequelabs/axe-core/issues/740) ([64b743f](https://github.com/dequelabs/axe-core/commit/64b743f))
- **aria:** allow DPUB ARIA roles ([70b48f6](https://github.com/dequelabs/axe-core/commit/70b48f6))
- **frame-tested:** Use this new rule to test if all frames are available, instead of axe.log ([83cd17d](https://github.com/dequelabs/axe-core/commit/83cd17d))
- **landmark-contentinfo-is-top-level:** Add rule ensuring top level contentinfo ([5692e7d](https://github.com/dequelabs/axe-core/commit/5692e7d))
- **landmark-no-more-than-one-banner:** Add rule ensuring no more than one banner ([6617800](https://github.com/dequelabs/axe-core/commit/6617800))
- **landmark-no-more-than-one-contentinfo:** Add rule ensuring no more than one contentinfo ([82217ef](https://github.com/dequelabs/axe-core/commit/82217ef))
- **page-has-heading-one:** Added new best-practice rule ([cb8f261](https://github.com/dequelabs/axe-core/commit/cb8f261))
- **rules:** Add new rule aria-dpub-role-fallback ([9470c02](https://github.com/dequelabs/axe-core/commit/9470c02))

### BREAKING CHANGES

- **main-is-top-level:** The check main-is-top-level is no longer available
- **has-at-least-one-main:** Original has-at-least-one-main check is no longer available

<a name="3.0.0-beta.2"></a>

# [3.0.0-beta.2](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.9...v3.0.0-beta.2) (2018-03-01)

### Bug Fixes

- **perf:** Improve getSelector performance ([737c81c](https://github.com/dequelabs/axe-core/commit/737c81c))
- Delete Selenium example, use grunt-axe-selenium instead ([063e701](https://github.com/dequelabs/axe-core/commit/063e701))

### Features

- Update Jasmin example ([72d49d5](https://github.com/dequelabs/axe-core/commit/72d49d5))
- Update Jest+React example ([5b35322](https://github.com/dequelabs/axe-core/commit/5b35322))
- Update Mocha example ([cf70f9f](https://github.com/dequelabs/axe-core/commit/cf70f9f))
- Update PhantomJS example ([641b5e6](https://github.com/dequelabs/axe-core/commit/641b5e6))
- Update QUnit example ([028ae51](https://github.com/dequelabs/axe-core/commit/028ae51))

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.0-beta.1"></a>

# [3.0.0-beta.1](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.9...v3.0.0-beta.1) (2018-02-19)

### Bug Fixes

- **audio-caption:** Change tag wcag122 to wcag121 [#686](https://github.com/dequelabs/axe-core/issues/686) ([#721](https://github.com/dequelabs/axe-core/issues/721)) ([9c7b9f1](https://github.com/dequelabs/axe-core/commit/9c7b9f1))
- **empty-heading:** Skip headings with the role changed [#645](https://github.com/dequelabs/axe-core/issues/645) ([#722](https://github.com/dequelabs/axe-core/issues/722)) ([80ef961](https://github.com/dequelabs/axe-core/commit/80ef961))
- **image-alt:** Exclude svg[role="img"] elements ([#683](https://github.com/dequelabs/axe-core/issues/683)) ([0fe74d8](https://github.com/dequelabs/axe-core/commit/0fe74d8))
- **label:** Prevent label rule from crashing on input without type [#678](https://github.com/dequelabs/axe-core/issues/678) ([#730](https://github.com/dequelabs/axe-core/issues/730)) ([4498680](https://github.com/dequelabs/axe-core/commit/4498680))
- **perf:** improve select performance fixes [#702](https://github.com/dequelabs/axe-core/issues/702) ([3274919](https://github.com/dequelabs/axe-core/commit/3274919))
- **perf:** memoize axe.utils.select ([c9cd122](https://github.com/dequelabs/axe-core/commit/c9cd122))
- **perf:** normalize all selectors for better cache utilization ([189c165](https://github.com/dequelabs/axe-core/commit/189c165))
- **perf:** remove need for node sorting from select completely ([7677a6a](https://github.com/dequelabs/axe-core/commit/7677a6a))
- **performance:** significantly improve the performance of the dom.findUp utility fixes [#696](https://github.com/dequelabs/axe-core/issues/696) ([9197e03](https://github.com/dequelabs/axe-core/commit/9197e03))
- add shadow dom coverage to all checks ([0e48413](https://github.com/dequelabs/axe-core/commit/0e48413)), closes [#690](https://github.com/dequelabs/axe-core/issues/690)
- bug-705: cleanupPlugins() should not throw exception when no arguments are provided ([#709](https://github.com/dequelabs/axe-core/issues/709)) ([fb1d2f7](https://github.com/dequelabs/axe-core/commit/fb1d2f7))
- Remove axe.a11yCheck() ([88d039f](https://github.com/dequelabs/axe-core/commit/88d039f))
- use virtual methods where applicable ([6ddc4e5](https://github.com/dequelabs/axe-core/commit/6ddc4e5))
- **type-checking:** Improve typescript axe.run call signature ([#707](https://github.com/dequelabs/axe-core/issues/707)) ([de45ee3](https://github.com/dequelabs/axe-core/commit/de45ee3))

### Performance Improvements

- Add performance metrics in Rule.runChecks ([#701](https://github.com/dequelabs/axe-core/issues/701)) ([27fdc2f](https://github.com/dequelabs/axe-core/commit/27fdc2f))

<a name="3.0.0-alpha.9"></a>

# [3.0.0-alpha.9](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.8...v3.0.0-alpha.9) (2018-01-18)

### Bug Fixes

- **aria-errormessage:** adds support for aria-errormessage ([#517](https://github.com/dequelabs/axe-core/issues/517)) ([c96f58c](https://github.com/dequelabs/axe-core/commit/c96f58c))
- **check:** fix bug with async checks ([441ca95](https://github.com/dequelabs/axe-core/commit/441ca95))
- **color-contrast:** allow disabled label children ([db26bc9](https://github.com/dequelabs/axe-core/commit/db26bc9))
- **color-contrast:** incl. elements w/ line breaks ([a464918](https://github.com/dequelabs/axe-core/commit/a464918))
- **commons/aria:** allow aria-required on checkbox role ([3e21c6e](https://github.com/dequelabs/axe-core/commit/3e21c6e))
- adjust color algorithm for inline elements ([7f8491e](https://github.com/dequelabs/axe-core/commit/7f8491e))
- Allow checkbox and radio groups with hidden aria-labelledby targets [#188](https://github.com/dequelabs/axe-core/issues/188) ([6149bde](https://github.com/dequelabs/axe-core/commit/6149bde))
- Ensure overloaded Array.prototype won't crash axe ([ea57ef2](https://github.com/dequelabs/axe-core/commit/ea57ef2))
- handle contrast of multiline inline el's ([f9d565f](https://github.com/dequelabs/axe-core/commit/f9d565f))
- Polyfills are made non-enumerable [#648](https://github.com/dequelabs/axe-core/issues/648). ([#649](https://github.com/dequelabs/axe-core/issues/649)) ([48d8703](https://github.com/dequelabs/axe-core/commit/48d8703))
- Remove href-no-hash rule ([342cb6e](https://github.com/dequelabs/axe-core/commit/342cb6e))
- Return inapplicable results ([#473](https://github.com/dequelabs/axe-core/issues/473)). ([c9caeff](https://github.com/dequelabs/axe-core/commit/c9caeff))
- Several of fixes for IE and Edge ([#577](https://github.com/dequelabs/axe-core/issues/577)) ([63e1272](https://github.com/dequelabs/axe-core/commit/63e1272))
- skip-link rule now checks if a target exists ([f7f9cf3](https://github.com/dequelabs/axe-core/commit/f7f9cf3))
- **commons/aria:** allow aria-required on radio role ([58b76a6](https://github.com/dequelabs/axe-core/commit/58b76a6))
- **commons/dom:** fix isFocusable functions by checking screenreader ([#658](https://github.com/dequelabs/axe-core/issues/658)) ([c665d0b](https://github.com/dequelabs/axe-core/commit/c665d0b)), closes [#647](https://github.com/dequelabs/axe-core/issues/647)
- **core/utils/querySelectorAll:** Ensure that elements do not get tested twice ([#666](https://github.com/dequelabs/axe-core/issues/666)) ([a76a454](https://github.com/dequelabs/axe-core/commit/a76a454))
- **required-children:** add combobox > listbox exception ([#559](https://github.com/dequelabs/axe-core/issues/559)) ([8d0991f](https://github.com/dequelabs/axe-core/commit/8d0991f))
- **rules/region:** Treat `<section>` as a landmark if it has an accessible name [#640](https://github.com/dequelabs/axe-core/issues/640) ([#642](https://github.com/dequelabs/axe-core/issues/642)) ([c11b442](https://github.com/dequelabs/axe-core/commit/c11b442))

### Features

- Add rule, landmark-main-is-top-level ([#462](https://github.com/dequelabs/axe-core/issues/462)) ([63040bd](https://github.com/dequelabs/axe-core/commit/63040bd))
- **collect-results-from-frames:** add frameWaitTime option ([#661](https://github.com/dequelabs/axe-core/issues/661)) ([8016ad1](https://github.com/dequelabs/axe-core/commit/8016ad1))
- **landmark-one-main:** add rule ensuring one main landmark in document ([#498](https://github.com/dequelabs/axe-core/issues/498)) ([dfc6069](https://github.com/dequelabs/axe-core/commit/dfc6069))
- **reporter:** return one result of each type instead of zero when resultTypes is used ([#604](https://github.com/dequelabs/axe-core/issues/604)) ([216a83b](https://github.com/dequelabs/axe-core/commit/216a83b)), closes [#603](https://github.com/dequelabs/axe-core/issues/603)
- **rule:** Flag div/p/spans/headings in focus order ([ce5f3dc](https://github.com/dequelabs/axe-core/commit/ce5f3dc)), closes [#632](https://github.com/dequelabs/axe-core/issues/632)
- allow options in aria-allowed-attr, aria-required-attr ([#673](https://github.com/dequelabs/axe-core/issues/673)) ([61ac303](https://github.com/dequelabs/axe-core/commit/61ac303))
- Enable all rules by default ([18263eb](https://github.com/dequelabs/axe-core/commit/18263eb))
- Improve generated selectors for namespaced elements in XHTML ([#582](https://github.com/dequelabs/axe-core/issues/582)) ([9e3ca45](https://github.com/dequelabs/axe-core/commit/9e3ca45)), closes [#563](https://github.com/dequelabs/axe-core/issues/563)

### BREAKING CHANGES

- Skip-link rule no longer requires skip lins with a focusable target.

<a name="3.0.0-alpha.8"></a>

# [3.0.0-alpha.8](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.7...v3.0.0-alpha.8) (2017-10-20)

### Bug Fixes

- **aria-allowed-attr:** align rowcount, colcount, and colindex with 1.1 spec ([#555](https://github.com/dequelabs/axe-core/issues/555)) ([10efa88](https://github.com/dequelabs/axe-core/commit/10efa88))
- **required-children:** add combobox > listbox exception ([#559](https://github.com/dequelabs/axe-core/issues/559)) ([8d0991f](https://github.com/dequelabs/axe-core/commit/8d0991f))
- Added message about expected contrast ratio ([#381](https://github.com/dequelabs/axe-core/issues/381)) ([#562](https://github.com/dequelabs/axe-core/issues/562)) ([9e30d64](https://github.com/dequelabs/axe-core/commit/9e30d64))

<a name="3.0.0-alpha.6"></a>

# [3.0.0-alpha.6](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.3...v3.0.0-alpha.6) (2017-09-27)

### Bug Fixes

- **aria:** adding support for aria-expanded in menuitem ([#521](https://github.com/dequelabs/axe-core/issues/521)) ([b30b451](https://github.com/dequelabs/axe-core/commit/b30b451))
- **color-contrast:** Include `THEAD` and `TBODY` in contrast checks ([#514](https://github.com/dequelabs/axe-core/issues/514)) ([f98f8bd](https://github.com/dequelabs/axe-core/commit/f98f8bd))
- Match prerelease versions for helpUrl ([#546](https://github.com/dequelabs/axe-core/issues/546)) ([5300577](https://github.com/dequelabs/axe-core/commit/5300577))
- **helpUrl:** Properly parse x.0 versions ([#550](https://github.com/dequelabs/axe-core/issues/550)) ([a51c5ce](https://github.com/dequelabs/axe-core/commit/a51c5ce))
- **postinstall:** use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([f5b5299](https://github.com/dequelabs/axe-core/commit/f5b5299))
- **responsible:** Restrict error construction to known errors ([0128a7e](https://github.com/dequelabs/axe-core/commit/0128a7e))

<a name="3.0.0-alpha.5"></a>

# [3.0.0-alpha.5](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.4...v3.0.0-alpha.5) (2017-09-25)

### Bug Fixes

- **aria:** adding support for aria-expanded in menuitem ([#521](https://github.com/dequelabs/axe-core/issues/521)) ([b30b451](https://github.com/dequelabs/axe-core/commit/b30b451))
- **postinstall:** use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([f5b5299](https://github.com/dequelabs/axe-core/commit/f5b5299))
- Match prerelease versions for helpUrl ([#546](https://github.com/dequelabs/axe-core/issues/546)) ([5300577](https://github.com/dequelabs/axe-core/commit/5300577))

<a name="3.0.0-alpha.4"></a>

## [3.0.0-alpha.4](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.3...v3.0.0-alpha.4) (2017-09-08)

### Bug fixes:

- fix(color-contrast): Include `THEAD` and `TBODY` in contrast checks (#514) ([f98f8bd](https://github.com/dequelabs/axe-core/commit/f98f8bdacc551579c259aefd88bef41ed8157b68))
- fix(responsible): Restrict error construction to known errors (#513) ([0128a7e](https://github.com/dequelabs/axe-core/commit/0128a7ea47847b9fa04dbf98327f4bc1760c5e11))

### Features:

- docs: Document how to propose axe-core rules (#507) ([cabd329](https://github.com/dequelabs/axe-core/commit/cabd3297afbbfe9dbcc41a168b5529ba52f408ba))

<a name="3.0.0-alpha.3"></a>

## [3.0.0-alpha.3](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2017-09-06)

### Bug fixes:

- Additional ARIA 1.1. support and tests (#509) ([9b4d2ee](https://github.com/dequelabs/axe-core/commit/9b4d2eea4fcb2c48bab71e442da3a588b3893853))
- fix: RestoreScroll was running out of sync (#508) ([ff3df2d](https://github.com/dequelabs/axe-core/commit/ff3df2d9b2c01c1ca0d12c1fcaf136528287fb6d))

<a name="3.0.0-alpha.2"></a>

## [3.0.0-alpha.2](https://github.com/dequelabs/axe-core/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2017-09-01)

### Bug Fixes

- copy precommit hook as file, not a link ([16f2f76](https://github.com/dequelabs/axe-core/commit/16f2f76))
- expand tr support for color contrast ([5a77c2f](https://github.com/dequelabs/axe-core/commit/5a77c2f))
- Ignore shadowRoots on elements that don't allow them ([7f66ee8](https://github.com/dequelabs/axe-core/commit/7f66ee8))
- only run postinstall if .git exists ([1107783](https://github.com/dequelabs/axe-core/commit/1107783))
- try telling circle to skip .git/hooks ([674408f](https://github.com/dequelabs/axe-core/commit/674408f))
- Use frame query that supports shadow dom ([#492](https://github.com/dequelabs/axe-core/issues/492)) ([94008ff](https://github.com/dequelabs/axe-core/commit/94008ff))

### Features

- feat: Add sri-history file and update process ([25ddb47](https://github.com/dequelabs/axe-core/commit/25ddb47ec4eec565da330558ee061fd6e34a7c24))
- feat: add standard-version ([e1e067d](https://github.com/dequelabs/axe-core/commit/e1e067d8f4445042360b2bef957037d5cdd0b7db))

<a name="3.0.0-alpha.1"></a>

## [3.0.0-alpha.1](https://github.com/dequelabs/axe-core/compare/v2.3.1...v3.0.0-alpha.1) (2017-08-16)

### Bug Fixes

- add copyright banner back in to axe.js ([2aac29a](https://github.com/dequelabs/axe-core/commit/2aac29a))
- Adjust if formatting ([2211d78](https://github.com/dequelabs/axe-core/commit/2211d78))
- Align impact levels with Deque Way ([28f4477](https://github.com/dequelabs/axe-core/commit/28f4477))
- Allow <track> to have no kind attribute ([f996d0f](https://github.com/dequelabs/axe-core/commit/f996d0f))
- complete shadow support for color matches ([f0fe551](https://github.com/dequelabs/axe-core/commit/f0fe551))
- **aria:** Allow implicit attribute values ([b949749](https://github.com/dequelabs/axe-core/commit/b949749))
- Set relatedNodes on color/link-in-block rules ([#407](https://github.com/dequelabs/axe-core/issues/407)) ([7fde0fe](https://github.com/dequelabs/axe-core/commit/7fde0fe))
- **aria:** Treegrid should own rows, not treeitems ([645d1fa](https://github.com/dequelabs/axe-core/commit/645d1fa))
- Correct flattened tree algorithm to include the shadow host ([#405](https://github.com/dequelabs/axe-core/issues/405)) ([70985b0](https://github.com/dequelabs/axe-core/commit/70985b0))
- Ensure all tests pass in Chrome ([0b0240f](https://github.com/dequelabs/axe-core/commit/0b0240f))
- ensure document is fetched from correct node ([b28597c](https://github.com/dequelabs/axe-core/commit/b28597c))
- Exclude `any` checks from output if one passed ([#466](https://github.com/dequelabs/axe-core/issues/466)) ([2dd3d68](https://github.com/dequelabs/axe-core/commit/2dd3d68))
- get tests all passing ([#457](https://github.com/dequelabs/axe-core/issues/457)) ([4874327](https://github.com/dequelabs/axe-core/commit/4874327))
- get virtualNode with getNodeFromTree ([9bf2870](https://github.com/dequelabs/axe-core/commit/9bf2870))
- getComposedParent should not return slot nodes ([#438](https://github.com/dequelabs/axe-core/issues/438)) ([0478cbd](https://github.com/dequelabs/axe-core/commit/0478cbd))
- Have table rules use shadow DOM ([453be1b](https://github.com/dequelabs/axe-core/commit/453be1b))
- help-same-as-label for shadow DOM ([dbbc544](https://github.com/dequelabs/axe-core/commit/dbbc544))
- incomplete results should have impact ([fcc51eb](https://github.com/dequelabs/axe-core/commit/fcc51eb))
- Let findUp work on shadow root children ([0252218](https://github.com/dequelabs/axe-core/commit/0252218))
- Let findUp work on shadow root children ([#447](https://github.com/dequelabs/axe-core/issues/447)) ([0f98481](https://github.com/dequelabs/axe-core/commit/0f98481))
- Minimise scrolling in getBackgroundColor ([f4551bb](https://github.com/dequelabs/axe-core/commit/f4551bb))
- Pass all tests that use accessibleText ([7ea8d6b](https://github.com/dequelabs/axe-core/commit/7ea8d6b))
- **checks/aria/required-children:** add exception for native input combobox missing textbox ([81ee2e4](https://github.com/dequelabs/axe-core/commit/81ee2e4))
- use virtualNode in duplicate-img-label ([82e51bc](https://github.com/dequelabs/axe-core/commit/82e51bc))
- **is-in-text-block:** Add Shadow DOM support ([a125f79](https://github.com/dequelabs/axe-core/commit/a125f79))
- pass virtualNode to Rule.run ([4534e86](https://github.com/dequelabs/axe-core/commit/4534e86))
- Properly output error stack ([56f1867](https://github.com/dequelabs/axe-core/commit/56f1867))
- Remove log statements ([6a6bd73](https://github.com/dequelabs/axe-core/commit/6a6bd73))
- Solve a few tests ([02daad1](https://github.com/dequelabs/axe-core/commit/02daad1))
- Use getAttribute(id) over .id ([#374](https://github.com/dequelabs/axe-core/issues/374)) ([353b53f](https://github.com/dequelabs/axe-core/commit/353b53f))
- Use testUtils in table tests ([364d5cd](https://github.com/dequelabs/axe-core/commit/364d5cd))
- use virtualNode in title-only check ([5fb06e3](https://github.com/dequelabs/axe-core/commit/5fb06e3))
- whitespace in hidden-content test ([99e8b73](https://github.com/dequelabs/axe-core/commit/99e8b73))

### Features

- Add aria-orientation to additional roles ([bb07c2d](https://github.com/dequelabs/axe-core/commit/bb07c2d))
- add check testUtils ([6f53279](https://github.com/dequelabs/axe-core/commit/6f53279))
- Add dom.getComposedParent function ([aac57c0](https://github.com/dequelabs/axe-core/commit/aac57c0))
- Add Japanese localisation ([5f8c9c8](https://github.com/dequelabs/axe-core/commit/5f8c9c8))
- Add new ARIA 1.1 values for haspopup ([9f7da56](https://github.com/dequelabs/axe-core/commit/9f7da56))
- Add option restoreScroll ([d55f3cd](https://github.com/dequelabs/axe-core/commit/d55f3cd))
- add S.C. 2.4.4 to link-name rule. Fixes [#369](https://github.com/dequelabs/axe-core/issues/369) ([70728e6](https://github.com/dequelabs/axe-core/commit/70728e6))
- add SD support to color-contrast-matches ([b595b42](https://github.com/dequelabs/axe-core/commit/b595b42))
- Add shadow DOM support to list checks ([#439](https://github.com/dequelabs/axe-core/issues/439)) ([d92c1a1](https://github.com/dequelabs/axe-core/commit/d92c1a1))
- Add shadow DOM to duplicate-img-label check ([#443](https://github.com/dequelabs/axe-core/issues/443)) ([2c0b075](https://github.com/dequelabs/axe-core/commit/2c0b075))
- Add shadow DOM to landmark check ([98f6023](https://github.com/dequelabs/axe-core/commit/98f6023))
- add shadow support to aria-required-children ([f729e25](https://github.com/dequelabs/axe-core/commit/f729e25))
- add shadow support to group-labelledby ([e2a9642](https://github.com/dequelabs/axe-core/commit/e2a9642))
- Add sri-history file and update process ([#476](https://github.com/dequelabs/axe-core/issues/476)) ([25ddb47](https://github.com/dequelabs/axe-core/commit/25ddb47))
- Allow hidden-content to work through shadow DOM bounds ([789d62e](https://github.com/dequelabs/axe-core/commit/789d62e))
- fieldset check shadow DOM ([da148d3](https://github.com/dequelabs/axe-core/commit/da148d3))
- Make explicit check consider shadow DOM ([#442](https://github.com/dequelabs/axe-core/issues/442)) ([9ddfc0f](https://github.com/dequelabs/axe-core/commit/9ddfc0f))
- Make region check work with shadow DOM ([ecd222f](https://github.com/dequelabs/axe-core/commit/ecd222f))
- Run text.accessibleText() on virtual elements ([#420](https://github.com/dequelabs/axe-core/issues/420)) ([414fcbe](https://github.com/dequelabs/axe-core/commit/414fcbe))
- ShadowDOM support for media checks ([0f21574](https://github.com/dequelabs/axe-core/commit/0f21574))
- **aria:** Support progressive ARIA 1.1 attributes / roles ([#468](https://github.com/dequelabs/axe-core/issues/468)) ([ebb2a5d](https://github.com/dequelabs/axe-core/commit/ebb2a5d))
- **aria-required-parent:** add Shadow DOM support ([6ed29f0](https://github.com/dequelabs/axe-core/commit/6ed29f0))
- **duplicate-id:** Add shadow DOM support ([439bc71](https://github.com/dequelabs/axe-core/commit/439bc71))
- **link-in-text-block:** Add shadow DOM support ([46a2cca](https://github.com/dequelabs/axe-core/commit/46a2cca))
- **shadow DOM:** Create commons virtual methods, for backward compatibility ([86a4c25](https://github.com/dequelabs/axe-core/commit/86a4c25))

<a name="2.4.2"></a>

## [2.4.2](https://github.com/dequelabs/axe-core/compare/v2.4.1...v2.4.2) (2017-09-25)

### Bug Fixes

- **aria:** adding support for aria-expanded in menuitem ([#521](https://github.com/dequelabs/axe-core/issues/521)) ([b4c42fe](https://github.com/dequelabs/axe-core/commit/b4c42fe))
- Match prerelease versions for helpUrl ([#546](https://github.com/dequelabs/axe-core/issues/546)) ([c166708](https://github.com/dequelabs/axe-core/commit/c166708))
- fix(node4): use var to declare variables ([#541](https://github.com/dequelabs/axe-core/issues/541)) ([c72badb](https://github.com/dequelabs/axe-core/commit/c72badbd55ef0b56b97f0c64a4eb544e31b4b3f1))

<a name="2.4.1"></a>

## [2.4.1](https://github.com/dequelabs/axe-core/compare/v2.4.0...v2.4.1) (2017-09-12)

### Bug Fixes

- fix(postinstall): use node, more conditionals ([#520](https://github.com/dequelabs/axe-core/issues/520)) ([98fac8a](https://github.com/dequelabs/axe-core/commit/98fac8a))

<a name="2.4.0"></a>

## [2.4.0](https://github.com/dequelabs/axe-core/compare/v2.3.1-alpha.2...v2.4.0) (2017-09-08)

### Bug fixes:

- fix(color-contrast): Include `THEAD` and `TBODY` in contrast checks (#514) ([f98f8bd](https://github.com/dequelabs/axe-core/commit/f98f8bdacc551579c259aefd88bef41ed8157b68))
- fix(responsible): Restrict error construction to known errors (#513) ([0128a7e](https://github.com/dequelabs/axe-core/commit/0128a7ea47847b9fa04dbf98327f4bc1760c5e11))

### Features:

- docs: Document how to propose axe-core rules (#507) ([cabd329](https://github.com/dequelabs/axe-core/commit/cabd3297afbbfe9dbcc41a168b5529ba52f408ba))

<a name="2.4.0-alpha.2"></a>

## [2.4.0-alpha.2](https://github.com/dequelabs/axe-core/compare/v2.4.0-alpha.1...v2.4.0-alpha.2) (2017-09-06)

### Bug fixes:

- test(aria): aria-haspopup, aria-modal for 1.1
- style(test/aria): add line breaks for readability
- test(aria): add missing roles and properties
- fix: RestoreScroll was running out of sync (#508)

### Features:

- feat(ARIA 1.1): Allow row-index, setsize and posinset on more roles

<a name="2.4.0-alpha.1"></a>

## [2.4.0-alpha.1](https://github.com/dequelabs/axe-core/compare/v2.3.0...v2.4.0-alpha.1) (2017-08-31)

### Bug fixes:

- chore: add help text for testconfig Grunt task
- fix: Properly output error stack
- doc: Add 'on mobile' to viewport rule
- fix: Ensure all tests pass in Chrome
- fix: Minimise scrolling in getBackgroundColor
- chore: Minor build chores for whitespace and lockfile
- fix: Align impact levels with Deque Way
- fix: Set relatedNodes on color/link-in-block rules
- fix: incomplete results should have impact
- fix(aria): Allow implicit attribute values
- chore: ignore growl in retire
- fix: Use getAttribute(id) over .id
- fix: Exclude `any` checks from output if one passed
- fix(aria): Treegrid should own rows, not treeitems
- fix(aria): add exception for native input combobox missing textbox. Fixes #160
- test: fix aria/required-children for jshint
- feat: allow link text from single-cell layout table
- fix: expand tr support for color contrast
- chore: ignore node_modules in examples when linting

### Features:

- feat: Add option `restoreScroll`
- doc: add more info on testing hidden regions
- feat: add S.C. 2.4.4 to link-name rule. Fixes #369
- feat: Add Japanese localisation
- doc: Add instructions on debugging on CircleCI
- test: add unit tests for button-has-visible-text
- chore: add descriptions to Grunt tasks
- feat(aria): Support progressive ARIA 1.1 attributes / roles
- feat: Add new ARIA 1.1 values for haspopup
- feat: Add aria-orientation to additional roles

<a name="2.3.1"></a>

## [2.3.1](https://github.com/dequelabs/axe-core/compare/v2.3.0...v2.3.1) (2017-06-15)

### Bug fixes:

- Improvements to hidden-content rule
- Deduplicated langs in valid-lang options

<a name="2.3.0"></a>

## [2.3.0](https://github.com/dequelabs/axe-core/compare/v2.2.3...v2.3.0) (2017-06-14)

### Bug fixes:

- Overhaul of selectors API
- New experimental rule for hidden-content
- New rule for flagging aria-hidden="true" on document.body
- Color-contrast rule impact is now serious
- Color-contrast fixes for implicit labels and TR elements
- Color-contrast puts 1:1 ratio elements into Needs Review/incomplete
- List category mappings in docs
- Update axe.source to work with Firefox webdriver

<a name="2.2.3"></a>

## [2.2.3](https://github.com/dequelabs/axe-core/compare/v2.2.2...v2.2.3) (2017-06-01)

### Bug fixes:

- Removed the disable property from link-in-text-block

<a name="2.2.2"></a>

## [2.2.2](https://github.com/dequelabs/axe-core/compare/2.2.1...v2.2.2) (2017-05-25)

### Bug fixes

- Stabilize incompleteData API for backwards compatibility
- Change impact of duplicate-id rule to moderate

<a name="2.2.2"></a>

## [2.2.1](https://github.com/dequelabs/axe-core/compare/2.2.0...2.2.1) (2017-05-19)

### Bug fixes

- Remove nodes from the color contrast incompleteData API to avoid circular references

<a name="2.2.0"></a>

## 2.2.0 (2017-04-24)

### Changes

- Add configuration options for iframes: false, selectors: false, and elementRef: true
- Improve color-contrast rule for disabled elements
- Add webdriver task for testing mobile viewports
- Improve audio/video captioning rules
- Improve th-has-data-cells rule
- Expose incomplete reasons for color contrast rule as part of Needs Review
- Implement rule groupings as tags
- Allow building of axe in multiple languages
- Empty-heading rule has impact: moderate

<a name="2.1.8"></a>

## 2.1.8 (2017-05-21)

### Changes

- Move from Snyk to Retire.js
- Make CI run test-fast task instead of parallel
- Add documentation on writing integration tests and rules
- Allow a larger list of languages for HTML-valid-lang rule
- Add support for [role=img] in image-alt rule
- Fix bug with innerHeight in get-background-color
- Improve dom.is-offscreen function
- Integrate optional performance timer
- Empty include defaults to document

<a name="2.1.7"></a>

## 2.1.7 (2016-12-13)

### Changes

- Add promise-based axe.run API method in favor of axe.a11yCheck
- Move TypeScript definition to root of project
- Add Inapplicable and Can't Tell results
- New rule: frame-title-unique
- Improvements to table rules: td-has-header, th-has-data-cells
- Color contrast rule performance improvements using polyfilled elementsFromPoint
- Add better support for implicit roles
- DQElement supports xPath

<a name="2.0.7"></a>

## 2.0.7 (2016-09-28)

### Changes

- Add TypeScript definition v1

<a name="2.0.5"></a>

## 2.0.5 (2016-04-20)

### Changes

- Support for UMD pattern
- Adds 508 tagging for table rules
- Fixes race condition for iframes
- Exclude actual nodes from array checking

<a name="2.0.5"></a>

## 2.0.5 (2016-04-13)

### Changes

- Improvements to messaging for extensions

<a name="2.0.3"></a>

## 2.0.3 (2016-04-12)

### Changes

- Security improvements
- Build includes Babel/ES6
- Improvements to table rules
- axe can be loaded in Node

<a name="2.0.0"></a>

## 2.0.0 (2016-03-01)

### Changes

- Adds support for AMD modules
- Fixes incompatibility with Webpack
- Improvements to rules and checks
- Help urls no longer hard-coded
- Improved error handling

<a name="1.1.1"></a>

## 1.1.1 (2015-09-04)

### Changes

- Adds Travis hooks
- Adds Sauce Labs
- Encodes HTML in descriptions
- Updates messages and help URLs

<a name="1.0.1"></a>

## 1.0.1 (2015-06-10)

### Changes

- Initial public release
