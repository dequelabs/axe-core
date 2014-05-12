var labelText = felib.getLabelText(node);
return !labelText && (node.getAttribute('title') || node.getAttribute('aria-describedby'));