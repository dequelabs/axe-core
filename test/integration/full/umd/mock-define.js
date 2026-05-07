/* eslint no-unused-vars: 0 */

// Mock define method to collect calls to define
var defineCalls = [];
function define() {
  defineCalls.push(arguments);
}
define.amd = true;
