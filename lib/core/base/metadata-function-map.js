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
import captionFakedEvaluate from '../../checks/tables/caption-faked-evaluate.js';
import hasCaptionEvaluate from '../../checks/tables/has-caption-evaluate.js';
import hasSummaryEvaluate from '../../checks/tables/has-summary-evaluate.js';
import hasThEvaluate from '../../checks/tables/has-th-evaluate.js';
import headersVisibleText from '../../checks/tables/headers-visible-text.js';
import html5ScopeEvaluate from '../../checks/tables/html5-scope-evaluate.js';
import sameCaptionSummaryEvaluate from '../../checks/tables/same-caption-summary-evaluate.js';
import scopeValueEvaluate from '../../checks/tables/scope-value-evaluate.js';
import tdHasHeaderEvaluate from '../../checks/tables/td-has-header-evaluate.js';
import tdHeadersAttrEvaluate from '../../checks/tables/td-headers-attr-evaluate.js';
import thHasDataCellsEvaluate from '../../checks/tables/th-has-data-cells-evaluate.js';
import thSingleRowColumn from '../../checks/tables/th-single-row-column.js';

// visibility
import hiddenContentEvaluate from '../../checks/visibility/hidden-content-evaluate';

// color
import colorContrastEvaluate from '../../checks/color/color-contrast-evaluate';
import linkInTextBlockEvaluate from '../../checks/color/link-in-text-block-evaluate';

// forms
import autocompleteAppropriateEvaluate from '../../checks/forms/autocomplete-appropriate-evaluate';
import autocompleteValidEvaluate from '../../checks/forms/autocomplete-valid-evaluate';

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

	// parsing
	'duplicate-id-after': duplicateIdAfter,
	'duplicate-id-evaluate': duplicateIdEvaluate
};

export default metadataFunctionMap;
