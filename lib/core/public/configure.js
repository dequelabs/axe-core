import { hasReporter } from './reporter';
import { configureStandards } from '../../standards';
import matchesSelector from '../../core/utils/element-matches';
import { tokenList } from '../../core/utils';
import { getRole } from '../../commons/aria';

function configure(spec) {
	var audit;

	audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}

	if (spec.axeVersion || spec.ver) {
		const specVersion = spec.axeVersion || spec.ver;
		if (!/^\d+\.\d+\.\d+(-canary)?/.test(specVersion)) {
			throw new Error(`Invalid configured version ${specVersion}`);
		}

		const [version, canary] = specVersion.split('-');
		const [major, minor, patch] = version.split('.').map(Number);

		const [axeVersion, axeCanary] = axe.version.split('-');
		const [axeMajor, axeMinor, axePatch] = axeVersion.split('.').map(Number);

		if (
			major !== axeMajor ||
			axeMinor < minor ||
			(axeMinor === minor && axePatch < patch) ||
			(major === axeMajor &&
				minor === axeMinor &&
				patch === axePatch &&
				canary &&
				canary !== axeCanary)
		) {
			throw new Error(
				`Configured version ${specVersion} is not compatible with current axe version ${axe.version}`
			);
		}
	}

	if (
		spec.reporter &&
		(typeof spec.reporter === 'function' || hasReporter(spec.reporter))
	) {
		audit.reporter = spec.reporter;
	}

	// DAISY-AXE
	if (!spec.checks) {
		spec.checks = [];
	}
	spec.checks.push({
		id: 'matching-aria-role',
		// eslint-disable-next-line no-unused-vars
		evaluate: function evaluate(node, options, virtualNode, context) {
			// https://idpf.github.io/epub-guides/epub-aria-authoring/#sec-mappings
			// https://www.w3.org/TR/dpub-aam-1.0/#mapping_role_table
			// https://w3c.github.io/publ-cg/guides/aria-mapping.html#mapping-table
			const mappings = new Map([
				['abstract', 'doc-abstract'],
				['acknowledgments', 'doc-acknowledgments'],
				['afterword', 'doc-afterword'],
				// ['answer', '??'],
				// ['answers', '??'],
				['appendix', 'doc-appendix'],
				// ['assessment', '??'],
				// ['assessments', '??'],
				// ['backmatter', '??'],
				// ['balloon', '??'],
				// ['backlink', 'doc-backlink'], // ??
				['biblioentry', 'doc-biblioentry'],
				['bibliography', 'doc-bibliography'],
				['biblioref', 'doc-biblioref'],
				// ['bodymatter', '??'],
				// ['bridgehead', '??'],
				// ['case-study', '??'],
				['chapter', 'doc-chapter'],
				['colophon', 'doc-colophon'],
				// ['concluding-sentence', '??'],
				['conclusion', 'doc-conclusion'],
				// ['contributors', '??'],
				// ['copyright-page', '??'],
				// ['cover', '??'],
				// ['cover-image', 'doc-cover'], // ??
				// ['covertitle', '??'],
				['credit', 'doc-credit'],
				['credits', 'doc-credits'],
				['dedication', 'doc-dedication'],
				// ['division', '??'],
				['endnote', 'doc-endnote'],
				['endnotes', 'doc-endnotes'],
				['epigraph', 'doc-epigraph'],
				['epilogue', 'doc-epilogue'],
				['errata', 'doc-errata'],
				// ['example', 'doc-example'],
				// ['feedback', '??'],
				['figure', 'figure'], // ARIA
				// ['fill-in-the-blank-problem', '??'],
				['footnote', 'doc-footnote'],
				// ['footnotes', '??'],
				['foreword', 'doc-foreword'],
				// ['frontmatter', '??'],
				// ['fulltitle', '??'],
				// ['general-problem', '??'],
				['glossary', 'doc-glossary'],
				['glossdef', 'definition'], // ARIA
				['glossref', 'doc-glossref'],
				['glossterm', 'term'], // ARIA
				// ['halftitle', '??'],
				// ['halftitlepage', '??'],
				// ['imprimatur', '??'],
				// ['imprint', '??'],
				['help', 'doc-tip'], // ??
				['index', 'doc-index'],
				// ['index-editor-note', '??'],
				// ['index-entry', '??'],
				// ['index-entry-list', '??'],
				// ['index-group', '??'],
				// ['index-headnotes', '??'],
				// ['index-legend', '??'],
				// ['index-locator', '??'],
				// ['index-locator-list', '??'],
				// ['index-locator-range', '??'],
				// ['index-term', '??'],
				// ['index-term-categories', '??'],
				// ['index-term-category', '??'],
				// ['index-xref-preferred', '??'],
				// ['index-xref-related', '??'],
				['introduction', 'doc-introduction'],
				// ['keyword', '??'],
				// ['keywords', '??'],
				// ['label', '??'],
				['landmarks', 'directory'], // ARIA
				// ['learning-objective', '??'],
				// ['learning-objectives', '??'],
				// ['learning-outcome', '??'],
				// ['learning-outcomes', '??'],
				// ['learning-resource', '??'],
				// ['learning-resources', '??'],
				// ['learning-standard', '??'],
				// ['learning-standards', '??'],
				['list', 'list'], // ARIA
				['list-item', 'listitem'], // ARIA
				// ['loa', '??'],
				// ['loi', '??'],
				// ['lot', '??'],
				// ['lov', '??'],
				// ['match-problem', '??'],
				// ['multiple-choice-problem', '??'],
				['noteref', 'doc-noteref'],
				['notice', 'doc-notice'],
				// ['ordinal', '??'],
				// ['other-credits', '??'],
				['page-list', 'doc-pagelist'],
				['pagebreak', 'doc-pagebreak'],
				// ['panel', '??'],
				// ['panel-group', '??'],
				['part', 'doc-part'],
				// ['practice', '??'],
				// ['practices', '??'],
				// ['preamble', '??'],
				['preface', 'doc-preface'],
				['prologue', 'doc-prologue'],
				['pullquote', 'doc-pullquote'],
				['qna', 'doc-qna'],
				// ['question', '??'],
				['referrer', 'doc-backlink'],
				// ['revision-history', '??'],
				// ['seriespage', '??'],
				// ['sound-area', '??'],
				// ['subchapter', '??'],
				['subtitle', 'doc-subtitle'],
				['table', 'table'],
				['table-cell', 'cell'],
				['table-row', 'row'],
				// ['text-area', '??'],
				['tip', 'doc-tip'],
				// ['title', '??'],
				// ['titlepage', '??'],
				['toc', 'doc-toc']
				// ['toc-brief', '??'],
				// ['topic-sentence', '??'],
				// ['true-false-problem', '??'],
				// ['volume', '??'],
			]);

			if (node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')) {
				// abort if descendant of landmarks nav (nav with epub:type=landmarks)
				if (matchesSelector(node, 'nav[*|type~="landmarks"] *')) {
					return true;
				}

				// iterate for each epub:type value
				var types = tokenList(
					node.getAttributeNS('http://www.idpf.org/2007/ops', 'type')
				);
				for (const type of types) {
					// If there is a 1-1 mapping, check that the role is set (best practice)
					if (mappings.has(type)) {
						// Note: using axe’s `getRole` util returns the effective role of the element
						// (either explicitly set with the role attribute or implicit)
						// So this works for types mapping to core ARIA roles (eg. glossref/glossterm).
						return mappings.get(type) === getRole(node, { dpub: true });
					}
				}
			}

			return true;
		},
		metadata: {
			impact: 'minor',
			messages: {
				// eslint-disable-next-line no-unused-vars
				pass: function anonymous(it) {
					return 'Element has an ARIA role matching its epub:type';
				},
				// eslint-disable-next-line no-unused-vars
				fail: function anonymous(it) {
					return 'Element has no ARIA role matching its epub:type';
				},
				incomplete: ''
			}
		}
	});
	// DAISY-AXE

	if (spec.checks) {
		if (!Array.isArray(spec.checks)) {
			throw new TypeError('Checks property must be an array');
		}

		spec.checks.forEach(check => {
			if (!check.id) {
				throw new TypeError(
					// eslint-disable-next-line max-len
					`Configured check ${JSON.stringify(
						check
					)} is invalid. Checks must be an object with at least an id property`
				);
			}

			audit.addCheck(check);
		});
	}

	const modifiedRules = [];
	if (spec.rules) {
		if (!Array.isArray(spec.rules)) {
			throw new TypeError('Rules property must be an array');
		}

		spec.rules.forEach(rule => {
			if (!rule.id) {
				throw new TypeError(
					// eslint-disable-next-line max-len
					`Configured rule ${JSON.stringify(
						rule
					)} is invalid. Rules must be an object with at least an id property`
				);
			}

			modifiedRules.push(rule.id);
			audit.addRule(rule);
		});
	}

	if (spec.disableOtherRules) {
		audit.rules.forEach(rule => {
			if (modifiedRules.includes(rule.id) === false) {
				rule.enabled = false;
			}
		});
	}

	if (typeof spec.branding !== 'undefined') {
		audit.setBranding(spec.branding);
	} else {
		audit._constructHelpUrls();
	}

	if (spec.tagExclude) {
		audit.tagExclude = spec.tagExclude;
	}

	// Support runtime localization
	if (spec.locale) {
		audit.applyLocale(spec.locale);
	}

	if (spec.standards) {
		configureStandards(spec.standards);
	}

	if (spec.noHtml) {
		audit.noHtml = true;
	}
}

export default configure;
