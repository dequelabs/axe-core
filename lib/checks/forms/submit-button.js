if (node.querySelector('input[type="submit"], img[type="submit"], button[type="submit"]')) {
  return true;
}

if (!node.querySelectorAll(':not(textarea)').length) {
  return false;
}

return undefined;
