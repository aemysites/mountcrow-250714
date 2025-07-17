/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid-layout container which has at least two direct children
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 2. Background image: look for the first <img> in the first grid child
  let backgroundImg = '';
  if (gridChildren.length > 0) {
    const bgImg = gridChildren[0].querySelector('img');
    if (bgImg) backgroundImg = bgImg;
  }

  // 3. Content cell: preserve all text and structure from the main text/image content column
  // The second grid child usually contains a .container with the actual content block
  let contentCell = '';
  if (gridChildren.length > 1) {
    // Grab the first .container or just the direct element
    const container = gridChildren[1].querySelector('.container') || gridChildren[1];
    // Use the whole container so all heading, list, icons and buttons are preserved
    contentCell = container;
  }

  // 4. Assemble table rows (one column, three rows)
  const rows = [
    ['Hero (hero6)'],
    [backgroundImg || ''],
    [contentCell || ''],
  ];

  // 5. Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
