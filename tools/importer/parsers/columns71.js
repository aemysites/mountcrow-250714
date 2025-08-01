/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main key figures component
  const keyFigures = element.querySelector('frach-m-key-figures');
  if (!keyFigures) return;

  // Find the main grid row inside the key figures component
  const mainGrid = keyFigures.querySelector('.frach-grid > .frach-grid-row');
  if (!mainGrid) return;

  // There should be two columns inside the grid row
  const colEls = Array.from(mainGrid.children);

  // Defensive fallback: ensure we always have two columns (add empty div if missing)
  while (colEls.length < 2) {
    const emptyDiv = document.createElement('div');
    colEls.push(emptyDiv);
  }

  // Build the block table
  const cells = [
    ['Columns (columns71)'],
    [colEls[0], colEls[1]]
  ];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
