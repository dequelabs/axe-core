import groupLabelledbyEvaluate from './group-labelledby-evaluate';
import groupLabelledbyAfter from './group-labelledby-after';

const groupLabelledbyMetadata = {
	id: 'group-labelledby',
	evaluate: groupLabelledbyEvaluate,
	after: groupLabelledbyAfter,
	deprecated: true,
	metadata: {
		impact: 'critical',
		messages: {
			pass: 'Elements with the name \{{=it.data.name}}\ have both a shared label, and a unique label, referenced through aria-labelledby',
			fail: '{{var code = it.data && it.data.failureCode;}}Elements with the name \{{=it.data.name}}\ do not all have {{? code === "no-shared-label" }}a shared label{{?? code === "no-unique-label" }}a unique label{{??}}both a shared label, and a unique label{{?}}, referenced through aria-labelledby'
		}
	}
};

export default groupLabelledbyMetadata;