import pAsHeadingEvaluate from './p-as-heading-evaluate';

const pAsHeadingMetadata = {
	id: 'p-as-heading',
	evaluate: pAsHeadingEvaluate,
	"options": {
		"margins": [
			{
				"weight": 150,
				"italic": true
			},
			{
				"weight": 150,
				"size": 1.15
			},
			{
				"italic": true,
				"size": 1.15
			},
			{
				"size": 1.4
			}
		]
	},
	metadata: {
		impact: 'serious',
		message: {
			"pass": "<p> elements are not styled as headings",
			"fail": "Heading elements should be used instead of styled p elements"
		}
	}
};

export default pAsHeadingMetadata;