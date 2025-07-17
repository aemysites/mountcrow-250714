/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, get the image if present, or fallback to the column div itself
  const contentCells = columnDivs.map(colDiv => {
    const img = colDiv.querySelector('img');
    return img || colDiv;
  });
  // The header row must have the same number of columns as the content row
  // First cell is 'Columns (columns28)', rest are empty strings
  const headerRow = Array.from({length: contentCells.length}, (v, i) => i === 0 ? 'Columns (columns28)' : '');
  const rows = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
