/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid wrapper
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const row = grid.querySelector('.frach-grid-row');
  if (!row) return;

  // Find both columns
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;
  const leftCol = cols[0];
  const rightCol = cols[1];

  // LEFT COLUMN: all text sections in order (including buttons)
  const leftColGrid = leftCol.querySelector('.aem-Grid');
  const leftContent = [];
  if (leftColGrid) {
    const sections = leftColGrid.querySelectorAll(':scope > section.frach-m-text');
    sections.forEach(section => {
      // Text content
      const rteWrapper = section.querySelector('.frach-m-text__rte-wrapper');
      if (rteWrapper && rteWrapper.children.length > 0) {
        for (const child of rteWrapper.children) {
          leftContent.push(child);
        }
      }
      // Button content, if any
      const btns = section.querySelector('.frach-m-text__buttons');
      if (btns && btns.children.length > 0) {
        // Push each button separately so they remain as elements
        for (const btn of btns.children) {
          leftContent.push(btn);
        }
      }
    });
  }

  // RIGHT COLUMN: download list (whole .frach-m-download-list)
  let rightContent = null;
  const rightColGrid = rightCol.querySelector('.aem-Grid');
  if (rightColGrid) {
    const sections = rightColGrid.querySelectorAll(':scope > section');
    for (const section of sections) {
      const downloadList = section.querySelector('.frach-m-download-list');
      if (downloadList) {
        rightContent = downloadList;
        break;
      }
    }
  }

  // Prepare table structure: header row, then one row with two columns
  const cells = [
    ['Columns (columns65)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
