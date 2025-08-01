/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns in the grid
  const columns = Array.from(element.querySelectorAll(':scope > .frach-grid > .frach-grid-row > .frach-grid-col-mq1-12'));

  // For each column, extract the main text content block
  const columnContents = columns.map(col => {
    // Find the innermost .cmp-text (primary content)
    const cmpText = col.querySelector('.cmp-text');
    // If not found, fallback to entire column
    return cmpText || col;
  });

  // The header row must have the same number of columns as the columns row
  // Only the first cell contains the header, the rest are empty
  const headerRow = ['Columns (columns77)', ...Array(columnContents.length - 1).fill('')];
  const tableRows = [headerRow, columnContents];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
