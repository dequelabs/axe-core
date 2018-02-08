// jshint loopfunc:true
const escapeSelector = axe.utils.escapeSelector;

axe.utils.getSelectorData = function (domTree) {
  //jshint maxstatements:25
  var data = {
    classes: {},
    tags: {},
    attributes: {},
    elements: 0,
    threshold: 100,
    matchThreshold: 1
  };
  domTree = Array.isArray(domTree) ? domTree : [domTree];
  var currentLevel = domTree.slice();
  var stack = [];
  while (currentLevel.length) {
    var current = currentLevel.pop();
    var node = current.actualNode;

    if (!!node.querySelectorAll) {
      data.elements++;
      var tag = node.nodeName;
      if (data.tags[tag]) {
        data.tags[tag]++;
      } else {
        data.tags[tag] = 1;
      }
      if (node.classList) {
        Array.from(node.classList).forEach(function (cl) {
          var ind = escapeSelector(cl);
          if (data.classes[ind]) {
            data.classes[ind]++;
          } else {
            data.classes[ind] = 1;
          }
        });
      }
      if (node.attributes) {
        Array.from(node.attributes).filter(function (at) {
          return !['class', 'style', 'id'].includes(at.name) && at.name.indexOf(':') === -1;
        }).forEach(function (at) {
          var name = at.name;
          var value;
          if (name.indexOf('href=') !== -1 || name.indexOf('src=') !== -1) {
            value = encodeURI(axe.utils.getFriendlyUriEnd(escapeSelector(at.value)));
          } else {
            value = escapeSelector(at.value);
          }
          var atnv = escapeSelector(at.name) + '="' + value + '"';
          if (data.attributes[atnv]) {
            data.attributes[atnv]++;
          } else {
            data.attributes[atnv] = 1;
          }
        });
      }
    }
    if (current.children.length) {
      // "recurse"
      stack.push(currentLevel);
      currentLevel = current.children.slice();
    }
    while (!currentLevel.length && stack.length) {
      currentLevel = stack.pop();
    }
  }
  data.threshold = Math.max(data.elements / 100, 20);
  data.matchThreshold = data.threshold / 10;
  return data;
};

function uncommonClasses(node, classData) {
  var retVal = [];

  if (node.classList) {
    Array.from(node.classList).forEach(function (cl) {
      var ind = escapeSelector(cl);
      if (classData[ind] < axe._selectorData.threshold) {
        retVal.push({
          cName: ind,
          count: classData[ind]
        });
      }
    });
  }
  retVal.sort(function (a, b) {
    return a.count < b.count;
  });
  return retVal;
}

function uncommonAttributes(node, attData) {
  var retVal = [];
  
  if (node.attributes) {
    Array.from(node.attributes).filter(function (at) {
      return !['class'].includes(at.name);
    }).forEach(function (at) {
        var name = at.name;
        var value;
        if (name.indexOf('href=') !== -1 || name.indexOf('src=') !== -1) {
          value = encodeURI(axe.utils.getFriendlyUriEnd(escapeSelector(at.value)));
        } else {
          value = escapeSelector(at.value);
        }
        var atnv = escapeSelector(at.name) + '="' + value + '"';
      if (attData[atnv] < axe._selectorData.threshold) {
        retVal.push({
          aName: atnv,
          count: attData[atnv]
        });
      }
    });
  }
  retVal.sort(function (a, b) {
    return a.count < b.count;
  });
  return retVal;
}

function isCommonTag(tag) {
  return axe._selectorData.tags[tag] > axe._selectorData.threshold;
}

