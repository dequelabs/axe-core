var value = node.getAttribute('scope').toLowerCase();
var validVals = ['row', 'col', 'rowgroup', 'colgroup'];

return validVals.indexOf(value) !== -1;
