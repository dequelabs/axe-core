// aria
import abstractroleEvaluate from '../../checks/aria/abstractrole-evaluate';
import ariaAllowedAttrEvaluate from '../../checks/aria/aria-allowed-attr-evaluate';
import ariaAllowedRoledEvaluate from '../../checks/aria/aria-allowed-role-evaluate';
import ariaErrormessageEvaluate from '../../checks/aria/aria-errormessage-evaluate';
import ariaHiddenBodyEvaluate from '../../checks/aria/aria-hidden-body-evaluate';
import ariaRequiredAttrEvaluate from '../../checks/aria/aria-required-attr-evaluate';
import ariaRequiredChildrenEvaluate from '../../checks/aria/aria-required-children-evaluate';
import ariaRequiredParentEvaluate from '../../checks/aria/aria-required-parent-evaluate';
import ariaRoledescriptionEvaluate from '../../checks/aria/aria-roledescription-evaluate';
import ariaUnsupportedAttrEvaluate from '../../checks/aria/aria-unsupported-attr-evaluate';
import ariaValidAttrEvaluate from '../../checks/aria/aria-valid-attr-evaluate';
import ariaValidAttrValueEvaluate from '../../checks/aria/aria-valid-attr-value-evaluate';
import fallbackroleEvaluate from '../../checks/aria/fallbackrole-evaluate';
import hasWidgetRoleEvaluate from '../../checks/aria/has-widget-role-evaluate';
import implicitRoleFallbackEvaluate from '../../checks/aria/implicit-role-fallback-evaluate';
import invalidroleEvaluate from '../../checks/aria/invalidrole-evaluate';
import noImplicitExplicitLabelEvaluate from '../../checks/aria/no-implicit-explicit-label-evaluate';
import unsupportedroleEvaluate from '../../checks/aria/unsupportedrole-evaluate';
import validScrollableSemanticsEvaluate from '../../checks/aria/valid-scrollable-semantics-evaluate';

// tables
import captionFakedEvaluate from '../../checks/tables/caption-faked-evaluate';
import hasCaptionEvaluate from '../../checks/tables/has-caption-evaluate';
import hasSummaryEvaluate from '../../checks/tables/has-summary-evaluate';
import hasThEvaluate from '../../checks/tables/has-th-evaluate';
import headersVisibleText from '../../checks/tables/headers-visible-text';
import html5ScopeEvaluate from '../../checks/tables/html5-scope-evaluate';
import sameCaptionSummaryEvaluate from '../../checks/tables/same-caption-summary-evaluate';
import scopeValueEvaluate from '../../checks/tables/scope-value-evaluate';
import tdHasHeaderEvaluate from '../../checks/tables/td-has-header-evaluate';
import tdHeadersAttrEvaluate from '../../checks/tables/td-headers-attr-evaluate';
import thHasDataCellsEvaluate from '../../checks/tables/th-has-data-cells-evaluate';
import thSingleRowColumn from '../../checks/tables/th-single-row-column';

// visibility
import hiddenContentEvaluate from '../../checks/visibility/hidden-content-evaluate';

// color
import colorContrastEvaluate from '../../checks/color/color-contrast-evaluate';
import linkInTextBlockEvaluate from '../../checks/color/link-in-text-block-evaluate';

// forms
import autocompleteAppropriateEvaluate from '../../checks/forms/autocomplete-appropriate-evaluate';
import autocompleteValidEvaluate from '../../checks/forms/autocomplete-valid-evaluate';

// navigation
import headerPresentEvaluate from '../../checks/navigation/header-present-evaluate';
import headingOrderAfter from '../../checks/navigation/heading-order-after';
import headingOrderEvaluate from '../../checks/navigation/heading-order-evaluate';
import identicalLinksSamePurposeAfter from '../../checks/navigation/identical-links-same-purpose-after';
import identicalLinksSamePurposeEvaluate from '../../checks/navigation/identical-links-same-purpose-evaluate';
import internalLinkPresentEvaluate from '../../checks/navigation/internal-link-present-evaluate';
import landmarkEvaluate from '../../checks/navigation/landmark-evaluate';
import metaRefreshEvaluate from '../../checks/navigation/meta-refresh-evaluate';
import pAsHeadingEvaluate from '../../checks/navigation/p-as-heading-evaluate';
import regionEvaluate from '../../checks/navigation/region-evaluate';
import skipLinkEvaluate from '../../checks/navigation/skip-link-evaluate';
import uniqueFrameTitleAfter from '../../checks/navigation/unique-frame-title-after';
import uniqueFrameTitleEvaluate from '../../checks/navigation/unique-frame-title-evaluate';

