const title = virtualNode.children.find(({ props }) => {
	return props.nodeName === 'title';
});
return !!title && title.actualNode.textContent.trim() !== '';
