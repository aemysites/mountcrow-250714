/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the exact header as in the example, as a single-column row
  const headerRow = ['Accordion (accordion68)'];
  const rows = [headerRow];

  // Find all accordion sections inside the element (handle multiple accordions)
  const accordionSections = element.querySelectorAll('.frach-m-accordion__section');

  accordionSections.forEach(section => {
    // Title: extract the label text or element (from .frach-m-accordion__toggle-label)
    let titleNode;
    const label = section.querySelector('label.frach-m-accordion__toggle');
    if (label) {
      const span = label.querySelector('.frach-m-accordion__toggle-label');
      titleNode = span ? span : label;
    } else {
      titleNode = document.createTextNode('');
    }

    // Content: the direct content block (everything inside .frach-m-accordion__section-content)
    let contentNode;
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      content.removeAttribute('aria-hidden'); // ensure not hidden
      contentNode = content;
    } else {
      contentNode = document.createTextNode('');
    }

    // Each row must have exactly two cells: [title, content]
    rows.push([titleNode, contentNode]);
  });

  // Only process if at least one accordion section found
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
