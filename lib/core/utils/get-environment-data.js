/**
 * Add information about the environment axe was run in.
 * @return {EnvironmentData}
 */
export default function getEnvironmentData(metadata = null, win = window) {
  if (metadata && typeof metadata === 'object') {
    return metadata;
  } else if (typeof win !== 'object') {
    return {};
  }

  return {
    testEngine: {
      name: 'axe-core',
      version: axe.version
    },
    testRunner: {
      name: axe._audit.brand
    },
    testEnvironment: getTestEnvironment(win),
    timestamp: new Date().toISOString(),
    url: win.location?.href
  };
}

function getTestEnvironment(win) {
  if (!win.navigator || typeof win.navigator !== 'object') {
    return {};
  }
  const { navigator, innerHeight, innerWidth } = win;
  const { angle, type } = getOrientation(win) || {};
  return {
    userAgent: navigator.userAgent,
    windowWidth: innerWidth,
    windowHeight: innerHeight,
    orientationAngle: angle,
    orientationType: type
  };
}

function getOrientation({ screen }) {
  return screen.orientation || screen.msOrientation || screen.mozOrientation;
}
