/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid row containing columns
  const gridRow = element.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Find all column containers
  const columns = Array.from(gridRow.querySelectorAll(':scope > div.frach-grid-col-mq1-12'));
  if (columns.length < 2) return;

  // Extract the main content block from each column
  function extractColumnContent(col) {
    const grid = col.querySelector(':scope > .aem-Grid');
    if (!grid) return col;
    const children = Array.from(grid.children);
    if (children.length === 1) return children[0];
    const wrapper = document.createElement('div');
    children.forEach(child => wrapper.appendChild(child));
    return wrapper;
  }

  // Map both columns' content
  const cellRow = columns.map(extractColumnContent);

  // Compose the table: first row is a single-cell header
  const header = ['Columns (columns1)'];
  const cells = [header, cellRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
