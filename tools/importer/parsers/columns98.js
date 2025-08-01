/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link from an iframe's src (for non-img src)
  function createLinkFromIframe(iframe) {
    if (!iframe) return null;
    const href = iframe.getAttribute('src');
    if (!href) return null;
    const a = document.createElement('a');
    a.href = href;
    a.textContent = iframe.getAttribute('title') || 'Video';
    return a;
  }

  // Find the grid row that contains the columns
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const gridRow = grid.querySelector('.frach-grid-row');
  if (!gridRow) return;
  // Get direct column children (2 columns expected)
  const gridCols = Array.from(gridRow.children).filter(div => div.classList.contains('frach-grid-col-mq1-12'));
  if (gridCols.length < 2) return;

  // LEFT COLUMN: All content blocks (2 sections)
  const leftCol = gridCols[0];
  // Get all direct sections (so we can preserve all heading, text, and button content)
  const leftSections = Array.from(leftCol.querySelectorAll(':scope > .aem-Grid > section'));
  // Wrap all left content in a fragment div (so we reference original elements)
  const leftColContent = document.createElement('div');
  leftSections.forEach(sec => {
    leftColContent.appendChild(sec);
  });

  // RIGHT COLUMN: Find iframe and convert it to a link
  const rightCol = gridCols[1];
  // We want the first iframe in the right column's grid (if present)
  const iframe = rightCol.querySelector('iframe');
  let rightCellContent = '';
  if (iframe) {
    const link = createLinkFromIframe(iframe);
    if (link) rightCellContent = link;
  }

  // Build the block table
  const headerRow = ['Columns (columns98)'];
  const contentRow = [leftColContent, rightCellContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
