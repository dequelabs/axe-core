var labelText = axe.commons.text.label(virtualNode);
return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));