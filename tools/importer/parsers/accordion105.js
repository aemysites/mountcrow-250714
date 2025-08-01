/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // The section container holds all the accordion sections
  const sectionContainer = accordion.querySelector('.wcm-io-parsys');
  if (!sectionContainer) return;
  const sections = sectionContainer.querySelectorAll(':scope > .frach-m-accordion__section');

  // Build the table rows
  const rows = [];
  // Header row, exactly as in the example
  rows.push(['Accordion (accordion105)']);

  // Iterate over ALL accordion sections and add a row for each
  sections.forEach(section => {
    // Title: .frach-m-accordion__toggle-label (inside label)
    const toggle = section.querySelector('.frach-m-accordion__toggle');
    let titleCell = '';
    if (toggle) {
      titleCell = toggle;
    }

    // Content: everything inside .frach-m-accordion__section-content
    const contentWrap = section.querySelector('.frach-m-accordion__section-content');
    let contentCell = '';
    if (contentWrap) {
      const children = Array.from(contentWrap.children);
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = contentWrap;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
