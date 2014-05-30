var labelText = kslib.getLabelText(node);
return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));