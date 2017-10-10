const mains = axe.utils.querySelectorAll(virtualNode, 'main,[role=main]');
this.data(!!mains.length);
return !!mains.length;