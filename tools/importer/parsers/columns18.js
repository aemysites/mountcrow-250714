/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid (holds columns)
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;

  // The grid has a row with multiple column divs
  const row = grid.querySelector('.frach-grid-row');
  if (!row) return;

  // Get all column nodes (these represent the main columns in the block)
  const columns = Array.from(row.children).filter(col => col.nodeType === 1);
  if (!columns.length) return;

  // For each column, extract the relevant content by grabbing all non-empty child blocks
  const columnContents = columns.map(col => {
    // Try to find the .aem-Grid inside, if available
    const gridContainer = col.querySelector('.aem-Grid');
    let blocks = [];
    if (gridContainer) {
      // Usually, each gridContainer holds several sections or other blocks that should be together in the same cell
      blocks = Array.from(gridContainer.children).filter(
        el => el.nodeType === 1 && (
          el.tagName === 'SECTION' ||
          el.classList.contains('contactRef') ||
          el.classList.contains('frach-m-contact') ||
          el.classList.contains('experienceFragmentRef')
        )
      );
    } else {
      // Fallback: Use all children
      blocks = Array.from(col.children).filter(el => el.nodeType === 1);
    }
    // If only one block, return it directly; otherwise, wrap all in a div to preserve structure
    if (blocks.length === 1) {
      return blocks[0];
    } else if (blocks.length > 1) {
      const wrapper = document.createElement('div');
      blocks.forEach(b => wrapper.appendChild(b));
      return wrapper;
    } else {
      // fallback: return the column itself (may have direct content)
      return col;
    }
  });

  const cells = [
    ['Columns (columns18)'],
    columnContents
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
