const headers = axe.utils.querySelectorAll(
    virtualNode, 'h1, [role="heading"][aria-level="1"]');

if (headers.length) {
  return headers.some(({ actualNode }) => {
      return axe.commons.dom.isVisible(actualNode, true);
    }) ? true : undefined;
}
return false;
