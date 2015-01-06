/*global Classifier, ClassifierResult */
describe('Classifier', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(Classifier);
  });

  describe('prototype', function () {
    describe('matches', function () {
      it('should be a function', function () {
        assert.isFunction(Classifier.prototype.matches);
      });

      it('should default to true', function () {
        var node = document.createElement('div');

        var check = new Classifier({});

        assert.isTrue(check.matches(node));

      });
    });

    describe('gather', function () {
      it('should gather nodes which match the selector', function () {
        var node = document.createElement('div');
        node.id = 'monkeys';
        fixture.appendChild(node);

        var classifier = new Classifier({ selector: '#monkeys' }),
        nodes = classifier.gather({ include: [fixture], exclude: [], frames: [] });

        assert.lengthOf(nodes, 1);
        assert.equal(nodes[0], node);

        node.id = 'bananas';
        nodes = classifier.gather({ include: [fixture], exclude: [], frames: [] });

        assert.lengthOf(nodes, 0);
      });

      it('should return a real array', function () {
        var classifier = new Classifier({selector: 'div'}),
        result = classifier.gather({ include: [fixture], exclude: [], frames: [] });

        assert.isArray(result);
      });

      it('should take a context parameter', function () {
        var node = document.createElement('div');
        fixture.appendChild(node);

        var classifier = new Classifier({ selector: 'div' }),
        nodes = classifier.gather({ include: [document.getElementById('fixture')] });

        assert.deepEqual(nodes, [node]);
      });

      it('should default to all nodes if selector is not specified', function () {
        var nodes = [],
        node = document.createElement('div');

        fixture.appendChild(node);
        nodes.push(node);

        node = document.createElement('div');

        fixture.appendChild(node);
        nodes.push(node);

        var classifier = new Classifier({}),
        result = classifier.gather({ include: [document.getElementById('fixture')] });

        assert.lengthOf(result, 2);
        assert.sameMembers(result, nodes);
      });
      it('should exclude hidden elements', function () {
        fixture.innerHTML = '<div style="display: none"><span>HEHEHE</span></div>';

        var classifier = new Classifier({}),
        result = classifier.gather({ include: [document.getElementById('fixture')] });

        assert.lengthOf(result, 0);
      });
      it('should include hidden elements if excludeHidden is false', function () {
        fixture.innerHTML = '<div style="display: none"></div>';

        var classifier = new Classifier({
          excludeHidden: false
        }),
        result = classifier.gather({ include: [document.getElementById('fixture')] });

        assert.deepEqual(result, [fixture.firstChild]);
      });
    });
    describe('run', function () {
      it('should be a function', function () {
        assert.isFunction(Classifier.prototype.run);
      });

      it('should run #matches', function (done) {
        var div = document.createElement('div');
        fixture.appendChild(div);
        var success = false,
          classifier = new Classifier({
            evaluate: function () {
              return 'stuff';
            },
            matches: function (node) {
              assert.equal(node, div);
              success = true;
              return [];
            }
          });

        classifier.run({ include: [fixture] }, {});
        assert.isTrue(success);
        done();

      });

      it('should run evaluate on each matching node', function () {
        fixture.innerHTML = '<div class="t"></div><div class="t"></div><div class="b"></div>';

        var called = 0;
        new Classifier({
          selector: '.t',
          evaluate: function (node) {
            called++;
            assert.equal(node.className, 't');
            return 'stuff';
          }
        }).run({ include: [fixture] });
      });
    });
  });


  describe('spec object', function () {
    describe('.matches', function () {
      it('should be set', function () {
        var spec = {
          matches: function () {}
        };
        assert.equal(new Classifier(spec).matches, spec.matches);
      });

      it('should default to prototype', function () {
        var spec = {};
        assert.equal(new Classifier(spec).matches, Classifier.prototype.matches);
      });

    });

    describe('.id', function () {
      it('should be set', function () {
        var spec = {
          id: 'monkeys'
        };
        assert.equal(new Classifier(spec).id, spec.id);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Classifier(spec).id, spec.id);

      });

    });


    describe('.options', function () {
      it('should be set', function () {
        var spec = {
          options: ['monkeys', 'bananas']
        };
        assert.equal(new Classifier(spec).options, spec.options);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new Classifier(spec).options, spec.options);

      });

    });

  });
});
