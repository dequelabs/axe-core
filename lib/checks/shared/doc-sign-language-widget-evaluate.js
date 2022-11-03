function docHasSignLanguageWidget() {
  var signLanguageWidget = document.querySelectorAll("#DeafTranslate");
    if (signLanguageWidget.length) return true;
    signLanguageWidget = document.querySelectorAll("#SignLanguage");
    if (signLanguageWidget.length) return true;
    signLanguageWidget = document.querySelectorAll(".sign-language");
    if (signLanguageWidget.length) return true;
    signLanguageWidget = document.querySelectorAll(".mr-tooltip");
    if (signLanguageWidget.length) return true;
    signLanguageWidget = document.querySelectorAll("[alt='DEAF']");
    if (signLanguageWidget.length) return true;

    signLanguageWidget = document.querySelectorAll(
      'script[src*="/integrator.js"],script[src*="/tooltip_add.js"],script[src*="/signsplayer.js"]'
    );
    return !!signLanguageWidget.length;
}

export default docHasSignLanguageWidget;
