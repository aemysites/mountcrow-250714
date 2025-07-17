/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero7)'];

  // Find the background image from the grid layout's first column
  let bgImg = null;
  const gridLayout = element.querySelector('.w-layout-grid');
  if (gridLayout) {
    // Select all immediate child divs (columns)
    const gridCols = gridLayout.querySelectorAll(':scope > div');
    if (gridCols.length) {
      // Look for an <img> with class 'cover-image' in the first col
      const img = gridCols[0].querySelector('img.cover-image');
      if (img) bgImg = img;
    }
  }

  // Find the text/content card (contains h1, p, CTA buttons)
  let card = null;
  if (gridLayout && gridLayout.children.length > 1) {
    // The second column should contain the card
    const secondCol = gridLayout.children[1];
    // The card is nested inside some grids/divs
    card = secondCol.querySelector('.card');
  }

  // Compose table rows (always 1 col, 3 rows)
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [card ? card : '']
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