// shared
import ariaLabelEvaluate from '../../checks/shared/aria-label-evaluate';
import ariaLabelledbyEvaluate from '../../checks/shared/aria-labelledby-evaluate';
import avoidInlineSpacingEvaluate from '../../checks/shared/avoid-inline-spacing-evaluate';
import buttonHasVisibleTextEvaluate from '../../checks/shared/button-has-visible-text-evaluate';
import docHasTitleEvaluate from '../../checks/shared/doc-has-title-evaluate';
import existsEvaluate from '../../checks/shared/exists-evaluate';
import hasAltEvaluate from '../../checks/shared/has-alt-evaluate';
import hasVisibleTextEvaluate from '../../checks/shared/has-visible-text-evaluate';
import isOnScreenEvaluate from '../../checks/shared/is-on-screen-evaluate';
import nonEmptyAltEvaluate from '../../checks/shared/non-empty-alt-evaluate';
import nonEmptyIfPresentEvaluate from '../../checks/shared/non-empty-if-present-evaluate';
import nonEmptyTitleEvaluate from '../../checks/shared/non-empty-title-evaluate';
import nonEmptyValueEvaluate from '../../checks/shared/non-empty-value-evaluate';
import roleNoneEvaluate from '../../checks/shared/role-none-evaluate';
import rolePresentationEvaluate from '../../checks/shared/role-presentation-evaluate';
import svgNonEmptyTitleEvaluate from '../../checks/shared/svg-non-empty-title-evaluate';

// mobile
import cssOrientationLockEvaluate from '../../checks/mobile/css-orientation-lock-evaluate';
import metaViewportScaleEvaluate from '../../checks/mobile/meta-viewport-scale-evaluate';

// parsing
import duplicateIdAfter from '../../checks/parsing/duplicate-id-after';
import duplicateIdEvaluate from '../../checks/parsing/duplicate-id-evaluate';

// keyboard
import accesskeysAfter from '../../checks/keyboard/accesskeys-after';
import accesskeysEvaluate from '../../checks/keyboard/accesskeys-evaluate';
import focusableContentEvaluate from '../../checks/keyboard/focusable-content-evaluate';
import focusableDisabledEvaluate from '../../checks/keyboard/focusable-disabled-evaluate';
import focusableElementEvaluate from '../../checks/keyboard/focusable-element-evaluate';
import focusableModalOpenEvaluate from '../../checks/keyboard/focusable-modal-open-evaluate';
import focusableNoNameEvaluate from '../../checks/keyboard/focusable-no-name-evaluate';
import focusableNotTabbableEvaluate from '../../checks/keyboard/focusable-not-tabbable-evaluate';
import landmarkIsTopLevelEvaluate from '../../checks/keyboard/landmark-is-top-level-evaluate';
import pageHasElmAfter from '../../checks/keyboard/page-has-elm-after';
import pageHasElmEvaluate from '../../checks/keyboard/page-has-elm-evaluate';
import pageNoDuplicateAfter from '../../checks/keyboard/page-no-duplicate-after';
import pageNoDuplicateEvaluate from '../../checks/keyboard/page-no-duplicate-evaluate';
import tabindexEvaluate from '../../checks/keyboard/tabindex-evaluate';

// label
import altSpaceValueEvaluate from '../../checks/label/alt-space-value-evaluate';
import duplicateImgLabelEvaluate from '../../checks/label/duplicate-img-label-evaluate';
import explicitEvaluate from '../../checks/label/explicit-evaluate';
import helpSameAsLabelEvaluate from '../../checks/label/help-same-as-label-evaluate';
import hiddenExplicitLabelEvaluate from '../../checks/label/hidden-explicit-label-evaluate';
import implicitEvaluate from '../../checks/label/implicit-evaluate';
import labelContentNameMismatchEvaluate from '../../checks/label/label-content-name-mismatch-evaluate';
import multipleLabelEvaluate from '../../checks/label/multiple-label-evaluate';
import titleOnlyEvaluate from '../../checks/label/title-only-evaluate';

