import avoidInlineSpacingEvaluate from './avoid-inline-spacing-evaluate';

const avoidInlineSpacingMetadata = {
	id: 'avoid-inline-spacing',
	evaluate: avoidInlineSpacingEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "No inline styles with '!important' that affect text spacing has been specified",
			"fail": "Remove '!important' from inline style{{=it.data && it.data.length > 1 ? 's' : ''}} {{=it.data.join(', ')}}, as overriding this is not supported by most browsers"
		}
	}
};

export default avoidInlineSpacingMetadata;