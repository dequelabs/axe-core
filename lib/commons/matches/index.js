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
import fromPrimitive from './from-primitive';
import hasAccessibleName from './has-accessible-name';
import hasChild from './has-child';
import implicitRole from './implicit-role';
import inSectioningContent from './in-sectioning-content';
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
matches.fromPrimitive = fromPrimitive;
matches.hasAccessibleName = hasAccessibleName;
matches.hasChild = hasChild;
matches.implicitRole = implicitRole;
matches.inSectioningContent = inSectioningContent;
matches.isSummaryForDetails = isSummaryForDetails;
matches.nodeName = nodeName;
matches.properties = properties;
matches.semanticRole = semanticRole;

export default matches;
