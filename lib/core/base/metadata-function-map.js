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

// shared
import ariaLabelEvaluate from '../../checks/shared/aria-label-evaluate.js';
import ariaLabelledbyEvaluate from '../../checks/shared/aria-labelledby-evaluate.js';
import avoidInlineSpacingEvaluate from '../../checks/shared/avoid-inline-spacing-evaluate.js';
import buttonHasVisibleTextEvaluate from '../../checks/shared/button-has-visible-text-evaluate.js';
import docHasTitleEvaluate from '../../checks/shared/doc-has-title-evaluate.js';
import existsEvaluate from '../../checks/shared/exists-evaluate.js';
import hasAltEvaluate from '../../checks/shared/has-alt-evaluate.js';
import hasVisibleTextEvaluate from '../../checks/shared/has-visible-text-evaluate.js';
import isOnScreenEvaluate from '../../checks/shared/is-on-screen-evaluate.js';
import nonEmptyAltEvaluate from '../../checks/shared/non-empty-alt-evaluate.js';
import nonEmptyIfPresentEvaluate from '../../checks/shared/non-empty-if-present-evaluate.js';
import nonEmptyTitleEvaluate from '../../checks/shared/non-empty-title-evaluate.js';
import nonEmptyValueEvaluate from '../../checks/shared/non-empty-value-evaluate.js';
import roleNoneEvaluate from '../../checks/shared/role-none-evaluate.js';
import rolePresentationEvaluate from '../../checks/shared/role-presentation-evaluate.js';
import svgNonEmptyTitleEvaluate from '../../checks/shared/svg-non-empty-title-evaluate.js';

// parsing
import duplicateIdAfter from '../../checks/parsing/duplicate-id-after.js';
import duplicateIdEvaluate from '../../checks/parsing/duplicate-id-evaluate.js';

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

  // parsing
	'duplicate-id-after': duplicateIdAfter,
	'duplicate-id-evaluate': duplicateIdEvaluate
};

export default metadataFunctionMap;
