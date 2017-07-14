return virtualNode.children.every(({ actualNode }) => 
    actualNode.nodeName.toUpperCase() !== 'LI');
