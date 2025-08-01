/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.frach-grid');
  let columns = [];
  if (grid) {
    // Find all direct column containers in grid row
    const gridRow = grid.querySelector(':scope > .frach-grid-row');
    if (gridRow) {
      columns = Array.from(gridRow.querySelectorAll(':scope > .frach-grid-col-mq1-12'));
    }
  }
  // Fallback: if no columns found, just use direct children
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }

  // For each column, extract the main visible content
  const columnCells = columns.map(col => {
    // Each column contains a .aem-Grid > section > (frach-m-image|frach-m-text)
    // We want to reference the main content block for each
    let candidate = col;
    // Unwrap aem-Grid if present
    const aemGrid = candidate.querySelector(':scope > .aem-Grid');
    if (aemGrid) {
      candidate = aemGrid;
    }
    // Look for direct section
    const section = candidate.querySelector(':scope > section');
    if (section) {
      // For frach-m-text, we want the section (with heading, buttons), for frach-m-image, the section includes the image and caption
      return section;
    }
    // Otherwise, use whatever is inside
    // (should rarely happen, but fallback to first child)
    return candidate.firstElementChild || document.createTextNode('');
  });

  // Build the block table: header row is one cell, content row has N cells
  const headerRow = ['Columns (columns92)'];
  const tableData = [headerRow, columnCells];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
