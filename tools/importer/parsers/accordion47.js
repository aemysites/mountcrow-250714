/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion sections in the container
  const accordionSections = Array.from(
    element.querySelectorAll('.frach-m-accordion__section')
  );

  // Prepare the rows for the table
  const rows = [];
  // Accordion header row, must match exactly
  rows.push(['Accordion (accordion47)']);

  // For each accordion item, extract the title and content
  accordionSections.forEach((section) => {
    // Title cell: find the label > span that holds the title
    let titleCell;
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      // Use a <p> for the title as in the visual example
      const titleP = document.createElement('p');
      titleP.textContent = label.textContent.trim();
      titleCell = titleP;
    } else {
      // fallback to blank if not found
      titleCell = '';
    }
    // Content cell: get the immediate accordion content container (it may contain further markup)
    let contentCell;
    const contentDiv = section.querySelector('.frach-m-accordion__section-content');
    if (contentDiv) {
      // Use the content container directly (reference the existing element)
      contentCell = contentDiv;
    } else {
      contentCell = '';
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
