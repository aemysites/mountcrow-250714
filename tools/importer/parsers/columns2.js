/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .frach-grid inside the section
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;

  // Find the row (should contain the columns)
  const row = grid.querySelector('.frach-grid-row');
  if (!row) return;

  // Get all top-level columns (should be two for columns2)
  const columns = Array.from(row.children).filter(col => col.classList.contains('frach-grid-col-mq1-12'));
  if (columns.length !== 2) return;

  // LEFT COLUMN: Contains two frach-m-text sections (each: text + buttons)
  const leftGrid = columns[0].querySelector('.aem-Grid');
  const leftSections = leftGrid ? leftGrid.querySelectorAll(':scope > section') : [];
  const leftContentFragment = document.createElement('div');
  leftSections.forEach(section => {
    // Add text content
    const rteWrapper = section.querySelector('.frach-m-text__rte-wrapper');
    if (rteWrapper) {
      [...rteWrapper.childNodes].forEach(node => {
        if (
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        ) {
          leftContentFragment.appendChild(node);
        }
      });
    }
    // Add button(s) if present
    const buttons = section.querySelector('.frach-m-text__buttons');
    if (buttons) {
      leftContentFragment.appendChild(buttons);
    }
  });
  // If nothing found, use empty div for left cell
  const leftCell = leftContentFragment.childNodes.length ? leftContentFragment : document.createElement('div');

  // RIGHT COLUMN: One frach-m-download-list section (header + list)
  const rightGrid = columns[1].querySelector('.aem-Grid');
  let rightContentFragment = document.createElement('div');
  if (rightGrid) {
    // Grab all content (eg. h6, .frach-m-download-list)
    rightGrid.childNodes.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        rightContentFragment.appendChild(child);
      }
    });
  }
  // If nothing found, use empty div for right cell
  const rightCell = rightContentFragment.childNodes.length ? rightContentFragment : document.createElement('div');

  const tableCells = [
    ['Columns (columns2)'],
    [leftCell, rightCell]
  ];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
