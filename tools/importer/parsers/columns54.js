/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: should have exactly one column
  const headerRow = ['Columns (columns54)'];

  // Find all items (columns)
  const items = Array.from(element.querySelectorAll(':scope > .frach-m-milestones__item'));

  // Each column: group all direct children of each item into a div (preserves marker and name)
  const columns = items.map(item => {
    const cell = document.createElement('div');
    Array.from(item.childNodes).forEach(child => {
      // Only append element and non-empty text nodes
      if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
        cell.appendChild(child);
      }
    });
    return cell;
  });

  // Build the table: header row (one cell), content row (N cells as columns)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}
