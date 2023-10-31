// describes the API used by axe Pro
describe('external API', () => {
  afterEach(() => {
    // setup _tree as needed, always reset
    axe._tree = null;
  });

  describe('axe.commons.text.sanitize', () => {
    it('must be a function with the signature String -> String', () => {
      assert.isString(axe.commons.text.sanitize(''));
      assert.isString(axe.commons.text.sanitize('not empty'));
    });
  });

  describe('axe.utils.getBaseLang', () => {
    it('must be a function with the signature String -> String', () => {
      assert.isString(axe.utils.getBaseLang(''));
      assert.isString(axe.utils.getBaseLang('not empty'));
    });
  });

  describe('axe.utils.validLangs', () => {
    it('be a function with the signature * -> [String]', () => {
      const langs = axe.utils.validLangs();
      assert.isArray(langs);
      langs.forEach(assert.isString);
      assert.isArray(axe.utils.validLangs(document));
    });
  });

  describe('axe.commons.dom.isVisible', () => {
    it('must be a function with the signature Element -> Boolean', () => {
      const el = randomNodeInTree(isElement);
      assert.isBoolean(axe.commons.dom.isVisible(el));
      assert.isBoolean(axe.commons.dom.isVisible(randomNodeInTree(isElement)));
    });
  });

  describe('axe.commons.aria.implicitRole', () => {
    it('must be a function with the signature Element -> String|null', () => {
      axe.utils.getFlattenedTree(document.documentElement);
      const implicitRolesOrNull = getEntries(
        axe.commons.aria.lookupTable.role
      ).reduce(
        function (roles, entry) {
          const role = entry[0];
          const val = entry[1];
          if (val.implicit) {
            roles.push(role);
          }
          return roles;
        },
        [null]
      );
      const role = axe.commons.aria.implicitRole(randomNodeInTree());
      assert.oneOf(role, implicitRolesOrNull);
    });
  });

  describe('axe.commons.aria.lookupTable.role', () => {
    it('must be an object (dict)', () => {
      assert.isObject(axe.commons.aria.lookupTable.role);
    });
    it('must have the signature String -> String {role.type}', () => {
      const keys = getKeys(axe.commons.aria.lookupTable.role);
      const types = getValues(axe.commons.aria.lookupTable.role).map(
        function (role) {
          return role.type;
        }
      );
      keys.forEach(assert.isString);
      types.forEach(assert.isString);
    });
  });

  describe('axe.utils.getFlattenedTree', () => {
    it('must be a function with the signature Element -> [vnode]', () => {
      assert.isArray(axe.utils.getFlattenedTree(document.body));
      assert.lengthOf(
        axe.utils.getFlattenedTree(randomNodeInTree(isElement)),
        1
      );
    });
  });

  describe('axe.utils.getNodeFromTree', () => {
    it('must be a function with the signature Node -> vnode', () => {
      axe._tree = axe.utils.getFlattenedTree(document.body);
      assert.oneOf(
        axe.utils.getNodeFromTree(randomNodeInTree()),
        flat(axe._tree[0])
      );
    });
    it('must return null for nodes not in the axe._tree', () => {
      assert.isNull(axe.utils.getNodeFromTree(randomElement()));
    });
  });

  describe('axe.commons.dom.isOpaque', () => {
    it('must be a function with the signature Element -> Boolean', () => {
      assert.isBoolean(axe.commons.dom.isOpaque(randomNodeInTree(isElement)));
    });
  });

  describe('axe.commons.text.accessibleTextVirtual', () => {
    it('must be a function with the signature Element vnode -> String', () => {
      axe._tree = axe.utils.getFlattenedTree(document.body);
      const vnode = axe.utils.getNodeFromTree(randomNodeInTree(isElement));
      assert.isString(axe.commons.text.accessibleTextVirtual(vnode));
    });
  });
});

const elements = [
  document.createElement('div'),
  document.createElement('button'),
  document.createElement('article')
];

const inTree = [];
const treeWalker = collectNodes();
let next = treeWalker.iterate().next();
while (!next.done) {
  if (next.value.nodeType === 1) {
    inTree.push(next.value);
  }
  next = treeWalker.iterate().next();
}

function isElement(el) {
  return el.nodeType === Node.ELEMENT_NODE;
}

function random(fromArr) {
  return function (filter) {
    filter = filter || isTrue;
    const arr = fromArr.filter(filter);
    const seed = Math.random();
    return arr[Math.floor(seed * arr.length)];
  };
}

function randomNodeInTree(filter) {
  return random(inTree)(filter);
}

function randomElement(filter) {
  return random(elements)(filter);
}

// mimic tree: body and all element and text children
function collectNodes() {
  const walker = document.createTreeWalker(
    document,
    NodeFilter.SHOW_ALL,
    function (node) {
      if (!document.body.contains(node)) {
        return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
    false
  );
  const nextNode = () => {
    const value = walker.nextNode();
    return {
      value: value,
      done: !value
    };
  };
  walker.iterate = () => {
    return { next: nextNode };
  };
  return walker;
}

function flat(tree) {
  const result = [];
  const insert = function (node) {
    result.push(node);
    (node.children || []).forEach(insert);
  };
  if (tree) {
    insert(tree);
  }
  return result;
}

function isTrue() {
  return true;
}

function getEntries(obj) {
  const results = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      results.push([key, obj[key]]);
    }
  }
  return results;
}

function getValues(obj) {
  return getEntries(obj).map(function (entry) {
    return entry[1];
  });
}

function getKeys(obj) {
  return getEntries(obj).map(function (entry) {
    return entry[0];
  });
}
