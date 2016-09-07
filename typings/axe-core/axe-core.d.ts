// Type definitions for axe-core 2.0.5
// Project: https://github.com/dequelabs/axe-core
// Definitions by: Marcy Sutton <https://github.com/marcysutton>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface ElementContext {
	node?: Object,
	selector?: string,
	include?: any[],
	exclude?: any[]
}
interface RunOnly {
	type: string, // "rule" | "rules" | "tag" | "tags"
	value?: {
		include?: string[],
		exclude?: string[]
	}
	values?: string[] // "wcag2a" | "wcag2aa" | "section508" | "best-practice"
}
interface AxeResults {
	url: string,
	timestamp: string,
	passes: Pass[],
	violations: Violation[]
}
interface Pass {
	description: string,
	help: string,
	helpUrl: string,
	id: string,
	impact: string, // "minor" | "moderate" | "serious" | "critical" | "null"
	tags: string[], // "wcag2a" | "wcag2aa" | "section508" | "best-practice"
	nodes: NodeResult[]
}
interface Violation {
	description: string,
	help: string,
	helpUrl: string,
	id: string,
	impact: string, // "minor" | "moderate" | "serious" | "critical" | "null"
	tags: string[], // "wcag2a" | "wcag2aa" | "section508" | "best-practice"
	nodes: NodeResult[]
}
interface NodeResult {
	html: string,
	impact: string, // same as Pass/violation - abstract into enum
	target: string[],
	any: CheckResult[],
	all: CheckResult[],
	none: CheckResult[]
}
interface CheckResult {
	id: string,
	impact: string,
	message: string,
	data: any,
	relatedNodes?: RelatedNode[]
}
interface RelatedNode {
	target: string[],
	html: string
}
interface Spec {
	branding?: {
		brand: string,
		application: string
	},
	reporter?: string, // "v1" | "v2"
	checks?: Check[],
	rules?: Rule[]
}
interface Check {
	id: string,
	evaluate: Function,
	after?: Function,
	options?: any,
	matches?: string,
	enabled?: boolean
}
interface Rule {
	id: string,
	selector?: string,
	excludeHidden?: boolean,
	enabled?: boolean,
	pageLevel?: boolean,
	any?: string[],
	all?: string[],
	none?: string[],
	tags?: string[],
	matches?: string
}
interface AxePlugin {
	id: string,
	run(...args:any[]): any,
	commands: {
		id: string,
		callback(...args:any[]): void
	}[],
	cleanup?(callback:Function): void
}

interface Axe {
	plugins: any

	/**
	 * Starts analysis on the current document and its subframes
	 *
	 * @param  {Object}   context  The `Context` specification object @see Context
	 * @param  {Array}    options  Options passed into rules or checks, temporarily modifyint them.
	 * @param  {Function} callback The function to invoke when analysis is complete.
	 * @returns {Object}  results  The aXe results object
	 */
	a11yCheck(context: ElementContext, options: {runOnly?: RunOnly, rules?: Object}, callback: (results:AxeResults) => void): AxeResults

	/**
	 * Method for configuring the data format used by aXe. Helpful for adding new
	 * rules, which must be registered with the library to execute.
	 * @param  {Spec}       Spec Object with valid `branding`, `reporter`, `checks` and `rules` data
	 */
	configure(spec: Spec): void

	/**
	 * Searches and returns rules that contain a tag in the list of tags.
	 * @param  {Array}  tags  Optional array of tags
	 * @return {Array}  Array of rules
	 */
	getRules(tags?: string[]): Object[]

	/**
	 * Restores the default axe configuration
	 */
	reset(): void

	/**
	 * Function to register a plugin configuration in document and its subframes
	 * @param  {Object}    plugin    A plugin configuration object
	 */
	registerPlugin(plugin: AxePlugin): void

	/**
	 * Function to clean up plugin configuration in document and its subframes
	 */
	cleanup(): void

}

declare var axe:Axe;

// axe is also available as a module
declare module "axe-core" {
    export = axe;
}