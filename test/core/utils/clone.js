describe('utils.clone', () => {
  const clone = axe.utils.clone;
  const fixture = document.querySelector('#fixture');

  it('should clone an object', () => {
    const obj = {
      cats: true,
      dogs: 2,
      fish: [0, 1, { one: 'two' }]
    };
    const c = clone(obj);

    obj.cats = false;
    obj.dogs = 1;
    obj.fish[2].one = 'three';

    assert.strictEqual(c.cats, true);
    assert.strictEqual(c.dogs, 2);
    assert.deepEqual(c.fish, [0, 1, { one: 'two' }]);
  });

  it('should clone nested objects', () => {
    const obj = {
      cats: {
        fred: 1,
        billy: 2,
        meow: true
      },
      dogs: {
        spot: 1,
        max: 2,
        woof: [0, 1, 2]
      },
      fish: [0, 1, 2]
    };
    const c = clone(obj);

    obj.cats.fred = 47;
    obj.dogs = 47;
    obj.fish[0] = 'stuff';

    assert.deepEqual(c.cats, {
      fred: 1,
      billy: 2,
      meow: true
    });

    assert.deepEqual(c.dogs, {
      spot: 1,
      max: 2,
      woof: [0, 1, 2]
    });

    assert.deepEqual(c.fish, [0, 1, 2]);
  });

  it('should clone objects with methods', () => {
    const obj = {
      cats: () => {
        return 'meow';
      },
      dogs: () => {
        return 'woof';
      }
    };
    const c = clone(obj);

    assert.strictEqual(obj.cats, c.cats);
    assert.strictEqual(obj.dogs, c.dogs);

    obj.cats = () => {};
    obj.dogs = () => {};

    assert.notStrictEqual(obj.cats, c.cats);
    assert.notStrictEqual(obj.dogs, c.dogs);
  });

  it('should clone prototypes', () => {
    function Cat(name) {
      this.name = name;
    }

    Cat.prototype.meow = () => {
      return 'meow';
    };

    Cat.prototype.bark = () => {
      return 'cats dont bark';
    };

    const cat = new Cat('Fred'),
      c = clone(cat);

    assert.deepEqual(cat.name, c.name);
    assert.deepEqual(Cat.prototype.bark, c.bark);
    assert.deepEqual(Cat.prototype.meow, c.meow);
  });

  it('should clone circular objects while keeping the circular reference', () => {
    const obj = { cats: true };
    obj.child = obj;
    const c = clone(obj);

    obj.cats = false;

    assert.deepEqual(c, {
      cats: true,
      child: c
    });
    assert.strictEqual(c, c.child);
  });

  it('should not return the same object when cloned twice', () => {
    const obj = { cats: true };
    const c1 = clone(obj);
    const c2 = clone(obj);

    assert.notStrictEqual(c1, c2);
  });

  it('should not return the same object when nested', () => {
    const obj = { dogs: true };
    const obj1 = { cats: true, child: { prop: obj } };
    const obj2 = { fish: [0, 1, 2], child: { prop: obj } };

    const c1 = clone(obj1);
    const c2 = clone(obj2);

    assert.notStrictEqual(c1.child.prop, c2.child.prop);
  });

  it('should not clone HTML elements', () => {
    const obj = {
      cats: true,
      node: document.createElement('div')
    };
    const c = clone(obj);

    obj.cats = false;

    assert.equal(c.cats, true);
    assert.strictEqual(c.node, obj.node);
  });

  it('should not clone HTML elements from different windows', () => {
    fixture.innerHTML = '<iframe id="target"></iframe>';
    const iframe = fixture.querySelector('#target');

    const obj = {
      cats: true,
      node: iframe.contentDocument
    };
    const c = clone(obj);

    obj.cats = false;

    assert.equal(c.cats, true);
    assert.strictEqual(c.node, obj.node);
  });
});
