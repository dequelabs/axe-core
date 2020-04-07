/* global matches */

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
// TODO: es-module-commons. change to:
// import matches from './matches'
import matchesFn from './matches';
import nodeName from './node-name';
import properties from './properties';

// TODO: es-module-commons. remove matches setter
matches = matchesFn;
matches.attributes = attributes;
matches.condition = condition;
matches.fromDefinition = fromDefinition;
matches.fromFunction = fromFunction;
matches.fromPrimative = fromPrimative;
matches.nodeName = nodeName;
matches.properties = properties;

// TODO: es-module-commons. remove
commons.matches = matchesFn;
