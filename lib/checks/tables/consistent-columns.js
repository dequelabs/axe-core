var table = axe.commons.table.toArray(node);
var relatedNodes = [];
var expectedWidth;
for (var i = 0, length = table.length; i < length; i++) {
	if (i === 0) {
		expectedWidth = table[i].length;
	} else if (expectedWidth !== table[i].length) {
		relatedNodes.push(node.rows[i]);
	}
}

return !relatedNodes.length;
