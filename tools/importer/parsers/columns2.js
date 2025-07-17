/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The grid has 3 direct children: left (main card), middle (2 stacked cards), right (list of headings/text)
  const children = Array.from(grid.children);

  // 1. Left column: the main feature card (the only direct <a> child)
  const leftCol = children.find((c) => c.matches('a.utility-link-content-block'));

  // 2. Middle column: the flex with images (contains <img> tags in children)
  const middleCol = children.find(
    (c) => c.matches('.flex-horizontal') && c.querySelector('img')
  );

  // 3. Right column: the flex with ONLY text links (no images, just headings and paragraphs)
  const rightCol = children.find(
    (c) => c.matches('.flex-horizontal') && !c.querySelector('img')
  );

  // Edge: If any columns are missing, just return
  if (!leftCol || !middleCol || !rightCol) return;

  // Structure as table
  // Header row: single cell
  // Content row: three cells (the columns)
  const rows = [
    ['Columns (columns2)'],
    [leftCol, middleCol, rightCol]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
