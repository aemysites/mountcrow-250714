/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row
  const gridRow = element.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // The pattern for this block is: left column is the text container, right column is CTA buttons
  // Both may be empty, but we always need two columns

  // Get the left (text) column
  const textCol = gridRow.querySelector('.frach-m-cta__text-container');
  // Get the right (ctas) column
  const ctaCol = gridRow.querySelector('.frach-m-cta__cta-container');

  // For robustness, if not found, create empty div
  const leftContent = textCol ? textCol : document.createElement('div');
  const rightContent = ctaCol ? ctaCol : document.createElement('div');

  // The header row
  const headerRow = ['Columns (columns34)'];
  // The first (and only) content row: both columns as required by the example
  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
