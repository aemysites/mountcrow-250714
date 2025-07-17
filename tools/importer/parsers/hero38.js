/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must match exactly
  const headerRow = ['Hero (hero38)'];

  // 2. Get columns from main grid children
  const mainGrid = element.querySelector(':scope > .w-layout-grid');
  let imageElement = null;
  let contentElement = null;

  if (mainGrid) {
    // Find the two main columns
    const cols = mainGrid.querySelectorAll(':scope > div');
    // Left: background image
    if (cols.length > 0) {
      // Find the first img in the left column
      const img = cols[0].querySelector('img');
      if (img) {
        imageElement = img;
      }
    }
    // Right: text content (heading, paragraph, button)
    if (cols.length > 1) {
      // The right column wraps all headline & CTA; use the grid inside if present
      const rightCol = cols[1];
      // Find grid wrapping h1, paragraph, button
      const gridInner = rightCol.querySelector('.w-layout-grid');
      if (gridInner) {
        contentElement = gridInner;
      } else {
        contentElement = rightCol;
      }
    }
  }

  // 3. Build rows as per block structure
  // 1st row: header
  // 2nd row: background image only (or empty cell)
  // 3rd row: all text/button content (or empty cell)
  const rows = [
    headerRow,
    [imageElement ? imageElement : ''],
    [contentElement ? contentElement : '']
  ];

  // 4. Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
