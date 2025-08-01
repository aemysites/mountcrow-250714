/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;
  // Find all immediate accordion section wrappers
  const accordionSections = accordion.querySelectorAll('.frach-m-accordion__section');
  const rows = [];
  // Header row
  rows.push(['Accordion (accordion37)']);

  accordionSections.forEach((section) => {
    // Title cell
    let titleContent = '';
    const label = section.querySelector('label.frach-m-accordion__toggle');
    if (label) {
      const labelSpan = label.querySelector('.frach-m-accordion__toggle-label');
      // Reference the span if available, fallback to label
      if (labelSpan) {
        titleContent = labelSpan;
      } else {
        titleContent = label;
      }
    }
    // Content cell
    let contentCell = '';
    const contentDiv = section.querySelector('.frach-m-accordion__section-content');
    if (contentDiv) {
      // See if there are multiple content blocks in contentDiv
      const contentBlocks = Array.from(contentDiv.children).filter(el =>
        el.nodeType === 1 // Only element nodes
      );
      if (contentBlocks.length === 1) {
        contentCell = contentBlocks[0];
      } else if (contentBlocks.length > 1) {
        contentCell = contentBlocks;
      } else {
        contentCell = '';
      }
    }
    rows.push([titleContent, contentCell]);
  });

  // Create the accordion block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
