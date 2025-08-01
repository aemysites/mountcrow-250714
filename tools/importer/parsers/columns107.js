/* global WebImporter */
export default function parse(element, { document }) {
  // Find the key figures component
  const keyFigures = element.querySelector('frach-m-key-figures');
  if (!keyFigures) return;
  // Find grid row that contains the columns
  const grid = keyFigures.querySelector('.frach-grid');
  if (!grid) return;
  const gridRow = grid.querySelector('.frach-grid-row');
  if (!gridRow) return;
  // Get all immediate child divs (columns)
  const cols = Array.from(gridRow.querySelectorAll(':scope > div'));
  // Defensive: if no columns, stop
  if (cols.length === 0) return;
  // Build header (always single cell)
  const headerRow = ['Columns (columns107)'];
  // Build content row with as many columns as exist
  const contentRow = cols;
  // Build cells array
  const cells = [headerRow, contentRow];
  // Create and replace with table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
