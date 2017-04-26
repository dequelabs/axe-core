| Rule ID | Description | Tags | Enabled by default |
| :------- | :------- | :------- | :------- |
| accesskeys | Ensures every accesskey attribute value is unique | wcag2a, wcag211, cat.keyboard | true |
| area-alt | Ensures &lt;area&gt; elements of image maps have alternate text | cat.text-alternatives, wcag2a, wcag111, section508, section508.22.a | true |
| aria-allowed-attr | Ensures ARIA attributes are allowed for an element&apos;s role | cat.aria, wcag2a, wcag411, wcag412 | true |
| aria-required-attr | Ensures elements with ARIA roles have all required ARIA attributes | cat.aria, wcag2a, wcag411, wcag412 | true |
| aria-required-children | Ensures elements with an ARIA role that require child roles contain them | cat.aria, wcag2a, wcag131 | true |
| aria-required-parent | Ensures elements with an ARIA role that require parent roles are contained by them | cat.aria, wcag2a, wcag131 | true |
| aria-roles | Ensures all elements with a role attribute use a valid value | cat.aria, wcag2a, wcag131, wcag411, wcag412 | true |
| aria-valid-attr-value | Ensures all ARIA attributes have valid values | cat.aria, wcag2a, wcag131, wcag411, wcag412 | true |
| aria-valid-attr | Ensures attributes that begin with aria- are valid ARIA attributes | cat.aria, wcag2a, wcag411 | true |
| audio-caption | Ensures &lt;audio&gt; elements have captions | cat.time-and-media, wcag2a, wcag122, section508, section508.22.a | true |
| blink | Ensures &lt;blink&gt; elements are not used | cat.time-and-media, wcag2a, wcag222, section508, section508.22.j | true |
| button-name | Ensures buttons have discernible text | cat.name-role-value, wcag2a, wcag412, section508, section508.22.a | true |
| bypass | Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content | cat.keyboard, wcag2a, wcag241, section508, section508.22.o | true |
| checkboxgroup | Ensures related &lt;input type=&quot;checkbox&quot;&gt; elements have a group and that that group designation is consistent | cat.forms, best-practice | true |
| color-contrast | Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds | cat.color, wcag2aa, wcag143 | true |
| definition-list | Ensures &lt;dl&gt; elements are structured correctly | cat.structure, wcag2a, wcag131 | true |
| dlitem | Ensures &lt;dt&gt; and &lt;dd&gt; elements are contained by a &lt;dl&gt; | cat.structure, wcag2a, wcag131 | true |
| document-title | Ensures each HTML document contains a non-empty &lt;title&gt; element | cat.text-alternatives, wcag2a, wcag242 | true |
| duplicate-id | Ensures every id attribute value is unique | cat.parsing, wcag2a, wcag411 | true |
| empty-heading | Ensures headings have discernible text | cat.name-role-value, best-practice | true |
| frame-title-unique | Ensures &lt;iframe&gt; and &lt;frame&gt; elements contain a unique title attribute | cat.text-alternatives, best-practice | true |
| frame-title | Ensures &lt;iframe&gt; and &lt;frame&gt; elements contain a non-empty title attribute | cat.text-alternatives, wcag2a, wcag241, section508, section508.22.i | true |
| heading-order | Ensures the order of headings is semantically correct | cat.semantics, best-practice | false |
| href-no-hash | Ensures that href values are valid link references to promote only using anchors as links | cat.semantics, best-practice | false |
| html-has-lang | Ensures every HTML document has a lang attribute | cat.language, wcag2a, wcag311 | true |
| html-lang-valid | Ensures the lang attribute of the &lt;html&gt; element has a valid value | cat.language, wcag2a, wcag311 | true |
| image-alt | Ensures &lt;img&gt; elements have alternate text or a role of none or presentation | cat.text-alternatives, wcag2a, wcag111, section508, section508.22.a | true |
| image-redundant-alt | Ensure button and link text is not repeated as image alternative | cat.text-alternatives, best-practice | true |
| input-image-alt | Ensures &lt;input type=&quot;image&quot;&gt; elements have alternate text | cat.text-alternatives, wcag2a, wcag111, section508, section508.22.a | true |
| label-title-only | Ensures that every form element is not solely labeled using the title or aria-describedby attributes | cat.forms, best-practice | false |
| label | Ensures every form element has a label | cat.forms, wcag2a, wcag332, wcag131, section508, section508.22.n | true |
| layout-table | Ensures presentational &lt;table&gt; elements do not use &lt;th&gt;, &lt;caption&gt; elements or the summary attribute | cat.semantics, wcag2a, wcag131 | true |
| link-in-text-block | Links can be distinguished without relying on color | cat.color, experimental, wcag2a, wcag141 | false |
| link-name | Ensures links have discernible text | cat.name-role-value, wcag2a, wcag111, wcag412, section508, section508.22.a | true |
| list | Ensures that lists are structured correctly | cat.structure, wcag2a, wcag131 | true |
| listitem | Ensures &lt;li&gt; elements are used semantically | cat.structure, wcag2a, wcag131 | true |
| marquee | Ensures &lt;marquee&gt; elements are not used | cat.parsing, wcag2a, wcag222 | true |
| meta-refresh | Ensures &lt;meta http-equiv=&quot;refresh&quot;&gt; is not used | cat.time, wcag2a, wcag2aaa, wcag221, wcag224, wcag325 | true |
| meta-viewport-large | Ensures &lt;meta name=&quot;viewport&quot;&gt; can scale a significant amount | cat.sensory-and-visual-cues, best-practice | true |
| meta-viewport | Ensures &lt;meta name=&quot;viewport&quot;&gt; does not disable text scaling and zooming | cat.sensory-and-visual-cues, wcag2aa, wcag144 | true |
| object-alt | Ensures &lt;object&gt; elements have alternate text | cat.text-alternatives, wcag2a, wcag111, section508, section508.22.a | true |
| p-as-heading | Ensure p elements are not used to style headings | cat.semantics, wcag2a, wcag131, experimental | true |
| radiogroup | Ensures related &lt;input type=&quot;radio&quot;&gt; elements have a group and that the group designation is consistent | cat.forms, best-practice | true |
| region | Ensures all content is contained within a landmark region | cat.keyboard, best-practice | false |
| scope-attr-valid | Ensures the scope attribute is used correctly on tables | cat.tables, best-practice | true |
| server-side-image-map | Ensures that server-side image maps are not used | cat.text-alternatives, wcag2a, wcag211, section508, section508.22.f | true |
| skip-link | Ensures the first link on the page is a skip link | cat.keyboard, best-practice | false |
| tabindex | Ensures tabindex attribute values are not greater than 0 | cat.keyboard, best-practice | true |
| table-duplicate-name | Ensure that tables do not have the same summary and caption | cat.tables, best-practice | true |
| table-fake-caption | Ensure that tables with a caption use the &lt;caption&gt; element. | cat.tables, experimental, wcag2a, wcag131, section508, section508.22.g | true |
| td-has-header | Ensure that each non-empty data cell in a large table has one or more table headers | cat.tables, experimental, wcag2a, wcag131, section508, section508.22.g | true |
| td-headers-attr | Ensure that each cell in a table using the headers refers to another cell in that table | cat.tables, wcag2a, wcag131, section508, section508.22.g | true |
| th-has-data-cells | Ensure that each table header in a data table refers to data cells | cat.tables, wcag2a, wcag131, section508, section508.22.g | true |
| valid-lang | Ensures lang attributes have valid values | cat.language, wcag2aa, wcag312 | true |
| video-caption | Ensures &lt;video&gt; elements have captions | cat.text-alternatives, wcag2a, wcag122, wcag123, section508, section508.22.a | true |
| video-description | Ensures &lt;video&gt; elements have audio descriptions | cat.text-alternatives, wcag2aa, wcag125, section508, section508.22.b | true |