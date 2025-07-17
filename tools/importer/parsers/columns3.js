/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate child divs (columns)
  const columns = Array.from(grid.children);
  // Defensive: if there are no columns, exit
  if (!columns.length) return;

  // For each column, extract its *direct* children (to keep structure + formatting)
  // Each cell should be an array of the column's elements (not strings)
  const columnCells = columns.map(col => {
    // Only keep element nodes (and significant text nodes)
    const nodes = Array.from(col.childNodes).filter(
      n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())
    );
    // If only one child, return that, else return array
    if (nodes.length === 1) return nodes[0];
    return nodes;
  });

  // The header exactly as prescribed by the block name
  const cells = [
    ['Columns (columns3)'],
    columnCells
  ];

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
