/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify children by tag/roles
  const mainContentDiv = gridChildren.find(child => child.querySelector('h2') && child.querySelector('h3'));
  const contactList = gridChildren.find(child => child.tagName === 'UL');
  const mainImage = gridChildren.find(child => child.tagName === 'IMG');

  // Left column: all content except image (main text and contact list)
  const leftCol = [];
  if (mainContentDiv) leftCol.push(mainContentDiv);
  if (contactList) leftCol.push(contactList);

  // Right column: just the image (if present)
  const rightCol = [];
  if (mainImage) rightCol.push(mainImage);

  // Create the table rows
  const tableRows = [
    ['Columns (columns17)'],
    [leftCol, rightCol]
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
