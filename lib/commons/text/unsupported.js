export default {
  // Element's who's value is not consistently picked up in the accessible name
  // Supported in Chrome 114, Firefox 115, but not Safari 16.5:
  // <input aria-labelledby="lbl">
  // <div id="lbl" role="progressbar" aria-valuenow="23"></div>
  accessibleNameFromFieldValue: ['progressbar']
};
