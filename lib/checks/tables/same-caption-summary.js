return !!(node.summary && node.caption) && node.summary === kslib.text.accessibleText(node.caption);
