/* global WebImporter */
export default function parse(element, { document }) {
  // Find the multi-column grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect columns: only immediate children of grid
  const columns = Array.from(grid.children);

  // The example is a 2-column layout: image | text block
  // Try to match this flexible, but only use as many columns as found
  // For each column, if it's a wrapper (like a div), use the div itself; if it's an image, use the image
  const cells = [
    ['Columns (columns31)'],
    columns.map(col => col)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
