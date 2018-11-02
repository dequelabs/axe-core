let submitButtons = axe.utils.querySelectorAll(
  virtualNode,
  'input[type="submit"]:not([disabled]), input[type="image"]:not([disabled]), button:not([type="reset"],[type="button"],[disabled])'
)

if (submitButtons.length) {
  return true;
}

let submitAllButtons = axe.utils.querySelectorAll(
  virtualNode,
  'input[type="submit"], input[type="image"], button:not([type="reset"],[type="button"])'
)

let inputNodes = axe.utils.querySelectorAll(
  virtualNode,
  'input'
)

if (inputNodes.length === 1 && !submitAllButtons.length) {
  return true;
}

return undefined;
