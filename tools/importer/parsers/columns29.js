/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get each direct column cell in the grid
  const columns = Array.from(grid.children);
  // Defensive: Always expect 4 children for this layout
  // Columns: [0]=Name, [1]=Tags, [2]=Heading, [3]=Rich Text
  // If less, fill with empty strings for robustness
  const col0 = columns[0] || document.createTextNode('');
  const col1 = columns[1] || document.createTextNode('');
  // For the main content (heading + rich text), combine them into a fragment
  let col2;
  if (columns[2] && columns[3]) {
    const frag = document.createDocumentFragment();
    frag.appendChild(columns[2]);
    frag.appendChild(columns[3]);
    col2 = frag;
  } else if (columns[2]) {
    col2 = columns[2];
  } else if (columns[3]) {
    col2 = columns[3];
  } else {
    col2 = document.createTextNode('');
  }
  // Build header row as required
  const headerRow = ['Columns (columns29)'];
  // Content row: one cell per column
  const contentRow = [col0, col1, col2];
  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
