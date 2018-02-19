const links = axe.utils.querySelectorAll(virtualNode, 'a[href]');
return links.some(vLink => vLink.actualNode.getAttribute('href')[0] === '#');
