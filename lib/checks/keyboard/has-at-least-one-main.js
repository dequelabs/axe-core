const mains = axe.utils.querySelectorAll(virtualNode, 'main,[role=main]');
this.data(!!mains[0]);
return !!mains[0];