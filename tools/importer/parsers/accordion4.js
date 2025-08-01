/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion wrapper (frach-m-accordion)
  const accordion = element.querySelector('.frach-m-accordion');
  if (!accordion) return;

  // Get all accordion sections
  const sections = accordion.querySelectorAll('.frach-m-accordion__section');
  const rows = [];
  // Header row: exactly one column, as required
  rows.push(['Accordion (accordion4)']);

  // For each section, extract title and content into two columns
  sections.forEach(section => {
    // Title cell: The span inside label with class frach-m-accordion__toggle-label
    let titleElem = section.querySelector('label.frach-m-accordion__toggle .frach-m-accordion__toggle-label');
    if (!titleElem) {
      // fallback: just take label text
      const label = section.querySelector('label.frach-m-accordion__toggle');
      if (label) {
        titleElem = label;
      }
    }
    let titleCell = '';
    if (titleElem) {
      titleCell = titleElem;
    }
    // Content cell: The immediate children of div.frach-m-accordion__section-content
    const contentDiv = section.querySelector('.frach-m-accordion__section-content');
    let contentCell = '';
    if (contentDiv) {
      // Use actual content nodes, not clones
      const childNodes = Array.from(contentDiv.childNodes).filter(n => !(n.nodeType === 3 && !n.textContent.trim()));
      if (childNodes.length === 1) {
        contentCell = childNodes[0];
      } else if (childNodes.length > 1) {
        contentCell = childNodes;
      } else {
        contentCell = '';
      }
    }
    rows.push([titleCell, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
