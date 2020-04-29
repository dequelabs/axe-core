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

// visibility
import hiddenContentEvaluate from '../../checks/visibility/hidden-content-evaluate';

// color
import colorContrastEvaluate from '../../checks/color/color-contrast-evaluate';
import linkInTextBlockEvaluate from '../../checks/color/link-in-text-block-evaluate';

// forms
import autocompleteAppropriateEvaluate from '../../checks/forms/autocomplete-appropriate-evaluate';
import autocompleteValidEvaluate from '../../checks/forms/autocomplete-valid-evaluate';

// navigation
import headerPresentEvaluate from '../../checks/navigation/header-present-evaluate.js';
import headingOrderAfter from '../../checks/navigation/heading-order-after.js';
import headingOrderEvaluate from '../../checks/navigation/heading-order-evaluate.js';
import identicalLinksSamePurposeAfter from '../../checks/navigation/identical-links-same-purpose-after.js';
import identicalLinksSamePurposeEvaluate from '../../checks/navigation/identical-links-same-purpose-evaluate.js';
import internalLinkPresentEvaluate from '../../checks/navigation/internal-link-present-evaluate.js';
import landmarkEvaluate from '../../checks/navigation/landmark-evaluate.js';
import metaRefreshEvaluate from '../../checks/navigation/meta-refresh-evaluate.js';
import pAsHeadingEvaluate from '../../checks/navigation/p-as-heading-evaluate.js';
import regionEvaluate from '../../checks/navigation/region-evaluate.js';
import skipLinkEvaluate from '../../checks/navigation/skip-link-evaluate.js';
import uniqueFrameTitleAfter from '../../checks/navigation/unique-frame-title-after.js';
import uniqueFrameTitleEvaluate from '../../checks/navigation/unique-frame-title-evaluate.js';

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
	'unique-frame-title-evaluate': uniqueFrameTitleEvaluate
};

export default metadataFunctionMap;
