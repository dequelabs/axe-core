let role = axe.commons.aria.getRole(node);
let label = axe.commons.aria.label(node);
label = label ? label.toLowerCase() : null;
this.data({ role: role, label: label });

return true;
