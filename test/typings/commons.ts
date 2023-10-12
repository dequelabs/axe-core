import axe from '../../axe';

// Commons
axe.commons.aria.getRoleType('img');
axe.commons.dom.isFocusable(document.body);
axe.commons.dom.isNativelyFocusable(document.body);
axe.commons.dom.isVisibleToScreenReaders(document.body);
axe.commons.text.accessibleText(document.body);
axe.commons.text.sanitize(' text ');

// Color
const color = new axe.commons.color.Color(255, 255, 255);
color.toHexString();
color.toJSON();
color.getRelativeLuminance();
color.parseRgbString('rgb(244, 0, 10)');
color.parseHexString('#ccc');
color.parseColorFnString('');
const { red, green, blue, alpha } = color;

axe.commons.color.getContrast(color, new axe.commons.color.Color(0, 0, 0, 0));
