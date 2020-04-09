/**
 * Namespace for matching utilities.
 * @namespace commons.matches
 * @memberof axe
 */
import attributes from './attributes';
import condition from './condition';
import fromDefinition from './from-definition';
import fromFunction from './from-function';
import fromPrimative from './from-primative';
import matches from './matches';
import nodeName from './node-name';
import properties from './properties';

matches.attributes = attributes;
matches.condition = condition;
matches.fromDefinition = fromDefinition;
matches.fromFunction = fromFunction;
matches.fromPrimative = fromPrimative;
matches.nodeName = nodeName;
matches.properties = properties;

export default matches;
