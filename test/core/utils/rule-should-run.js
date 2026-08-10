describe('axe.utils.ruleShouldRun', () => {
  it('should return false if rule.pageOnly and !context.page', () => {
    assert.isFalse(
      axe.utils.ruleShouldRun(
        {
          pageLevel: true
        },
        {
          page: false
        },
        {}
      )
    );
  });

  it('should return false if rule.enabled is false, option.enabled is false and ruleID is not present runOnly', () => {
    assert.isFalse(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: false
        },
        {},
        {
          rules: {
            bananas: {
              enabled: false
            }
          },
          runOnly: {
            type: 'rule',
            values: ['apples']
          }
        }
      )
    );
  });

  it('should return true if rule.enabled is false, option.enabled is false and ruleID is present in runOnly', () => {
    assert.isTrue(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: false
        },
        {},
        {
          rules: {
            bananas: {
              enabled: false
            }
          },
          runOnly: {
            type: 'rule',
            values: ['bananas']
          }
        }
      )
    );
  });

  it('should return true if rule.enabled is false, option is undefined and ruleID is present in runOnly', () => {
    assert.isTrue(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: false
        },
        {},
        {
          runOnly: {
            type: 'rule',
            values: ['bananas']
          }
        }
      )
    );
  });

  it('should return false even if enabled is set to true if ruleID is not present in runOnly', () => {
    assert.isFalse(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: true
        },
        {},
        {
          runOnly: {
            type: 'rule',
            values: ['apples']
          }
        }
      )
    );
  });

  it('should return false if rule.enabled is false', () => {
    assert.isFalse(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: false,
          tags: ['fruit']
        },
        {},
        {}
      )
    );
  });

  it('should return true if rule.enabled is true', () => {
    assert.isTrue(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: true,
          tags: ['fruit']
        },
        {},
        {}
      )
    );
  });

  it('should return true if option is set to true but rule is set to false', () => {
    assert.isTrue(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: false
        },
        {},
        {
          rules: {
            bananas: {
              enabled: true
            }
          }
        }
      )
    );
  });

  it('should return false if option is set to false but rule is set to true', () => {
    assert.isFalse(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: true
        },
        {},
        {
          rules: {
            bananas: {
              enabled: false
            }
          }
        }
      )
    );
  });

  it('should use option.rules.enabled over option.runOnly tags', () => {
    assert.isTrue(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: true,
          tags: ['fruit']
        },
        {},
        {
          rules: {
            bananas: {
              enabled: true
            }
          },
          runOnly: {
            type: 'tag',
            values: ['meat']
          }
        }
      )
    );

    assert.isFalse(
      axe.utils.ruleShouldRun(
        {
          id: 'bananas',
          enabled: true,
          tags: ['fruit']
        },
        {},
        {
          rules: {
            bananas: {
              enabled: false
            }
          },
          runOnly: {
            type: 'tag',
            values: ['fruit']
          }
        }
      )
    );
  });


  describe('runOnly type:tag', () => {
    it('should return true if passed an array with a matching tag', () => {
      assert.isTrue(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: ['fruit']
            }
          }
        )
      );
    });

    it('should return false if passed an array with a matching tag', () => {
      assert.isFalse(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: true,
            tags: ['fruit']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: ['meat']
            }
          }
        )
      );
    });

    it('should accept string as an include value', () => {
      assert.isTrue(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                include: 'fruit'
              }
            }
          }
        )
      );
    });

    it('should accept array as an include value', () => {
      assert.isTrue(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                include: ['fruit', 'veggie']
              }
            }
          }
        )
      );
    });

    it('should accept string as an exclude value', () => {
      assert.isFalse(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit', 'tasty']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                exclude: 'tasty'
              }
            }
          }
        )
      );
    });

    it('should accept array as an exclude value', () => {
      assert.isFalse(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                exclude: ['fruit', 'tasty']
              }
            }
          }
        )
      );
    });

    it('should return true if it matches include but not exclude', () => {
      assert.isTrue(
        axe.utils.ruleShouldRun(
          {
            id: 'cabbage',
            enabled: false,
            tags: ['veggie']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                include: ['fruit', 'veggie'],
                exclude: ['tasty']
              }
            }
          }
        )
      );
    });

    it('should return false if it matches no include', () => {
      assert.isFalse(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                include: ['veggies'],
                exclude: ['fruit', 'tasty']
              }
            }
          }
        )
      );
    });

    it('should return false if it matches include and exclude', () => {
      assert.isFalse(
        axe.utils.ruleShouldRun(
          {
            id: 'bananas',
            enabled: false,
            tags: ['fruit', 'tasty']
          },
          {},
          {
            runOnly: {
              type: 'tag',
              values: {
                include: ['fruit', 'veggies'],
                exclude: ['tasty']
              }
            }
          }
        )
      );
    });
  });
});
