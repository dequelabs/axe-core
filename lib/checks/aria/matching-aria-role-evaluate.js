import { tokenList } from '../../core/utils';
import { getRole } from '../../commons/aria';
import matchesSelector from '../../core/utils/element-matches';

function matchingAriaRoleEvaluate(node) {
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
		// ['landmarks', 'directory'], // ARIA (SKIPPED! NavDoc)
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

	const hasXmlEpubType = node.hasAttributeNS(
		'http://www.idpf.org/2007/ops',
		'type'
	);
	if (
		hasXmlEpubType ||
		node.hasAttribute('epub:type') // for unit tests that are not XML-aware due to fixture.innerHTML
	) {
		// abort if descendant of landmarks nav (nav with epub:type=landmarks)
		if (
			(hasXmlEpubType && matchesSelector(node, 'nav[*|type~="landmarks"] *')) ||
			matchesSelector(node, 'nav[epub\\:type~="landmarks"] *')
		) {
			// console.log('BREAKPOINT');
			// throw new Error('BREAKPOINT');
			return true;
		}

		// iterate for each epub:type value
		var types = tokenList(
			hasXmlEpubType
				? node.getAttributeNS('http://www.idpf.org/2007/ops', 'type')
				: node.getAttribute('epub:type')
		);
		for (const type of types) {
			// If there is a 1-1 mapping, check that the role is set (best practice)
			if (mappings.has(type)) {
				// Note: using axe’s `getRole` util returns the effective role of the element
				// (either explicitly set with the role attribute or implicit)
				// So this works for types mapping to core ARIA roles (eg. glossref/glossterm).
				const mappedRole = mappings.get(type);
				const role = getRole(node, { dpub: true });
				// if (mappedRole !== role) {
				// 	console.log('BREAKPOINT: ', type, mappedRole, role);
				// 	// throw new Error('BREAKPOINT');
				// }
				return mappedRole === role;
			} else {
				// e.g. cover, landmarks
				// console.log('BREAKPOINT: ', type);
				// throw new Error('BREAKPOINT');
			}
		}
	}

	return true;
}

export default matchingAriaRoleEvaluate;
