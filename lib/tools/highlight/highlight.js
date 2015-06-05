

function highlight(element, className, instance) {

  var div,
  offsetX = window.pageXOffset,
  offsetY = window.pageYOffset,
  rect = element.getBoundingClientRect();

  div = document.createElement('div');
  div.classList.add(instance.theme);
  div.classList.add(className || element.nodeName.toLowerCase());

  div.style.position = 'absolute';

  div.style.top = rect.top + offsetY + 'px';
  div.style.left = rect.left + offsetX + 'px';
  div.style.width = rect.width + 'px';
  div.style.height = rect.height + 'px';

  document.body.appendChild(div);

  instance.overlays.push({
    overlay: div,
    element: element
  });

}

function isIterable(candidate) {
  if (typeof candidate !== 'string' && candidate.length === +candidate.length) {
    return true;
  }
  return false;
}

function Highlighter(theme) {
  this.theme = theme || 'ks-overlay';
  this.overlays = [];
}

/**
* Positions an generated div directly on top of each of the element's clientRects
* @param  {HTMLElement} element   The element to overlay
* @param  {String} className Optional className to append to the generated "overlay".
*                            Defaults to the element's nodeName
*/
Highlighter.prototype.highlight = function (elements, className) {

  elements = isIterable(elements) ? elements : [elements];
  var index, length;

  for (index = 0, length = elements.length; index < length; index++) {
    highlight(elements[index], className, this);
  }
};

/**
* Removes all overlays from the overlay stack
*/
Highlighter.prototype.clear = function clear(elements) {
  if (elements !== undefined) {
    elements = isIterable(elements) ? commons.utils.toArray(elements) : [elements];
  }

  var index, overlay, item;

  for (index = this.overlays.length - 1; index >= 0; index--) {
    item = this.overlays[index];
    overlay = item.overlay;

    if (!elements || !elements.length || elements.indexOf(item.element) !== -1) {

      overlay.parentNode.removeChild(overlay);
      this.overlays.splice(index, 1);
    }
  }

};

var highlighter = new Highlighter('ks-overlay');

return {
  run: function (node, options, callback) {
    highlighter.highlight(node);
    callback();
  },
  cleanup: function (callback) {
    highlighter.clear();
    callback();
  }
};
