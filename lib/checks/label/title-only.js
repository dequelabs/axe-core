var labelText = commons.text.label(node);
return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));