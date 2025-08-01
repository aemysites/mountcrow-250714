/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row
  const cells = [['Accordion (accordion20)']];

  // Find the accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;
  // Find all accordion sections
  const sections = accordion.querySelectorAll('.frach-m-accordion__section');

  sections.forEach((section) => {
    // Title: get the span with the title, or fallback to the label
    let titleEl = section.querySelector('.frach-m-accordion__toggle-label');
    if (!titleEl) titleEl = section.querySelector('label');
    // Content: .frach-m-accordion__section-content
    const contentEl = section.querySelector('.frach-m-accordion__section-content');
    if (!titleEl || !contentEl) return; // Defensive: skip if missing
    cells.push([titleEl, contentEl]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
