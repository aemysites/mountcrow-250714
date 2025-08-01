/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <frach-m-accordion> inside the given element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // The header row for the table, exactly as specified
  const cells = [
    ['Accordion (accordion5)']
  ];

  // Each accordion section is in .wcm-io-parsys > .frach-m-accordion__section
  const sections = accordion.querySelectorAll('.wcm-io-parsys > .frach-m-accordion__section');
  sections.forEach(section => {
    // Get the title: .frach-m-accordion__toggle-label within .frach-m-accordion__toggle
    let title = '';
    const label = section.querySelector('label.frach-m-accordion__toggle');
    if (label) {
      const titleSpan = label.querySelector('.frach-m-accordion__toggle-label');
      title = titleSpan ? titleSpan.textContent.trim() : '';
    }
    // Get the content: .frach-m-accordion__section-content
    // Reference its child elements directly for resilience
    let contentCell = '';
    const contentDiv = section.querySelector('.frach-m-accordion__section-content');
    if (contentDiv) {
      // Place all direct children of contentDiv into an array (or single element if only one)
      const nodes = Array.from(contentDiv.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      if (nodes.length === 1) {
        contentCell = nodes[0];
      } else if (nodes.length > 1) {
        contentCell = nodes;
      } else {
        contentCell = '';
      }
    }
    cells.push([title, contentCell]);
  });

  // Use the helper to create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
