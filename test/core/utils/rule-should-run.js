
describe('axe.utils.ruleShouldRun', function () {
	'use strict';

	it('should return false if rule.pageOnly and !context.page', function () {
		assert.isFalse(axe.utils.ruleShouldRun({
			pageLevel: true
		}, {
			page: false
		}, {}));
	});

	it('should return false if rule.enabled is false, option.enabled is false and ruleID is not present runOnly', function () {
		assert.isFalse(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			},
			runOnly: {
				type: 'rule',
				values: ['apples']
			}
		}));
	});

	it('should return true if rule.enabled is false, option.enabled is false and ruleID is present in runOnly', function () {
		assert.isTrue(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			},
			runOnly: {
				type: 'rule',
				values: ['bananas']
			}
		}));
	});

	it('should return true if rule.enabled is false, option is undefined and ruleID is present in runOnly', function () {
		assert.isTrue(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			runOnly: {
				type: 'rule',
				values: ['bananas']
			}
		}));
	});

	it('should return false even if enabled is set to true if ruleID is not present in runOnly', function () {
		assert.isFalse(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: true
		}, {}, {
			runOnly: {
				type: 'rule',
				values: ['apples']
			}
		}));
	});

	it('should return false if rule.enabled is false', function () {
		assert.isFalse(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: false,
			tags: ['fruit']
		}, {}, {}));

	});

	it('should return true if rule.enabled is true', function () {
		assert.isTrue(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: true,
			tags: ['fruit']
		}, {}, {}));

	});

	it('should return true if option is set to true but rule is set to false', function () {
		assert.isTrue(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: false
		}, {}, {
			rules: {
				bananas: {
					enabled: true
				}
			}
		}));

	});


	it('should return false if option is set to false but rule is set to true', function () {
		assert.isFalse(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: true
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			}
		}));

	});

	it('should use option.rules.enabled over option.runOnly tags', function () {
		assert.isTrue(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: true,
			tags: ['fruit']
		}, {}, {
			rules: {
				bananas: {
					enabled: true
				}
			},
			runOnly: {
				type: 'tag',
				values: ['meat']
			}
		}));

		assert.isFalse(axe.utils.ruleShouldRun({
			id: 'bananas',
			enabled: true,
			tags: ['fruit']
		}, {}, {
			rules: {
				bananas: {
					enabled: false
				}
			},
			runOnly: {
				type: 'tag',
				values: ['fruit']
			}
		}));

	});

	describe('default axe._tagExclude', function () {

		var origTagExclude;
		before(function () {
			axe._load({});
			origTagExclude = axe._audit.tagExclude;
		});
		after(function () {
			axe._audit.tagExclude = origTagExclude;
		});

		beforeEach(function () {
			axe._audit.tagExclude = [];
		});

		it('excludes rules with a tag put in axe._tagExclude', function () {
			axe._audit.tagExclude = ['the-cheat'];
			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'e-mail',
				enabled: true,
				tags: ['strongbad']
			}, {}, {}));

			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'party',
				enabled: true,
				tags: ['the-cheat']
			}, {}, {}));
		});

		it('adds axe.tagExclude to the existing exclude tags', function () {
			axe._audit.tagExclude = ['the-cheat'];
			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'e-mail',
				enabled: true,
				tags: ['the-cheat']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {exclude: ['strongbad']}
				}
			}));
		});

		it('does not exclude tags explicitly included', function () {
			axe._audit.tagExclude = ['the-cheat'];
			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'e-mail',
				enabled: false,
				tags: ['the-cheat']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {include: ['the-cheat']}
				}
			}));

			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'e-mail',
				enabled: false,
				tags: ['the-cheat']
			}, {}, {
				runOnly: {
					type: 'rule',
					values: ['e-mail']
				}
			}));

			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'e-mail',
				enabled: false,
				tags: ['the-cheat']
			}, {}, {
				rules: {
					'e-mail': {
						enabled: true
					}
				},
			}));

		});

	});


	describe('runOnly type:tag', function () {

		it('should return true if passed an array with a matching tag', function () {
			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: ['fruit']
				}
			}));

		});

		it('should return false if passed an array with a matching tag', function () {
			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: true,
				tags: ['fruit']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: ['meat']
				}
			}));

		});

		it('should accept string as an include value', function () {
			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						include: 'fruit'
					}
				}
			}));
		});

		it('should accept array as an include value', function () {
			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						include: ['fruit', 'veggie']
					}
				}
			}));
		});

		it('should accept string as an exclude value', function () {
			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit', 'tasty']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						exclude: 'tasty'
					}
				}
			}));
		});

		it('should accept array as an exclude value', function () {
			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						exclude: ['fruit', 'tasty']
					}
				}
			}));
		});

		it('should return true if it matches include but not exclude', function () {
			assert.isTrue(axe.utils.ruleShouldRun({
				id: 'cabbage',
				enabled: false,
				tags: ['veggie']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						include: ['fruit', 'veggie'],
						exclude: ['tasty']
					}
				}
			}));
		});

		it('should return false if it matches no include', function () {
			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						include: ['veggies'],
						exclude: ['fruit', 'tasty']
					}
				}
			}));
		});

		it('should return false if it matches include and exclude', function () {
			assert.isFalse(axe.utils.ruleShouldRun({
				id: 'bananas',
				enabled: false,
				tags: ['fruit', 'tasty']
			}, {}, {
				runOnly: {
					type: 'tag',
					values: {
						include: ['fruit', 'veggies'],
						exclude: ['tasty']
					}
				}
			}));
		});


	});


});