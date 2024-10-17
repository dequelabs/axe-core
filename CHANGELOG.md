# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.10.1](https://github.com/dequelabs/axe-core/compare/v4.10.0...v4.10.1) (2024-10-16)

### Bug Fixes

- **aria-allowed-role:** add form to allowed roles of form element ([#4588](https://github.com/dequelabs/axe-core/issues/4588)) ([d462d67](https://github.com/dequelabs/axe-core/commit/d462d674bb7de0848ce2695f80b95d677c5016e0)), closes [/github.com/dequelabs/axe-core/blob/develop/lib/standards/html-elms.js#L264](https://github.com/dequelabs//github.com/dequelabs/axe-core/blob/develop/lib/standards/html-elms.js/issues/L264)
- **axe.d.ts:** add typings for preload options object ([#4543](https://github.com/dequelabs/axe-core/issues/4543)) ([72e269f](https://github.com/dequelabs/axe-core/commit/72e269f1e6d6039e70e614005f04ebfd3fe5aca5))
- **button-name,input-button-name,input-img-alt:** allow label to give accessible name ([#4607](https://github.com/dequelabs/axe-core/issues/4607)) ([364eb72](https://github.com/dequelabs/axe-core/commit/364eb72bb8f20b0ffc31be24cc96cbd349c301cb)), closes [#4472](https://github.com/dequelabs/axe-core/issues/4472) [#3696](https://github.com/dequelabs/axe-core/issues/3696) [#3696](https://github.com/dequelabs/axe-core/issues/3696)
- **get-ancestry:** add nth-child selector for multiple siblings of shadow root ([#4606](https://github.com/dequelabs/axe-core/issues/4606)) ([bdd94a2](https://github.com/dequelabs/axe-core/commit/bdd94a227a95cd5b9f8e2a1e0fd259ddd702810c)), closes [#4563](https://github.com/dequelabs/axe-core/issues/4563)
- **rules:** Change "alternate text" to "alternative text" ([#4582](https://github.com/dequelabs/axe-core/issues/4582)) ([31e0f61](https://github.com/dequelabs/axe-core/commit/31e0f61ca871b3df86468577c449a02c8ece12f0))

## [4.10.0](https://github.com/dequelabs/axe-core/compare/v4.9.1...v4.10.0) (2024-07-29)

### Features

- **new-rule:** summary elements must have an accessible name ([#4511](https://github.com/dequelabs/axe-core/issues/4511)) ([0d8a99e](https://github.com/dequelabs/axe-core/commit/0d8a99eadd8d49e5d3ea0f11ad77be732148431e)), closes [#4510](https://github.com/dequelabs/axe-core/issues/4510)

### Bug Fixes

- **aria-allowed-attr:** allow aria-multiline=false for element with contenteditable ([#4537](https://github.com/dequelabs/axe-core/issues/4537)) ([f019068](https://github.com/dequelabs/axe-core/commit/f0190685722495d00be644cabb1c9741d74acdea))
- **aria-allowed-attr:** allow aria-required=false when normally not allowed ([#4532](https://github.com/dequelabs/axe-core/issues/4532)) ([2e242e1](https://github.com/dequelabs/axe-core/commit/2e242e146929902c97e181e41fa45e656cf3eb51))
- **aria-prohibited-attr:** allow aria-label/ledby on descendants of widget ([#4541](https://github.com/dequelabs/axe-core/issues/4541)) ([07c5d91](https://github.com/dequelabs/axe-core/commit/07c5d91c658bda6bcd2743950bf70f25abd1f9ae))
- **aria-roledescription:** keep disabled with { runOnly: 'wcag2a' } ([#4526](https://github.com/dequelabs/axe-core/issues/4526)) ([5b4cb9d](https://github.com/dequelabs/axe-core/commit/5b4cb9d7992a4c07745e64708040777de64874bd)), closes [#4523](https://github.com/dequelabs/axe-core/issues/4523)
- **autocomplete-valid:** incomplete for invalid but safe values ([#4500](https://github.com/dequelabs/axe-core/issues/4500)) ([e31a974](https://github.com/dequelabs/axe-core/commit/e31a974de395845c08af345f9458a8091e2b1c4b)), closes [#4492](https://github.com/dequelabs/axe-core/issues/4492)
- **build:** limit locales to valid files when using the --all-lang option ([#4486](https://github.com/dequelabs/axe-core/issues/4486)) ([d3db593](https://github.com/dequelabs/axe-core/commit/d3db593991261ad44eef1c142d8a4646edde93fa)), closes [#4485](https://github.com/dequelabs/axe-core/issues/4485)
- Prevent errors when loading axe in Angular + Jest ([#4456](https://github.com/dequelabs/axe-core/issues/4456)) ([3ef9353](https://github.com/dequelabs/axe-core/commit/3ef93531a574c2be76a92d59599d978714cca9d0)), closes [#4400](https://github.com/dequelabs/axe-core/issues/4400)
- Minor grammatical fixes for some rules and checks ([#4499](https://github.com/dequelabs/axe-core/issues/4499)) ([11fad59](https://github.com/dequelabs/axe-core/commit/11fad598c25eadd29f35ef6be382d907057d4537))
- **landmark-unique:** follow spec, aside -> landmark ([#4469](https://github.com/dequelabs/axe-core/issues/4469)) ([e32f803](https://github.com/dequelabs/axe-core/commit/e32f8034246a92e4132dc04f6310e2b414d6d43f)), closes [#4460](https://github.com/dequelabs/axe-core/issues/4460)
- **required-attr:** allow aria-valuetext on slider instead of valuenow ([#4518](https://github.com/dequelabs/axe-core/issues/4518)) ([135898b](https://github.com/dequelabs/axe-core/commit/135898b38d5eb46c42170527a0ac9add425c5c3d)), closes [#4515](https://github.com/dequelabs/axe-core/issues/4515)

### [4.9.1](https://github.com/dequelabs/axe-core/compare/v4.9.0...v4.9.1) (2024-05-06)

### Bug Fixes

- Prevent errors when loading axe in a page with prototype.js
- **aria-allowed-attr:** allow meter role allowed aria-\* attributes on meter element ([#4435](https://github.com/dequelabs/axe-core/issues/4435)) ([7ac6392](https://github.com/dequelabs/axe-core/commit/7ac63921e7fab21f3359dcfc8affa7585bc9c25b))
- **aria-allowed-role:** add gridcell, separator, slider and treeitem to allowed roles of button element ([#4398](https://github.com/dequelabs/axe-core/issues/4398)) ([4788bf8](https://github.com/dequelabs/axe-core/commit/4788bf8d6fd963d7b017dad950b122ffcea8d151))
- **aria-roles:** correct abstract roles (types) for aria-roles([#4421](https://github.com/dequelabs/axe-core/pull/4421))
- **aria-valid-attr-value:** aria-controls & aria-haspopup incomplete ([#4418](https://github.com/dequelabs/axe-core/pull/4418))
- fix building axe-core translation files with region locales ([#4396](https://github.com/dequelabs/axe-core/issues/4396)) ([5c318f3](https://github.com/dequelabs/axe-core/commit/5c318f3537056be5779cb53374bc6f4785947c91)), closes [#4388](https://github.com/dequelabs/axe-core/issues/4388)
- **invalidrole:** allow upper and mixed case role names ([#4358](https://github.com/dequelabs/axe-core/issues/4358)) ([105016c](https://github.com/dequelabs/axe-core/commit/105016cfe9d82876cfed2ff5c656a7842c5b3761)), closes [#2695](https://github.com/dequelabs/axe-core/issues/2695)
- **isVisibleOnScreen:** account for position: absolute elements inside overflow container ([#4405](https://github.com/dequelabs/axe-core/issues/4405)) ([2940f6e](https://github.com/dequelabs/axe-core/commit/2940f6ee36ba52d8cf089be2a3c8e7c516c81dd6)), closes [#4016](https://github.com/dequelabs/axe-core/issues/4016)
- **label-content-name-mismatch:** better dismiss and wysiwyg symbolic text characters ([#4402](https://github.com/dequelabs/axe-core/issues/4402))
- **region:** Decorative images ignored by region rule ([#4412](https://github.com/dequelabs/axe-core/pull/4412))
- **target-size:** ignore descendant elements in shadow dom ([#4410](https://github.com/dequelabs/axe-core/issues/4410)) ([6091367](https://github.com/dequelabs/axe-core/commit/6091367a20f70e536fc7e8d77eae4fa7232bc7c0))
- **target-size:** pass for element that has nearby elements that are obscured ([#4422](https://github.com/dequelabs/axe-core/issues/4422)) ([3a90bb7](https://github.com/dequelabs/axe-core/commit/3a90bb70c8db087b2f03cc30a4aee756995c311c)), closes [#4387](https://github.com/dequelabs/axe-core/issues/4387)

## [4.9.0](https://github.com/dequelabs/axe-core/compare/v4.8.4...v4.9.0) (2024-03-25)

### Features

- adding the wcag131 tag to the aria-hidden-body rule ([#4349](https://github.com/dequelabs/axe-core/issues/4349)) ([dd4c3c3](https://github.com/dequelabs/axe-core/commit/dd4c3c34a42d2b96f5495890f5c5d5e8f6ca8d32)), closes [#4315](https://github.com/dequelabs/axe-core/issues/4315)
- **checks:** deprecate aria-busy check ([#4356](https://github.com/dequelabs/axe-core/issues/4356)) ([be0b555](https://github.com/dequelabs/axe-core/commit/be0b5558acfbeb6bbb176ac7fd7d8fdfb973b30b)), closes [#4347](https://github.com/dequelabs/axe-core/issues/4347) [#4340](https://github.com/dequelabs/axe-core/issues/4340)
- **color:** add color channel values and luminosity, saturation, clip functions ([#4366](https://github.com/dequelabs/axe-core/issues/4366)) ([9e70199](https://github.com/dequelabs/axe-core/commit/9e7019990bbbf5182ab50c5c968143b81d216dcb)), closes [/github.com/dequelabs/axe-core/pull/4365/files#r1517706612](https://github.com/dequelabs//github.com/dequelabs/axe-core/pull/4365/files/issues/r1517706612)
- **i18n:** add Greek Translations ([#3836](https://github.com/dequelabs/axe-core/issues/3836)) ([3ea9a48](https://github.com/dequelabs/axe-core/commit/3ea9a48cf88d02271db8b19651bff0415237b856))
- **i18n:** Add Italian translation ([#4344](https://github.com/dequelabs/axe-core/issues/4344)) ([de1baa9](https://github.com/dequelabs/axe-core/commit/de1baa9a9f6495f695d25d61d14ed55983dded76))
- **i18n:** Add Simplified Chinese translation ([#4379](https://github.com/dequelabs/axe-core/issues/4379)) ([bda7c8d](https://github.com/dequelabs/axe-core/commit/bda7c8d8bf5936a56c66240e1ea0373a3b769809))
- **i18n:** Add Taiwanese Mandarin translation ([#4299](https://github.com/dequelabs/axe-core/issues/4299)) ([c5e11de](https://github.com/dequelabs/axe-core/commit/c5e11de06973392b113906c05e3a3004af4c38ae))

### Bug Fixes

- Add LICENSE-3RD-PARTY.txt file ([#4304](https://github.com/dequelabs/axe-core/issues/4304)) ([daa0fe6](https://github.com/dequelabs/axe-core/commit/daa0fe677d4837c9c79bad8ee6c77aff11212339))
- add Object.values polyfill for node <=6 ([#4274](https://github.com/dequelabs/axe-core/issues/4274)) ([5eb867b](https://github.com/dequelabs/axe-core/commit/5eb867b04e174140122c62eb5c705a842a3489e1))
- **aria-required-children:** avoid confusing aria-busy message in failures ([#4347](https://github.com/dequelabs/axe-core/issues/4347)) ([591607d](https://github.com/dequelabs/axe-core/commit/591607dd829c11e2cca5beee12c75628d1a8235e)), closes [#fail13](https://github.com/dequelabs/axe-core/issues/fail13) [#4340](https://github.com/dequelabs/axe-core/issues/4340)
- avoid reading element-specific node properties of non-element node types ([#4317](https://github.com/dequelabs/axe-core/issues/4317)) ([b853b18](https://github.com/dequelabs/axe-core/commit/b853b18a24dd2d1c9408705b821cc11146ae1186)), closes [#4316](https://github.com/dequelabs/axe-core/issues/4316) [#4316](https://github.com/dequelabs/axe-core/issues/4316)
- **color-contrast:** handle text that is outside `overflow: hidden` ancestor ([#4357](https://github.com/dequelabs/axe-core/issues/4357)) ([bdb7300](https://github.com/dequelabs/axe-core/commit/bdb7300c67d451d3b0169707924a0c6bc4defe40)), closes [#4253](https://github.com/dequelabs/axe-core/issues/4253)
- **color-contrast:** support color blend modes hue, saturation, color, luminosity ([#4365](https://github.com/dequelabs/axe-core/issues/4365)) ([7ae4761](https://github.com/dequelabs/axe-core/commit/7ae476124d60eafd28d85abf48188cd85c99543a))
- **d.ts:** RawNodesResult issues ([#4229](https://github.com/dequelabs/axe-core/issues/4229)) ([d660518](https://github.com/dequelabs/axe-core/commit/d6605181ec942bcca46e3bfe889064b3781919ca))
- **d.ts:** RunOptions.reporter can be any string ([#4218](https://github.com/dequelabs/axe-core/issues/4218)) ([e53f5c5](https://github.com/dequelabs/axe-core/commit/e53f5c5184a0e5f75db65e7929a9da84d7ee6df6))
- **i18n:** update Italian translations ([#4377](https://github.com/dequelabs/axe-core/issues/4377)) ([4d65d4b](https://github.com/dequelabs/axe-core/commit/4d65d4bf40f4ee2697e079451dd84a0155e8fb51))
- **listitem:** clarify roleNotValid message ([#4374](https://github.com/dequelabs/axe-core/issues/4374)) ([0f8a9af](https://github.com/dequelabs/axe-core/commit/0f8a9af2a82d49e7d8ff3024da0e4c485ca46d38))
- **scrollable-region-focusable:** missing wcag213 tag ([#4201](https://github.com/dequelabs/axe-core/issues/4201)) ([0080a72](https://github.com/dequelabs/axe-core/commit/0080a7255eb7f246bb7b6f53974a95b65983b83a))
- **target-size:** always pass 10x targets (avoid perf bottleneck) ([#4376](https://github.com/dequelabs/axe-core/issues/4376)) ([be327c4](https://github.com/dequelabs/axe-core/commit/be327c422f67ac657218f711b3b799567ba3aa37))
- **target-size:** do not crash for nodes with many overlapping widgets ([#4373](https://github.com/dequelabs/axe-core/issues/4373)) ([1dbea83](https://github.com/dequelabs/axe-core/commit/1dbea83d4749f9f71f263883869b076b0d42021f)), closes [#4359](https://github.com/dequelabs/axe-core/issues/4359) [#4359](https://github.com/dequelabs/axe-core/issues/4359) [#4360](https://github.com/dequelabs/axe-core/issues/4360)
- **utils/get-selector:** ignore 'xmlns' attribute when generating a selector ([#4303](https://github.com/dequelabs/axe-core/issues/4303)) ([938b411](https://github.com/dequelabs/axe-core/commit/938b411bb0609b54e5c46a8e5b50c9ea4de4bdee))

### [4.8.4](https://github.com/dequelabs/axe-core/compare/v4.8.3...v4.8.4) (2024-02-07)

### Bug Fixes

- Add LICENSE-3RD-PARTY.txt file ([#4304](https://github.com/dequelabs/axe-core/issues/4304)) ([139c553](https://github.com/dequelabs/axe-core/commit/139c5535c72e926f03bb37a9ba0b7fd6b97cba8c))
- avoid reading element-specific node properties of non-element node types ([#4317](https://github.com/dequelabs/axe-core/issues/4317)) ([a2a6935](https://github.com/dequelabs/axe-core/commit/a2a69355ea5aafce14367cf967153f7958a8878c)), closes [#4316](https://github.com/dequelabs/axe-core/issues/4316) [#4316](https://github.com/dequelabs/axe-core/issues/4316)
- **d.ts:** RawNodesResult issues ([#4229](https://github.com/dequelabs/axe-core/issues/4229)) ([f105266](https://github.com/dequelabs/axe-core/commit/f1052662b3b8b57d520fcbd23a3e9d4a5660a7e1))
- **d.ts:** RunOptions.reporter can be any string ([#4218](https://github.com/dequelabs/axe-core/issues/4218)) ([80de793](https://github.com/dequelabs/axe-core/commit/80de793362bbbffde85654e874942a26df0108a8))
- **utils/get-selector:** ignore 'xmlns' attribute when generating a selector ([#4303](https://github.com/dequelabs/axe-core/issues/4303)) ([8c68546](https://github.com/dequelabs/axe-core/commit/8c6854661f4613d0b7a6ba98bbfdc0c9ca61b4d1))

### [4.8.3](https://github.com/dequelabs/axe-core/compare/v4.8.2...v4.8.3) (2023-12-18)

### Bug Fixes

- add Object.values polyfill for node <=6 ([#4274](https://github.com/dequelabs/axe-core/issues/4274)) ([b39b0e6](https://github.com/dequelabs/axe-core/commit/b39b0e60b68f8c1e34dc056809a04f8ccf8f24c7))

### [4.8.2](https://github.com/dequelabs/axe-core/compare/v4.8.1...v4.8.2) (2023-09-18)

### Bug Fixes

- polyfill Object.hasOwn for node 14 ([#4152](https://github.com/dequelabs/axe-core/issues/4152)) ([c7b597b](https://github.com/dequelabs/axe-core/commit/c7b597b9ec9c74009f4ddac16d5311ee642ab352))

### [4.8.1](https://github.com/dequelabs/axe-core/compare/v4.8.0...v4.8.1) (2023-09-08)

### Bug Fixes

- **target-size:** show closest offset in message ([#4151](https://github.com/dequelabs/axe-core/issues/4151)) ([a0882f6](https://github.com/dequelabs/axe-core/commit/a0882f64610279adce39b015c7e62bf955e04a22))

## [4.8.0](https://github.com/dequelabs/axe-core/compare/v4.7.2...v4.8.0) (2023-09-06)

### Consistent Rule Impact

This release changes it so that a rule never changes what impact it reports. To facilitate this while without changing the impact on certain issues, some rules have been split. The following changes were involved:

- Deprecate impact on checks; use rules instead ([#4114](https://github.com/dequelabs/axe-core/issues/4114)) ([2cc5547](https://github.com/dequelabs/axe-core/commit/2cc5547634ee783701675631ee3978129707e6f0))
- add rule aria-deprecated-role ([#4074](https://github.com/dequelabs/axe-core/issues/4074)) ([03f2771](https://github.com/dequelabs/axe-core/commit/03f2771ab43bd877b7919c29b4f5e737b5a69544))
- add rule aria-conditional-attr ([#4094](https://github.com/dequelabs/axe-core/issues/4094)) ([d417630](https://github.com/dequelabs/axe-core/commit/d417630e89a41603426c2bb545b49057f03ed8e5))
- **aria-input/toggle-field-name:** set impact always to serious ([#4095](https://github.com/dequelabs/axe-core/issues/4095)) ([e031d68](https://github.com/dequelabs/axe-core/commit/e031d68652229a80ba6ff7d02d29a50a846bfa5b))
- **aria-prohibited-attr:** add rule aria-prohibited-attr ([#4088](https://github.com/dequelabs/axe-core/issues/4088)) ([7b115d3](https://github.com/dequelabs/axe-core/commit/7b115d3a9e7256ae2c0a1d7d0f9ba791a06c8599))
- **impact:** aria-roles / aria-valid-attr-value is always "critical" ([#4112](https://github.com/dequelabs/axe-core/issues/4112)) ([5cc8041](https://github.com/dequelabs/axe-core/commit/5cc8041f74a6f015dcbca36ee7414767528277c2))
- **impact:** scope-attr-valid is always "moderate" ([#4113](https://github.com/dequelabs/axe-core/issues/4113)) ([131f552](https://github.com/dequelabs/axe-core/commit/131f5524e8c8022ace047ac6d69d779460c85fe6))

### Other Features

- deprecate & disable duplicate-id / duplicate-id-active ([#4071](https://github.com/dequelabs/axe-core/issues/4071)) ([733c45e](https://github.com/dequelabs/axe-core/commit/733c45e6a40a9f8ff6e75f7db864edff0b404ca2))
- **duplicate-id-aria:** set to review on fail and tag as wcag412 ([#4075](https://github.com/dequelabs/axe-core/issues/4075)) ([9f1a3e3](https://github.com/dequelabs/axe-core/commit/9f1a3e3cbffbe09eaf90fa254c6421fd4264cf4a))
- add EN.301.549 tags to rules ([#4063](https://github.com/dequelabs/axe-core/issues/4063)) ([de3da89](https://github.com/dequelabs/axe-core/commit/de3da897e56179d94ef8a0dc1a667b5663c489d1))
- **checks:** enable help-same-as-label, but remove from rules ([#4096](https://github.com/dequelabs/axe-core/issues/4096)) ([034038a](https://github.com/dequelabs/axe-core/commit/034038a625b390ed25b30fccc96e3fc1f384dbc1))
- **new-rule:** aria-braille-equivalent finds incorrect uses of aria-braille attributes ([#4107](https://github.com/dequelabs/axe-core/issues/4107)) ([6260a2f](https://github.com/dequelabs/axe-core/commit/6260a2f25781b465960aec0b1e7781be5496c9bd))
- **page-no-duplicate-banner/contentinfo:** deprecate options.nativeScopeFilter, take into ancestors with sectioning roles ([#4105](https://github.com/dequelabs/axe-core/issues/4105)) ([c6e07be](https://github.com/dequelabs/axe-core/commit/c6e07bec43ef1935f2afb9429e9f12a937c38f14))

### Type Fixes & Improvements

Various improvements were made to the types. Potentially the most impactful of which is that the `target` and `ancestry` property now return as `UnlabelledFrameSelector` instead of as `string[]`, which is incorrect for selectors involving shadow DOM. This may create some issues during migration for any code that has been incorrectly assuming these two properties have the `string[]` type. For more details and other type changes, see the commit itself:

- **d.ts:** improve axe.d.ts types ([#4081](https://github.com/dequelabs/axe-core/issues/4081)) ([7c5f991](https://github.com/dequelabs/axe-core/commit/7c5f99143a1d97e294d21e14917f4963013fc6f8)), closes [#3966](https://github.com/dequelabs/axe-core/issues/3966)

### Bug Fixes

- **access-name:** get name from header elements ([#4097](https://github.com/dequelabs/axe-core/issues/4097)) ([fbe99bf](https://github.com/dequelabs/axe-core/commit/fbe99bf87a3ebd7d6bc4b4eca7a58bbff28a5b23))
- add <search> element semantics ([#4115](https://github.com/dequelabs/axe-core/issues/4115)) ([637bf6c](https://github.com/dequelabs/axe-core/commit/637bf6c58c3e62877511687d8a6046f8aee63f03))
- **aria-allowed-attr:** pass aria-expanded on checkbox & switch ([#4110](https://github.com/dequelabs/axe-core/issues/4110)) ([fcf76e0](https://github.com/dequelabs/axe-core/commit/fcf76e04d8534dfed75caf1f2c4a74ef4faa29ae)), closes [#3339](https://github.com/dequelabs/axe-core/issues/3339)
- **aria-allowed-role:** Add doc-glossary to allowed roles for aside element ([#4083](https://github.com/dequelabs/axe-core/issues/4083)) ([6ca38f6](https://github.com/dequelabs/axe-core/commit/6ca38f65c28e9df0c429df1018b519394e22507e))
- **aria-allowed-role:** add meter to allowed roles for named img ([#4055](https://github.com/dequelabs/axe-core/issues/4055)) ([173f29d](https://github.com/dequelabs/axe-core/commit/173f29da9558a1fd0510609aacc9e4deebdf74b4)), closes [#4054](https://github.com/dequelabs/axe-core/issues/4054)
- **aria-required-childen:** test visibility of grandchildren ([#4091](https://github.com/dequelabs/axe-core/issues/4091)) ([a202b69](https://github.com/dequelabs/axe-core/commit/a202b69b955b45fc10abe06059925013bede07eb))
- **aria-text:** typo in rule description ([#4131](https://github.com/dequelabs/axe-core/issues/4131)) ([85a0e9c](https://github.com/dequelabs/axe-core/commit/85a0e9c358ae78b4ceb2093dc9891d523eaf25b2))
- **aria-valid-attr-value:** allow empty value on aria-braille\* & aria-valuetext ([#4109](https://github.com/dequelabs/axe-core/issues/4109)) ([c4c3e65](https://github.com/dequelabs/axe-core/commit/c4c3e658408d89b5ccd747d5fad9031c5d3a0de0))
- avoid memory issues by doing better cleanup ([#4059](https://github.com/dequelabs/axe-core/issues/4059)) ([16c5cfa](https://github.com/dequelabs/axe-core/commit/16c5cfa66615537b2131a5a381fbed9a5336d853))
- avoid problems from element IDs that exist on object prototype ([#4060](https://github.com/dequelabs/axe-core/issues/4060)) ([8d135dd](https://github.com/dequelabs/axe-core/commit/8d135dd58ccd72393b981464f66a01e770d9cf95))
- **color-contrast:** correctly handle flex and position ([#4086](https://github.com/dequelabs/axe-core/issues/4086)) ([9d5f496](https://github.com/dequelabs/axe-core/commit/9d5f496c4ee7e95d113cdceab284fb6ca7be98e3))
- **color-contrast:** get text stoke from offset shadows ([#4079](https://github.com/dequelabs/axe-core/issues/4079)) ([13acffe](https://github.com/dequelabs/axe-core/commit/13acffe540f834f5321f9c5c124b565cec92ce06))
- **color-contrast:** ignore format unicode characters ([#4102](https://github.com/dequelabs/axe-core/issues/4102)) ([049522e](https://github.com/dequelabs/axe-core/commit/049522e3ef0676b198763e39e8c8a300c8eeb195))
- **color-contrast:** ignore zero width characters ([#4103](https://github.com/dequelabs/axe-core/issues/4103)) ([4deb0a0](https://github.com/dequelabs/axe-core/commit/4deb0a0876d574c3d7d586b27ae07d4f5be586db))
- **color-contrast:** process non-rgb color functions ([#4092](https://github.com/dequelabs/axe-core/issues/4092)) ([9634282](https://github.com/dequelabs/axe-core/commit/963428256d7a119c7b6188868eb9d4a4651a8949))
- **commons/dom/createGrid:** only add the visible, non-overflow areas of an element to the grid ([#4101](https://github.com/dequelabs/axe-core/issues/4101)) ([d77f47b](https://github.com/dequelabs/axe-core/commit/d77f47b8dd346e205b6cddb4f6ce544ef5f699e4))
- ensure reporter errors can propagate ([#4111](https://github.com/dequelabs/axe-core/issues/4111)) ([080cc1b](https://github.com/dequelabs/axe-core/commit/080cc1b5f5ed048ab435c312dec291d1b4eb4393))
- ignore stylesheets fetching style tag in jsdom ([#4138](https://github.com/dequelabs/axe-core/issues/4138)) ([d7c16a4](https://github.com/dequelabs/axe-core/commit/d7c16a481d5a5f68c1e970040e01f125b2025378))
- **jsdom:** allow axe.setup() without a global window ([#4116](https://github.com/dequelabs/axe-core/issues/4116)) ([33b0314](https://github.com/dequelabs/axe-core/commit/33b0314922762c0e562b613219b5cc96e3ce31f5))
- **target-size:** correctly calculate bounding box ([#4125](https://github.com/dequelabs/axe-core/issues/4125)) ([1494b4c](https://github.com/dequelabs/axe-core/commit/1494b4c2159fbae2a937cc7c3dc1d269915ef4d4))
- **target-size:** update to match new spacing requirements ([#4117](https://github.com/dequelabs/axe-core/issues/4117)) ([49eaa0e](https://github.com/dequelabs/axe-core/commit/49eaa0e1663724f70b2571cc7393e306bf0c7321))
- Use correct copyright year ([#4098](https://github.com/dequelabs/axe-core/issues/4098)) ([cab6a2b](https://github.com/dequelabs/axe-core/commit/cab6a2b2f012f5963d0f4294217578c790508fcc))
- **utils/clone:** don't try to clone elements from different window context ([#4072](https://github.com/dequelabs/axe-core/issues/4072)) ([55000d0](https://github.com/dequelabs/axe-core/commit/55000d066f018e4c3f2b9ec4eabf23eb1781dfbb))

### [4.7.2](https://github.com/dequelabs/axe-core/compare/v4.7.1...v4.7.2) (2023-05-25)

### Bug Fixes

- **aria-allowed-attr:** Add 'aria-required' to switch role ([#4029](https://github.com/dequelabs/axe-core/issues/4029)) ([cb51be4](https://github.com/dequelabs/axe-core/commit/cb51be4e3ed69e8e8b3725cab5ad1a4671f64c0c)), closes [#4027](https://github.com/dequelabs/axe-core/issues/4027)
- **aria-allowed-attr:** allow aria-required on role=slider ([#4035](https://github.com/dequelabs/axe-core/issues/4035)) ([bb2bf60](https://github.com/dequelabs/axe-core/commit/bb2bf606d75409722c645a3b2e3240cbce7e97ef))
- **aria-required-children:** set related nodes for invalid children ([#4033](https://github.com/dequelabs/axe-core/issues/4033)) ([377f72b](https://github.com/dequelabs/axe-core/commit/377f72b16a4db5272b6c056a070e977dc0589cf5))
- **tags:** Add / correct several TTv5 tags ([#4031](https://github.com/dequelabs/axe-core/issues/4031)) ([25859dd](https://github.com/dequelabs/axe-core/commit/25859dd737e271f69e3912d69ede2a127d78caa4))

### [4.7.1](https://github.com/dequelabs/axe-core/compare/v4.7.0...v4.7.1) (2023-05-15)

### Bug Fixes

- **aria-allowed-attr:** no inconsistent aria-checked on HTML checkboxes ([#3895](https://github.com/dequelabs/axe-core/issues/3895)) ([704043e](https://github.com/dequelabs/axe-core/commit/704043e8a4b9359e871403c3b4fc294b9feee931))
- **aria-allowed-attrs:** add aria-expanded to allowed attrs for menuitemcheckbox and menuitemradio ([#3994](https://github.com/dequelabs/axe-core/issues/3994)) ([0f405c6](https://github.com/dequelabs/axe-core/commit/0f405c6da55570db2d536e2a4a5464865d73e821))
- **aria-required-children:** trigger reviewEmpty with hidden children ([#4012](https://github.com/dequelabs/axe-core/issues/4012)) ([a19b6cb](https://github.com/dequelabs/axe-core/commit/a19b6cb5252deb062f6170ab035d804742e7c1df))
- **color-contrast:** support CSS 4 color spaces ([#4020](https://github.com/dequelabs/axe-core/issues/4020)) ([65621c3](https://github.com/dequelabs/axe-core/commit/65621c339fd42798cb3ce66bac62865e62926e8c))
- **link-in-text-block:** set links with pseudo-content for review ([#4005](https://github.com/dequelabs/axe-core/issues/4005)) ([949f4f8](https://github.com/dequelabs/axe-core/commit/949f4f8dfccd018b88f929bd650dc8920ce4f6f0))

## [4.7.0](https://github.com/dequelabs/axe-core/compare/v4.6.3...v4.7.0) (2023-04-17)

### Features

- **aria-roledescription:** deprecate rule ([#3948](https://github.com/dequelabs/axe-core/issues/3948)) ([1913a9e](https://github.com/dequelabs/axe-core/commit/1913a9eaf0e669927c57d56710053303cda193f8))
- **aria-roles:** deprecate the ARIA directory role ([#3952](https://github.com/dequelabs/axe-core/issues/3952)) ([893fdd0](https://github.com/dequelabs/axe-core/commit/893fdd0901f9218d9add39c16b2e6b77227fbdcd))
- **d.ts:** setup/teardown, reporters & metadata definitions ([#3966](https://github.com/dequelabs/axe-core/issues/3966)) ([78264ee](https://github.com/dequelabs/axe-core/commit/78264ee663d528bc3fbfc9ea7dbba180259f01af))
- deprecate bower ([#3889](https://github.com/dequelabs/axe-core/issues/3889)) ([651d811](https://github.com/dequelabs/axe-core/commit/651d811f0f1d1dfc5ab899568eaeb83931011f34))
- deprecate color.filteredRectStack, color.getRectStack, and dom.visuallyContains ([#3859](https://github.com/dequelabs/axe-core/issues/3859)) ([3be2bad](https://github.com/dequelabs/axe-core/commit/3be2bad2a896e72a92fe70810500fc1ef67b7027))
- **dom.focusDisabled,dom.isVisibleForScreenreader:** support the inert attribute ([#3857](https://github.com/dequelabs/axe-core/issues/3857)) ([273c971](https://github.com/dequelabs/axe-core/commit/273c97199bd596a288378427becba672b4482678))
- **metadata:** add Trusted Tester tag ([#3986](https://github.com/dequelabs/axe-core/issues/3986)) ([1f6a2a6](https://github.com/dequelabs/axe-core/commit/1f6a2a68ac10c770091741b328de7efb2ccc6687))
- support the dialog element ([#3902](https://github.com/dequelabs/axe-core/issues/3902)) ([d4522cd](https://github.com/dequelabs/axe-core/commit/d4522cdd7a90018336098f9b2119e353bd5a71ee))

### Bug Fixes

- **aria-allowed-attrs:** allow aria-description and aria-braille\* attrs ([#3956](https://github.com/dequelabs/axe-core/issues/3956)) ([2842395](https://github.com/dequelabs/axe-core/commit/2842395f9a8990f670e7025749ff8301b68a15ae))
- **aria-input-field-name:** skip combobox popups ([#3886](https://github.com/dequelabs/axe-core/issues/3886)) ([3dcdd42](https://github.com/dequelabs/axe-core/commit/3dcdd42d9ce52817d0931aa4fea1ec2b1fc9d650))
- **aria-required-children:** allow separator in menu(bar) ([#3868](https://github.com/dequelabs/axe-core/issues/3868)) ([ec9f507](https://github.com/dequelabs/axe-core/commit/ec9f50708a233acfa4f9b851618077d6637e6582))
- **aria-required-children:** do not fail for children with aria-hidden ([#3949](https://github.com/dequelabs/axe-core/issues/3949)) ([8714d6b](https://github.com/dequelabs/axe-core/commit/8714d6ba6debec93d095f5f12385d92c55b0d4b3))
- **aria-required-children:** list elements that are not allowed ([#3951](https://github.com/dequelabs/axe-core/issues/3951)) ([cce7586](https://github.com/dequelabs/axe-core/commit/cce75869be032006dc505a2af853886943973319))
- **autocomplete-valid:** allow webauthn token ([#3866](https://github.com/dequelabs/axe-core/issues/3866)) ([fd3010f](https://github.com/dequelabs/axe-core/commit/fd3010ff74eb677d4a84198bb1ca314d54393cb7))
- **color-contrast:** correcly apply opacity to foreground color ([#3973](https://github.com/dequelabs/axe-core/issues/3973)) ([d7db279](https://github.com/dequelabs/axe-core/commit/d7db279549c443c1e2f43a6b33ebee0968c64325))
- **color-contrast:** correctly calculate contrast of flex/grid items with z-index ([#3884](https://github.com/dequelabs/axe-core/issues/3884)) ([cef96be](https://github.com/dequelabs/axe-core/commit/cef96be6740657047031c2019908822f957e6c63))
- **color-contrast:** correctly compute background color for elements with opacity ([#3944](https://github.com/dequelabs/axe-core/issues/3944)) ([c051fe8](https://github.com/dequelabs/axe-core/commit/c051fe851fb5eaa75e6dc0205c4db5e75d80f3a4)), closes [#3932](https://github.com/dequelabs/axe-core/issues/3932)
- **color-contrast:** correctly compute color contrast of <slot> elements ([#3847](https://github.com/dequelabs/axe-core/issues/3847)) ([4c3a00c](https://github.com/dequelabs/axe-core/commit/4c3a00c7bd6de68b2795be37113a59d804d0a313))
- **color-contrast:** do not check contrast on elemets that are inerted ([#3894](https://github.com/dequelabs/axe-core/issues/3894)) ([da19946](https://github.com/dequelabs/axe-core/commit/da19946db610c3ab8898431645274a8a76d61a33))
- **color-contrast:** skip ligature icons ([#3867](https://github.com/dequelabs/axe-core/issues/3867)) ([9486288](https://github.com/dequelabs/axe-core/commit/948628894e3119e7f6ad45a230fbee23ffe64ef2))
- **create-grid:** correctly compute stack order for non-positioned stacking contexts ([#3930](https://github.com/dequelabs/axe-core/issues/3930)) ([8db2c24](https://github.com/dequelabs/axe-core/commit/8db2c2492d55a903b7903ed71f8b792e58dc2e8c)), closes [#3932](https://github.com/dequelabs/axe-core/issues/3932)
- **css-orientation-lock:** support the css rotate property ([#3958](https://github.com/dequelabs/axe-core/issues/3958)) ([c51f8bf](https://github.com/dequelabs/axe-core/commit/c51f8bfea87b57c269e509f88d64855368a25493))
- **focus-order-semantics:** Add ARIA role article to list of valid roles for scrollable regions ([#3927](https://github.com/dequelabs/axe-core/issues/3927)) ([f029271](https://github.com/dequelabs/axe-core/commit/f0292714b94a1483f4148f3ca7206897cfb21318))
- **is-icon-ligature:** prevent canvas2d warning willReadFrequently ([#3931](https://github.com/dequelabs/axe-core/issues/3931)) ([b3c52bb](https://github.com/dequelabs/axe-core/commit/b3c52bbb6eccda67dabcbf4183d7c201a227a0ac))
- **link-in-text-block:** allow links with identical colors ([#3861](https://github.com/dequelabs/axe-core/issues/3861)) ([5f90040](https://github.com/dequelabs/axe-core/commit/5f900402470f925686a0d8b41ac01731492bbd30))
- **respondable:** work with CDP `Page.setDocumentContent` ([#3921](https://github.com/dequelabs/axe-core/issues/3921)) ([66f23e5](https://github.com/dequelabs/axe-core/commit/66f23e59b6deddd3b95035545d622d761abe5825))
- **scrollable-region-focusable:** change impact to serious ([#3959](https://github.com/dequelabs/axe-core/issues/3959)) ([e3a5c21](https://github.com/dequelabs/axe-core/commit/e3a5c211fe007736d98a16d69995318c2c651f2d))
- **scrollable-region-focusable:** skip native controls ([#3862](https://github.com/dequelabs/axe-core/issues/3862)) ([b0bdefa](https://github.com/dequelabs/axe-core/commit/b0bdefa34b85363e742ff04e319c014fe95f31f7))

### [4.6.3](https://github.com/dequelabs/axe-core/compare/v4.6.2...v4.6.3) (2023-01-23)

### Bug Fixes

- **aria-required-children:** allow separator in menu(bar) ([#3868](https://github.com/dequelabs/axe-core/issues/3868)) ([46c9499](https://github.com/dequelabs/axe-core/commit/46c9499ff46b2062098c33f2037ab31bff4fb656))
- **autocomplete-valid:** allow webauthn token ([#3866](https://github.com/dequelabs/axe-core/issues/3866)) ([a3d1b9d](https://github.com/dequelabs/axe-core/commit/a3d1b9dae840e1c6ad096895bbd3bbc19f6836f8))
- **color-contrast:** correctly compute color contrast of <slot> elements ([#3847](https://github.com/dequelabs/axe-core/issues/3847)) ([844cea1](https://github.com/dequelabs/axe-core/commit/844cea1238ccb30cc1c4d1510f2bb3d4cfbe1706))
- **color-contrast:** skip ligature icons ([#3867](https://github.com/dequelabs/axe-core/issues/3867)) ([7dfbd9a](https://github.com/dequelabs/axe-core/commit/7dfbd9a1b2c92a8aa289f42635ec93de9aa32d25))
- **link-in-text-block:** allow links with identical colors ([#3861](https://github.com/dequelabs/axe-core/issues/3861)) ([6761f36](https://github.com/dequelabs/axe-core/commit/6761f36bb7c9a2f05cea75ca88c8e0f199c032df))
- **scrollable-region-focusable:** skip native controls ([#3862](https://github.com/dequelabs/axe-core/issues/3862)) ([aaf44e9](https://github.com/dequelabs/axe-core/commit/aaf44e908337cbf81c97433f58ec05cd3b3eeded))

### [4.6.2](https://github.com/dequelabs/axe-core/compare/v4.6.1...v4.6.2) (2022-12-23)

### Bug Fixes

- **color-contrast:** fix color-contrast check when running in an extension ([#3838](https://github.com/dequelabs/axe-core/issues/3838)) ([31a3e01](https://github.com/dequelabs/axe-core/commit/31a3e01e3df2ff4ab9ae4eebe93c644ce706a200))

### [4.6.1](https://github.com/dequelabs/axe-core/compare/v4.6.0...v4.6.1) (2022-12-14)

### Bug Fixes

- **d.ts:** add optional include to ContextObject ([#3830](https://github.com/dequelabs/axe-core/issues/3830)) ([36ed242](https://github.com/dequelabs/axe-core/commit/36ed242ec152d6d9bd05889229c4d37ae25a80c0))

## [4.6.0](https://github.com/dequelabs/axe-core/compare/v4.5.2...v4.6.0) (2022-12-12)

### Features

- **aria-required-attr:** require aria-controls on combobox and aria-valuenow on focusable separator ([#3786](https://github.com/dequelabs/axe-core/issues/3786)) ([5259e88](https://github.com/dequelabs/axe-core/commit/5259e8842e49d291d35aada0fefecfde3627299f))
- **checks/label-content-name-mismatch:** deprecate occuranceThreshold option in favor of occurrenceThreshold to fix typo ([#3782](https://github.com/dequelabs/axe-core/issues/3782)) ([5026d65](https://github.com/dequelabs/axe-core/commit/5026d65b5c93ca7ad1e52881fb5379a4a75ed9a1))
- **commons:** deprecate flattenShadowColors in favor of flattenColors ([#3792](https://github.com/dequelabs/axe-core/issues/3792)) ([af49daf](https://github.com/dequelabs/axe-core/commit/af49dafcde281443823c2d878ce4de23ee573212))
- **context:** allow selecting shadow DOM nodes ([#3798](https://github.com/dequelabs/axe-core/issues/3798)) ([9e1e31b](https://github.com/dequelabs/axe-core/commit/9e1e31b253398cc2a3e840c7cb9c5527f4e4ba66))
- **list,listitem:** do not allow group as allowed parent or child ([#3784](https://github.com/dequelabs/axe-core/issues/3784)) ([d1cbf6f](https://github.com/dequelabs/axe-core/commit/d1cbf6fe20a1920649566e521c0c6668efd0d470))
- **required-attr:** require aria-checked for checkbox-like and radio-like roles ([#3785](https://github.com/dequelabs/axe-core/issues/3785)) ([563e4e9](https://github.com/dequelabs/axe-core/commit/563e4e90facc9b955c1b2395b466cd65d72bf04e))
- **utils:** new shadowSelectAll utility ([#3796](https://github.com/dequelabs/axe-core/issues/3796)) ([5865462](https://github.com/dequelabs/axe-core/commit/586546261a9523077e1710cecf1751a5e6f172e6))

### Bug Fixes

- **aria-allowed-role:** allow combobox on button, checkbox and combobox on input[type=button] ([#3354](https://github.com/dequelabs/axe-core/issues/3354)) ([ac688c0](https://github.com/dequelabs/axe-core/commit/ac688c04b70d6bcdfa13ac4d7faf824d2bc4af01)), closes [#3353](https://github.com/dequelabs/axe-core/issues/3353)
- **aria-required-children:** allow menu as child of menu ([#3820](https://github.com/dequelabs/axe-core/issues/3820)) ([a6569e5](https://github.com/dequelabs/axe-core/commit/a6569e5dcad2fd32160b78fba86c988e7cb3d323))
- **color-contrast:** consider -webkit-text-stroke & -webkit-text-fill-color ([#3791](https://github.com/dequelabs/axe-core/issues/3791)) ([228daf1](https://github.com/dequelabs/axe-core/commit/228daf153b3c6e45933a2ca8feac765f942663f4))
- **color-contrast:** correctly calculate background color of text nodes with different size than their container ([#3703](https://github.com/dequelabs/axe-core/issues/3703)) ([123b83c](https://github.com/dequelabs/axe-core/commit/123b83c00f0e770dd784ce72ab1fddddf4a4961e))
- **get-role:** handle presentation role inheritance for vnodes with no parent ([#3801](https://github.com/dequelabs/axe-core/issues/3801)) ([b971caf](https://github.com/dequelabs/axe-core/commit/b971caf3eea03170c0710c5b00272fe13f65e825))
- **html-lang-valid:** only run rule when attribute has value ([#3663](https://github.com/dequelabs/axe-core/issues/3663)) ([1a7eecb](https://github.com/dequelabs/axe-core/commit/1a7eecb72c3b1c772392b7c18feee75e0f51dbcb)), closes [#3624](https://github.com/dequelabs/axe-core/issues/3624)
- **metadata:** Map aria-required-children to ACT rule bc4a75 ([#3790](https://github.com/dequelabs/axe-core/issues/3790)) ([a33a523](https://github.com/dequelabs/axe-core/commit/a33a523eb4dfdc62743d78aab124e74afc98a59e))

### [4.5.2](https://github.com/dequelabs/axe-core/compare/v4.5.1...v4.5.2) (2022-11-14)

### Bug Fixes

- **aria-required-children:** allow menu and menubar to be empty ([#3770](https://github.com/dequelabs/axe-core/issues/3770)) ([d11aed8](https://github.com/dequelabs/axe-core/commit/d11aed8a04968674ff872cf832cea9252023490e))
- **create-grid:** include elements scrolled out of view in the grid ([#3773](https://github.com/dequelabs/axe-core/issues/3773)) ([a563263](https://github.com/dequelabs/axe-core/commit/a5632631c72f52a5cf38a955052f28b1a931f07c))
- do not warn when using webpack ([#3777](https://github.com/dequelabs/axe-core/issues/3777)) ([d6cef9a](https://github.com/dequelabs/axe-core/commit/d6cef9a83152256966b259881521c159b0cf21a8))
- **link-in-text-block:** don't match style or script text ([#3775](https://github.com/dequelabs/axe-core/issues/3775)) ([ab877f9](https://github.com/dequelabs/axe-core/commit/ab877f9d709205c2dadffc656f82dc631b66687b))
- prevent undefined relatedNodes from halting axe ([#3778](https://github.com/dequelabs/axe-core/issues/3778)) ([efefb18](https://github.com/dequelabs/axe-core/commit/efefb18f720590369a97c2937331f4e2e33ef6a5))

### [4.5.1](https://github.com/dequelabs/axe-core/compare/v4.5.0...v4.5.1) (2022-11-01)

### Bug Fixes

- allow axe to run in certain configurations of jsdom ([#3755](https://github.com/dequelabs/axe-core/issues/3755)) ([b74c5d4](https://github.com/dequelabs/axe-core/commit/b74c5d41c4041554c9dd1c00dfd6387cb069d1a5))
- prevent crash on jsdom when preloading CSSOM ([#3754](https://github.com/dequelabs/axe-core/issues/3754)) ([b1f0c6b](https://github.com/dequelabs/axe-core/commit/b1f0c6bba2debc6c6a106412da530975cd4ade24))

## [4.5.0](https://github.com/dequelabs/axe-core/compare/v4.4.3...v4.5.0) (2022-10-17)

### Features

#### Highlights

- **new rule:** Add WCAG 2.2 target-size rule (off by default) ([#3616](https://github.com/dequelabs/axe-core/issues/3616)) ([691f1b6](https://github.com/dequelabs/axe-core/commit/691f1b69775daa8d0a620c5a1b72f06f6edc72c3))
- **new rule:** Add meta-refresh-no-exceptions (off by default, wcag2aaa) ([#3530](https://github.com/dequelabs/axe-core/issues/3530)) ([27031a8](https://github.com/dequelabs/axe-core/commit/27031a827cf273c87449971a4c6aec467e56986d))
- **identical-links-same-purpose:** Disable by default (wcag2aaa rule) ([#3615](https://github.com/dequelabs/axe-core/issues/3615)) ([a2c2d2f](https://github.com/dequelabs/axe-core/commit/a2c2d2fba67270b16f2421984650cadc91c8f928))
- **link-in-text-block:** Remove experimental and enable by default ([#3706](https://github.com/dequelabs/axe-core/issues/3706)) ([37b6e7a](https://github.com/dequelabs/axe-core/commit/37b6e7a56f7fae15553ce103787546c8927a6492))
- **i18n:** Add Norwegian Bokmål locale ([#3375](https://github.com/dequelabs/axe-core/issues/3375)) ([2886d33](https://github.com/dequelabs/axe-core/commit/2886d330d9bd7193947b6f8d650492efdd7b04ec))
- **i18n:** Add Hebrew translation ([#3438](https://github.com/dequelabs/axe-core/issues/3438)) ([b4162ed](https://github.com/dequelabs/axe-core/commit/b4162ed181d47370284e2fbbd56d4ec9b4585d69))

#### Tags and Metadata Updates

Various changes of tags, for greater consistency with [ACT Rules](https://www.w3.org/WAI/standards-guidelines/act/rules/).

- **area-alt:** Remove the wcag111 tag ([#3479](https://github.com/dequelabs/axe-core/issues/3479)) ([1c3cc51](https://github.com/dequelabs/axe-core/commit/1c3cc510057398bdbe2735da87bebbc2781f8e69))
- **aria-hidden-focus:** Remove the wcag131 tag ([#3477](https://github.com/dequelabs/axe-core/issues/3477)) ([36ace76](https://github.com/dequelabs/axe-core/commit/36ace76cd3b3706b19e59dc5168a77a5462e78b6))
- **empty-table-headers:** Rule is now best-practice and fails instead of incompletes ([#3427](https://github.com/dequelabs/axe-core/issues/3427)) ([0a4397d](https://github.com/dequelabs/axe-core/commit/0a4397d0998a3e3035d002e5f724cce4faf0b541)), closes [#3404](https://github.com/dequelabs/axe-core/issues/3404)
- **frame-title:** Remove wcag241 tag ([#3519](https://github.com/dequelabs/axe-core/issues/3519)) ([9c6b828](https://github.com/dequelabs/axe-core/commit/9c6b828658d0a566e7b41801979e49115732bc86))
- **input-image-alt:** Add the wcag412 tag ([#3478](https://github.com/dequelabs/axe-core/issues/3478)) ([34272c6](https://github.com/dequelabs/axe-core/commit/34272c6469ff84b5aafd6ae575c5064931a62d80))
- **label,select-name:** Remove the sc131 tag ([#3476](https://github.com/dequelabs/axe-core/issues/3476)) ([7caef89](https://github.com/dequelabs/axe-core/commit/7caef89cdd0eddce7550b590eda3fb0cdc9be3ac))
- **meta-viewport:** Report as violation of wcag 1.4.4 ([#3704](https://github.com/dequelabs/axe-core/issues/3704)) ([6f7e4a9](https://github.com/dequelabs/axe-core/commit/6f7e4a9c08d0a9c8a9f74832883be9052a63684d))
- **metadata:** Update ACT tags & actIds ([#3498](https://github.com/dequelabs/axe-core/issues/3498)) ([571722b](https://github.com/dequelabs/axe-core/commit/571722bde4c2e0b84d7abdeece91a03e7b6613c8))

#### Deprecations

- Deprecate Internet Explorer support ([#3644](https://github.com/dequelabs/axe-core/issues/3644)) ([11f5163](https://github.com/dequelabs/axe-core/commit/11f51632491e265136c0284cd219225627a7415f))
- Deprecate sri-history.json file ([#3646](https://github.com/dequelabs/axe-core/issues/3646)) ([6f6a89e](https://github.com/dequelabs/axe-core/commit/6f6a89e13d56acdda5dbcc74d1f2d7ba2190f0a6))
- Deprecate and replace dom.isVisible, utils.isHidden, and dom.isHiddenWithCss ([#3351](https://github.com/dequelabs/axe-core/issues/3351)) ([1ae2ac0](https://github.com/dequelabs/axe-core/commit/1ae2ac045d1f709d1695fa76886e13604d415229))
- Deprecate only-dlitems-evaluate & only-listitems-evaluate methods ([#3724](https://github.com/dequelabs/axe-core/issues/3724)) ([322e9ed](https://github.com/dequelabs/axe-core/commit/322e9edff389d407021d94a7dadf9b80e1c935de))
- Deprecate presentation-role-conflict-matchess ([#3638](https://github.com/dequelabs/axe-core/issues/3638)) ([0f02a15](https://github.com/dequelabs/axe-core/commit/0f02a1530b91dd38cbc620e358e403f5250cba4c))
- Deprecate is-visible-matches, use is-visible-on-screen-matches ([#3679](https://github.com/dequelabs/axe-core/issues/3679)) ([738dd8f](https://github.com/dequelabs/axe-core/commit/738dd8f38f241c061773b44dba3194281749eb15))
- Deprecate not-html-matches, use :not(html) instead ([#3540](https://github.com/dequelabs/axe-core/issues/3540)) ([e0010d9](https://github.com/dequelabs/axe-core/commit/e0010d9f2c4f80b41dcd1e1821de269dd5a63dac))

#### Others

- **aria-roles:** Permit fallback roles ([#3683](https://github.com/dequelabs/axe-core/issues/3683)) ([5665260](https://github.com/dequelabs/axe-core/commit/5665260320543665d9df2b8620940b553bf17a19))
- **aria-required-children:** Allow aria-busy on children ([#3569](https://github.com/dequelabs/axe-core/issues/3569)) ([3618f50](https://github.com/dequelabs/axe-core/commit/3618f5017b698bfa7ebd5d36e37978ed8d2e77f9))
- **aria-required-children:** Fail for children which are not listed as required ([#3597](https://github.com/dequelabs/axe-core/issues/3597)) ([b5ceabc](https://github.com/dequelabs/axe-core/commit/b5ceabc25e4a17e8f3c114acdb1c2fe0d2ba96f3))
- **getRules:** Return actIds when set ([#3470](https://github.com/dequelabs/axe-core/issues/3470)) ([a3d5cef](https://github.com/dequelabs/axe-core/commit/a3d5cef612013ffe0db5383a4047508654444d3c))
- **is-in-tab-order:** Add isInTabOrder to commons ([#3619](https://github.com/dequelabs/axe-core/issues/3619)) ([77afe90](https://github.com/dequelabs/axe-core/commit/77afe903484343500ebe5fe6126cf6e029607f64)), closes [#3500](https://github.com/dequelabs/axe-core/issues/3500)
- **list/definition-list:** Only allow required owned roles ([#3707](https://github.com/dequelabs/axe-core/issues/3707)) ([a920d35](https://github.com/dequelabs/axe-core/commit/a920d35f8d8e6f3590a01d47f20a0e3321e45a6c))
- **presentation-role-conflict:** Test img elements with empty alt ([#3717](https://github.com/dequelabs/axe-core/issues/3717)) ([ea32fa7](https://github.com/dequelabs/axe-core/commit/ea32fa794bfc72e863997dfa85a60e23a53f0cda))

### Bug Fixes

- **utils:** greatly improve the speed of querySelectorAll ([#3423](https://github.com/dequelabs/axe-core/issues/3423)) ([1cae5ea](https://github.com/dequelabs/axe-core/commit/1cae5eae49abe01e6f84c8ee18b5b0c2ff700492))
- **aria-hidden-focus:** Do not fail for focus trap bumper elements ([#3667](https://github.com/dequelabs/axe-core/issues/3667)) ([46b6658](https://github.com/dequelabs/axe-core/commit/46b6658af6ee21735b59c4c00455c13dddbce761))
- **aria-required-attr:** aria-valuenow is no longer required for spinbutton ([#3552](https://github.com/dequelabs/axe-core/issues/3552)) ([a22cf56](https://github.com/dequelabs/axe-core/commit/a22cf564be1f3e73fc21bff59ba895d34755f889))
- **aria-required-parent:** Allow nested group and presentational roles ([#3492](https://github.com/dequelabs/axe-core/issues/3492)) ([4685270](https://github.com/dequelabs/axe-core/commit/4685270af0d1f737d38a0c06b59137c967679227))
- **aria-valid-attr-value:** Report empty values as incomplete ([#3635](https://github.com/dequelabs/axe-core/issues/3635)) ([fff39db](https://github.com/dequelabs/axe-core/commit/fff39dba1408d2a11b15485191b843b0661e0790))
- **avoid-inline-spacing:** Add spacing threshold ([#3533](https://github.com/dequelabs/axe-core/issues/3533)) ([92add05](https://github.com/dequelabs/axe-core/commit/92add056355cc4106caaaf523854f82afb06e191))
- **checks/no-focusable-disable:** Don't count non-disableable elements as disabled ([#3393](https://github.com/dequelabs/axe-core/issues/3393)) ([bb8b5ca](https://github.com/dequelabs/axe-core/commit/bb8b5ca760f45755ba628ac5873350b5dc4c47d1)), closes [#2466](https://github.com/dequelabs/axe-core/issues/2466) [#2934](https://github.com/dequelabs/axe-core/issues/2934) [#2934](https://github.com/dequelabs/axe-core/issues/2934) [#3315](https://github.com/dequelabs/axe-core/issues/3315)
- **checks/unsupportedrole:** Support unsupported dpub and fallback roles, add role to message ([#3395](https://github.com/dequelabs/axe-core/issues/3395)) ([3c0f10f](https://github.com/dequelabs/axe-core/commit/3c0f10f979ae1e3377dd6ef0d2b445ea5ec90eb3)), closes [#2466](https://github.com/dequelabs/axe-core/issues/2466) [#2934](https://github.com/dequelabs/axe-core/issues/2934) [#2934](https://github.com/dequelabs/axe-core/issues/2934) [#3282](https://github.com/dequelabs/axe-core/issues/3282)
- **color-contrast-enhanced:** Avoid duplicates between color-contrast and color-contrast-enhanced ([#3714](https://github.com/dequelabs/axe-core/issues/3714)) ([2811f77](https://github.com/dequelabs/axe-core/commit/2811f778e1d0293148375bb4028d5ba0379f1b21))
- **color-contrast:** Correctly determine color contrast for element that exactly overlaps midpoint of node ([#3565](https://github.com/dequelabs/axe-core/issues/3565)) ([90de9aa](https://github.com/dequelabs/axe-core/commit/90de9aa241d9dbbd39ccb2714194ae3a7c0cb2ce))
- **frame-focusable-content:** don't fail for elements with negative tabindex ([#3493](https://github.com/dequelabs/axe-core/issues/3493)) ([94e75ac](https://github.com/dequelabs/axe-core/commit/94e75ac80689145297fbc2dc8298b772412c7525))
- **frame-title-unique:** Make frame-title-unique reviewOnly and WCAG412 ([#3610](https://github.com/dequelabs/axe-core/issues/3610)) ([8401b8e](https://github.com/dequelabs/axe-core/commit/8401b8e8fbf691d8252e090b13864b826c5e8591)), closes [#3487](https://github.com/dequelabs/axe-core/issues/3487)
- **frame-title:** ignore frames with negative tabindex ([f61f825](https://github.com/dequelabs/axe-core/commit/f61f825843ec323fbe7ebb7096bf4c7341f10feb))
- **frame-title:** return incomplete for presentational iframe with empty title ([#3594](https://github.com/dequelabs/axe-core/issues/3594)) ([c2cfd84](https://github.com/dequelabs/axe-core/commit/c2cfd845bd1b0ff684b9cda4f7fb5f6f30fcfda7))
- **is-hidden-for-everyone:** count elements inside closed details as hidden ([#3726](https://github.com/dequelabs/axe-core/issues/3726)) ([e65e962](https://github.com/dequelabs/axe-core/commit/e65e9627cd709f6202dd2151ba39bac5a50a8fbb))
- **is-hidden-for-everyone:** support content-visibility: hidden ([#3690](https://github.com/dequelabs/axe-core/issues/3690)) ([95cf6e7](https://github.com/dequelabs/axe-core/commit/95cf6e7c3019358570b7dd7ea1206ce24a980b65))
- **is-visible-on-screen:** ignore elements hidden by overflow:hidden ([#3676](https://github.com/dequelabs/axe-core/issues/3676)) ([2935950](https://github.com/dequelabs/axe-core/commit/293595066cea9a5c18d2ed7bf4de69cbfffe1ed1))
- **label:** avoid passing labels because of an input[value] ([#3688](https://github.com/dequelabs/axe-core/issues/3688)) ([54a8116](https://github.com/dequelabs/axe-core/commit/54a8116546b056569d1551b8ea3c8b01fa7d8df5))
- **link-in-text-block:** Update rule to match current guidance, revise tests ([#3575](https://github.com/dequelabs/axe-core/issues/3575)) ([edb88ed](https://github.com/dequelabs/axe-core/commit/edb88edf48e91df87497b471e1b101842adf9e1f))
- **meta-refresh:** Add WCAG's 20-hour exception ([#3525](https://github.com/dequelabs/axe-core/issues/3525)) ([5beb6c3](https://github.com/dequelabs/axe-core/commit/5beb6c3c31936a8cb787709ef2bd11730916b5b2))
- **no-autoplay-audio:** add reviewOnFail and update tests ([#3557](https://github.com/dequelabs/axe-core/issues/3557)) ([60ec997](https://github.com/dequelabs/axe-core/commit/60ec99735b2872d7f992b379900acd25918e3f86))
- **object-alt:** ignore unloaded objects ([#3680](https://github.com/dequelabs/axe-core/issues/3680)) ([8e03e2c](https://github.com/dequelabs/axe-core/commit/8e03e2cabe628b036a48575ec84569e7e0e333ae))
- **page-has-heading-one,landmark-one-main:** do not fail if modal is open ([#3501](https://github.com/dequelabs/axe-core/issues/3501)) ([c6af316](https://github.com/dequelabs/axe-core/commit/c6af31600a804f1643d404e439391f3b810e8da5))
- **td-headers-attr:** ignore hidden cells with headers attr ([#3684](https://github.com/dequelabs/axe-core/issues/3684)) ([e0403f4](https://github.com/dequelabs/axe-core/commit/e0403f48ee86e883548cd1f40927a3b5edaeb974))
- **td-headers-attr:** ignore table elements with their role changed ([#3687](https://github.com/dequelabs/axe-core/issues/3687)) ([902d07c](https://github.com/dequelabs/axe-core/commit/902d07c8d2268dc4ab0a6573909bd348ede706b1))
- **utils.matches:** fix attribute exists selector to match empty attributes ([#3669](https://github.com/dequelabs/axe-core/issues/3669)) ([4b768ea](https://github.com/dequelabs/axe-core/commit/4b768ea2170291038be80b29f277206f21719dff))
- **valid-lang:** ignore lang on elements with no text ([#3523](https://github.com/dequelabs/axe-core/issues/3523)) ([fd85f39](https://github.com/dequelabs/axe-core/commit/fd85f3927ef85543887ff9c0bda67e46f8e9c316))
- **valid-lang:** run on aria-hidden text ([#3634](https://github.com/dequelabs/axe-core/issues/3634)) ([a0860bd](https://github.com/dequelabs/axe-core/commit/a0860bd7b5afaabf8f2aee2bd516b9015eb7b5cf))
- **video-caption:** remove excludeHidden: false ([#3554](https://github.com/dequelabs/axe-core/issues/3554)) ([a3e4bbe](https://github.com/dequelabs/axe-core/commit/a3e4bbec30fd7cf0f197fdf69d0886cd475b06c1))

### [4.4.3](https://github.com/dequelabs/axe-core/compare/v4.4.2...v4.4.3) (2022-07-13)

### Bug Fixes

- **axe.d.ts:** updates type definition for Rule to add reviewOnFail ([#3521](https://github.com/dequelabs/axe-core/issues/3521)) ([afb2478](https://github.com/dequelabs/axe-core/commit/afb247844e697475f5bf81fd7b03ed30c2c65830))
- Continue supporting Node >=4 ([#3538](https://github.com/dequelabs/axe-core/issues/3538)) ([da7923b](https://github.com/dequelabs/axe-core/commit/da7923bd5bcaa71f52f6b4e6b8eece1ea12c1c2a)), closes [#3537](https://github.com/dequelabs/axe-core/issues/3537)

### [4.4.2](https://github.com/dequelabs/axe-core/compare/v4.4.1...v4.4.2) (2022-05-12)

### Bug Fixes

- **aria-hidden-focusable:** report incomplete with onfocus ([#3407](https://github.com/dequelabs/axe-core/issues/3407)) ([6755e89](https://github.com/dequelabs/axe-core/commit/6755e8961389ba2fcf87c7877737482b819a0553))
- **aria-hidden-focus:** Update rule help & description ([#3422](https://github.com/dequelabs/axe-core/issues/3422)) ([7cfb4b1](https://github.com/dequelabs/axe-core/commit/7cfb4b1c468231022838bbbe9edef69fa50de891))
- **aria-valid-attr-value:** add note about element id being in a different shadow DOM tree ([#3421](https://github.com/dequelabs/axe-core/issues/3421)) ([24f74df](https://github.com/dequelabs/axe-core/commit/24f74df8474cfd4f602cb368563955ff42cc2870))
- **color-contrast:** consistently return color contrast information in the data object for pseudo elements ([#3453](https://github.com/dequelabs/axe-core/issues/3453)) ([1a9d95e](https://github.com/dequelabs/axe-core/commit/1a9d95effeaca26e2d7cf7aa867e6a76f8cf50ad))
- **deprecatedrole,color-contrast:** fix message to properly include deprecated role, improve color-contrast pass messages ([#3387](https://github.com/dequelabs/axe-core/issues/3387)) ([650e503](https://github.com/dequelabs/axe-core/commit/650e5037dc1f8908897e834ee1ab3aa8e87ac1e7))
- **html-elms:** update role allowances for nav element ([#3402](https://github.com/dequelabs/axe-core/issues/3402)) ([8aa816a](https://github.com/dequelabs/axe-core/commit/8aa816a15fbd667ee2bf8256a984dcc8aa7c0392)), closes [#3401](https://github.com/dequelabs/axe-core/issues/3401)
- **standards:** fix address typo in html-elms.js ([#3418](https://github.com/dequelabs/axe-core/issues/3418)) ([f235cc7](https://github.com/dequelabs/axe-core/commit/f235cc7069734096df8db434d4c1e68f11fcc88d)), closes [#3417](https://github.com/dequelabs/axe-core/issues/3417)

## [4.4.1](https://github.com/dequelabs/axe-core/compare/v4.4.0...v4.4.1) (2022-02-03)

### Bug Fixes

- **DPUB:** deprecate endnote, rather than endnotes (plural) ([#3373](https://github.com/dequelabs/axe-core/issues/3373)) ([1ba9917](https://github.com/dequelabs/axe-core/pull/3377/commits/1ba9917801df9194092769c7c58f048884bc25fd))
- **d.ts:** correct getFrameContexts return type ([#3370](https://github.com/dequelabs/axe-core/issues/3370)) ([a1b9611](https://github.com/dequelabs/axe-core/commit/a1b96113add29756a421e3934cb089d3734dec16))

## [4.4.0](https://github.com/dequelabs/axe-core/compare/v4.3.5...v4.4.0) (2022-01-26)

### Features

- add new ARIA roles ([#3138](https://github.com/dequelabs/axe-core/issues/3138)) ([61be7e5](https://github.com/dequelabs/axe-core/commit/61be7e555152d89c6770679fd6fdac10038f7cd3))
- **aria-allowed-attr:** report violation for non-global ARIA attrs on element without role ([#3342](https://github.com/dequelabs/axe-core/issues/3342)) ([fb5d990](https://github.com/dequelabs/axe-core/commit/fb5d99005cf5e989a51b276b88ad67011cc02d49))
- **aria-allowed-attr:** report violations for non-global ARIA attributes on elements without a role ([#3102](https://github.com/dequelabs/axe-core/issues/3102)) ([87cfc0b](https://github.com/dequelabs/axe-core/commit/87cfc0b4f4d998a88a2d534438e4f2ccf9427a86))
- **color-contrast:** add support for CSS mix-blend-mode ([#3226](https://github.com/dequelabs/axe-core/issues/3226)) ([d497f40](https://github.com/dequelabs/axe-core/commit/d497f40026ba2266e31e7e8802511eb242ef0066))
- **commons:** deprecate shadowElementsFromPoint ([#3311](https://github.com/dequelabs/axe-core/issues/3311)) ([c3a7d16](https://github.com/dequelabs/axe-core/commit/c3a7d1648d0e319003f573f6b4cfe94a1a043808))
- **configure:** Deprecate branding: Object, use a string instead. ([#3278](https://github.com/dequelabs/axe-core/issues/3278)) ([1f01309](https://github.com/dequelabs/axe-core/commit/1f0130993b64e2016fcc9ea17f63f8da380de513))
- **dpub:** upgrade to DPUB 1.1 and report deprecated roles ([#3280](https://github.com/dequelabs/axe-core/issues/3280)) ([034a846](https://github.com/dequelabs/axe-core/commit/034a846cf38bff4ff5836b22c78c0f44e2cb3f6d))
- **options:** make axe.ping configurable with pingWaitTime ([#3273](https://github.com/dequelabs/axe-core/issues/3273)) ([ce4dfaf](https://github.com/dequelabs/axe-core/commit/ce4dfaff7b98c69e15290b71f76e1c523c78ed8d))
- **rule:** add new color-contrast-enhanced rule (WCAG AAA) ([#3235](https://github.com/dequelabs/axe-core/issues/3235)) ([bec20fc](https://github.com/dequelabs/axe-core/commit/bec20fcbf2f407ecab2fc6d0d829d23525989d48)), closes [#2934](https://github.com/dequelabs/axe-core/issues/2934)

### Bug Fixes

- **allowed-role:** area without href can have a button or link role ([#3275](https://github.com/dequelabs/axe-core/issues/3275)) ([bf7e60a](https://github.com/dequelabs/axe-core/commit/bf7e60aad9b00844c2b18691d463d5478b53aa2a))
- **aria-allowed-attr:** check for invalid `aria-attributes` for `role="row"` ([#3160](https://github.com/dequelabs/axe-core/issues/3160)) ([cfa900d](https://github.com/dequelabs/axe-core/commit/cfa900d57265907b638dad36ba405a5b40dbde9c))
- **aria-allowed-attr:** revert violation for non-global ARIA attrs on element without role ([#3243](https://github.com/dequelabs/axe-core/issues/3243)) ([112b960](https://github.com/dequelabs/axe-core/commit/112b960ee95b6a6abfb38a15b7092d9847512f0f))
- **aria-allowed-children,aria-allowed-parent:** allow group role in listbox ([#3195](https://github.com/dequelabs/axe-core/issues/3195)) ([cb01975](https://github.com/dequelabs/axe-core/commit/cb019755d9cb52b997aae340f406ac26d0cf90e5))
- **aria-allowed-role:** allow title, aria-label and aria-labelledby on a img element with a supported role ([#3224](https://github.com/dequelabs/axe-core/issues/3224)) ([006a681](https://github.com/dequelabs/axe-core/commit/006a681395422bbd0603bab346dbdc6b38087d83))
- **aria-allowed-role:** landmark roles banner on header and contentinfo on footer to only report on top-level rule ([#3142](https://github.com/dequelabs/axe-core/issues/3142)) ([1fd4b00](https://github.com/dequelabs/axe-core/commit/1fd4b004b2543727d4a3775f355934327765baa1))
- **aria-allowed-roles:** allow role=radio on img with non-empty name ([#3320](https://github.com/dequelabs/axe-core/issues/3320)) ([accafdf](https://github.com/dequelabs/axe-core/commit/accafdfe170b8ad4b3706134d60808a614e40b00))
- **aria-allowed-roles:** update role allowances for section element ([#3238](https://github.com/dequelabs/axe-core/issues/3238)) ([99676ec](https://github.com/dequelabs/axe-core/commit/99676ece547be39d71e776a5b9cae2da41c31572)), closes [#3237](https://github.com/dequelabs/axe-core/issues/3237)
- **aria-allowed-role:** Update allowed roles based on ARIA spec updates ([#3124](https://github.com/dequelabs/axe-core/issues/3124)) ([00f6efc](https://github.com/dequelabs/axe-core/commit/00f6efcd55eb0a4c56cc3ca1acc7c79e3d22f58d))
- **aria-allowed-role:** updates the allowed roles for the wbr element to none and presentation ([#3192](https://github.com/dequelabs/axe-core/issues/3192)) ([2f439b3](https://github.com/dequelabs/axe-core/commit/2f439b3fdb7e7fa3228e663c5313af0f08aa4327)), closes [#3177](https://github.com/dequelabs/axe-core/issues/3177)
- **aria-prohibited-attr:** update metadata message ([#3206](https://github.com/dequelabs/axe-core/issues/3206)) ([d1a768e](https://github.com/dequelabs/axe-core/commit/d1a768eaefe6d1c95e925174bc979bc7a95ee7d9))
- **autocomplete-valid:** Allow custom autocomplete attribute values ([#3225](https://github.com/dequelabs/axe-core/issues/3225)) ([6076ee8](https://github.com/dequelabs/axe-core/commit/6076ee8a7ba7527c9886916db1eda5d90cd26259))
- **axe.configure:** do not remove newline characters from locale doT strings ([#3216](https://github.com/dequelabs/axe-core/issues/3216)) ([ea2ce17](https://github.com/dequelabs/axe-core/commit/ea2ce171fd7562e6b85471e72dddc84be23a4297))
- **axe.d.ts:** allow Node for include/exclude object ([#3338](https://github.com/dequelabs/axe-core/issues/3338)) ([e699939](https://github.com/dequelabs/axe-core/commit/e699939bfd43fcc66b357d0e7329adce6f29cd6b))
- **axe.run:** add option to increase iframe ping timeout ([#3233](https://github.com/dequelabs/axe-core/issues/3233)) ([ec937e3](https://github.com/dequelabs/axe-core/commit/ec937e3e147274cbdbba2b046a651c90623130e4))
- check for hidden elements on `aria-errormessage` ([#3156](https://github.com/dequelabs/axe-core/issues/3156)) ([95d37dd](https://github.com/dequelabs/axe-core/commit/95d37dd794dc8552d731fabf45244b260da53d8f))
- **color-contrast:** account for 0 width scroll regions with children ([#3172](https://github.com/dequelabs/axe-core/issues/3172)) ([5908f0d](https://github.com/dequelabs/axe-core/commit/5908f0d644c20e7091329bd8bbeb191837d27feb))
- **color-contrast:** account for elements that do not fill entire bounding size ([#3186](https://github.com/dequelabs/axe-core/issues/3186)) ([699697b](https://github.com/dequelabs/axe-core/commit/699697bc237b6c69050e4572ba5cfdc5f338f450))
- **color-contrast:** check bg on fg contrast for thin text-shadows ([#3350](https://github.com/dequelabs/axe-core/issues/3350)) ([d92a7e5](https://github.com/dequelabs/axe-core/commit/d92a7e527eb61e5c62a59019b024f288ebac3663))
- **color-contrast:** correctly apply page background color ([#3207](https://github.com/dequelabs/axe-core/issues/3207)) ([fbc581d](https://github.com/dequelabs/axe-core/commit/fbc581d77e457fe092ecc2b95015e667292f1a08))
- **color-contrast:** correctly compute color-contrast of truncated children ([#3203](https://github.com/dequelabs/axe-core/issues/3203)) ([ac7b2b5](https://github.com/dequelabs/axe-core/commit/ac7b2b5ec402e9de91c50ef39aefd5843f0d62bb))
- **color-contrast:** correctly handle nested scroll regions ([#3212](https://github.com/dequelabs/axe-core/issues/3212)) ([22db29c](https://github.com/dequelabs/axe-core/commit/22db29ca7e9964a8447392fba45a09057a926ab9))
- **color-contrast:** correctly work with positioned elements without z-index ([#3209](https://github.com/dequelabs/axe-core/issues/3209)) ([725a20c](https://github.com/dequelabs/axe-core/commit/725a20c91b9006e64009059f0ab9d1a0098d29df))
- **color-contrast:** inconsistency of bgOverlap message based on scroll ([#3310](https://github.com/dequelabs/axe-core/issues/3310)) ([25eff98](https://github.com/dequelabs/axe-core/commit/25eff98e698f8dd00e5efd05a9b325a5202eae9b))
- **color-contrast:** properly blend multiple alpha colors ([#3193](https://github.com/dequelabs/axe-core/issues/3193)) ([e930a70](https://github.com/dequelabs/axe-core/commit/e930a7081d4308549370f74e9d341badd9661584))
- **core:** Incomplete fallback was missing, and could cause infinite loop ([#3302](https://github.com/dequelabs/axe-core/issues/3302)) ([f23d8c8](https://github.com/dequelabs/axe-core/commit/f23d8c8e305d27c8323547731b335d2900e03239))
- **custom-elms:** Don't error on custom Element.children prop ([#3326](https://github.com/dequelabs/axe-core/issues/3326)) ([2ad92f6](https://github.com/dequelabs/axe-core/commit/2ad92f67205fd370c3ad5ba44274248c2b9fe6e5))
- **d.ts:** Add PartialResults type ([#3126](https://github.com/dequelabs/axe-core/issues/3126)) ([544b6d5](https://github.com/dequelabs/axe-core/commit/544b6d579f3eecf8e102a53a911bbce0bd53b74f))
- **get-selector:** do not URL encode or token escape attribute selectors ([#3215](https://github.com/dequelabs/axe-core/issues/3215)) ([6f7e183](https://github.com/dequelabs/axe-core/commit/6f7e183553206afa2ca21914bf388e019b4acfdc))
- **getFrameContext:** option.iframe=false always returns an empty array ([#3279](https://github.com/dequelabs/axe-core/issues/3279)) ([dfa9725](https://github.com/dequelabs/axe-core/commit/dfa9725e39b8b4bca5a1856d44ff21c9894fc958))
- greater consistency of help / description text ([#3204](https://github.com/dequelabs/axe-core/issues/3204)) ([0677565](https://github.com/dequelabs/axe-core/commit/0677565941486cf339e7267760d4e533d4a29a05))
- **is-visible:** do not error if window.Node does not exist ([#3168](https://github.com/dequelabs/axe-core/issues/3168)) ([4046087](https://github.com/dequelabs/axe-core/commit/404608773abf7b4d069a64931adf4ac7e942b663))
- **jsdoc:** typo Sting -> String ([d1cc205](https://github.com/dequelabs/axe-core/commit/d1cc205629cb159ca760b18ece1f1e9aea22ec3a))
- **label-content-name-mismatch:** account for formatting elements ([#3349](https://github.com/dequelabs/axe-core/issues/3349)) ([53a6684](https://github.com/dequelabs/axe-core/commit/53a6684a6ebef004d451ff1be63bbfe4503e9447))
- **label-title-only:** allow hidden labels ([#3183](https://github.com/dequelabs/axe-core/issues/3183)) ([cad3994](https://github.com/dequelabs/axe-core/commit/cad39949c29bc3f83863e3484feef82e89e12118))
- **listitem:** allow as child of menu ([#3286](https://github.com/dequelabs/axe-core/issues/3286)) ([4bf7d35](https://github.com/dequelabs/axe-core/commit/4bf7d35a1f283a181205bb31f8f4c64c450772ca))
- **nativeSelectValue:** update selected value on change ([#3154](https://github.com/dequelabs/axe-core/issues/3154)) ([1ee88cb](https://github.com/dequelabs/axe-core/commit/1ee88cb4bb557560f10eab136464c321d4dee81e))
- **nested-interactive/aria-text:** allow "tabindex=-1" on elements with no role ([#3165](https://github.com/dequelabs/axe-core/issues/3165)) ([0ddc00b](https://github.com/dequelabs/axe-core/commit/0ddc00bb2d0eed457d9ce8ba5cd05606ef3bdc9e)), closes [#2466](https://github.com/dequelabs/axe-core/issues/2466) [#2934](https://github.com/dequelabs/axe-core/issues/2934) [#2934](https://github.com/dequelabs/axe-core/issues/2934)
- **nested-interactive:** add focusable descendants as related nodes ([#3261](https://github.com/dequelabs/axe-core/issues/3261)) ([3b2fdda](https://github.com/dequelabs/axe-core/commit/3b2fdda5ff90703dd20e9b19c4c0331a3d32cd5e))
- **nested-interactive:** add message for negative tabindex ([#3194](https://github.com/dequelabs/axe-core/issues/3194)) ([b445291](https://github.com/dequelabs/axe-core/commit/b44529130568347816fa810c959b68f980161241)), closes [#2466](https://github.com/dequelabs/axe-core/issues/2466) [#2934](https://github.com/dequelabs/axe-core/issues/2934) [/github.com/dequelabs/axe-core/issues/3163#issuecomment-949804464](https://github.com/dequelabs//github.com/dequelabs/axe-core/issues/3163/issues/issuecomment-949804464)
- **nested-interactive:** update negative tabindex message to include asssistive technologies ([#3262](https://github.com/dequelabs/axe-core/issues/3262)) ([b985776](https://github.com/dequelabs/axe-core/commit/b985776b6fdb2c96f40df38cf86f7241039d4f5b))
- **p-as-heading:** `p-as-heading` rule to account for `textContent` length ([#3145](https://github.com/dequelabs/axe-core/issues/3145)) ([400a230](https://github.com/dequelabs/axe-core/commit/400a2308510246d64d37fac3db375201610cd7e7))
- **prohibited-attr:** always report incomplete if there is text in the subtree ([#3347](https://github.com/dequelabs/axe-core/issues/3347)) ([2e27dca](https://github.com/dequelabs/axe-core/commit/2e27dca551d1aee273ad8ac055f7dfd45578dad0))
- **region:** Allow skip menu buttons ([#3277](https://github.com/dequelabs/axe-core/issues/3277)) ([6b6f2e3](https://github.com/dequelabs/axe-core/commit/6b6f2e36b09f70633b36da1cbcf2bcab59edebcf))
- remove optional crypto dependency (webpack compatibility) ([#3358](https://github.com/dequelabs/axe-core/issues/3358)) ([aa9d095](https://github.com/dequelabs/axe-core/commit/aa9d0957cbe1a91d7491a27cdea643f800ec7384))
- **reporter:** Run inside isolated contexts ([#3129](https://github.com/dequelabs/axe-core/issues/3129)) ([afe6675](https://github.com/dequelabs/axe-core/commit/afe6675d2452089602dcc6c9e931987936e9a55a))
- **respondable:** avoid crashes if the data in `window.postMessage` is `null` ([#3249](https://github.com/dequelabs/axe-core/issues/3249)) ([b37b2f6](https://github.com/dequelabs/axe-core/commit/b37b2f67ac4f2204cf63be351a70cb8a680812a3))
- **scrollable-region-focusable:** treat overflow:clip as hidden ([#3304](https://github.com/dequelabs/axe-core/issues/3304)) ([ef45377](https://github.com/dequelabs/axe-core/commit/ef453771b252a04fb5854f7d4d5b10281889f395))
- Separate Level AAA rules from A and best-practices ([#3191](https://github.com/dequelabs/axe-core/issues/3191)) ([828e526](https://github.com/dequelabs/axe-core/commit/828e526fd06ee596df73f4825e750aad459ca75e))
- **skip-link:** work with absolute and relative paths ([#2875](https://github.com/dequelabs/axe-core/issues/2875)) ([ee49d3e](https://github.com/dequelabs/axe-core/commit/ee49d3e83e8c77159d22b475c7d6d801d921b114))
- **typescript:** allow passing a NodeList to ElementContext ([#3161](https://github.com/dequelabs/axe-core/issues/3161)) ([ad4b165](https://github.com/dequelabs/axe-core/commit/ad4b165a0e019cd65f70fa5d085d83cea3e7338c))

### [4.3.5](https://github.com/dequelabs/axe-core/compare/v4.3.4...v4.3.5) (2021-10-29)

### Bug Fixes

- **aria-allowed-attr:** revert violation for non-global ARIA attrs on element without role ([#3243](https://github.com/dequelabs/axe-core/issues/3243)) ([e138fd6](https://github.com/dequelabs/axe-core/commit/e138fd6a00a8da6c48a74a614adc5dae8f2044e1))

### [4.3.4](https://github.com/dequelabs/axe-core/compare/v4.3.3...v4.3.4) (2021-10-22)

### Bug Fixes

- **aria-allowed-attr:** check for invalid `aria-attributes` for `role="row"` ([#3160](https://github.com/dequelabs/axe-core/issues/3160)) ([76aa5ec](https://github.com/dequelabs/axe-core/commit/76aa5ec5ac8a311b90974f0dba9cf92594f92019))
- **aria-allowed-children,aria-allowed-parent:** allow group role in listbox ([#3195](https://github.com/dequelabs/axe-core/issues/3195)) ([d742b29](https://github.com/dequelabs/axe-core/commit/d742b299370afa23645b1292ffc15f753113e05a))
- **aria-allowed-role:** updates the allowed roles for the wbr element to none and presentation ([#3192](https://github.com/dequelabs/axe-core/issues/3192)) ([66db765](https://github.com/dequelabs/axe-core/commit/66db765a17b5dc0904fcafe83aeb7c3eb5d60c12)), closes [#3177](https://github.com/dequelabs/axe-core/issues/3177)
- **aria-prohibited-attr:** update metadata message ([#3206](https://github.com/dequelabs/axe-core/issues/3206)) ([f9cf9fa](https://github.com/dequelabs/axe-core/commit/f9cf9fafe10e944be643d642cffda4fc762d0fc5))
- **axe.configure:** do not remove newline characters from locale doT strings ([#3216](https://github.com/dequelabs/axe-core/issues/3216)) ([5925898](https://github.com/dequelabs/axe-core/commit/59258984c0e52d91342040291fcc6f05ce2f135f))
- **axe.run:** add option to increase iframe ping timeout ([#3233](https://github.com/dequelabs/axe-core/issues/3233)) ([023f356](https://github.com/dequelabs/axe-core/commit/023f356ae752c559fb3788c84b1937bd2ba047ee))
- **color-contrast:** account for 0 width scroll regions with children ([#3172](https://github.com/dequelabs/axe-core/issues/3172)) ([ac913a1](https://github.com/dequelabs/axe-core/commit/ac913a11ddd8fd3b242a6ee500773c17fef77011))
- **color-contrast:** account for elements that do not fill entire bounding size ([#3186](https://github.com/dequelabs/axe-core/issues/3186)) ([84229d4](https://github.com/dequelabs/axe-core/commit/84229d41969907a62876488dc7a8f070542a9fe6))
- **color-contrast:** correctly apply page background color ([#3207](https://github.com/dequelabs/axe-core/issues/3207)) ([0ea7e1b](https://github.com/dequelabs/axe-core/commit/0ea7e1b881bb06067e98bae8ffe814605404475f))
- **color-contrast:** correctly compute color-contrast of truncated children ([#3203](https://github.com/dequelabs/axe-core/issues/3203)) ([4adb911](https://github.com/dequelabs/axe-core/commit/4adb9119a8a1cb457db81a40534db103c14bd2a1))
- **color-contrast:** correctly handle nested scroll regions ([#3212](https://github.com/dequelabs/axe-core/issues/3212)) ([80d91c0](https://github.com/dequelabs/axe-core/commit/80d91c01e46072ae8d36b952dfc264ef6f13eada))
- **color-contrast:** correctly work with positioned elements without z-index ([#3209](https://github.com/dequelabs/axe-core/issues/3209)) ([0322070](https://github.com/dequelabs/axe-core/commit/03220704c9dfa6f3af8d13800f9861e16552854b))
- greater consistency of help / description text ([#3204](https://github.com/dequelabs/axe-core/issues/3204)) ([0be12e6](https://github.com/dequelabs/axe-core/commit/0be12e62e5c0b2f1d280a7b17380281a30ae65f0))
- Separate Level AAA rules from A and best-practices ([#3191](https://github.com/dequelabs/axe-core/issues/3191)) ([7e6e6da](https://github.com/dequelabs/axe-core/commit/7e6e6da379eb2cb852a84c4ce088df7065740b61))
- **color-contrast:** properly blend multiple alpha colors ([#3193](https://github.com/dequelabs/axe-core/issues/3193)) ([5aa0441](https://github.com/dequelabs/axe-core/commit/5aa0441f2b33f8e1055ac32d981df4f796f7bb88))
- **is-visible:** do not error if window.Node does not exist ([#3168](https://github.com/dequelabs/axe-core/issues/3168)) ([cf58aea](https://github.com/dequelabs/axe-core/commit/cf58aea086a7bd590838673068d34325b4e9eef7))
- **label-title-only:** allow hidden labels ([#3183](https://github.com/dequelabs/axe-core/issues/3183)) ([ab636ef](https://github.com/dequelabs/axe-core/commit/ab636efa743ba2cbf1194b87aa27be5aba70989b))
- **nativeSelectValue:** update selected value on change ([#3154](https://github.com/dequelabs/axe-core/issues/3154)) ([ad584a1](https://github.com/dequelabs/axe-core/commit/ad584a10fc4b6c601c887835d7c879c77dc143d9))
- **p-as-heading:** `p-as-heading` rule to account for `textContent` length ([#3145](https://github.com/dequelabs/axe-core/issues/3145)) ([e0d4dc6](https://github.com/dequelabs/axe-core/commit/e0d4dc63bdd391a92f833d83b50644934deb7804))
- **typescript:** allow passing a NodeList to ElementContext ([#3161](https://github.com/dequelabs/axe-core/issues/3161)) ([5f2e517](https://github.com/dequelabs/axe-core/commit/5f2e517c0038397e12c72ef322313443c25e7907))
- check for hidden elements on `aria-errormessage` ([#3156](https://github.com/dequelabs/axe-core/issues/3156)) ([69b2e33](https://github.com/dequelabs/axe-core/commit/69b2e33b4094512f2ccfd05393b567763bba2e11))

### [4.3.3](https://github.com/dequelabs/axe-core/compare/v4.3.2...v4.3.3) (2021-08-24)

### Bug Fixes

- **aria-allowed-role:** Update allowed roles based on ARIA spec updates ([#3124](https://github.com/dequelabs/axe-core/issues/3124)) ([a1f637f](https://github.com/dequelabs/axe-core/commit/a1f637f3f5ebf0e483fd21865bd2191c24ccb87a))
- **d.ts:** Add PartialResults type ([#3126](https://github.com/dequelabs/axe-core/issues/3126)) ([5cdaf01](https://github.com/dequelabs/axe-core/commit/5cdaf012a2f09834d8b7e5f3a645a40e61d47ea9))
- **reporter:** Run inside isolated contexts ([#3129](https://github.com/dequelabs/axe-core/issues/3129)) ([98066f8](https://github.com/dequelabs/axe-core/commit/98066f8864d4ef09b4b3de12456992d3ca3207b4))

### [4.3.2](https://github.com/dequelabs/axe-core/compare/v4.3.1...v4.3.2) (2021-07-27)

### Bug Fixes

- **aria-hidden-focusable:** disabled aria-hidden fieldset should not have focusable children ([#3056](https://github.com/dequelabs/axe-core/issues/3056)) ([0865bd7](https://github.com/dequelabs/axe-core/commit/0865bd797f60da2befc52113464bc841f2cb2a47))
- **aria-required-attr:** only require aria-controls if aria-expanded=true ([#3089](https://github.com/dequelabs/axe-core/issues/3089)) ([63b6c7b](https://github.com/dequelabs/axe-core/commit/63b6c7b04c6837a313251f1621be6032933c8289))
- **aria-required-parent:** Filter out group from required parent roles if group is present ([#3084](https://github.com/dequelabs/axe-core/issues/3084)) ([1cb270c](https://github.com/dequelabs/axe-core/commit/1cb270c355338238acefd21789373f10aa4cb3ec))
- **axe.d.ts:** fix finishRun types ([#3098](https://github.com/dequelabs/axe-core/issues/3098)) ([e79c65c](https://github.com/dequelabs/axe-core/commit/e79c65cf7def687c54cc3bc249354c4eacf3e152))
- **color-contrast:** check for size before ignoring pseudo elements ([#3097](https://github.com/dequelabs/axe-core/issues/3097)) ([e0f6c0c](https://github.com/dequelabs/axe-core/commit/e0f6c0cfb8425bc0f7548c79919ac2cbd8393e83))
- **core:** stop mutating Context's input ([#3076](https://github.com/dequelabs/axe-core/issues/3076)) ([5dc34ee](https://github.com/dequelabs/axe-core/commit/5dc34eed3272409ae6486c76dad1394f1d557b5e))
- **finishRun:** handle null for failed iframe results ([#3096](https://github.com/dequelabs/axe-core/issues/3096)) ([8947099](https://github.com/dequelabs/axe-core/commit/8947099ea1113dbe1890e53c56f70e974317b144))
- **run,finishRun:** don't mutate options, set default reporter to v1 ([#3088](https://github.com/dequelabs/axe-core/issues/3088)) ([90f0b27](https://github.com/dequelabs/axe-core/commit/90f0b275a83dec38a9cae555ea1ddf9b4938b14d))

### [4.3.1](https://github.com/dequelabs/axe-core/compare/v4.3.0...v4.3.1) (2021-07-13)

### Bug Fixes

- add sri-history.json to npm bundle ([#3078](https://github.com/dequelabs/axe-core/issues/3078)) ([b525275](https://github.com/dequelabs/axe-core/commit/b52527515302dcafe6d5a8efd48c60d2d1d21a35))

## [4.3.0](https://github.com/dequelabs/axe-core/compare/v4.2.3...v4.3.0) (2021-07-09)

### Features

- **options:** accept a string for options.runOnly ([4392bc0](https://github.com/dequelabs/axe-core/commit/4392bc05fb208606fc589b261d3419b9625c6b6c))
- **runPartial:** Test without frame communication ([#3006](https://github.com/dequelabs/axe-core/issues/3006)) ([42738b5](https://github.com/dequelabs/axe-core/commit/42738b5258f058a36b00533e8c5cfdc0f1bcdbed))
- **utils:** add getFrameContexts method ([#2995](https://github.com/dequelabs/axe-core/issues/2995)) ([f478bab](https://github.com/dequelabs/axe-core/commit/f478babae453b02dec5bf4961b7a995a5964976a))
- deprecate autocomplete appropriate check ([#2917](https://github.com/dequelabs/axe-core/issues/2917)) ([1fe1487](https://github.com/dequelabs/axe-core/commit/1fe1487758fa0f1f4b7bfc1d8c18bbe397be362d))
- Remove deprecated phantomjs example ([#2913](https://github.com/dequelabs/axe-core/issues/2913)) ([4a01ffe](https://github.com/dequelabs/axe-core/commit/4a01ffe1adf009745ea12a71f4a888843dc779da))
- Support multiple languages at once in builds ([#2994](https://github.com/dequelabs/axe-core/issues/2994)) ([f18a56b](https://github.com/dequelabs/axe-core/commit/f18a56b3efafdb14989b45bfff0f94e1863b3899))
- **rule:** add ACT Rule IDs to test rule objects ([#2866](https://github.com/dequelabs/axe-core/issues/2866)) ([cc1ebf5](https://github.com/dequelabs/axe-core/commit/cc1ebf520caaf787fe73498cac0e4917d357edad)), closes [#2820](https://github.com/dequelabs/axe-core/issues/2820)

### Bug Fixes

- **accText:** ignore text in embedded content elements ([#3022](https://github.com/dequelabs/axe-core/issues/3022)) ([fa4f926](https://github.com/dequelabs/axe-core/commit/fa4f926c089bec2cfca882b61b74fecac504c8e0)), closes [#3017](https://github.com/dequelabs/axe-core/issues/3017)
- **aria-allowed-attr:** allow aria-posinset and aria-setsize on row elements for treegrids ([#2952](https://github.com/dequelabs/axe-core/issues/2952)) ([24e6115](https://github.com/dequelabs/axe-core/commit/24e6115adb8834b02e1e0a535a661c31caefa588))
- **aria-allowed-attr:** pass aria-label on some HTML elements ([#2935](https://github.com/dequelabs/axe-core/issues/2935)) ([d2584ed](https://github.com/dequelabs/axe-core/commit/d2584edfa7b439a5702f5b8d368253b9abe690fc))
- **aria-level:** New check for aria-level > 6 as needs review ([#3061](https://github.com/dequelabs/axe-core/issues/3061)) ([73d3ae1](https://github.com/dequelabs/axe-core/commit/73d3ae101f841c086cee89346ad66afed265097f))
- **aria-roles:** Mark as needs review if both none and presentation are used on element with no implicit role ([#2989](https://github.com/dequelabs/axe-core/issues/2989)) ([70c683c](https://github.com/dequelabs/axe-core/commit/70c683cd9844b23d62641e7063bae757a897ca38))
- **autocomplete-appropriate:** pass for autocomplete=username and type=email ([#2896](https://github.com/dequelabs/axe-core/issues/2896)) ([43394bc](https://github.com/dequelabs/axe-core/commit/43394bcd01c631f0c129f2f584d88a3a134a92a7))
- **color-contrast:** add special case for new sr-only technique ([#2985](https://github.com/dequelabs/axe-core/issues/2985)) ([d6a72f9](https://github.com/dequelabs/axe-core/commit/d6a72f9316b00eee683aed4dbf0a0fafe0661a2f))
- **color-contrast:** check for pseudo elements on element itself, not just parents ([#2980](https://github.com/dequelabs/axe-core/issues/2980)) ([9b6ccd0](https://github.com/dequelabs/axe-core/commit/9b6ccd0c2948e7036ef3984810909f59d1e65f27))
- **color-contrast-matches:** only absolutely positioned elements using clip should be not visible ([#3038](https://github.com/dequelabs/axe-core/issues/3038)) ([e93fdb1](https://github.com/dequelabs/axe-core/commit/e93fdb1f68656976d0cdfd73564f6580640be0f7))
- **combobox:** support aria 1.2 pattern for comboboxes ([#3033](https://github.com/dequelabs/axe-core/issues/3033)) ([5ab026d](https://github.com/dequelabs/axe-core/commit/5ab026d1bc9932fdf6cd2b135df32dd80051b5c9))
- **frame-tested:** run without respondable ([#2942](https://github.com/dequelabs/axe-core/issues/2942)) ([c046114](https://github.com/dequelabs/axe-core/commit/c046114e9740e3e130ad0cb98288eb77331fbb93))
- **getStandards:** Read standards from utils ([#2903](https://github.com/dequelabs/axe-core/issues/2903)) ([f1a0368](https://github.com/dequelabs/axe-core/commit/f1a036890b9befe8c1a0af388fd0f215bee6d9ae))
- **heading-order:** Prevent crash on page with iframes but no headings ([#2965](https://github.com/dequelabs/axe-core/issues/2965)) ([99e7f0c](https://github.com/dequelabs/axe-core/commit/99e7f0c2ae5758328e1299ff54a261c7e581c475))
- **heading-order:** use aria-level on headings in addition to role=header elements ([#3028](https://github.com/dequelabs/axe-core/issues/3028)) ([caccd38](https://github.com/dequelabs/axe-core/commit/caccd381d3817cc46e824d1a76e5ea888bf519bf))
- **page-no-duplicate:** don't count elements hidden from screenreaders as potential duplicates ([#3051](https://github.com/dequelabs/axe-core/issues/3051)) ([5e0098b](https://github.com/dequelabs/axe-core/commit/5e0098b0262614db20fc9d6689a5d5b95c153d8d))
- **publish-metadata:** use fail message for rules with reviewOnFail:true ([#2987](https://github.com/dequelabs/axe-core/issues/2987)) ([b6dc5f6](https://github.com/dequelabs/axe-core/commit/b6dc5f654c6c4b56217eabfd093447122890a7a2))
- **utils:** unify selecting nodes in shadow tree with shadowSelect() ([#3068](https://github.com/dequelabs/axe-core/issues/3068)) ([21681da](https://github.com/dequelabs/axe-core/commit/21681da0c8b952b5a64e17751e05686a98c6b5da))
- JS error in @axe-core/react caused by stale reference to heading ([b7094c8](https://github.com/dequelabs/axe-core/commit/b7094c8146ec816ab3d079e57f07bf0f21ce6676))
- Remove unnecessary files from npm package ([#3054](https://github.com/dequelabs/axe-core/issues/3054)) ([7600b7c](https://github.com/dequelabs/axe-core/commit/7600b7cd4a9bbb019497895d1134246d02af9763))
- **meta-viewport:** test that a user-scalable number does not prevent zoom ([b3562fb](https://github.com/dequelabs/axe-core/commit/b3562fb9fffa3152014d56a6e02a05622c10b9a9))
- **region:** contents in iframes should pass the region rule if the iframe itself is in a region ([#2949](https://github.com/dequelabs/axe-core/issues/2949)) ([43145d6](https://github.com/dequelabs/axe-core/commit/43145d6f1136c0e2c9fd9a9f3a401a68f56fe665))
- **required-parent:** Allow *item > group > *item nesting ([#2898](https://github.com/dequelabs/axe-core/issues/2898)) ([59b4a7e](https://github.com/dequelabs/axe-core/commit/59b4a7e2d939076e7aed6308ff25d1f3460d944b))
- **SerialVirtualNode:** properly handle empty string attributes ([#3042](https://github.com/dequelabs/axe-core/issues/3042)) ([dddbc0a](https://github.com/dequelabs/axe-core/commit/dddbc0ac20ffa0bc65223d392310d447b767efe9))
- **sri-history:** add backported releases ([#3004](https://github.com/dequelabs/axe-core/issues/3004)) ([6eecf34](https://github.com/dequelabs/axe-core/commit/6eecf344751e03170bd70fe076584011b5a6cacb))
- treat input with no role as textbox ([#2929](https://github.com/dequelabs/axe-core/issues/2929)) ([13d909d](https://github.com/dequelabs/axe-core/commit/13d909dd12dc40ab9ed448793aef5031e207d429))
- **types:** make `evaluate` check optional ([#2902](https://github.com/dequelabs/axe-core/issues/2902)) ([417f572](https://github.com/dequelabs/axe-core/commit/417f5724112e46f128efd5f56da9f891bf1e938c))

### [4.2.4](https://github.com/dequelabs/axe-core/compare/v4.2.3...v4.2.4) (2021-10-22)

### Bug Fixes

- **axe.run:** add option to increase iframe ping timeout ([#3233](https://github.com/dequelabs/axe-core/issues/3233)) ([99a848e](https://github.com/dequelabs/axe-core/commit/99a848e785793782b264aa55cd71f5a35c5677c9))

### [4.2.3](https://github.com/dequelabs/axe-core/compare/v4.2.2...v4.2.3) (2021-06-22)

### Bug Fixes

- **accText:** ignore text in embedded content elements ([#3022](https://github.com/dequelabs/axe-core/issues/3022)) ([8fb4635](https://github.com/dequelabs/axe-core/commit/8fb4635e01c82b80ff23994edad180dd73730a98)), closes [#3017](https://github.com/dequelabs/axe-core/issues/3017)
- **color-contrast:** add special case for new sr-only technique ([#2985](https://github.com/dequelabs/axe-core/issues/2985)) ([79cbf01](https://github.com/dequelabs/axe-core/commit/79cbf0168bdb9311db2e31043ad36c20b77e39fe))
- **color-contrast:** check for pseudo elements on element itself, not just parents ([#2980](https://github.com/dequelabs/axe-core/issues/2980)) ([3122550](https://github.com/dequelabs/axe-core/commit/3122550b1beaeafaac62c81fb47bcd4290ba266a))
- **frame-tested:** run without respondable ([#2942](https://github.com/dequelabs/axe-core/issues/2942)) ([a1d725d](https://github.com/dequelabs/axe-core/commit/a1d725d5cdedc4bfd6ba69bb25aa0a1213fd63cf))
- **publish-metadata:** use fail message for rules with reviewOnFail:true ([#2987](https://github.com/dequelabs/axe-core/issues/2987)) ([00fefa9](https://github.com/dequelabs/axe-core/commit/00fefa9bfb9479279afc89b2da45e748bace77d2))
- **sri-history:** add backported releases ([#3004](https://github.com/dequelabs/axe-core/issues/3004)) ([0332e80](https://github.com/dequelabs/axe-core/commit/0332e806524ca9ca78512423a70eb80d623795eb))

### [4.2.2](https://github.com/dequelabs/axe-core/compare/v4.2.1...v4.2.2) (2021-06-03)

### Bug Fixes

- **aria-allowed-attr:** allow aria-posinset and aria-setsize on row elements for treegrids ([#2952](https://github.com/dequelabs/axe-core/issues/2952)) ([3023e69](https://github.com/dequelabs/axe-core/commit/3023e697b85c13f18f2cbb46b202400d8ce6a10d))
- **heading-order:** Prevent crash on page with iframes but no headings ([#2965](https://github.com/dequelabs/axe-core/issues/2965)) ([4b7db37](https://github.com/dequelabs/axe-core/commit/4b7db3763735891972b8a13d6622fa30a687f3cb))
- **meta-viewport:** test that a user-scalable number does not prevent zoom ([048c5c1](https://github.com/dequelabs/axe-core/commit/048c5c18c8245a43721a12237ac5f07f5b4a856b))
- JS error in @axe-core/react caused by stale reference to heading ([3afda4e](https://github.com/dequelabs/axe-core/commit/3afda4effc4a099632138c5874ab305baaa5934a))

### [4.2.1](https://github.com/dequelabs/axe-core/compare/v4.2.0...v4.2.1) (2021-05-18)

### Bug Fixes

- **aria-allowed-attr:** pass aria-label on some HTML elements ([#2935](https://github.com/dequelabs/axe-core/issues/2935)) ([695aa77](https://github.com/dequelabs/axe-core/commit/695aa7751246c0e5e786a66df7808faa7a244576))
- treat input with no role as textbox ([#2929](https://github.com/dequelabs/axe-core/issues/2929)) ([de18030](https://github.com/dequelabs/axe-core/commit/de180307fd876cfc6a1a0bdb828818a323976c81))
- **autocomplete-appropriate:** pass for autocomplete=username and type=email ([#2896](https://github.com/dequelabs/axe-core/issues/2896)) ([8b478c8](https://github.com/dequelabs/axe-core/commit/8b478c82b3362fc27df8a0087c779327e6a9d6d0))
- **getStandards:** Read standards from utils ([#2903](https://github.com/dequelabs/axe-core/issues/2903)) ([52ad4c6](https://github.com/dequelabs/axe-core/commit/52ad4c69991e433d413846c4c9778fdd863aebeb))
- **required-parent:** Allow *item > group > *item nesting ([#2898](https://github.com/dequelabs/axe-core/issues/2898)) ([3acd229](https://github.com/dequelabs/axe-core/commit/3acd229b08b806ea359e7e08e37e8721cddc5290))
- **types:** make `evaluate` check optional ([#2902](https://github.com/dequelabs/axe-core/issues/2902)) ([75fabfe](https://github.com/dequelabs/axe-core/commit/75fabfef3adeade350902f2dd18928e44fbb7cf4))

## [4.2.0](https://github.com/dequelabs/axe-core/compare/v4.1.2...v4.2.0) (2021-04-23)

### Features

- add axe.frameMessenger with configurable allowedOrigins ([#2880](https://github.com/dequelabs/axe-core/issues/2880)) ([b27bab3](https://github.com/dequelabs/axe-core/commit/b27bab3954f006e1257f7d70bd467991a2d9330e))
- **aria-allowed-attr:** add ARIA 1.2 prohibited attrs check ([#2764](https://github.com/dequelabs/axe-core/issues/2764)) ([4a77e88](https://github.com/dequelabs/axe-core/commit/4a77e881302f7db2750fa36a573fc26d123f7388))
- **empty-table-header:** new rule to flag empty table headers ([#2811](https://github.com/dequelabs/axe-core/issues/2811)) ([813ee7e](https://github.com/dequelabs/axe-core/commit/813ee7efdf77a55a1c09a3b8836007917ead91b5))
- **frame-focusable-content:** new rule to test iframes with tabindex=-1 do not have focusable content ([#2785](https://github.com/dequelabs/axe-core/issues/2785)) ([aeb044c](https://github.com/dequelabs/axe-core/commit/aeb044c26908b44490bad160add8c3e6327ce759))
- **locale:** missing translations for DE ([#2704](https://github.com/dequelabs/axe-core/issues/2704)) ([f312994](https://github.com/dequelabs/axe-core/commit/f312994a63bd239b42cf3177af9d43fc190b1d3c))
- **locale:** Polish translation ([#2677](https://github.com/dequelabs/axe-core/issues/2677)) ([c46979f](https://github.com/dequelabs/axe-core/commit/c46979ff93a8c1bd5d9d73f1b4d3edcab046582b))
- **nested-interactive:** new rule to flag nested interactive elements ([#2691](https://github.com/dequelabs/axe-core/issues/2691)) ([13a7cf1](https://github.com/dequelabs/axe-core/commit/13a7cf12ad7f3f895a4c41c50b65bf71be12ea47))
- **role-text:** add role-text rule ([#2702](https://github.com/dequelabs/axe-core/issues/2702)) ([7c05162](https://github.com/dequelabs/axe-core/commit/7c05162a3856c0f19514c9a87ca1c15aa5485b45))
- **setup/teardown:** add functions to setup and teardown axe-core internal data, deprecate axe.\_tree ([#2738](https://github.com/dequelabs/axe-core/issues/2738)) ([9d19f24](https://github.com/dequelabs/axe-core/commit/9d19f24f86f2028753ce944beeda9866b0274e7b))
- **standards:** add graphics roles ([#2761](https://github.com/dequelabs/axe-core/issues/2761)) ([22032cc](https://github.com/dequelabs/axe-core/commit/22032cc3051e74ad8c12c27039e9fb0a9f07e9d1))
- **standards/aria-roles:** add presentational children property ([#2689](https://github.com/dequelabs/axe-core/issues/2689)) ([78c239c](https://github.com/dequelabs/axe-core/commit/78c239cd6e3960e85cf900bc0fe511e3846c1c96))
- **utils.getRule:** add function to get rule by id ([#2724](https://github.com/dequelabs/axe-core/issues/2724)) ([9d0af53](https://github.com/dequelabs/axe-core/commit/9d0af53192450f442d073c13313ff1d865f68935))
- **utils/matches:** support selectors level 4 :not and :is ([#2742](https://github.com/dequelabs/axe-core/issues/2742)) ([21d9b0e](https://github.com/dequelabs/axe-core/commit/21d9b0ea4348d353dc85cacfb3fcace5eac6e4ca))
- **virtual-node:** add attrNames property which returns list of attribute names ([#2741](https://github.com/dequelabs/axe-core/issues/2741)) ([1d864b4](https://github.com/dequelabs/axe-core/commit/1d864b4600fd88b06c8b5776bf891cf9bc402b60))

### Bug Fixes

- **aria-allowed-attr:** error when generic elements use aria-label and aria-labelledy ([#2766](https://github.com/dequelabs/axe-core/issues/2766)) ([64379e1](https://github.com/dequelabs/axe-core/commit/64379e1732fac6ccb0f9f2abfb8c36e22cbba9ef))
- **aria-required-children:** allow group and rowgroup roles ([#2661](https://github.com/dequelabs/axe-core/issues/2661)) ([5a264e4](https://github.com/dequelabs/axe-core/commit/5a264e48e800bb9a783b2597e723ec9529d6d798))
- **aria-required-children:** only match for roles that require children ([#2703](https://github.com/dequelabs/axe-core/issues/2703)) ([95de169](https://github.com/dequelabs/axe-core/commit/95de1698596ab5138d553836c90c422566d0527d))
- **aria-valid-attr-value:** pass for aria-errormessage when aria-invalid is not set or false ([#2721](https://github.com/dequelabs/axe-core/issues/2721)) ([93a765c](https://github.com/dequelabs/axe-core/commit/93a765c372b29a0764872f50f044bfbabed68207))
- **aria-valid-attr-value:** report when aria-labelledby ref is not in DOM ([#2723](https://github.com/dequelabs/axe-core/issues/2723)) ([116eb06](https://github.com/dequelabs/axe-core/commit/116eb06101ea49a02dbd3e86d2f91ac51e8fe9a9))
- **aria-valid-attr-value:** return false when int type attribute uses invalid values ([#2710](https://github.com/dequelabs/axe-core/issues/2710)) ([ce9917e](https://github.com/dequelabs/axe-core/commit/ce9917e9dad91f526e9f0da99dcc347ff759e3bd))
- **bypass:** mark as needs review rather than failure ([#2818](https://github.com/dequelabs/axe-core/issues/2818)) ([bb41b3e](https://github.com/dequelabs/axe-core/commit/bb41b3e89a22a69c5cb6fbd07e808291687343e5))
- **focus-order-semantics:** allow role=tooltip to pass ([#2871](https://github.com/dequelabs/axe-core/issues/2871)) ([dc526d8](https://github.com/dequelabs/axe-core/commit/dc526d8034e2de0c4208d2c6f695f1ba53da950b))
- **heading-order:** handle iframe as first result ([#2876](https://github.com/dequelabs/axe-core/issues/2876)) ([33428d8](https://github.com/dequelabs/axe-core/commit/33428d86230064d70ec6b2a638f947d0cdb31968))
- **respondable:** Avoid message duplication with messageId ([#2816](https://github.com/dequelabs/axe-core/issues/2816)) ([4bd0acf](https://github.com/dequelabs/axe-core/commit/4bd0acf379fba2ef17679cacb70776e77e5f5e79))
- **respondable:** work on iframes in shadow DOM ([#2857](https://github.com/dequelabs/axe-core/issues/2857)) ([38cad94](https://github.com/dequelabs/axe-core/commit/38cad9451dbde52fbab0835e3c1673825c57e5b7))
- avoid 'undefined' showing in check messages ([#2779](https://github.com/dequelabs/axe-core/issues/2779)) ([3beb0b1](https://github.com/dequelabs/axe-core/commit/3beb0b1c7a4bcf599d4c10207a429e9ec38df698))
- properly translate checks when building axe.js using --lang ([#2848](https://github.com/dequelabs/axe-core/issues/2848)) ([76545b0](https://github.com/dequelabs/axe-core/commit/76545b09ed0a1204b1096ef1b1d11fe6d6d89e2a))
- **aria-required-parent:** only match for roles that require parents ([#2707](https://github.com/dequelabs/axe-core/issues/2707)) ([ce8281e](https://github.com/dequelabs/axe-core/commit/ce8281e6d45c6888d238ea33c2d39f4c67e8b267))
- **color-contrast:** account for text client rects that start outside the parent container ([#2682](https://github.com/dequelabs/axe-core/issues/2682)) ([a4e4a34](https://github.com/dequelabs/axe-core/commit/a4e4a344cea70308d0a59a04411f6da88b80b00b))
- **color-contrast-matches:** do not pass empty string to getElementById ([#2739](https://github.com/dequelabs/axe-core/issues/2739)) ([0b0fec2](https://github.com/dequelabs/axe-core/commit/0b0fec285d7df8675c8f5ecc42519f3734d70f72))
- **frame-title:** update rule description to be more descriptive ([#2735](https://github.com/dequelabs/axe-core/issues/2735)) ([159e25b](https://github.com/dequelabs/axe-core/commit/159e25b45eb22498e7ab20d31f353b182b2cd1d7))
- **heading-order:** allow partial context to pass ([#2622](https://github.com/dequelabs/axe-core/issues/2622)) ([f8baee6](https://github.com/dequelabs/axe-core/commit/f8baee68fa5220d54399a347322c6c8ac4f26cb9))
- **landmark-complementary-is-top-level:** allow aside inside main ([#2740](https://github.com/dequelabs/axe-core/issues/2740)) ([9388c96](https://github.com/dequelabs/axe-core/commit/9388c9657fdfd80b9a76961d95a2cde939413665))
- **metadata:** consistenct use of 'must' and 'should' ([#2770](https://github.com/dequelabs/axe-core/issues/2770)) ([603b612](https://github.com/dequelabs/axe-core/commit/603b612dfeb861b5fc08cf9605fed886c1d71107))
- **region:** allow role=alertdialog as region ([#2660](https://github.com/dequelabs/axe-core/issues/2660)) ([b928df7](https://github.com/dequelabs/axe-core/commit/b928df7f81bc1ed79946b472f5e71dea324a611c))
- **select-name:** fix typo in accessible name help ([#2676](https://github.com/dequelabs/axe-core/issues/2676)) ([6b916b9](https://github.com/dequelabs/axe-core/commit/6b916b908f38c465e1b319b1b8f50c1a7c9df698))
- **to-grid/get-headers:** work with rowspan=0 ([#2722](https://github.com/dequelabs/axe-core/issues/2722)) ([508190b](https://github.com/dequelabs/axe-core/commit/508190b8e20873bc98bd0efb39d37bcb1cbcd92a))
- **types:** Add noHtml option ([#2810](https://github.com/dequelabs/axe-core/issues/2810)) ([c03c826](https://github.com/dequelabs/axe-core/commit/c03c82635c6e4228b94438d00f7ff8723303918c))
- **utils:** fix warning thrown by Webpack ([#2843](https://github.com/dequelabs/axe-core/issues/2843)) ([0826177](https://github.com/dequelabs/axe-core/commit/08261778e039abae0be16d001923dcc87ce168a4)), closes [#2840](https://github.com/dequelabs/axe-core/issues/2840)
- **utils:** remove attributes from source string ([#2803](https://github.com/dequelabs/axe-core/issues/2803)) ([8e8c4fa](https://github.com/dequelabs/axe-core/commit/8e8c4faddbe95f979f0c03d1d44ccd148218379b))
- add noHtml to axe.configure ([#2789](https://github.com/dequelabs/axe-core/issues/2789)) ([5c8dec8](https://github.com/dequelabs/axe-core/commit/5c8dec83a790aba273f8f921007dc7f0a0904851))
- do not allow postMessage with axe version of x.y.z ([#2790](https://github.com/dequelabs/axe-core/issues/2790)) ([5acda82](https://github.com/dequelabs/axe-core/commit/5acda82fbb61d07f5036169008a08e2e1be3d155))

### [4.1.4](https://github.com/dequelabs/axe-core/compare/v4.1.3...v4.1.4) (2021-04-01)

### Bug Fixes

- **respondable:** work on iframes in shadow DOM ([#2857](https://github.com/dequelabs/axe-core/issues/2857)) ([65cbfd0](https://github.com/dequelabs/axe-core/commit/65cbfd04edbbf48ceee2ef35f500575a4ad88afc))
- **utils:** fix warning thrown by Webpack ([#2843](https://github.com/dequelabs/axe-core/issues/2843)) ([df5d01b](https://github.com/dequelabs/axe-core/commit/df5d01b94fef43e6ca8d2fab5219f90811700405)), closes [#2840](https://github.com/dequelabs/axe-core/issues/2840)

### [4.1.3](https://github.com/dequelabs/axe-core/compare/v4.1.2...v4.1.3) (2021-03-04)

### Bug Fixes

- **respondable:** Avoid message duplication with messageId ([#2816](https://github.com/dequelabs/axe-core/issues/2816)) ([9b6eb59](https://github.com/dequelabs/axe-core/commit/9b6eb5987da104398acaae60b7b7ee4e0b2d3c8f))
- **types:** Add noHtml option ([#2810](https://github.com/dequelabs/axe-core/issues/2810)) ([8bc0bae](https://github.com/dequelabs/axe-core/commit/8bc0baec5c997873daf43ff5de61ea22a8e8c896))

### [4.1.2](https://github.com/dequelabs/axe-core/compare/v4.1.1...v4.1.2) (2021-02-08)

### Bug Fixes

- add noHtml to axe.configure ([#2789](https://github.com/dequelabs/axe-core/issues/2789)) ([6e23eb0](https://github.com/dequelabs/axe-core/commit/6e23eb0839da5806da5476a5158fb6324d3ee005))
- do not allow postMessage with axe version of x.y.z ([#2790](https://github.com/dequelabs/axe-core/issues/2790)) ([8b1671d](https://github.com/dequelabs/axe-core/commit/8b1671d46dd2238284fbfe1448ef36f8fc2048e7))

### [4.1.1](https://github.com/dequelabs/axe-core/compare/v4.1.0...v4.1.1) (2020-11-19)

### Bug Fixes

- remove axios import ([#2653](https://github.com/dequelabs/axe-core/issues/2653)) ([2d20cde](https://github.com/dequelabs/axe-core/commit/2d20cdee819265f3c4efcb3ccb61da0a9a88981c))
- **color-contrast:** greatly improve color-contrast-matches speed. add aria/get-accessible-ref ([#2635](https://github.com/dequelabs/axe-core/issues/2635)) ([ba174bd](https://github.com/dequelabs/axe-core/commit/ba174bd5496d7146c1baf982cb762444cda26cff))

## [4.1.0](https://github.com/dequelabs/axe-core/compare/v4.0.2...v4.1.0) (2020-11-13)

### Features

- **new-rule:** check that treeitem role has an accessible name ([#2615](https://github.com/dequelabs/axe-core/issues/2615)) ([5e95153](https://github.com/dequelabs/axe-core/commit/5e951536a6b4f21ef4d4a849b575b5a3c1ec6b85))
- Add aria-dialog-name ([#2609](https://github.com/dequelabs/axe-core/issues/2609)) ([b0e14b0](https://github.com/dequelabs/axe-core/commit/b0e14b0bc1df221ef379bf7ea830d3ceb030787a))
- **aria-toggle-field-name:** add option role ([#2605](https://github.com/dequelabs/axe-core/issues/2605)) ([0af0551](https://github.com/dequelabs/axe-core/commit/0af0551e57c2b8347eeb9ce6550056c1888b5f4a))
- **checks:** deprecate role-none and role-presentation for presentational-role ([#2503](https://github.com/dequelabs/axe-core/issues/2503)) ([cef54a0](https://github.com/dequelabs/axe-core/commit/cef54a0fd4156f7b1e6f6ba9cb36bde060a65622))
- **get-role:** add noPresentational option ([#2549](https://github.com/dequelabs/axe-core/issues/2549)) ([4f39299](https://github.com/dequelabs/axe-core/commit/4f39299805d6e2c0fd09a1952d08c44800ca5dfc)), closes [#1792](https://github.com/dequelabs/axe-core/issues/1792)
- **imports:** deprecate axios ([#2542](https://github.com/dequelabs/axe-core/issues/2542)) ([82d43a0](https://github.com/dequelabs/axe-core/commit/82d43a0593a8dc9733b97138f8e6f934ed25dea2))
- **label,select-name:** allow placeholder to pass label rule, add select-name rule ([#2448](https://github.com/dequelabs/axe-core/issues/2448)) ([1315f8e](https://github.com/dequelabs/axe-core/commit/1315f8e2fb3eb6851657be2039014e3d13127210))
- **new-rule:** ARIA links, buttons, menuitems have an accessible name ([#2571](https://github.com/dequelabs/axe-core/issues/2571)) ([9476a1f](https://github.com/dequelabs/axe-core/commit/9476a1f5170bbc85b683c6524f44f49c1835054a))
- **new-rule:** aria-tooltip-name ([#2548](https://github.com/dequelabs/axe-core/issues/2548)) ([d00f378](https://github.com/dequelabs/axe-core/commit/d00f3781fb5c9c7c7f88e6790de3741788e8ddd9))
- **new-rule:** check that meter role has an accessible name ([#2607](https://github.com/dequelabs/axe-core/issues/2607)) ([3ca2f04](https://github.com/dequelabs/axe-core/commit/3ca2f04b0f737914dda667c26f0193b7b312e6f6))
- **new-rule:** check that progressbars have an accessible name ([#2555](https://github.com/dequelabs/axe-core/issues/2555)) ([dd0b44a](https://github.com/dequelabs/axe-core/commit/dd0b44ad8aeed9e4b7b45478c62c655a6cbf10ed))
- **presentation-role-conflict:** create rule to flag elements with role conflict resolution ([#2440](https://github.com/dequelabs/axe-core/issues/2440)) ([e4edffc](https://github.com/dequelabs/axe-core/commit/e4edffc09f2305d8b4e69af266759cf32a5326f4))
- **rule-matches:** depreacte window-is-top-matches for is-intiator-matches ([#2531](https://github.com/dequelabs/axe-core/issues/2531)) ([db2be93](https://github.com/dequelabs/axe-core/commit/db2be93d07dda488f9d5ca66d193709eb41bf8cd))
- **standards:** add superclassRole to ariaRoles ([#2600](https://github.com/dequelabs/axe-core/issues/2600)) ([a5e9ce0](https://github.com/dequelabs/axe-core/commit/a5e9ce03befdc8f914f72a4eb1e49a95d6a2aa91))
- **standards:** add superclassRole to dpubRoles ([#2606](https://github.com/dequelabs/axe-core/issues/2606)) ([1b66930](https://github.com/dequelabs/axe-core/commit/1b6693092d44aa10b9d4fd093baff674a17a2d30))
- **utils:** deprecate get/set-scroll-state ([#2581](https://github.com/dequelabs/axe-core/issues/2581)) ([3c4827f](https://github.com/dequelabs/axe-core/commit/3c4827f7e3fdab4851697111bbe7cab55539bfbd))
- **valid-langs:** deprecate validLangs, add isValidLangs, reduce file size ([#2527](https://github.com/dequelabs/axe-core/issues/2527)) ([8a699ec](https://github.com/dequelabs/axe-core/commit/8a699ecba6c77f6a705d44616f1bcefd634ff89b))

### Bug Fixes

- **commons/get-text-element-stack:** account for newline characters when text is larger than container ([#2631](https://github.com/dequelabs/axe-core/issues/2631)) ([3c2429b](https://github.com/dequelabs/axe-core/commit/3c2429b4032d29cdcfd3083e46e91854dccd733b))
- Update ACT rule tags ([#2625](https://github.com/dequelabs/axe-core/issues/2625)) ([c640d4f](https://github.com/dequelabs/axe-core/commit/c640d4fc18a7625d30c6d0572e15f26c984511e4))
- **aria-errormessage:** allow aria-live="polite" on aria-errormessage target ([926b6a8](https://github.com/dequelabs/axe-core/commit/926b6a8fe7aad0444d9bc97f2e6c8564023ab58f))
- **aria-errormessage:** allow aria-live=polite on aria-errormessage target ([#2597](https://github.com/dequelabs/axe-core/issues/2597)) ([0d5cfb1](https://github.com/dequelabs/axe-core/commit/0d5cfb15941cc23d2b5065c203e9ccdc01c57b82))
- **aria-roles:** add group to menuitemradio context ([#2518](https://github.com/dequelabs/axe-core/issues/2518)) ([52b89f1](https://github.com/dequelabs/axe-core/commit/52b89f1ca67b2c04b8e96495cd6fe601e5c3eb54))
- **aria-roles:** Add WAI-ARIA 1.2 roles ([#2544](https://github.com/dequelabs/axe-core/issues/2544)) ([635b084](https://github.com/dequelabs/axe-core/commit/635b084c5460a3328118ec4f5db678deb082966b)), closes [#2107](https://github.com/dequelabs/axe-core/issues/2107) [#2107](https://github.com/dequelabs/axe-core/issues/2107) [#2107](https://github.com/dequelabs/axe-core/issues/2107) [#2107](https://github.com/dequelabs/axe-core/issues/2107)
- **attr-non-space-content-evaluate:** Split no attribute and empty attribute message ([#2495](https://github.com/dequelabs/axe-core/issues/2495)) ([5f822f4](https://github.com/dequelabs/axe-core/commit/5f822f4f32ce5597e78dd7db77b8412aea1154a5))
- **audit:** updated axe.reset() to reset branding, application, and tagExcludes. ([#2537](https://github.com/dequelabs/axe-core/issues/2537)) ([828864b](https://github.com/dequelabs/axe-core/commit/828864bd9c32a6866e0e0dc6d7b263668a01497e))
- **autocomplete-valid:** allow type=tel for appropriate cc types ([#2575](https://github.com/dequelabs/axe-core/issues/2575)) ([ae21713](https://github.com/dequelabs/axe-core/commit/ae2171364bee2fe1912a9da427525be4fa99a1db))
- **checks/aria:** Mark elements missing from aria-errormessage for review ([#2550](https://github.com/dequelabs/axe-core/issues/2550)) ([8f9a035](https://github.com/dequelabs/axe-core/commit/8f9a035dca4aaa6f9fe20766d5a6f58ec1c4039c)), closes [#2460](https://github.com/dequelabs/axe-core/issues/2460)
- **color-contrast:** allow small text shadows to serve as text outline ([#2627](https://github.com/dequelabs/axe-core/issues/2627)) ([432e1f3](https://github.com/dequelabs/axe-core/commit/432e1f367f1017d1c2c59d2242909852fecb0607))
- **color-contrast:** mark elements with pseudo content as needs review ([#2613](https://github.com/dequelabs/axe-core/issues/2613)) ([fcdbdbc](https://github.com/dequelabs/axe-core/commit/fcdbdbc4d7324c952d08f69607870461f707c29b))
- **color-contrast:** properly handle scrolling text ([#2619](https://github.com/dequelabs/axe-core/issues/2619)) ([984e7e2](https://github.com/dequelabs/axe-core/commit/984e7e2a96fc0cf8a1a810a17a771511225c5257))
- **docs/rules:** add missing category tags to rules metadata ([#2569](https://github.com/dequelabs/axe-core/issues/2569)) ([285c442](https://github.com/dequelabs/axe-core/commit/285c442152d8a80dd13edb9ac064ac5030199524)), closes [#2554](https://github.com/dequelabs/axe-core/issues/2554)
- **explicit-label:** work with multiple labels ([#2573](https://github.com/dequelabs/axe-core/issues/2573)) ([d26f106](https://github.com/dequelabs/axe-core/commit/d26f10699d099c8a4f2aacf180862890d8dbbe18))
- **get-headers:** fix for rowspan and colspan ([#2545](https://github.com/dequelabs/axe-core/issues/2545)) ([3f02d14](https://github.com/dequelabs/axe-core/commit/3f02d14cbe3562e22762664843f8852f779be2a3))
- **heading-order:** evaluate headings from iframes in DOM order ([#2572](https://github.com/dequelabs/axe-core/issues/2572)) ([46f6628](https://github.com/dequelabs/axe-core/commit/46f6628cc710b9aaa8b872790a0b8c42032a8134))
- **implilcit-role:** use type property instead of attribute to resolve input role ([#2547](https://github.com/dequelabs/axe-core/issues/2547)) ([35e853d](https://github.com/dequelabs/axe-core/commit/35e853d91e1067b9156dfb6e89da0c7445baa86f)), closes [#2514](https://github.com/dequelabs/axe-core/issues/2514)
- **link-name:** pass landmark content as link text ([#2617](https://github.com/dequelabs/axe-core/issues/2617)) ([e77992e](https://github.com/dequelabs/axe-core/commit/e77992eb1fb5e2c2365154a0f431f223e1b158ee))
- **name-rules:** ignore when explicit roles don't require a name ([#2629](https://github.com/dequelabs/axe-core/issues/2629)) ([52fb138](https://github.com/dequelabs/axe-core/commit/52fb13872f2ff477b3a32d10d1fb5c72fde3adda))
- **region:** allow role=dialog and svg elements outside regions ([#2586](https://github.com/dequelabs/axe-core/issues/2586)) ([fab58d4](https://github.com/dequelabs/axe-core/commit/fab58d4bf60a4d7b1c935b31384eecd0c57f92f5))
- **region:** treat iframes as regions ([#2614](https://github.com/dequelabs/axe-core/issues/2614)) ([936db81](https://github.com/dequelabs/axe-core/commit/936db8105b7bfa1323568ab572a1e4b0428b4566))
- **rule:** add check node to the check result object ([#2608](https://github.com/dequelabs/axe-core/issues/2608)) ([b188911](https://github.com/dequelabs/axe-core/commit/b188911613812a9aaaa95fb86606f842ee39b11a))
- **scrollable-region-focusalbe:** do not fail for combobox pattern ([#2601](https://github.com/dequelabs/axe-core/issues/2601)) ([ac71a57](https://github.com/dequelabs/axe-core/commit/ac71a574f0285eceb11960416902169f7dce030d))
- deprecate aria-form-field-name-matches for no-name-method-matches ([#2584](https://github.com/dequelabs/axe-core/issues/2584)) ([8be89e3](https://github.com/dequelabs/axe-core/commit/8be89e39883e5c421da06b1343c810502ac6e9a7))
- do not allow fallback content for objects ([#2525](https://github.com/dequelabs/axe-core/issues/2525)) ([486eafe](https://github.com/dequelabs/axe-core/commit/486eafe72ca8e1b47edd53c0142aaab415b2d2d5))

### [4.0.2](https://github.com/dequelabs/axe-core/compare/v4.0.1...v4.0.2) (2020-09-08)

### Bug Fixes

- **color-contrast:** dont error for floating element ([#2444](https://github.com/dequelabs/axe-core/issues/2444)) ([45eb746](https://github.com/dequelabs/axe-core/commit/45eb74682c8460fbd6f1de273e710b597ff01392))
- **i18n:** proofreading of the french translations ([#2485](https://github.com/dequelabs/axe-core/issues/2485)) ([ebd0407](https://github.com/dequelabs/axe-core/commit/ebd04074f556b1927c9302e3f999e4c1cbc2de9e)), closes [#2484](https://github.com/dequelabs/axe-core/issues/2484)
- **implicit-role:** return gridcell for td child of grid or treegrid ([#2501](https://github.com/dequelabs/axe-core/issues/2501)) ([0553d4d](https://github.com/dequelabs/axe-core/commit/0553d4d67d59127cd67420022cd7696dea167a6a))
- **label:** pass when role none or presentation ([#2464](https://github.com/dequelabs/axe-core/issues/2464)) ([1d3c2fc](https://github.com/dequelabs/axe-core/commit/1d3c2fc28355c8476d3966d73664a2a1f4c6124d)), closes [#2458](https://github.com/dequelabs/axe-core/issues/2458)
- **link-name:** fix regression where link was not named from title attribute ([#2492](https://github.com/dequelabs/axe-core/issues/2492)) ([b86c73b](https://github.com/dequelabs/axe-core/commit/b86c73b7dc61c2609afa6f384502f3c91f9a7f10))
- **required-parent:** fail if intermediate role is not the required parent ([#2494](https://github.com/dequelabs/axe-core/issues/2494)) ([522865c](https://github.com/dequelabs/axe-core/commit/522865cabbe1f4815b1f3e980018e24c062c8e5e))
- **svg-non-empty-title:** update fail message to indicate if the title element is empty or missing ([#2462](https://github.com/dequelabs/axe-core/issues/2462)) ([9598656](https://github.com/dequelabs/axe-core/commit/9598656bfac61da35f8b9f52e1fb32fcab6b484e)), closes [#2452](https://github.com/dequelabs/axe-core/issues/2452)
- **valid-lang:** fail when lang attribute contains only whitespace ([#2504](https://github.com/dequelabs/axe-core/issues/2504)) ([8455a7f](https://github.com/dequelabs/axe-core/commit/8455a7f3a1aa83f487745306df0c07c39b6dc803))

## [4.0.1](https://github.com/dequelabs/axe-core/compare/v4.0.0...v4.0.1) (2020-08-04)

### Bug Fixes

- **checks**: do not normalize options for custom checks ([#2435](https://github.com/dequelabs/axe-core/issues/2435)) ([83056ad](https://github.com/dequelabs/axe-core/commit/83056ada0e50dc943a5e2829c97323a744cb3b28))

## [4.0.0](https://github.com/dequelabs/axe-core/compare/v3.5.5...v4.0.0) (2020-07-28)

### Breaking Changes

The following rules were deprecated in axe-core 3.x, and are removed in 4.0:

- aria-dpub-role-fallback
- checkboxgroup
- layout-table
- radiogroup
- video-description

The following checks were deprecated in axe-core 3.x, and are removed in 4.0:

- aria/implicit-role-fallback
- forms/fieldset
- forms/group-labelledby
- media/description
- tables/has-caption
- tables/has-summary
- tables/has-th

### Features

- add layout-table-matches method ([#2400](https://github.com/dequelabs/axe-core/issues/2400)) ([d7ba70f](https://github.com/dequelabs/axe-core/commit/d7ba70fc9916cedb2e977c9dc10667985c2bb4ed))
- **aria/get-roles-by-type:** deprecate in favor of standards/get-aria-roles-by-type ([#2362](https://github.com/dequelabs/axe-core/issues/2362)) ([c0c37ea](https://github.com/dequelabs/axe-core/commit/c0c37ea22f306cc93341fe25e173e3f65b6f924b))
- **aria/lookupTable, aria-allowed-attr:** deprecate aria.lookupTable and passing allowed attributes to aria-allowed-attr ([#2395](https://github.com/dequelabs/axe-core/issues/2395)) ([739d1b1](https://github.com/dequelabs/axe-core/commit/739d1b11052c93c0856e6e5d217b66e613e43f11))
- **avoid-inline-spacing:** add option for which css properties to look at ([#2244](https://github.com/dequelabs/axe-core/issues/2244)) ([93c027a](https://github.com/dequelabs/axe-core/commit/93c027ab7d081dcda401399e1cbdb5a27026c927))
- **checks:** normalize check options to alway be an object ([#2219](https://github.com/dequelabs/axe-core/issues/2219)) ([da12da7](https://github.com/dequelabs/axe-core/commit/da12da79b1e7a16887807980e03d4e8244bed560))
- **checks,rules:** remove deprecated checks and rules ([#2214](https://github.com/dequelabs/axe-core/issues/2214)) ([317545a](https://github.com/dequelabs/axe-core/commit/317545a0916a16e05263d1cedb6d9753e4ef6e19))
- **closest:** VirtualNode implementation of Element.closest. Deprecate commons.dom.findUp and commons.dom.findUpVirtual ([#2139](https://github.com/dequelabs/axe-core/issues/2139)) ([493dd22](https://github.com/dequelabs/axe-core/commit/493dd2253606189a5e475c691aa8f0dc68a8aedd))
- **color-contrast, utils:** add more options to color-contrast, add utils.deepMerge, deprecate commons.color.hasValidContrastRatio ([#2256](https://github.com/dequelabs/axe-core/issues/2256)) ([49fdb46](https://github.com/dequelabs/axe-core/commit/49fdb46cf371321760a3bdff6acc5311b4cfd158))
- **commons/aria:** deprecate getRole({ noImplicit }) for getExplicitRole() ([#2294](https://github.com/dequelabs/axe-core/issues/2294)) ([a2873ea](https://github.com/dequelabs/axe-core/commit/a2873ea41f5b264165a2fb76679ab121985bb4f2))
- **commons/standards:** create the commons/standards object for helper functions against the standards table ([#2358](https://github.com/dequelabs/axe-core/issues/2358)) ([6dce974](https://github.com/dequelabs/axe-core/commit/6dce974ee5f3095143818fbf5180d21762fe5de6))
- **duplicate-img-label:** add option for parentSelector ([#2216](https://github.com/dequelabs/axe-core/issues/2216)) ([8906806](https://github.com/dequelabs/axe-core/commit/8906806fa039ba105bea745495e91031461af445))
- **get-role:** add presentation role resolution and inheritance ([#2281](https://github.com/dequelabs/axe-core/issues/2281)) ([e207190](https://github.com/dequelabs/axe-core/commit/e2071900c462048a7455ec1f41878ab4f70b1bdd))
- **get-role:** work with standards object ([#2367](https://github.com/dequelabs/axe-core/issues/2367)) ([1b20faf](https://github.com/dequelabs/axe-core/commit/1b20faf73417fde425dadfe1ac0a359d2179c1a1))
- **globals:** deduce required window and document globals from context ([#2308](https://github.com/dequelabs/axe-core/issues/2308)) ([61bac69](https://github.com/dequelabs/axe-core/commit/61bac69877da884a9a24b040f898a67c6746984f))
- **has-descendant, page-no-duplicate:** move page-has-elm and page-no-duplicate to generic check ([#2229](https://github.com/dequelabs/axe-core/issues/2229)) ([59125a0](https://github.com/dequelabs/axe-core/commit/59125a056d4b591ee20a67be12e1c66e83ec7c25))
- **has-lang:** add option for which attributes to look at ([#2239](https://github.com/dequelabs/axe-core/issues/2239)) ([e69c46a](https://github.com/dequelabs/axe-core/commit/e69c46a49f348b8ae1fec8929e4688940b644a06))
- **has-text-content:** add generic check has-text-content ([#2234](https://github.com/dequelabs/axe-core/issues/2234)) ([60ddc65](https://github.com/dequelabs/axe-core/commit/60ddc6577b70e27e9e7fe340d163b01360035e13))
- **i18n:** add Basque (eu) translation ([#1964](https://github.com/dequelabs/axe-core/issues/1964)) ([176cf82](https://github.com/dequelabs/axe-core/commit/176cf824288a927e5e21dd64a7793251a31ef180))
- **matcher:** allow regex string to be parsed as regex ([#2324](https://github.com/dequelabs/axe-core/issues/2324)) ([321b2d1](https://github.com/dequelabs/axe-core/commit/321b2d1dbfb8f3e04847674f46ada53b19313142))
- **matches:** add explicitRole, implicitRole, and semanticRole matches functions ([#2286](https://github.com/dequelabs/axe-core/issues/2286)) ([30efbff](https://github.com/dequelabs/axe-core/commit/30efbfffc8b83ca03b4b2697e4202027826195f9))
- **matches-definition:** add generic check matches-definition ([#2233](https://github.com/dequelabs/axe-core/issues/2233)) ([20467aa](https://github.com/dequelabs/axe-core/commit/20467aa48705d4b6b98f123031431bb3ac3ee22b))
- **metadata-function-map:** add metadata function map to support check evaulate functions as an id string ([#2162](https://github.com/dequelabs/axe-core/issues/2162)) ([ec9b931](https://github.com/dequelabs/axe-core/commit/ec9b931c3123b3252e3c0afd5b059f0bbcfcc0d0))
- **non-space-content:** switch all non-empty checks to new generic check ([#2215](https://github.com/dequelabs/axe-core/issues/2215)) ([7ce7b00](https://github.com/dequelabs/axe-core/commit/7ce7b00c2d302d830bd2c0efa027d0ea3b10770c))
- **object-alt,accessible-text:** object-alt rule and accessible text to work with serial virtual nodes with children ([e8e17e4](https://github.com/dequelabs/axe-core/commit/e8e17e42c3594518ee60838749a507504a839c69))
- **options:** add ancestry CSS selector to nodes ([#2389](https://github.com/dequelabs/axe-core/issues/2389)) ([f2cccf5](https://github.com/dequelabs/axe-core/commit/f2cccf50def5b2409f5903ce325f18475c8ed79e))
- **region:** add option to match nodes as region ([#2249](https://github.com/dequelabs/axe-core/issues/2249)) ([b544554](https://github.com/dequelabs/axe-core/commit/b544554902b3aa0afb477e5e78140780f42e3405))
- **required-attrs:** deprecate options to pass more required attrs ([797ee34](https://github.com/dequelabs/axe-core/commit/797ee34e6913cc5e45d55c770127e91623cb31f7))
- **rule:** add reviewOnFail option to have rule return as needs review instead of violation ([#2235](https://github.com/dequelabs/axe-core/issues/2235)) ([bb72acd](https://github.com/dequelabs/axe-core/commit/bb72acde17e9f783ac136c30a79f14144326a7df))
- **rule:** optional impact on rules ([#2393](https://github.com/dequelabs/axe-core/issues/2393)) ([e48c1eb](https://github.com/dequelabs/axe-core/commit/e48c1eb67db6182d7048a21f935db5a9416077ec))
- **scope-value:** add options for valid scope values ([#2245](https://github.com/dequelabs/axe-core/issues/2245)) ([44269ec](https://github.com/dequelabs/axe-core/commit/44269ec6695645417dda03b26fcb04abebc15f5f))
- **standards:** add ariaRoles standard ([#2328](https://github.com/dequelabs/axe-core/issues/2328)) ([70efbc0](https://github.com/dequelabs/axe-core/commit/70efbc045448d6621c270e5cbec70fe5794d4216))
- **standards:** add dpub-roles spec ([#2332](https://github.com/dequelabs/axe-core/issues/2332)) ([7ec3185](https://github.com/dequelabs/axe-core/commit/7ec3185d55ca8fdce07c0345f5b960b39a54aba4))
- **standards:** add get-aria-roles-supporting-name-from-content and deprecate aria/get-roles-with-name-from-content ([#2363](https://github.com/dequelabs/axe-core/issues/2363)) ([240b528](https://github.com/dequelabs/axe-core/commit/240b528a3a5e5f06e29973df5a9427315496bd28))
- **standards:** add get-elements-by-content-type and implicit-html-roles ([#2375](https://github.com/dequelabs/axe-core/issues/2375)) ([f1e0848](https://github.com/dequelabs/axe-core/commit/f1e0848cb359f5912e2cf12ada02b06c079d7e21))
- add "ACT" tag for published W3C ACT rules ([#2382](https://github.com/dequelabs/axe-core/issues/2382)) ([cf11b64](https://github.com/dequelabs/axe-core/commit/cf11b646f9b883e153ff5ec8fd848a363ea6bb24))
- **standards:** add html-elms spec ([#2333](https://github.com/dequelabs/axe-core/issues/2333)) ([1d6a888](https://github.com/dequelabs/axe-core/commit/1d6a8885166007f8fec78ce853b8fef8262c522d))
- **standards:** create standards object and ariaAttrs ([#2315](https://github.com/dequelabs/axe-core/issues/2315)) ([48610de](https://github.com/dequelabs/axe-core/commit/48610de74fed473f7d87e3c01f87a46d4dec406c))
- **utils.getFlattenTree:** default to documentElement ([#2260](https://github.com/dequelabs/axe-core/issues/2260)) ([8b14ccc](https://github.com/dequelabs/axe-core/commit/8b14ccc5b1bd89892f57ff0f02de2045e7c3756f))
- **valid-lang:** add option for which attributes to look at ([#2240](https://github.com/dequelabs/axe-core/issues/2240)) ([ffee19e](https://github.com/dequelabs/axe-core/commit/ffee19e4a769d66f9c81016dce83ad654609a9df))
- update SC tags for `label` rule ([#2037](https://github.com/dequelabs/axe-core/issues/2037)) ([c7113fc](https://github.com/dequelabs/axe-core/commit/c7113fcc5d3f144e37d0204eebef701ffc844280))

### Bug Fixes

- **accessible-name-virtual:** allow subtree text to work with virtual and serial nodes ([#2346](https://github.com/dequelabs/axe-core/issues/2346)) ([67d2dca](https://github.com/dequelabs/axe-core/commit/67d2dca91af29a47e85919b049d98a5c83ec5b99))
- **api:** correct use of rules property in axe.run ([#2278](https://github.com/dequelabs/axe-core/issues/2278)) ([1fd9e11](https://github.com/dequelabs/axe-core/commit/1fd9e116598fc2c152a30651110758043fe58ffd))
- **aria-allowed-attr:** Add aria-orientation to radiogroup role ([#2322](https://github.com/dequelabs/axe-core/issues/2322)) ([5e1f922](https://github.com/dequelabs/axe-core/commit/5e1f92206134c81e5c05e907ab3fc1c223243b3d))
- **aria-allowed-attr:** allow aria-activedescendant on role=application ([#2304](https://github.com/dequelabs/axe-core/issues/2304)) ([2554f5c](https://github.com/dequelabs/axe-core/commit/2554f5cdfc7bf616b52f109adedf575c7ea65f65))
- **aria-allowed-role:** Add fieldset to allowed elements for radiogroup ([#2326](https://github.com/dequelabs/axe-core/issues/2326)) ([a5409d4](https://github.com/dequelabs/axe-core/commit/a5409d42deb69ff5982a732a7e947ce97fce9c1e))
- **aria-allowed-role:** allow role=presentation on hr ([#2300](https://github.com/dequelabs/axe-core/issues/2300)) ([b524ea9](https://github.com/dequelabs/axe-core/commit/b524ea954fdcf8fcf09b49bdbe546335ed0e46df))
- **aria-lablledby:** work with virtual and serial virtual nodes ([#2341](https://github.com/dequelabs/axe-core/issues/2341)) ([c1f3db7](https://github.com/dequelabs/axe-core/commit/c1f3db749f8de71635bc378c7cdf1a22c782429a))
- **aria-toggle-field-name:** work with virtual nodes ([#2353](https://github.com/dequelabs/axe-core/issues/2353)) ([e5fb01e](https://github.com/dequelabs/axe-core/commit/e5fb01e497c63c2deca6eebd2466faea4d9afb2a))
- **aria/allowed-attr:** work with standards object ([#2360](https://github.com/dequelabs/axe-core/issues/2360)) ([40397f5](https://github.com/dequelabs/axe-core/commit/40397f560f0bf0bcd7d80b98c4c02857cf6f2584))
- **aria/get-role-type:** work with standards object ([#2361](https://github.com/dequelabs/axe-core/issues/2361)) ([a61e314](https://github.com/dequelabs/axe-core/commit/a61e3142ba5976bde09a9cd82cc944eab5ee284b))
- **autocomplete:** allow all 'tel-\*' autocomplete values on type=tel ([#2307](https://github.com/dequelabs/axe-core/issues/2307)) ([58c8175](https://github.com/dequelabs/axe-core/commit/58c8175ce4bcfd597c1d6df4c95113d2eb753951))
- **button-name:** work with serial virtual node ([#2351](https://github.com/dequelabs/axe-core/issues/2351)) ([efa0e56](https://github.com/dequelabs/axe-core/commit/efa0e56ed8901c0d379e564cc0d4d5532b5df547))
- **bypass:** find headings in iframes ([#2310](https://github.com/dequelabs/axe-core/issues/2310)) ([7c23dbd](https://github.com/dequelabs/axe-core/commit/7c23dbd1d04d95e3bd2b56a0bd14571f906eb3d5))
- **color:** allow all valid CSS colors ([#2381](https://github.com/dequelabs/axe-core/issues/2381)) ([63d69ea](https://github.com/dequelabs/axe-core/commit/63d69ea1313d0c7dcdc4142c8de160b89082d9df))
- **color-contrast:** account for text-shadow ([#2334](https://github.com/dequelabs/axe-core/issues/2334)) ([3eb6d2c](https://github.com/dequelabs/axe-core/commit/3eb6d2ccde9dc731450c90ebe497580cb98de201))
- **color-contrast:** ignore aria-disabled labels ([#2130](https://github.com/dequelabs/axe-core/issues/2130)) ([e451b87](https://github.com/dequelabs/axe-core/commit/e451b87166b02262b5f191be1cf9fe1548047931))
- **color-contrast:** properly handle truncated text ([#2302](https://github.com/dequelabs/axe-core/issues/2302)) ([a56190c](https://github.com/dequelabs/axe-core/commit/a56190c845cc7619a38a28685c48d8ac38108ebd))
- **dlitem:** allow role=presentation on parent dl ([#2301](https://github.com/dequelabs/axe-core/issues/2301)) ([9857978](https://github.com/dequelabs/axe-core/commit/9857978a1f926b9eada8f560c9fbb1950fe8c648))
- **focusable-no-name:** work with serial virtual nodes ([#2399](https://github.com/dequelabs/axe-core/issues/2399)) ([1ef3066](https://github.com/dequelabs/axe-core/commit/1ef3066476af80a7b5cb61a8fcb113f0208d5086))
- **forms/\*:** allow all form control value checks to work with virtual nodes ([#2343](https://github.com/dequelabs/axe-core/issues/2343)) ([8ad41af](https://github.com/dequelabs/axe-core/commit/8ad41af457125a268256f84de7623a79e905f782))
- **header-present:** fail for headings with non-header role ([#2306](https://github.com/dequelabs/axe-core/issues/2306)) ([b8ffb39](https://github.com/dequelabs/axe-core/commit/b8ffb39785188dd230431f4f53825f1fe42ee3af))
- **html-namespace-matches:** work with serial virtual nodes ([#2398](https://github.com/dequelabs/axe-core/issues/2398)) ([18c22fd](https://github.com/dequelabs/axe-core/commit/18c22fd379440eb681aa18cf0b624d6b4b3cbeec))
- **implicit-roles:** add proper implicit role calculation ([#2242](https://github.com/dequelabs/axe-core/issues/2242)) ([e9dd259](https://github.com/dequelabs/axe-core/commit/e9dd2598b469fcbf936517aba33f983191301ff9))
- **input-button-name:** work with virtual nodes ([#2352](https://github.com/dequelabs/axe-core/issues/2352)) ([63ca388](https://github.com/dequelabs/axe-core/commit/63ca3881e8352fba3b71f2f76dae23a0d70a271f))
- **is-valid-autocomplete:** allow autocomplete="one-time-code" ([#2336](https://github.com/dequelabs/axe-core/issues/2336)) ([638346f](https://github.com/dequelabs/axe-core/commit/638346fc515cfa5fda1b71f5ad31f5d4436a21eb))
- **label:** work with virtual nodes ([#2354](https://github.com/dequelabs/axe-core/issues/2354)) ([44b033c](https://github.com/dequelabs/axe-core/commit/44b033c51619294a8d85c26aa6c703f57db90a59))
- **page-has-h1:** allow aria-level=1 on native headings ([#2349](https://github.com/dequelabs/axe-core/issues/2349)) ([70b10b2](https://github.com/dequelabs/axe-core/commit/70b10b29c725507b0c1b6fb0d6d4146f123e5d34))
- **rule:** allow impact to be configured ([#2426](https://github.com/dequelabs/axe-core/issues/2426)) ([f325c75](https://github.com/dequelabs/axe-core/commit/f325c755a11895cbb868de7be648461e5d81494e))
- **rule,check:** allow function ids for matches property in rule.configure ([#2423](https://github.com/dequelabs/axe-core/issues/2423)) ([3ccb781](https://github.com/dequelabs/axe-core/commit/3ccb78128469d234db22225ea93a40c6d8fef434))
- **run:** cleanup globals if set from context ([#2387](https://github.com/dequelabs/axe-core/issues/2387)) ([d5b6931](https://github.com/dequelabs/axe-core/commit/d5b6931cba857a5c787d912ee56bdd973e3742d4))
- **svg-image-alt:** work with serial virtual nodes ([#2397](https://github.com/dequelabs/axe-core/issues/2397)) ([e2537ef](https://github.com/dequelabs/axe-core/commit/e2537eff1eb4b5378d63bddf00df44347d3aa09b))
- **types:** Allow `impact` to be `null` ([#2321](https://github.com/dequelabs/axe-core/issues/2321)) ([757aacd](https://github.com/dequelabs/axe-core/commit/757aacd9716dc8a606f23807a5e8fe6a5474fbee)), closes [#2313](https://github.com/dequelabs/axe-core/issues/2313)
- **types:** Make any tag allowed ([#2314](https://github.com/dequelabs/axe-core/issues/2314)) ([5d98a04](https://github.com/dequelabs/axe-core/commit/5d98a043d8bcda3a3fe032dd8205c9256c481631)), closes [#2312](https://github.com/dequelabs/axe-core/issues/2312)
- **typings:** update types file ([#2425](https://github.com/dequelabs/axe-core/issues/2425)) ([0aab922](https://github.com/dequelabs/axe-core/commit/0aab922630bf72cc658dee3fb907463d718c57f1))
- **virtual-node:** default and lowercase type property ([#2350](https://github.com/dequelabs/axe-core/issues/2350)) ([f6b3484](https://github.com/dequelabs/axe-core/commit/f6b34849fd0d869448137b4d032ca69a91fa9f66))
- ensure correctly generated axe is required by `aria-supported` build step ([#2295](https://github.com/dequelabs/axe-core/issues/2295)) ([1414a9f](https://github.com/dequelabs/axe-core/commit/1414a9fd822700609024aa2cef782d63cfb0bce4))
- **aria-required-attr:** pass aria-checked for elements with checked property ([#2226](https://github.com/dequelabs/axe-core/issues/2226)) ([64318a5](https://github.com/dequelabs/axe-core/commit/64318a5bce02f05c6e6a1acf739c354b84b88082))
- **axe.d.ts:** add `element` to NodeResults ([#2211](https://github.com/dequelabs/axe-core/issues/2211)) ([2429355](https://github.com/dequelabs/axe-core/commit/242935552c1679f0c98aff8585fd39c0442d2d6e))
- **color-contrast:** mark more punctutions for review ([#2126](https://github.com/dequelabs/axe-core/issues/2126)) ([dc98afc](https://github.com/dequelabs/axe-core/commit/dc98afc841c86e4b7b771bbb1171152a151c3e5b))
- **duplicate-id:** list the duplicate id in message ([#2163](https://github.com/dequelabs/axe-core/issues/2163)) ([f5d4ff9](https://github.com/dequelabs/axe-core/commit/f5d4ff9e792b979c7f7c7cf8b3607f3969c25eb4))
- **required-children:** consider overriding descendant role(s)… ([#2131](https://github.com/dequelabs/axe-core/issues/2131)) ([e1c11dd](https://github.com/dequelabs/axe-core/commit/e1c11ddf6e001eaa593a477eb7a5cb2f3c020e6d))
- **scrollable-region-focusable:** pass for elements with contenteditable ([#2133](https://github.com/dequelabs/axe-core/issues/2133)) ([1012dfe](https://github.com/dequelabs/axe-core/commit/1012dfec29a7a69b70357211233bb350159fa83e))
- **th-has-data-cells:** fail when only cell points to different header ([2d420c3](https://github.com/dequelabs/axe-core/commit/2d420c33981231a21d375c0aa8907e0c4c7c8932))
- **types:** Add "wcag21aa" and "wcag21a" to our TS definition ([#2272](https://github.com/dequelabs/axe-core/issues/2272)) ([23674d4](https://github.com/dequelabs/axe-core/commit/23674d4403a7088996a758d0081b869516be4aea))
- **types:** Add missing properties to `Spec` ([#2273](https://github.com/dequelabs/axe-core/issues/2273)) ([c39ba9f](https://github.com/dequelabs/axe-core/commit/c39ba9ffbd3a9777660da1d7e27d2471fc4158cd))

### [3.5.5](https://github.com/dequelabs/axe-core/compare/v3.5.4...v3.5.5) (2020-06-16)

### Bug Fixes

- **aria-input-field-name:** add the missing word must to help metadata ([b0f5562](https://github.com/dequelabs/axe-core/commit/b0f5562ac2a746e8ac78f6e483e39162680f3a22))
- **color-contrast:** fix font-weight calculation for safari ([205b587](https://github.com/dequelabs/axe-core/commit/205b58709c280f00100bf24a7b6bf15da50ed0ed))
- **configure:** validate rules and checks properties ([8c91ead](https://github.com/dequelabs/axe-core/commit/8c91ead900fd3cab58f77af45cce54d02e734a8e))
- **is-visible:** return false for opacity: 0 and 0 height scrollable regions ([86ada3f](https://github.com/dequelabs/axe-core/commit/86ada3f7cef5b1fbcaad37b8acfaee93566ba8bf))
- **listitem:** do not fail for parent with role=presentation|none ([a3ddc6e](https://github.com/dequelabs/axe-core/commit/a3ddc6e1e43716b761e8bb42fba4842d88f813dc))
- **meta-viewport:** don't throw error if viewport property doesn't have a value ([2176794](https://github.com/dequelabs/axe-core/commit/2176794f8a831c8303984039e4a07b99d368b111))

### [3.5.4](https://github.com/dequelabs/axe-core/compare/v3.5.3...v3.5.4) (2020-05-22)

### Bug Fixes

- **get-element-stack:** properly calculate position of children of floated elements ([28a8c58](https://github.com/dequelabs/axe-core/commit/28a8c58b409461600da07eac164e5b0ca4744502))

### [3.5.3](https://github.com/dequelabs/axe-core/compare/v3.5.2...v3.5.3) (2020-03-31)

### Bug Fixes

- **meta-viewport:** parse negative and string values for `maximum-scale` ([#2137](https://github.com/dequelabs/axe-core/issues/2137)) ([8c92472](https://github.com/dequelabs/axe-core/commit/8c92472397676d44b333cf50ad1a9413b9783c2c))
- **respondable:** ignore reflected messages from iframes ([#2134](https://github.com/dequelabs/axe-core/issues/2134)) ([3ab9f21](https://github.com/dequelabs/axe-core/commit/3ab9f21414d8f4195ac95ffca8f0ce52258539b0))
- **header-present:** update verbiage to use heading instead of header ([#2132](https://github.com/dequelabs/axe-core/issues/2132)) ([8890063](https://github.com/dequelabs/axe-core/commit/889006397329a35a170f4a3d24c55c3c4fd758fc))
- **color-contrast:** mark more punctuations for review ([#2126](https://github.com/dequelabs/axe-core/issues/2126)) ([dc98afc](https://github.com/dequelabs/axe-core/commit/dc98afc841c86e4b7b771bbb1171152a151c3e5b))
- **unicode:** detect supplementary private use area A ([#2102](https://github.com/dequelabs/axe-core/issues/2102)) ([f1739c2](https://github.com/dequelabs/axe-core/commit/f1739c21efdf5cf6fddf425d1c72b056757f3ba1))
- **definition-list:** Mention <div> is allowed to group content in <dl> ([#2098](https://github.com/dequelabs/axe-core/issues/2098)) ([76b1a9f](https://github.com/dequelabs/axe-core/commit/76b1a9f7f244e43f63351c46d91fc8b27040ba98))
- **td-headers-attr:** mark as needs review if headers attr is empty ([#2096](https://github.com/dequelabs/axe-core/issues/2096)) ([699b566](https://github.com/dequelabs/axe-core/commit/699b566111cfed2a4ebeade35346a49bcb3546c7))
- **td-has-headers:** don't fail for empty headers attribute ([#2095](https://github.com/dequelabs/axe-core/issues/2095)) ([7952a37](https://github.com/dequelabs/axe-core/commit/7952a377b960c2403c8d4758a9f35ebe525549fe))
- **th-has-data-cells:** fail when data cell points to a different header ([#2094](https://github.com/dequelabs/axe-core/issues/2094)) ([d3bd416](https://github.com/dequelabs/axe-core/commit/d3bd416a3df7324231f17ff9e1e20dc6342c7aa5))
- **has-lang:** update message to indicate that xml:lang is not valid on HTML pages ([#2093](https://github.com/dequelabs/axe-core/issues/2093)) ([c3a7de2](https://github.com/dequelabs/axe-core/commit/c3a7de206baf77c0b25c8c095119393b1dc85f0f))
- **page-no-duplicate-contentinfo:** do not fail when first element is inside landmark ([#2092](https://github.com/dequelabs/axe-core/issues/2092)) ([eca7e05](https://github.com/dequelabs/axe-core/commit/eca7e05cc6ff750855bcb219833967a9d7087679))

### [3.5.2](https://github.com/dequelabs/axe-core/compare/v3.5.1...v3.5.2) (2020-03-06)

### Bug Fixes

- **aria-allowed-role:** allow role=spinbutton on input[type=tel](<[635445b](https://github.com/dequelabs/axe-core/commit/635445ba6da7bc197bcdee6fb1a9d9dc81e43941)>)
- **color-contrast:** ignore form elements that move text outside of node using text-indent ([#2044](https://github.com/dequelabs/axe-core/issues/2044)) ([85cc6ab](https://github.com/dequelabs/axe-core/commit/85cc6abd7f919a7311c6da01a41853cbfd539508))
- **commons:** handle node(s) contained by SVG document when de… ([#2054](https://github.com/dequelabs/axe-core/issues/2054)) ([bf4c9bf](https://github.com/dequelabs/axe-core/commit/bf4c9bff2953b1ac7f40dbb1d0bd1986c1caa673))
- **getCheckMessage:** add API to return check message ([#2066](https://github.com/dequelabs/axe-core/issues/2066)) ([e216322](https://github.com/dequelabs/axe-core/commit/e216322183c8b064ebfd748fea785b8c2fe78b16))
- **has-lang:** fail check when `xml:lang` is used in HTML docum… ([#2053](https://github.com/dequelabs/axe-core/issues/2053)) ([e07aaea](https://github.com/dequelabs/axe-core/commit/e07aaea86bc9460a2d9f568637b4a77d33094ed6))
- **label-content-name-mismatch:** ignore non `widget` aria role(s) & do not use deprecated `lookupTable.rolesOfType` ([#2022](https://github.com/dequelabs/axe-core/issues/2022)) ([89bd84c](https://github.com/dequelabs/axe-core/commit/89bd84c4a9846dc31a660eda6b274329e7ac70b5))
- **package-lock:** change @deque/doT from agora to npm ([#2058](https://github.com/dequelabs/axe-core/issues/2058)) ([c03c0e5](https://github.com/dequelabs/axe-core/commit/c03c0e5ffc3ea1b49607355fa9d6f2e2faf0ebd1))
- **page-has-heading-one:** find screen-reader only headings ([#2065](https://github.com/dequelabs/axe-core/issues/2065)) ([f808a12](https://github.com/dequelabs/axe-core/commit/f808a12261269719534ae52c878d1700fb70053e))
- **region:** ignore direct child text nodes of body ([#2050](https://github.com/dequelabs/axe-core/issues/2050)) ([fde31d0](https://github.com/dequelabs/axe-core/commit/fde31d03d24820f681b257c4c42b98f25b2877ec))
- **skip-link:** identify as skip-link only if the link is offscreen ([#2079](https://github.com/dequelabs/axe-core/issues/2079)) ([241e1d0](https://github.com/dequelabs/axe-core/commit/241e1d0715398a39c2e502ddb781f5fc29987dde))
- check `invaildrole` fails only when all roles are invalid ([#2075](https://github.com/dequelabs/axe-core/issues/2075)) ([989b317](https://github.com/dequelabs/axe-core/commit/989b31788b08b6514dd4b606162193d4dd168be9))
- ignore empty, whitespace or undefined `role` for rule `ari… ([#2077](https://github.com/dequelabs/axe-core/issues/2077)) ([dbd3c02](https://github.com/dequelabs/axe-core/commit/dbd3c0211b05641f366dfe2fe9c2124cad9e5e3a))
- update tags for rule `area-alt` ([#2051](https://github.com/dequelabs/axe-core/issues/2051)) ([7db231f](https://github.com/dequelabs/axe-core/commit/7db231f2ff2b70a4e8e6f7aababe0871764ece96))

### [3.5.1](https://github.com/dequelabs/axe-core/compare/v3.5.0...v3.5.1) (2020-02-12)

### Bug Fixes

- **color-contrast:** parse font-weight value as number ([#2031](https://github.com/dequelabs/axe-core/issues/2031)) ([#2040](https://github.com/dequelabs/axe-core/issues/2040)) ([0bb2166](https://github.com/dequelabs/axe-core/commit/0bb21669f75b3adc0e3345c85680d437c57f94d8))
- **color-contrast:** properly pass options to check ([#2033](https://github.com/dequelabs/axe-core/issues/2033)) ([26b99c0](https://github.com/dequelabs/axe-core/commit/26b99c0a511bd6fffaaca7535d732f26b39ef46e))
- **commons:** avoid unicode regex encoding in axe.min.js ([#2024](https://github.com/dequelabs/axe-core/issues/2024)) ([ae90dc4](https://github.com/dequelabs/axe-core/commit/ae90dc47521f6047f71befcb3551686cf857208d))
- **sri-history:** correct SRI for various versions ([#2041](https://github.com/dequelabs/axe-core/issues/2041)) ([940c017](https://github.com/dequelabs/axe-core/commit/940c01708cede33e796972ce810a815ddf492ba4))

## [3.5.0](https://github.com/dequelabs/axe-core/compare/v3.4.0...v3.5.0) (2020-02-04)

### Features

- **aria-dpub-role-fallback:** depreacte aria-dpub-role-fallback and move into aria-allowed-role ([#1899](https://github.com/dequelabs/axe-core/issues/1899)) ([8e25c20](https://github.com/dequelabs/axe-core/commit/8e25c20a479b03820117c6cd349b51ce7f2e94ee))
- **aria-label:** deprecate Element arg; use virtualNode ([#1922](https://github.com/dequelabs/axe-core/issues/1922)) ([d14981c](https://github.com/dequelabs/axe-core/commit/d14981c1f67ba849f9519ee826ac646d281649c7))
- **audit:** allow runOnly option to accept an array of rules ([#1889](https://github.com/dequelabs/axe-core/issues/1889)) ([38d6a3f](https://github.com/dequelabs/axe-core/commit/38d6a3fb26c66215cca0f3df8da268b34bcb6be5))
- **color-contrast:** greatly improve performance for very large sites ([#1943](https://github.com/dequelabs/axe-core/issues/1943)) ([9ea0065](https://github.com/dequelabs/axe-core/commit/9ea006534a423b2b7df1826a40e8214c6bb1fc48))
- **core:** add preload configuration option for media files ([#1958](https://github.com/dequelabs/axe-core/issues/1958)) ([8a62649](https://github.com/dequelabs/axe-core/commit/8a626498dc9694a992e76855781e2ad1cbd4fe9b))
- **core/reporters/v1:** Add failureSummary to incomplete results ([#1972](https://github.com/dequelabs/axe-core/issues/1972)) ([c88883d](https://github.com/dequelabs/axe-core/commit/c88883d00b6578593b83f3134ebf897d22a3ba61))
- **get-element-stack:** performant api to replace document.elementsFromPoint ([#1842](https://github.com/dequelabs/axe-core/issues/1842)) ([9ae07fb](https://github.com/dequelabs/axe-core/commit/9ae07fbda36afd18a42a96d6755055006f309a4c))
- **i18n:** add Danish (da-DK) translation ([#1876](https://github.com/dequelabs/axe-core/issues/1876)) ([fb6fc41](https://github.com/dequelabs/axe-core/commit/fb6fc414246bdaf1590d367352e4bea033822639))
- **landmark-no-duplicate-\*:** add rule landmark-no-duplicate-main, don't use html as element source for all duplicate rules ([#1949](https://github.com/dequelabs/axe-core/issues/1949)) ([5ec7894](https://github.com/dequelabs/axe-core/commit/5ec7894394f8348761f5fe48ad0d09b31a27d2b2))
- **layout-table:** deprecate layout-table rule and checks ([#1885](https://github.com/dequelabs/axe-core/issues/1885)) ([d22cb30](https://github.com/dequelabs/axe-core/commit/d22cb30ad29f5d1aec089eea3544ff88f3b4f8ab))
- **matches:** use VirtualNode and deprecate HTMLElement ([#1988](https://github.com/dequelabs/axe-core/issues/1988)) ([2600a06](https://github.com/dequelabs/axe-core/commit/2600a062d65f0c079b30d6a9f2aa3b6faeea6872))
- **rule:** add color-contrast check for unicode characters, behind flags. ([#1969](https://github.com/dequelabs/axe-core/issues/1969)) ([0cd4037](https://github.com/dequelabs/axe-core/commit/0cd40373ff9a080ffcb128ce66f9eaf80f0d19b4)), closes [#1906](https://github.com/dequelabs/axe-core/issues/1906)
- **rule:** identical-links-same-purpose ([#1649](https://github.com/dequelabs/axe-core/issues/1649)) ([9c73f62](https://github.com/dequelabs/axe-core/commit/9c73f62fea2be68cb555c36fc32c79f7ce2697dd))
- **rule:** no-autoplay-audio ([#1946](https://github.com/dequelabs/axe-core/issues/1946)) ([b2373cb](https://github.com/dequelabs/axe-core/commit/b2373cb9ce73a15e79aec86af7edff62c9a4e2b3))
- **svg-img-alt:** rule for when svg needs a title ([#1953](https://github.com/dequelabs/axe-core/issues/1953)) ([9491e09](https://github.com/dequelabs/axe-core/commit/9491e094fe82c4dba45eb253ed18bf0a0165197c))
- deprecate the use doT.js for messages ([#1938](https://github.com/dequelabs/axe-core/issues/1938)) ([a2ddba3](https://github.com/dequelabs/axe-core/commit/a2ddba305003db0540c093f4ad9015c8854cd98d))

### Bug Fixes

- **color-contrast:** properly pass options to check ([#2033](https://github.com/dequelabs/axe-core/issues/2033)) ([26b99c0](https://github.com/dequelabs/axe-core/commit/26b99c0a511bd6fffaaca7535d732f26b39ef46e))
- **commons:** avoid unicode regex encoding in axe.min.js ([#2024](https://github.com/dequelabs/axe-core/issues/2024)) ([ae90dc4](https://github.com/dequelabs/axe-core/commit/ae90dc47521f6047f71befcb3551686cf857208d))
- add tags with dots for wcag sc ([#1849](https://github.com/dequelabs/axe-core/issues/1849)) ([2f1ab36](https://github.com/dequelabs/axe-core/commit/2f1ab36354add65fe77be3e2831278ce37c3bbab))
- compute orientation lock from various transformation func… ([#1937](https://github.com/dequelabs/axe-core/issues/1937)) ([c987de0](https://github.com/dequelabs/axe-core/commit/c987de0ce7cfcde5a280a9d6c643879093df1bcd))
- ignores axe.ping responses that do not contain axe=true ([26cb1fb](https://github.com/dequelabs/axe-core/commit/26cb1fbdd7127c421bb7ca60e07d72385c6e2ea1))
- input[role=button][value='correct'] should pass ([#1897](https://github.com/dequelabs/axe-core/issues/1897)) ([4635fef](https://github.com/dequelabs/axe-core/commit/4635fef8bafd1c1cf916962693d0deee082266cf))
- remove heading from list of widget roles ([#1882](https://github.com/dequelabs/axe-core/issues/1882)) ([a8cbf71](https://github.com/dequelabs/axe-core/commit/a8cbf717ef3aa8b0bf09ddcb17f3a95fd2d1a64a))
- **link-name:** test role=link when there is no href ([#1921](https://github.com/dequelabs/axe-core/issues/1921)) ([6db28bc](https://github.com/dequelabs/axe-core/commit/6db28bc455b1c8937f44346aa232eacc4a1c3457))
- remove isNaN check ([#2010](https://github.com/dequelabs/axe-core/issues/2010)) ([5359b3f](https://github.com/dequelabs/axe-core/commit/5359b3f06ac051963ee61fcef417bcc20bdec55b))
- **aria-allowed-attr:** allow aria-details ([#1956](https://github.com/dequelabs/axe-core/issues/1956)) ([79e1c58](https://github.com/dequelabs/axe-core/commit/79e1c58cad4fdbd1409a0b545981c12f13252432))
- **aria-allowed-role:** allow role combobox on input tel, search, url, and email ([#1850](https://github.com/dequelabs/axe-core/issues/1850)) ([ba75961](https://github.com/dequelabs/axe-core/commit/ba759618ed8068f4eb74b6cd00f002322b20eca5))
- **aria-hidden-focus:** mark as needs review if a modal is open ([#1995](https://github.com/dequelabs/axe-core/issues/1995)) ([28a3553](https://github.com/dequelabs/axe-core/commit/28a35531b97b987e2fd1ad0beb25fbda3822fbd5))
- **aria-required-children:** allow comboboxes with more popup roles ([#1950](https://github.com/dequelabs/axe-core/issues/1950)) ([35a24c0](https://github.com/dequelabs/axe-core/commit/35a24c034520e3c6d95514e3b9d9f2ab6ca10e06))
- **aria-roles:** report error for fallback roles ([#1970](https://github.com/dequelabs/axe-core/issues/1970)) ([a1b7e08](https://github.com/dequelabs/axe-core/commit/a1b7e08f1f8e1c1caff228469cd891d0458680de))
- **aria-valid-attr-value:** mark as needs review for aria-current with invalid value ([#1998](https://github.com/dequelabs/axe-core/issues/1998)) ([39b8eae](https://github.com/dequelabs/axe-core/commit/39b8eae9d3352be4f77bef41abcb8eab268a6809))
- **axe.d.ts:** RunOnly.values should not accept a RunOnlyOption ([#1888](https://github.com/dequelabs/axe-core/issues/1888)) ([b68aa19](https://github.com/dequelabs/axe-core/commit/b68aa19500ffb57fdf370707d7614384ac239ad6))
- **build:** add lang query parameter to helpUrl when builing with a locale ([#1909](https://github.com/dequelabs/axe-core/issues/1909)) ([8c5f9ef](https://github.com/dequelabs/axe-core/commit/8c5f9efd6449f82e410eb7c6a68cfb5304fc66ae))
- **color-contrast:** improve speed and accuracy of code blocks with syntax highlighting ([#2003](https://github.com/dequelabs/axe-core/issues/2003)) ([1b6ab42](https://github.com/dequelabs/axe-core/commit/1b6ab42f72b1ea0d2ed223c6fd63b9b1e54cfa9b))
- **color-contrast:** mark as needs review for text that contains only non-BMP characters ([#2005](https://github.com/dequelabs/axe-core/issues/2005)) ([e559be0](https://github.com/dequelabs/axe-core/commit/e559be041e90951c734de4e7ad70d7299f590cf6))
- **color-contrast:** support IE extension context ([#2008](https://github.com/dequelabs/axe-core/issues/2008)) ([62e31ea](https://github.com/dequelabs/axe-core/commit/62e31ea5034871f572f8bb47dba2596fb1b13063))
- **color-contrast:** take into account parent opacity for foreground color ([#1902](https://github.com/dequelabs/axe-core/issues/1902)) ([8719700](https://github.com/dequelabs/axe-core/commit/87197005d046cc8c845764ff9107683938864c65))
- **getElementStack:** do not add hidden elements to the stack ([#1991](https://github.com/dequelabs/axe-core/issues/1991)) ([759d88d](https://github.com/dequelabs/axe-core/commit/759d88d08af059755d908794038770cc57448252))
- **is-focusable:** use tabindex attribute instead of property ([#1912](https://github.com/dequelabs/axe-core/issues/1912)) ([042a148](https://github.com/dequelabs/axe-core/commit/042a1487df76489483330274933d06fd27b842e0))
- **is-icon-ligature:** ignore whitespace characters ([#1908](https://github.com/dequelabs/axe-core/issues/1908)) ([7d2b2a6](https://github.com/dequelabs/axe-core/commit/7d2b2a6fca992e27bab36ed8ab64b7ba3385d7e5))
- **is-ligature-icon:** rename canvas to canvasContext ([#1880](https://github.com/dequelabs/axe-core/issues/1880)) ([de9885d](https://github.com/dequelabs/axe-core/commit/de9885d5708d6928fa2eb2816351879307a31a5b))
- **isFocusable:** return true for summary element and false for details element with summary child ([#1957](https://github.com/dequelabs/axe-core/issues/1957)) ([34ec2d7](https://github.com/dequelabs/axe-core/commit/34ec2d7326786347f8704786e886fc8d13dd3f9b))
- **listitem:** clarify that li elements must be contained in a list or role=list ([#1894](https://github.com/dequelabs/axe-core/issues/1894)) ([6d8cfee](https://github.com/dequelabs/axe-core/commit/6d8cfee91f0f0b5dcacba7ffb0b3d6505862e6b7))
- **locales:** fix incompeteMessageFallback to be a string rather than an object ([#1853](https://github.com/dequelabs/axe-core/issues/1853)) ([88677a9](https://github.com/dequelabs/axe-core/commit/88677a93d0ffe32d7305984314a37e623fb51153))
- **meta-viewport:** mark as a best-practice rule instead of wcag failure ([#1960](https://github.com/dequelabs/axe-core/issues/1960)) ([766f962](https://github.com/dequelabs/axe-core/commit/766f96210d05d35cab0139839db4f009b1139ce1))
- **only-listitem:** add message about invalid role on li elements ([#1954](https://github.com/dequelabs/axe-core/issues/1954)) ([c3049ab](https://github.com/dequelabs/axe-core/commit/c3049abaccff72412ec3d58fab9b386fe8a2ae5a))
- **page-has-main:** do not find hidden elements ([#2001](https://github.com/dequelabs/axe-core/issues/2001)) ([6429e60](https://github.com/dequelabs/axe-core/commit/6429e608f082db76b4cc445679b61a6e0ab8f034))
- **page-no-duplicate-main:** do not fail for duplicate hidden elements ([#2000](https://github.com/dequelabs/axe-core/issues/2000)) ([414dfb1](https://github.com/dequelabs/axe-core/commit/414dfb1c9a4ade645ce60e8918e8143fe58b3eb6))
- **preload:** reject promise `axe.utils.preload` when XHR fails ([#2009](https://github.com/dequelabs/axe-core/issues/2009)) ([b406b1f](https://github.com/dequelabs/axe-core/commit/b406b1fd09d72f9193d5b4011fa6f24bd33e3576))
- **region:** allow content in roles with implicit aria-live ([#2002](https://github.com/dequelabs/axe-core/issues/2002)) ([a8d829e](https://github.com/dequelabs/axe-core/commit/a8d829e081dabb62a5247e8956adbf7a2ef000a2))
- **region:** return outermost regionless node instead of html ([#1980](https://github.com/dequelabs/axe-core/issues/1980)) ([8d77be2](https://github.com/dequelabs/axe-core/commit/8d77be206e11537e8b509d593707c98143181bfa))
- **region-rule:** allow live regions with explicit roles ([#1999](https://github.com/dequelabs/axe-core/issues/1999)) ([b49bd95](https://github.com/dequelabs/axe-core/commit/b49bd9547b7d8ac392ebf958356f90aca7e48a38))
- **run:** throw error if axe.run is called after a run has started but not completed ([#1914](https://github.com/dequelabs/axe-core/issues/1914)) ([3252a02](https://github.com/dequelabs/axe-core/commit/3252a020ffd372e9583d39c989affd3d3b22957b))
- **server-side-image-map:** return as needs review rather than failure ([#1898](https://github.com/dequelabs/axe-core/issues/1898)) ([d544856](https://github.com/dequelabs/axe-core/commit/d5448567b23de8289443c9c314b34b3140f68c30))
- **tabindex:** don't error when tabindex property is overridden ([#1910](https://github.com/dequelabs/axe-core/issues/1910)) ([6b82a4c](https://github.com/dequelabs/axe-core/commit/6b82a4c513a1d5be78dcc54ad90a90768613b918))
- **td-has-headers:** greatly improve performance of td-has-headers rule ([#1887](https://github.com/dequelabs/axe-core/issues/1887)) ([a550309](https://github.com/dequelabs/axe-core/commit/a550309255b025cb1e63710af2142f2c02d79657))
- removes flaky test in axe Pro api check ([b2bdcd1](https://github.com/dequelabs/axe-core/commit/b2bdcd13e7623d3111f7035f2e951ff6b330132c))
- **typings:** add proper return value to getRule ([#1900](https://github.com/dequelabs/axe-core/issues/1900)) ([4d907f8](https://github.com/dequelabs/axe-core/commit/4d907f86b0152122f92cceae0b242e09aff0f49a))
- **unicode:** stop parsing escaped unicode strings ([#1997](https://github.com/dequelabs/axe-core/issues/1997)) ([7447d03](https://github.com/dequelabs/axe-core/commit/7447d03bcfd118897d8114fded1ea8a42f3da08f))

## [3.4.2](https://github.com/dequelabs/axe-core/compare/v3.4.1...v3.4.2) (2020-02-04)

### Bug Fixes

- **color-contrast:** support IE extension context ([#2008](https://github.com/dequelabs/axe-core/issues/2008)) ([cd651a0](https://github.com/dequelabs/axe-core/commit/cd651a0713fa2f4b307cc7fc2be033f8636b40d2))
- **unicode:** stop parsing escaped unicode strings ([#1997](https://github.com/dequelabs/axe-core/issues/1997)) ([523a31c](https://github.com/dequelabs/axe-core/commit/523a31c19fefd330e0b4f4c45f51d400c6f66164))

### [3.4.1](https://github.com/dequelabs/axe-core/compare/v3.4.0...v3.4.1) (2019-12-11)

### Bug Fixes

- ignores axe.ping responses that do not contain axe=true ([7d8aa42](https://github.com/dequelabs/axe-core/commit/7d8aa42))
- input[role=button][value='correct'] should pass ([#1897](https://github.com/dequelabs/axe-core/issues/1897)) ([3aba02c](https://github.com/dequelabs/axe-core/commit/3aba02c))
- remove heading from list of widget roles ([#1882](https://github.com/dequelabs/axe-core/issues/1882)) ([beb458f](https://github.com/dequelabs/axe-core/commit/beb458f))
- **listitem:** clarify that li elements must be contained in a list or role=list ([#1894](https://github.com/dequelabs/axe-core/issues/1894)) ([8fa0964](https://github.com/dequelabs/axe-core/commit/8fa0964))
- removes flaky test in axe Pro api check ([f2b3b54](https://github.com/dequelabs/axe-core/commit/f2b3b54))
- **aria-allowed-role:** allow role combobox on input tel, search, url, and email ([#1850](https://github.com/dequelabs/axe-core/issues/1850)) ([75d3c8b](https://github.com/dequelabs/axe-core/commit/75d3c8b))
- **axe.d.ts:** RunOnly.values should not accept a RunOnlyOption ([#1888](https://github.com/dequelabs/axe-core/issues/1888)) ([94b1466](https://github.com/dequelabs/axe-core/commit/94b1466))
- **build:** add lang query parameter to helpUrl when builing with a locale ([#1909](https://github.com/dequelabs/axe-core/issues/1909)) ([a2f0247](https://github.com/dequelabs/axe-core/commit/a2f0247))
- **color-contrast:** take into account parent opacity for foreground color ([#1902](https://github.com/dequelabs/axe-core/issues/1902)) ([639c41b](https://github.com/dequelabs/axe-core/commit/639c41b))
- **is-focusable:** use tabindex attribute instead of property ([#1912](https://github.com/dequelabs/axe-core/issues/1912)) ([aa5314d](https://github.com/dequelabs/axe-core/commit/aa5314d))
- **is-icon-ligature:** ignore whitespace characters ([#1908](https://github.com/dequelabs/axe-core/issues/1908)) ([77fc838](https://github.com/dequelabs/axe-core/commit/77fc838))
- **is-ligature-icon:** rename canvas to canvasContext ([#1880](https://github.com/dequelabs/axe-core/issues/1880)) ([604ba4f](https://github.com/dequelabs/axe-core/commit/604ba4f))
- **link-name:** test role=link when there is no href ([#1921](https://github.com/dequelabs/axe-core/issues/1921)) ([e839c57](https://github.com/dequelabs/axe-core/commit/e839c57))
- **locales:** fix incompeteMessageFallback to be a string rather than an object ([#1853](https://github.com/dequelabs/axe-core/issues/1853)) ([02a1d8a](https://github.com/dequelabs/axe-core/commit/02a1d8a))
- **run:** throw error if axe.run is called after a run has started but not completed ([#1914](https://github.com/dequelabs/axe-core/issues/1914)) ([290d125](https://github.com/dequelabs/axe-core/commit/290d125))
- **server-side-image-map:** return as needs review rather than failure ([#1898](https://github.com/dequelabs/axe-core/issues/1898)) ([ce73af9](https://github.com/dequelabs/axe-core/commit/ce73af9))
- **tabindex:** don't error when tabindex property is overridden ([#1910](https://github.com/dequelabs/axe-core/issues/1910)) ([e6875ee](https://github.com/dequelabs/axe-core/commit/e6875ee))
- **td-has-headers:** greatly improve performance of td-has-headers rule ([#1887](https://github.com/dequelabs/axe-core/issues/1887)) ([a588cad](https://github.com/dequelabs/axe-core/commit/a588cad))
- **typings:** add proper return value to getRule ([#1900](https://github.com/dequelabs/axe-core/issues/1900)) ([0d7c3d2](https://github.com/dequelabs/axe-core/commit/0d7c3d2))

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

## [3.3.3](https://github.com/dequelabs/axe-core/compare/v3.3.2...v3.3.3) (2020-02-04)

### Bug Fixes

- **color-contrast:** support IE extension context ([#2008](https://github.com/dequelabs/axe-core/issues/2008)) ([cd651a0](https://github.com/dequelabs/axe-core/commit/cd651a0713fa2f4b307cc7fc2be033f8636b40d2))
- **unicode:** stop parsing escaped unicode strings ([#1997](https://github.com/dequelabs/axe-core/issues/1997)) ([523a31c](https://github.com/dequelabs/axe-core/commit/523a31c19fefd330e0b4f4c45f51d400c6f66164))

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

## [3.2.3](https://github.com/dequelabs/axe-core/compare/v3.2.2...v3.2.3) (2020-02-04)

### Bug Fixes

- **color-contrast:** support IE extension context ([#2008](https://github.com/dequelabs/axe-core/issues/2008)) ([cd651a0](https://github.com/dequelabs/axe-core/commit/cd651a0713fa2f4b307cc7fc2be033f8636b40d2))
- **unicode:** stop parsing escaped unicode strings ([#1997](https://github.com/dequelabs/axe-core/issues/1997)) ([523a31c](https://github.com/dequelabs/axe-core/commit/523a31c19fefd330e0b4f4c45f51d400c6f66164))

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
