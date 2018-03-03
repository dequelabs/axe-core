const contentinfos = axe.utils.querySelectorAll(virtualNode, 'footer, [role=contentinfo]');
const sectioning = ['article','aside','main','nav','section'];
var count = 0;

function isContentinfo(node){
  var parent = axe.commons.dom.getComposedParent(node);
  while (parent){
    if (sectioning.includes(parent.tagName.toLowerCase())){
      return false;
    }
    parent = axe.commons.dom.getComposedParent(parent);
  }
  return true;
}

for (var i=0; i<contentinfos.length; i++){
  var node = contentinfos[i].actualNode;
  var role = node.getAttribute('role');
  if (!!role){
    role = role.toLowerCase();
  }
  if (role==='contentinfo' || isContentinfo(node)){
    count++;
  }
  if (count>1){
    return false;
  }
}
return true;
