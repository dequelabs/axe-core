import onlyListitemsEvaluate from './only-listitems-evaluate';

const onlyListitemsMetadata = {
	id: 'only-listitems',
	evaluate: onlyListitemsEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'List element only has direct children that are allowed inside <li> elements',
			fail: 'List element has direct children that are not allowed inside <li> elements'
		}
	}
};

export default onlyListitemsMetadata;