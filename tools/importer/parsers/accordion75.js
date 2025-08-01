/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by the block name in the markdown:
  const headerRow = ['Accordion (accordion75)'];

  // Find the accordion component
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // All sections (accordion items)
  const sectionBlocks = accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section');

  // Build output table rows
  const rows = [headerRow];
  sectionBlocks.forEach(section => {
    // Title: label > .frach-m-accordion__toggle-label (always single span)
    let titleEl = null;
    const label = section.querySelector('label.frach-m-accordion__toggle');
    if (label) {
      const labelSpan = label.querySelector('.frach-m-accordion__toggle-label');
      // Fallback to the label if span missing
      titleEl = labelSpan || label;
    } else {
      // Fallback: empty span
      titleEl = document.createElement('span');
      titleEl.textContent = '';
    }
    // Content: .frach-m-accordion__section-content (reference directly for resilience)
    let contentCell = null;
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      contentCell = content;
    } else {
      // fallback empty
      contentCell = document.createElement('div');
    }
    rows.push([titleEl, contentCell]);
  });

  // Create the table using the helper and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
