/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Accordion (accordion9)'];

  // Find all accordion rows in the provided element
  // Each .frach-m-accordion__section represents an accordion item
  const accordionSections = element.querySelectorAll('.frach-m-accordion__section');

  const rows = [headerRow];

  accordionSections.forEach((section) => {
    // Extract the title cell: use the original <span> element for formatting
    let titleCell = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      titleCell = label;
    }

    // Extract the content cell: reference the original .frach-m-accordion__section-content element
    let contentCell = '';
    const sectionContent = section.querySelector('.frach-m-accordion__section-content');
    if (sectionContent) {
      contentCell = sectionContent;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
