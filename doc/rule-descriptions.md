<table>
<thead><tr><th scope="col">Rule ID</th><th scope="col">Description</th><th scope="col">Tags</th></tr></thead>
<tbody><tr><td>accesskeys</td><td>Ensures that each element on the page with an accesskey attribute has a unique value</td><td>wcag2a, wcag211</td></tr>
<tr><td>area-alt</td><td>Checks the &lt;area&gt; elements of image maps to ensure that they have an alternative text</td><td>wcag2a, wcag111, section508, section508a</td></tr>
<tr><td>aria-allowed-attr</td><td>Checks all attributes that start with &#39;aria-&#39; to ensure that they are all official WAI-ARIA attributes</td><td>wcag2a, wcag411</td></tr>
<tr><td>aria-required-attr</td><td>Checks all elements that contain WAI-ARIA roles to ensure that all required aria- attributes are present</td><td>wcag2a, wcag411</td></tr>
<tr><td>aria-required-children</td><td>Checks all elements that contain a WAI-ARIA role to ensure that all required children roles are present</td><td>wcag2a, wcag411</td></tr>
<tr><td>aria-required-parent</td><td>Checks all elements that contain a WAI-ARIA role to ensure that all required parent roles are present</td><td>wcag2a, wcag411</td></tr>
<tr><td>aria-roles</td><td>Checks all elements that contain the WAI-ARIA role attribute to ensure that the role value is valid</td><td>wcag2a, wcag411</td></tr>
<tr><td>aria-valid-attr-value</td><td>Checks all elements that contain WAI-ARIA atributes to ensure that the values of the attributes are valid</td><td>wcag2a, wcag411</td></tr>
<tr><td>aria-valid-attr</td><td>Checks all elements that contain WAI-ARIA attributes to ensure that the attributes are valid attributes</td><td>wcag2a, wcag411</td></tr>
<tr><td>audio-caption</td><td>Checks the use of all &lt;audio&gt; element to ensure that the element contains a &lt;caption&gt; element</td><td>wcag2a, wcag122, section508, section508a</td></tr>
<tr><td>blink</td><td>Checks to make sure that the &lt;blink&gt; tag is never used</td><td>wcag2a, wcag411</td></tr>
<tr><td>button-name</td><td>Checks all &lt;button&gt; elements to ensure that they have a discernable accessible name</td><td>wcag2a, wcag111, section508, section508a</td></tr>
<tr><td>bypass</td><td>Ensures that each page has at least one mechanism for a keyboard-only user to bypass the navigation and jump straight to the content</td><td>wcag2a, wcag241, section508, section508o</td></tr>
<tr><td>checkboxgroup</td><td>Ensures that all checkbox groups have a group and that that group designation is consistent</td><td>wcag2a, wcag131</td></tr>
<tr><td>color-contrast</td><td>Checks all elements to ensure that the contrast between the foreground and the background meets the WCAG 2 AA contrast ratio thresholds.</td><td>wcag2aa, wcag143</td></tr>
<tr><td>data-table</td><td>Checks that data tables are marked up semantically and have the correct header structure</td><td>wcag2a, wcag131</td></tr>
<tr><td>definition-list</td><td>Ensures that all &lt;dl&gt; elements are structured correctly</td><td>wcag2a, wcag131</td></tr>
<tr><td>dlitem</td><td>Ensures that all &lt;dd&gt; and &lt;dt&gt; elements have a &lt;dl&gt; as a parent</td><td>wcag2a, wcag131</td></tr>
<tr><td>document-title</td><td>Ensures that each HTML document contains a title</td><td>wcag2a, wcag242</td></tr>
<tr><td>duplicate-id</td><td>Ensures that each element on the page with an ID attribute has a unique ID attribute value</td><td>wcag2a, wcag411</td></tr>
<tr><td>empty-heading</td><td>Ensures that headings on the page do not contain empty text</td><td>wcag2a, wcag131</td></tr>
<tr><td>frame-title</td><td>Ensure that all iframe and frame elements contain a unique and non-empty title attribute</td><td>wcag2a, wcag241</td></tr>
<tr><td>heading-order</td><td>Ensure that the order in which the headings appear in the DOM is semantically correct</td><td>best-practice</td></tr>
<tr><td>html-lang</td><td>Ensures that every HTML document has a lang attribute and that it contains a valid value</td><td>wcag2a, wcag311</td></tr>
<tr><td>image-alt</td><td>Ensures that every &lt;img&gt; element has alternative text or is marked as presentational</td><td>wcag2a, wcag111, section508, section508a</td></tr>
<tr><td>input-image-alt</td><td>Ensures that every &lt;input&gt; that represents an image button has an accessible name</td><td>wcag2a, wcag111, section508, section508a</td></tr>
<tr><td>label-title-only</td><td>Ensures that every &lt;input&gt; that requires a label is not only labeled using the title attribute</td><td>best-practice</td></tr>
<tr><td>label</td><td>Ensures that every input element that requires a label, has an appropriate label</td><td>wcag2a, wcag332, wcag131, section508, section508n</td></tr>
<tr><td>layout-table</td><td>Ensures that &lt;table&gt; elements that are being used for layout do not contain markup only relevant for data tables</td><td>wcag2a, wcag131</td></tr>
<tr><td>link-name</td><td>Ensures that every link has an accessible name</td><td>wcag2a, wcag111, wcag412, section508, section508a</td></tr>
<tr><td>list</td><td>Ensures that lists are structured correctly</td><td>wcag2a, wcag131</td></tr>
<tr><td>listitem</td><td>Ensures that every list item is used semantically</td><td>wcag2a, wcag131</td></tr>
<tr><td>marquee</td><td>Ensures that the deprecated &lt;marquee&gt; tag is not used</td><td>wcag2a, wcag222, section508, section508j</td></tr>
<tr><td>meta-refresh</td><td>Ensures that &lt;meta&gt; refresh is not used</td><td>wcag2a, wcag2aaa, wcag221, wcag224, wcag325</td></tr>
<tr><td>meta-viewport</td><td>Ensures that when &lt;meta&gt; viewport is used, it does not cause text scaling problems</td><td>wcag2aa, wcag144</td></tr>
<tr><td>object-alt</td><td>Ensures that every &lt;object&gt; element has a text alternative</td><td>wcag2a, wcag111</td></tr>
<tr><td>radiogroup</td><td>Ensures that radio button groups are part of a group structure</td><td>wcag2a, wcag131</td></tr>
<tr><td>region</td><td>Ensures that all content on a page is contained within a landmark region</td><td>best-practice</td></tr>
<tr><td>scope</td><td>Ensures that the scope attribute is used correctly on tables</td><td>wcag2a, wcag411, wcag131</td></tr>
<tr><td>server-side-image-map</td><td>Ensures that server-side image maps are never used</td><td>wcag2a, wcag211, section508, section508f</td></tr>
<tr><td>skip-link</td><td>Ensures that the best practice of having a skip link as the very first link in a page, is adhered-to</td><td>best-practice</td></tr>
<tr><td>tabindex</td><td>Ensures that explicit tabindex attributes that are greater than 0 are never used</td><td>wcag2a, wcag243</td></tr>
<tr><td>valid-lang</td><td>Ensures that when the &#39;lang&#39; attribute is used, it has a valid value</td><td>wcag2aa, wcag312</td></tr>
<tr><td>video-caption</td><td>Ensures that the HTML5 &lt;video&gt; tag is captioned</td><td>wcag2a, wcag122, wcag123, section508, section508a</td></tr>
<tr><td>video-description</td><td>Ensures that every &lt;video&gt; tag has an audio description</td><td>wcag2aa, wcag125, section508, section508a</td></tr>
</tbody>
</table>
