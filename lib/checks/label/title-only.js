var labelText = kslib.text.label(node);
return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));