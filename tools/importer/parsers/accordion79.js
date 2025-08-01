/* global WebImporter */
export default function parse(element, { document }) {
  // Always create the header row as in the requirements
  const headerRow = ['Accordion (accordion79)'];
  const rows = [headerRow];
  
  // Find the accordion element inside the provided block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Each accordion item is a .frach-m-accordion__section
  const sections = Array.from(accordion.querySelectorAll('.frach-m-accordion__section'));

  sections.forEach(section => {
    // Title cell: Use the original label span element reference
    let titleCell;
    const labelSpan = section.querySelector('.frach-m-accordion__toggle-label');
    if (labelSpan) {
      titleCell = labelSpan;
    } else {
      // fallback to label element text
      const label = section.querySelector('label');
      titleCell = label ? label : '';
    }

    // Content cell: Use the content container as a reference
    let contentCell;
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      contentCell = content;
    } else {
      contentCell = '';
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
