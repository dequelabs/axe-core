import hasWidgetRoleEvaluate from './has-widget-role-evaluate';

const hasWidgetRoleMetadata = {
	id: 'has-widget-role',
	evaluate: hasWidgetRoleEvaluate,
	options: [],
	metadata: {
		impact: 'minor',
		messages: {
			pass: 'Element has a widget role.',
			fail: 'Element does not have a widget role.'
		}
	}
};

export default hasWidgetRoleMetadata;