/* global aria, axe, dom, text */

 /**
  * Gets the accessible ARIA describedby text of a given element
  * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
  * @method ariaDescribedbyVirtual
  * @memberof axe.commons.aria
  * @instance
  * @param  {Object} actualNode The virtualNode to test
  * @return {Mixed}  String of visible text, or `null` if no aria-describedby is found
  */
 aria.ariaDescribedbyVirtual = function({ actualNode }) {
   let ref, candidate;

   if (actualNode && actualNode.getAttribute('aria-describedby')) {
     // aria-labelledby
     ref = dom.idrefs(actualNode, 'aria-describedby');
     candidate = ref
       .map(function(thing) {
         const vNode = axe.utils.getNodeFromTree(axe._tree[0], thing);
         return vNode ? text.visibleVirtual(vNode, true) : '';
       })
       .join(' ')
       .trim();

     if (candidate) {
       return candidate;
     }
   }
   return null;
 };

 /**
  * Gets the aria describedby for a given node
  * @method ariaDescribedby
  * @memberof axe.commons.aria
  * @instance
  * @param  {HTMLElement} node The element to check
  * @return {Mixed} String of visible text, or `null` if no aria-describedby is found
  */
 aria.ariaDescribedby = function(node) {
   node = axe.utils.getNodeFromTree(axe._tree[0], node);
   if (!node) {
     return null;
   }
   return aria.ariaDescribedbyVirtual(node);
 };
