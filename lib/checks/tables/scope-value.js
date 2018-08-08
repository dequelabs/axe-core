options = options || {};
const value = node.getAttribute('scope').toLowerCase();
const validVals = ['row', 'col', 'rowgroup', 'colgroup'] || options.values;

return validVals.indexOf(value) !== -1;
