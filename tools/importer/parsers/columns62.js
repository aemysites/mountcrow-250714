/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .frach-grid inside section
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const gridRow = grid.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Select all direct children columns (.frach-grid-col-mq1-12), preserve order
  const columns = Array.from(gridRow.children).filter(col => col.classList.contains('frach-grid-col-mq1-12'));

  // For each column, extract direct content (if any) in a way that matches the original intent of side-by-side columns
  const columnContent = columns.map(col => {
    // Find the .aem-Grid child if present
    let contentRoot = col;
    const aemGrid = Array.from(col.children).find(child => child.classList && child.classList.contains('aem-Grid'));
    if (aemGrid) contentRoot = aemGrid;
    // Gather all visible children as content nodes (including text, images, etc.)
    const contentNodes = Array.from(contentRoot.children).filter((child) => {
      if (child.nodeType === 1) {
        // If it has text or any child elements (eg. images, links), include it
        if (child.textContent.trim() || child.querySelector('*')) return true;
      }
      return false;
    });
    if (contentNodes.length === 0) {
      // Return empty string for visually empty columns
      return '';
    }
    if (contentNodes.length === 1) {
      return contentNodes[0];
    }
    // Multiple nodes: wrap in a div, to keep grouping as a single cell
    const wrapper = document.createElement('div');
    contentNodes.forEach(node => wrapper.appendChild(node));
    return wrapper;
  });

  // The header row is always a single column
  const headerRow = ['Columns (columns62)'];
  // The content row has as many columns as in the original layout
  const contentRow = columnContent;
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
