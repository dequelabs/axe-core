/**
 * Namespace for matching utilities.
 * @namespace commons.matches
 * @memberof axe
 */
import attributes from './attributes';
import condition from './condition';
import explicitRole from './explicit-role';
import fromDefinition from './from-definition';
import fromFunction from './from-function';
import fromPrimative from './from-primative';
import hasAccessibleName from './has-accessible-name';
import hasAncestor from './has-ancestor';
import hasDescendant from './has-descendant';
import implicitRole from './implicit-role';
import isSummaryForDetails from './is-summary-for-details';
import matches from './matches';
import nodeName from './node-name';
import properties from './properties';
import semanticRole from './semantic-role';

matches.attributes = attributes;
matches.condition = condition;
matches.explicitRole = explicitRole;
matches.fromDefinition = fromDefinition;
matches.fromFunction = fromFunction;
matches.fromPrimative = fromPrimative;
matches.hasAccessibleName = hasAccessibleName;
matches.hasAncestor = hasAncestor;
matches.hasDescendant = hasDescendant;
matches.implicitRole = implicitRole;
matches.nodeName = nodeName;
matches.properties = properties;
matches.semanticRole = semanticRole;
matches.isSummaryForDetails = isSummaryForDetails;

export default matches;