const metadataFunctionMap = {
	// aria
	'abstractrole-evaluate': abstractroleEvaluate,
	'aria-allowed-attr-evaluate': ariaAllowedAttrEvaluate,
	'aria-allowed-role-evaluate': ariaAllowedRoledEvaluate,
	'aria-errormessage-evaluate': ariaErrormessageEvaluate,
	'aria-hidden-body-evaluate': ariaHiddenBodyEvaluate,
	'aria-required-attr-evaluate': ariaRequiredAttrEvaluate,
	'aria-required-children-evaluate': ariaRequiredChildrenEvaluate,
	'aria-required-parent-evaluate': ariaRequiredParentEvaluate,
	'aria-roledescription-evaluate': ariaRoledescriptionEvaluate,
	'aria-unsupported-attr-evaluate': ariaUnsupportedAttrEvaluate,
	'aria-valid-attr-evaluate': ariaValidAttrEvaluate,
	'aria-valid-attr-value-evaluate': ariaValidAttrValueEvaluate,
	'fallbackrole-evaluate': fallbackroleEvaluate,
	'has-widget-role-evaluate': hasWidgetRoleEvaluate,
	'implicit-role-fallback-evaluate': implicitRoleFallbackEvaluate,
	'invalidrole-evaluate': invalidroleEvaluate,
	'no-implicit-explicit-label-evaluate': noImplicitExplicitLabelEvaluate,
	'unsupportedrole-evaluate': unsupportedroleEvaluate,
	'valid-scrollable-semantics-evaluate': validScrollableSemanticsEvaluate,

	// tables
	'caption-faked-evaluate': captionFakedEvaluate,
	'has-caption-evaluate': hasCaptionEvaluate,
	'has-summary-evaluate': hasSummaryEvaluate,
	'has-th-evaluate': hasThEvaluate,
	'headers-visible-text': headersVisibleText,
	'html5-scope-evaluate': html5ScopeEvaluate,
	'same-caption-summary-evaluate': sameCaptionSummaryEvaluate,
	'scope-value-evaluate': scopeValueEvaluate,
	'td-has-header-evaluate': tdHasHeaderEvaluate,
	'td-headers-attr-evaluate': tdHeadersAttrEvaluate,
	'th-has-data-cells-evaluate': thHasDataCellsEvaluate,
	'th-single-row-column': thSingleRowColumn,

	// visibility
	'hidden-content-evaluate': hiddenContentEvaluate,

	// color
	'color-contrast-evaluate': colorContrastEvaluate,
	'link-in-text-block-evaluate': linkInTextBlockEvaluate,

	// forms
	'autocomplete-appropriate-evaluate': autocompleteAppropriateEvaluate,
	'autocomplete-valid-evaluate': autocompleteValidEvaluate,

	// navigation
	'header-present-evaluate': headerPresentEvaluate,
	'heading-order-after': headingOrderAfter,
	'heading-order-evaluate': headingOrderEvaluate,
	'identical-links-same-purpose-after': identicalLinksSamePurposeAfter,
	'identical-links-same-purpose-evaluate': identicalLinksSamePurposeEvaluate,
	'internal-link-present-evaluate': internalLinkPresentEvaluate,
	'landmark-evaluate': landmarkEvaluate,
	'meta-refresh-evaluate': metaRefreshEvaluate,
	'p-as-heading-evaluate': pAsHeadingEvaluate,
	'region-evaluate': regionEvaluate,
	'skip-link-evaluate': skipLinkEvaluate,
	'unique-frame-title-after': uniqueFrameTitleAfter,
	'unique-frame-title-evaluate': uniqueFrameTitleEvaluate,

	// shared
	'aria-label-evaluate': ariaLabelEvaluate,
	'aria-labelledby-evaluate': ariaLabelledbyEvaluate,
	'avoid-inline-spacing-evaluate': avoidInlineSpacingEvaluate,
	'button-has-visible-text-evaluate': buttonHasVisibleTextEvaluate,
	'doc-has-title-evaluate': docHasTitleEvaluate,
	'exists-evaluate': existsEvaluate,
	'has-alt-evaluate': hasAltEvaluate,
	'has-visible-text-evaluate': hasVisibleTextEvaluate,
	'is-on-screen-evaluate': isOnScreenEvaluate,
	'non-empty-alt-evaluate': nonEmptyAltEvaluate,
	'non-empty-if-present-evaluate': nonEmptyIfPresentEvaluate,
	'non-empty-title-evaluate': nonEmptyTitleEvaluate,
	'non-empty-value-evaluate': nonEmptyValueEvaluate,
	'role-none-evaluate': roleNoneEvaluate,
	'role-presentation-evaluate': rolePresentationEvaluate,
	'svg-non-empty-title-evaluate': svgNonEmptyTitleEvaluate,

	// mobile
	'css-orientation-lock-evaluate': cssOrientationLockEvaluate,
	'meta-viewport-scale-evaluate': metaViewportScaleEvaluate,

	// parsing
	'duplicate-id-after': duplicateIdAfter,
	'duplicate-id-evaluate': duplicateIdEvaluate,

	// keyboard
	'accesskeys-after': accesskeysAfter,
	'accesskeys-evaluate': accesskeysEvaluate,
	'focusable-content-evaluate': focusableContentEvaluate,
	'focusable-disabled-evaluate': focusableDisabledEvaluate,
	'focusable-element-evaluate': focusableElementEvaluate,
	'focusable-modal-open-evaluate': focusableModalOpenEvaluate,
	'focusable-no-name-evaluate': focusableNoNameEvaluate,
	'focusable-not-tabbable-evaluate': focusableNotTabbableEvaluate,
	'landmark-is-top-level-evaluate': landmarkIsTopLevelEvaluate,
	'page-has-elm-after': pageHasElmAfter,
	'page-has-elm-evaluate': pageHasElmEvaluate,
	'page-no-duplicate-after': pageNoDuplicateAfter,
	'page-no-duplicate-evaluate': pageNoDuplicateEvaluate,
	'tabindex-evaluate': tabindexEvaluate,

	// label
	'alt-space-value-evaluate': altSpaceValueEvaluate,
	'duplicate-img-label-evaluate': duplicateImgLabelEvaluate,
	'explicit-evaluate': explicitEvaluate,
	'help-same-as-label-evaluate': helpSameAsLabelEvaluate,
	'hidden-explicit-label-evaluate': hiddenExplicitLabelEvaluate,
	'implicit-evaluate': implicitEvaluate,
	'label-content-name-mismatch-evaluate': labelContentNameMismatchEvaluate,
	'multiple-label-evaluate': multipleLabelEvaluate,
	'title-only-evaluate': titleOnlyEvaluate
};

export default metadataFunctionMap;
