/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row with block name
  const headerRow = ['Columns (columns18)'];

  // Get all immediate children (should be the items to distribute into a grid)
  const items = Array.from(element.querySelectorAll(':scope > div'));

  // Define number of columns to match example (4)
  const numCols = 4;

  // Build rows: chunk items into groups of 'numCols'
  const rows = [];
  for (let i = 0; i < items.length; i += numCols) {
    const row = items.slice(i, i + numCols).map(item => {
      // Each 'item' is already a block with icon and text, reference it directly
      return item;
    });
    // If this is the last row and less than numCols, pad with empty strings
    while(row.length < numCols) row.push('');
    rows.push(row);
  }

  // Compose the table: header row (single cell), then each row as a set of columns
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
