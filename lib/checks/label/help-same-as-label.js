import helpSameAsLabelEvaluate from './help-same-as-label-evaluate';

const helpSameAsLabelMetadata = {
	id: 'help-same-as-label',
	evaluate: helpSameAsLabelEvaluate,
	enabled: false,
	metadata: {
		impact: 'minor',
		message: {
			pass: 'Help text (title or aria-describedby) does not duplicate label text',
			fail: 'Help text (title or aria-describedby) text is the same as the label text'
		}
	}
};

export default helpSameAsLabelMetadata;