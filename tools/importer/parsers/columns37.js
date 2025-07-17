/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Block name as specified, in one cell only
  const headerRow = ['Columns (columns37)'];

  // Get all immediate child divs of the grid (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each cell in the content row should be the main image from that column (or the whole div if no image)
  const contentRow = columnDivs.map(col => {
    const img = col.querySelector('img');
    return img || col;
  });

  // Create the table: header is a single cell, the second row has one cell per column
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
