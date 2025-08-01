/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion header
  const cells = [['Accordion (accordion59)']];

  // The HTML provided contains only one accordion item.
  // However, if there were multiple .frach-m-accordion__section, they would all be included as rows.
  const sections = element.querySelectorAll('.frach-m-accordion__section');
  sections.forEach(section => {
    // Get the title text from the label span
    let titleText = '';
    const labelSpan = section.querySelector('.frach-m-accordion__toggle-label');
    if (labelSpan) {
      titleText = labelSpan.textContent.trim();
    }
    // Get the content area
    let contentCell = '';
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      contentCell = content;
    }
    // Add the row if there is any actual title or content
    if (titleText || contentCell) {
      cells.push([titleText, contentCell]);
    }
  });

  // Only create the table if there are more than just the header row (to avoid empty blocks)
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  } else {
    // If no accordion items were found, remove the element
    element.remove();
  }
}
