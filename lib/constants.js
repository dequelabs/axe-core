
dqre.constants = {};

dqre.constants.interpretation = {
	VIOLATION: 'VIOLATION',
	BESTPRACTICE: 'BESTPRACTICE'
};
dqre.constants.certainty = {
	DEFINITE: 'DEFINITE',
	POTENTIAL: 'POTENTIAL',
	FALSEPOSITIVE: 'FALSEPOSITIVE' // this should only ever be set after human intervention
};

dqre.constants.impact = {
	TRIVIAL: 'TRIVIAL',
	MINOR: 'MINOR',
	MAJOR: 'MAJOR',
	CRITICAL: 'CRITICAL'
};

dqre.constants.type = {
	PASS: 'PASS',
	FAIL: 'FAIL'
};

dqre.constants.result = {
	PASS: 'PASS',
	FAIL: 'FAIL',
	NA: 'NA'
};