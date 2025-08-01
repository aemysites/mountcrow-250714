/* global WebImporter */
export default function parse(element, { document }) {
  // Get the container holding all the key figure numbers
  const keyFiguresBlock = element.querySelector('frach-m-key-figures');
  if (!keyFiguresBlock) return;

  // Get all immediate number stats elements
  const statElements = Array.from(keyFiguresBlock.querySelectorAll('.frach-m-key-figures__number'));
  if (!statElements.length) return;

  // We want a 2-column layout, as visually represented in the screenshot
  // We'll group the stats in pairs, filling left-to-right, top-to-bottom.
  const columns = 2;
  const rows = [];
  for (let i = 0; i < statElements.length; i += columns) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      if (statElements[i + j]) {
        row.push(statElements[i + j]);
      } else {
        row.push(''); // Fill with empty cell if last row incomplete
      }
    }
    rows.push(row);
  }

  // Header row: exactly one cell (single-column), matching example
  const headerRow = ['Columns (columns21)'];

  // Build the cells array: header is a single-cell row, then the 2-column rows
  const cells = [headerRow, ...rows];

  // Create the table using the utility
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}