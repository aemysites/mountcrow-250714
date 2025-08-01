/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row with columns
  const gridRow = element.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get the direct column containers
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // LEFT COLUMN: Image block
  let leftCell = null;
  const leftSection = columns[0].querySelector('section');
  if (leftSection) {
    leftCell = leftSection;
  } else {
    leftCell = columns[0];
  }

  // RIGHT COLUMN: Quote/text block
  let rightCell = null;
  const rightSection = columns[1].querySelector('section');
  if (rightSection) {
    const textMedia = rightSection.querySelector('frach-m-text-media');
    if (textMedia) {
      rightCell = textMedia;
    } else {
      rightCell = rightSection;
    }
  } else {
    rightCell = columns[1];
  }

  // Correct table structure: single-cell header, then content row
  const cells = [
    ['Columns (columns64)'], // header row: single cell
    [leftCell, rightCell]    // content row: two cells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
