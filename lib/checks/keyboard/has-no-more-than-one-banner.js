const banners = axe.utils.querySelectorAll(virtualNode, 'header, [role=banner]');
const sectioning = ['main', 'section', 'aside', 'nav', 'article'];
var count = 0;

function isBanner(node){
  var parent = axe.commons.dom.getComposedParent(node);
  while (parent){
    if (sectioning.includes(parent.tagName.toLowerCase())){
      return false;
    }
    parent = axe.commons.dom.getComposedParent(parent);
  }
  return true;
}

for (var i=0; i<banners.length; i++){
  var node = banners[i].actualNode;
  var role = node.getAttribute('role');
  if (!!role){
    role = role.toLowerCase();
  }
  if (role==='banner' || isBanner(node)){
    count++;
  }
  if (count>1){
    return false;
  }
}
return true;
