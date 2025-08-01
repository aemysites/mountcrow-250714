/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block name/variant
  const headerRow = ['Accordion (accordion97)'];

  // Find the main accordion wrapper
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;
  // Each section is a direct child of .wcm-io-parsys or inside it
  const sectionWrappers = accordion.querySelectorAll('.wcm-io-parsys.section');

  const rows = [headerRow];
  sectionWrappers.forEach((sectionWrapper) => {
    // Each .frach-m-accordion__section is the accordion item
    const item = sectionWrapper.querySelector('.frach-m-accordion__section');
    if (!item) return;
    // Title: in the label span with class .frach-m-accordion__toggle-label
    const label = item.querySelector('.frach-m-accordion__toggle-label');
    // Content: everything inside .frach-m-accordion__section-content
    const content = item.querySelector('.frach-m-accordion__section-content');
    let titleEl = null;
    if (label) {
      // Reference the existing label element (not clone), but move to a div for block compatibility
      const div = document.createElement('div');
      // Append all child nodes (preserving formatting, e.g. <strong>, <em>, links)
      label.childNodes.forEach((n) => {
        // Skip icons if present
        if (!(n.nodeType === 1 && n.tagName && n.tagName.startsWith('FRACH-E-ICON'))) {
          div.appendChild(n);
        }
      });
      // Fallback: if empty, use the text content
      if (!div.textContent.trim()) {
        div.textContent = label.textContent;
      }
      titleEl = div;
    } else {
      titleEl = document.createTextNode('');
    }
    // For content: find all direct children of .frach-m-accordion__section-content
    let contentBlock = null;
    if (content) {
      // Reference the actual section if present, not clone
      const bodySection = Array.from(content.children).find((c) => c.tagName === 'SECTION');
      if (bodySection) {
        contentBlock = bodySection;
      } else {
        // fallback: all child nodes wrapped in a div
        const div = document.createElement('div');
        content.childNodes.forEach((n) => div.appendChild(n));
        contentBlock = div;
      }
    } else {
      contentBlock = document.createTextNode('');
    }
    rows.push([titleEl, contentBlock]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
