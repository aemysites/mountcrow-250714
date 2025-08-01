/* global WebImporter */
export default function parse(element, { document }) {
  // Locate main block elements
  let textCol = null;
  let imageCol = null;

  // Try to find the text and image columns based on known structure
  const section = element.querySelector('section');
  if (section) {
    const textMedia = section.querySelector('.frach-m-text-media');
    if (textMedia) {
      const row = textMedia.querySelector('.frach-m-text-media__row');
      if (row) {
        // Look for all direct children of the row
        const children = Array.from(row.children);
        // Find text and image columns by class
        children.forEach((child) => {
          if (child.classList.contains('frach-m-text-media__text')) {
            textCol = child;
          }
          if (child.classList.contains('frach-m-text-media__media')) {
            imageCol = child;
          }
        });
      }
    }
  }

  // If not found, fallback: use first and second child of row if present
  if ((!textCol || !imageCol) && section) {
    const textMedia = section.querySelector('.frach-m-text-media');
    if (textMedia) {
      const row = textMedia.querySelector('.frach-m-text-media__row');
      if (row && row.children.length === 2) {
        imageCol = imageCol || row.children[0];
        textCol = textCol || row.children[1];
      }
    }
  }

  // Edge case: if one column is missing, ensure a cell is empty string
  const cells = [
    ['Columns (columns106)'],
    [textCol || '', imageCol || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
