import Color from './color';
import { performanceTimer } from '../../core/utils';

let colorStart;
let getValueBGStart;
let parseStringStart;
let getValueOpacityStart;

let colorTime = 0;
let getValueBGTime = 0;
let parseStringTime = 0;
let getValueOpacityTime = 0;

/**
 * Returns the non-alpha-blended background color of an element
 *
 * @method getOwnBackgroundColor
 * @memberof axe.commons.color
 *
 * @param {Object} elmStyle style of the element
 * @return {Color}
 */
function getOwnBackgroundColor(elmStyle, log) {
  colorStart = window.performance.now();
  const bgColor = new Color();
  if (log) {
    colorTime += window.performance.now() - colorStart;
  }

  getValueBGStart = window.performance.now();
  const bg = elmStyle.getPropertyValue('background-color');
  if (log) {
    getValueBGTime += window.performance.now() - getValueBGStart;
  }

  parseStringStart = window.performance.now();
  bgColor.parseString(bg, true);
  if (log) {
    parseStringTime += window.performance.now() - parseStringStart;
  }

  if (bgColor.alpha !== 0) {
    getValueOpacityStart = window.performance.now();
    const opacity = elmStyle.getPropertyValue('opacity');
    if (log) {
      getValueOpacityTime += window.performance.now() - getValueOpacityStart;
    }
    bgColor.alpha = bgColor.alpha * opacity;
  }

  return bgColor;
}

getOwnBackgroundColor._logTime = function() {
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getOwnBackgroundColor_color took ' + colorTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getOwnBackgroundColor_getPropertyValue(bg) took ' + getValueBGTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getOwnBackgroundColor_parseString took ' + parseStringTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor_getOwnBackgroundColor_getPropertyValue(opacity) took ' + getValueOpacityTime + 'ms');

  Color._logTime();
}

export default getOwnBackgroundColor;
