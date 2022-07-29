// describes the API used by axe Pro
describe('external API', function () {
  'use strict';

  afterEach(function () {
    // setup _tree as needed, always reset
    axe._tree = null;
  });

  describe('axe.commons.text.sanitize', function () {
    it('must be a function with the signature String -> String', function () {
      assert.isString(axe.commons.text.sanitize(''));
      assert.isString(axe.commons.text.sanitize('not empty'));
    });
  });

  describe('axe.utils.getBaseLang', function () {
    it('must be a function with the signature String -> String', function () {
      assert.isString(axe.utils.getBaseLang(''));
      assert.isString(axe.utils.getBaseLang('not empty'));
    });
  });

  describe('axe.utils.validLangs', function () {
    it('be a function with the signature * -> [String]', function () {
      var langs = axe.utils.validLangs();
      assert.isArray(langs);
      langs.forEach(assert.isString);
      assert.isArray(axe.utils.validLangs(document));
    });
  });

  describe('axe.commons.dom.isVisible', function () {
    it('must be a function with the signature Element -> Boolean', function () {
      var el = randomNodeInTree(isElement);
      assert.isBoolean(axe.commons.dom.isVisible(el));
      assert.isBoolean(axe.commons.dom.isVisible(randomNodeInTree(isElement)));
    });
  });

  describe('axe.commons.aria.implicitRole', function () {
    it('must be a function with the signature Element -> String|null', function () {
      axe.utils.getFlattenedTree(document.documentElement);
      var implicitRolesOrNull = getEntries(
        axe.commons.aria.lookupTable.role
      ).reduce(
        function (roles, entry) {
          var role = entry[0];
          var val = entry[1];
          if (val.implicit) {
            roles.push(role);
          }
          return roles;
        },
        [null]
      );
      var role = axe.commons.aria.implicitRole(randomNodeInTree());
      assert.oneOf(role, implicitRolesOrNull);
    });
  });

  describe('axe.commons.aria.lookupTable.role', function () {
    it('must be an object (dict)', function () {
      assert.isObject(axe.commons.aria.lookupTable.role);
    });
    it('must have the signature String -> String {role.type}', function () {
      var keys = getKeys(axe.commons.aria.lookupTable.role);
      var types = getValues(axe.commons.aria.lookupTable.role).map(function (
        role
      ) {
        return role.type;
      });
      keys.forEach(assert.isString);
      types.forEach(assert.isString);
    });
  });

  describe('axe.utils.getFlattenedTree', function () {
    it('must be a function with the signature Element -> [vnode]', function () {
      assert.isArray(axe.utils.getFlattenedTree(document.body));
      assert.lengthOf(
        axe.utils.getFlattenedTree(randomNodeInTree(isElement)),
        1
      );
    });
  });

  describe('axe.utils.getNodeFromTree', function () {
    it('must be a function with the signature Node -> vnode', function () {
      axe._tree = axe.utils.getFlattenedTree(document.body);
      assert.oneOf(
        axe.utils.getNodeFromTree(randomNodeInTree()),
        flat(axe._tree[0])
      );
    });
    it('must return null for nodes not in the axe._tree', function () {
      assert.isNull(axe.utils.getNodeFromTree(randomElement()));
    });
  });

  describe('axe.commons.dom.isOpaque', function () {
    it('must be a function with the signature Element -> Boolean', function () {
      assert.isBoolean(axe.commons.dom.isOpaque(randomNodeInTree(isElement)));
    });
  });

  describe('axe.commons.text.accessibleTextVirtual', function () {
    it('must be a function with the signature Element vnode -> String', function () {
      axe._tree = axe.utils.getFlattenedTree(document.body);
      var vnode = axe.utils.getNodeFromTree(randomNodeInTree(isElement));
      assert.isString(axe.commons.text.accessibleTextVirtual(vnode));
    });
  });
});

var elements = [
  document.createElement('div'),
  document.createElement('button'),
  document.createElement('article')
];

var inTree = [];
var walker = collectNodes();
var next = walker.iterate().next();
while (!next.done) {
  if (next.value.nodeType === 1) {
    inTree.push(next.value);
  }
  next = walker.iterate().next();
}

function isElement(el) {
  return el.nodeType === Node.ELEMENT_NODE;
}

function random(fromArr) {
  return function (filter) {
    filter = filter || isTrue;
    var arr = fromArr.filter(filter);
    var seed = Math.random();
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
  var walker = document.createTreeWalker(
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
  var next = function () {
    var value = walker.nextNode();
    return {
      value: value,
      done: !value
    };
  };
  walker.iterate = function () {
    return { next: next };
  };
  return walker;
}

function flat(tree) {
  var result = [];
  var insert = function (node) {
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
  var results = [];
  var key;
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
