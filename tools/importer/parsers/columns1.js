/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  let left = null, right = null;
  for (const child of children) {
    if (child.tagName === 'IMG') {
      left = child;
    } else {
      right = child;
    }
  }
  const rightCell = [];
  if (right) {
    const h1 = right.querySelector('h1');
    if (h1) rightCell.push(h1);
    const p = right.querySelector('p');
    if (p) rightCell.push(p);
    const buttonGroup = right.querySelector('.button-group');
    if (buttonGroup) rightCell.push(buttonGroup);
  }
  // Build the table ensuring the header row is a single cell, data row has two cells
  const cells = [
    ['Columns (columns1)'],
    [left, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
