/* global WebImporter */
export default function parse(element, { document }) {
  // The block header as in the example — single cell
  const headerRow = ['Columns (columns63)'];

  // Find the key figures block
  const keyFigures = element.querySelector('frach-m-key-figures');
  if (!keyFigures) return;

  // Get the outer grid row containing the columns
  const gridRow = keyFigures.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get top-level columns (text and numbers container)
  const gridColumns = Array.from(gridRow.children);

  // First column: headline and description
  const firstCol = gridColumns[0];

  // Second and third columns: numbers (each is a staticNumber)
  let secondCol = null;
  let thirdCol = null;
  if (gridColumns[1]) {
    const numbersRow = gridColumns[1].querySelector('.frach-grid-row');
    if (numbersRow) {
      const numberColumns = Array.from(numbersRow.children);
      secondCol = numberColumns[0] || null;
      thirdCol = numberColumns[1] || null;
    }
  }

  // Build the content row with as many columns as present
  const contentRow = [firstCol, secondCol, thirdCol].filter(Boolean);
  if (contentRow.length === 0) return; // No content

  // Build the table: header row is single cell, then the true columned row
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
