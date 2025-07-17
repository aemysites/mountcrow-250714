/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout block
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 4) return; // Expecting at least 4 columns per screenshots

  // 1st column: logo + social icons
  const logoBlock = columns[0];

  // 2nd column: 'Trends' list
  const trendsBlock = columns[1];
  // 3rd column: 'Inspire' list
  const inspireBlock = columns[2];
  // 4th column: 'Explore' list
  const exploreBlock = columns[3];

  // The header row as required
  const headerRow = ['Columns (columns9)'];
  // The columns row: each required block as a separate cell
  const columnsRow = [logoBlock, trendsBlock, inspireBlock, exploreBlock];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
