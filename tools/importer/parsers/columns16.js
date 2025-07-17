/* global WebImporter */
export default function parse(element, { document }) {
  // Find the primary content grid with two columns (headline/eyebrow, content/meta/button)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // The first column: headline and eyebrow
  const firstColumn = mainGrid.children[0];
  // The second column: paragraph, author, button
  const secondColumn = mainGrid.children[1];

  // Build left cell (headline, eyebrow, paragraph, meta, read more)
  // Reference source elements directly (no cloning)
  const leftCellElements = [];
  // All children of first column (eyebrow, h1)
  Array.from(firstColumn.children).forEach(child => leftCellElements.push(child));
  // Add main descriptive paragraph
  const paragraph = secondColumn.querySelector('.rich-text');
  if (paragraph) leftCellElements.push(paragraph);
  // Add meta row (author / date)
  const metaGrid = secondColumn.querySelector('.grid-layout');
  if (metaGrid && metaGrid.children.length > 0) {
    // Only add the first row (author row)
    const metaRow = metaGrid.querySelector('div');
    if (metaRow) leftCellElements.push(metaRow);
  }
  // Add 'Read more' button
  const readMore = secondColumn.querySelector('a.button');
  if (readMore) leftCellElements.push(readMore);

  // Build right cell (two images in bottom grid)
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  const rightCellElements = [];
  if (imagesGrid) {
    const imgs = imagesGrid.querySelectorAll('img');
    imgs.forEach(img => rightCellElements.push(img));
  }

  // Table construction
  const headerRow = ['Columns (columns16)'];
  const row = [leftCellElements, rightCellElements];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}