function getParentSelectors(node, root) {
  //jshint maxstatements: 21
  if (node) {
    var tag = escapeSelector(node.nodeName.toLowerCase());
    if (node.id && root.querySelector('#' + escapeSelector(node.id))) {
      return '#' + escapeSelector(node.id) + ' > ';
    } else {
      var uc = uncommonClasses(node, axe._selectorData.classes);
      var at = uncommonAttributes(node, axe._selectorData.attributes);
      
      if (uc.length && uc[0].count < axe._selectorData.matchThreshold) {
        return tag + '.' + uc.pop().cName + ' > ';
      }
      if (at.length && at[0].count < axe._selectorData.matchThreshold) {
        return tag + '[' + at.pop().aName + ']' + ' > ';
      }
      if (uc.length) {
        tag += '.' + uc.pop().cName;
      }
      if (at.length) {
        tag += '[' + at.pop().aName + ']';
      }
      if (isCommonTag(node.nodeName)) {
        return getParentSelectors(node.parentElement, root) +
          tag + ' > ';
      } else {
        return tag + ' > ';
      }
    }
  } else {
    return '';
  }
}

function getAbsoluteSelector(node, root, options) {
  //jshint maxcomplexity:14
  var parentSelector = '';
  var parent;
  if (node.parentElement) {
    parentSelector = getAbsoluteSelector(node.parentElement, root, options);
  }
  if (node.id) {
    return parentSelector + (parentSelector ? ' > ' : '') + '#' + escapeSelector(node.id);
  } else {
    var tag = escapeSelector(node.nodeName.toLowerCase());
    parent = node.parentElement || root;
    var matches = parent.querySelectorAll(tag);
    if (matches.length === 1) {
      return parentSelector + (parentSelector ? ' > ' : '') + escapeSelector(tag);
    }
    for (var i = 0, j = 0; i < matches.length; i++) {
      if (node === matches[i]) {
        return parentSelector + (parentSelector ? ' > ' : '') + escapeSelector(tag) + ':nth-of-type(' + (j+1) + ')';
      }
      if (matches[i].parentElement === node.parentElement) {
        j++;
      }
    }
  }
}

function generateSingleSelector(node, options, root) {
  //jshint maxstatements:34
  //jshint maxcomplexity:15
  if (options && options.toRoot) {
    return getAbsoluteSelector(node, root, options);
  }
  if (!axe._selectorData) {
    axe._selectorData = axe.utils.getSelectorData(axe._tree);
  }
  var tag = node.nodeName;
  var uc = uncommonClasses(node, axe._selectorData.classes);
  var at = uncommonAttributes(node, axe._selectorData.attributes);
  var selector;
  var parentSelector = getParentSelectors(node.parentElement, root, options);
  if (node.id) {
    selector = '#' + escapeSelector(node.id);
  } else {
    selector = parentSelector + escapeSelector(tag.toLowerCase());
    parentSelector = undefined;
  }
  var attSelector = '';
  var i;

  while (true) {
    if (uc.length && !parentSelector) {
      selector += '.' + uc.pop().cName;
    }
    var hits = root.querySelectorAll(selector + attSelector);
    if (hits.length === 1) {
      return selector + attSelector;
    }
    if (hits.length < 10) {
      for (i = 0; i < hits.length; i++) {
        if (hits[i] === node) {
          return selector + attSelector + ':nth-of-type(' + (i + 1) + ')';
        }
      }
    }
    if (!uc.length && !at.length && !parentSelector) {
      // console.log('bailing on: ' + hits.length + ' ' + selector + attSelector);
      for (i = 0; i < hits.length; i++) {
        if (hits[i] === node) {
          return selector + attSelector + ':nth-of-type(' + (i + 1) + ')';
        }
      }
      throw new Error('failed to find a selector for: ' + selector + attSelector + ', hits: ' + hits.length);
    }
    if (parentSelector) {
      selector = parentSelector + selector;
    } else if (at.length) {
      attSelector += '[' + at.pop().aName + ']';
    }
  }
}

axe.utils.getSelector = function (elm, options) {
  if (!elm) {
    return '';
  }
  let doc = (elm.getRootNode && elm.getRootNode()) || document;
  if (doc.nodeType === 11) { // DOCUMENT_FRAGMENT
    let stack = [];
    while (doc.nodeType === 11) {
      stack.push({elm: elm, doc: doc});
      elm = doc.host;
      doc = elm.getRootNode();
    }
    stack.push({elm: elm, doc: doc});
    return stack.reverse().map((comp) => {
      return generateSingleSelector(comp.elm, options, comp.doc);
    });
  } else {
    return generateSingleSelector(elm, options, doc);
  }
};