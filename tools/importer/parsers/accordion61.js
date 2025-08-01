/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion component (should be only one per element)
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Prepare the table header row exactly as in the example
  const rows = [['Accordion (accordion61)']];

  // Find all accordion sections (each one is a row)
  const sections = accordion.querySelectorAll('.frach-m-accordion__section');
  sections.forEach((section) => {
    // Title: find label with class frach-m-accordion__toggle and its .frach-m-accordion__toggle-label span
    let titleEl = section.querySelector('label.frach-m-accordion__toggle .frach-m-accordion__toggle-label');
    if (!titleEl) {
      // fallback if no span, use the label itself
      titleEl = section.querySelector('label.frach-m-accordion__toggle');
    }
    // Defensive check: if even label is missing, skip this section
    if (!titleEl) return;

    // Content: find the section content
    let contentEl = section.querySelector('.frach-m-accordion__section-content');
    if (!contentEl) return;

    // Reference the actual element as required, do not clone
    rows.push([
      titleEl,
      contentEl
    ]);
  });

  // Create the block table using the helper
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
