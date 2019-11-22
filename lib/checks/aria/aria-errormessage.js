import ariaErrormessageEvaluate from './aria-errormessage-evaluate';

const ariaErrormessageMetadata = {
	id: 'aria-errormessage',
	evaluate: ariaErrormessageEvaluate,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'Uses a supported aria-errormessage technique',
			fail: 'aria-errormessage value{{=it.data && it.data.length > 1 ? "s" : ""}} {{~it.data:value}} `{{=value}}{{~}}` must use a technique to announce the message (e.g., aria-live, aria-describedby, role=alert, etc.)'
		}
	}
};

export default ariaErrormessageMetadata;