/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid (columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be two: content & image)
  const gridCols = Array.from(grid.children);
  // Accept 2+ columns, but for this specific block, expect 2.
  if (gridCols.length < 2) return;

  // Reference existing elements directly (do not clone)
  // First column: rich content (author, heading, description, etc.)
  const leftCol = gridCols[0];
  // Second column: image or additional content
  const rightCol = gridCols[1];

  // Compose the columns row, referencing the actual nodes
  const columnsRow = [leftCol, rightCol];

  // Compose the cells array
  const cells = [
    ['Columns (columns26)'],
    columnsRow
  ];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}