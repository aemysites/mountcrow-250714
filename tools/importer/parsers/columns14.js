/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns/cells)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be a single cell array, per requirements
  const headerRow = ['Columns (columns14)'];
  // The next row must contain as many columns as found
  const contentRow = columns;

  // Compose the rows for the table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
