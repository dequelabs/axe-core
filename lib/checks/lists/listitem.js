import listitemEvaluate from './listitem-evaluate';

const listitemMetadata = {
	id: 'listitem',
	evaluate: listitemEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'List item has a <ul>, <ol> or role=\list\ parent element',
			fail: 'List item does not have a <ul>, <ol>{{? it.data === "roleNotValid"}} without a role, or a role=\list\{{?}} parent element'
		}
	}
};

export default listitemMetadata;