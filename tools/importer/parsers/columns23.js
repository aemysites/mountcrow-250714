/* global WebImporter */
export default function parse(element, { document }) {
  // Get the pictogram key figures block
  const keyFigures = element.querySelector('.frach-m-pictogram-key-figures');
  if (!keyFigures) return;
  const itemsWrapper = keyFigures.querySelector('.frach-m-pictogram-key-figures__items');
  if (!itemsWrapper) return;

  // Find the grid row containing the columns
  const gridRow = itemsWrapper.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get all column items (may be less or more than 3, so handle generically)
  const columns = Array.from(gridRow.children).filter(child => child.classList.contains('frach-m-pictogram-key-figures__item'));
  if (!columns.length) return;

  // Build the cells array for the columns block
  // Fix: only a single cell for the header row
  const headerRow = ['Columns (columns23)'];
  const contentRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  
  // Replace the original element in the DOM
  element.replaceWith(table);
}
