/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panels
  const tabPanels = Array.from(element.querySelectorAll('.frach-m-tabbed-content__panel'));
  const contentRows = [];

  tabPanels.forEach(panel => {
    const textMedia = panel.querySelector('.frach-m-text-media');
    let mediaCell = '';
    let textCell = '';
    if (textMedia) {
      const row = textMedia.querySelector('.frach-m-text-media__row');
      if (row) {
        const mediaCol = row.querySelector('.frach-m-text-media__media');
        if (mediaCol) {
          mediaCell = Array.from(mediaCol.childNodes).filter(n =>
            n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '')
          );
          if (mediaCell.length === 1) mediaCell = mediaCell[0];
        }
        const textCol = row.querySelector('.frach-m-text-media__text');
        if (textCol) {
          const textChildren = Array.from(textCol.childNodes).filter(n =>
            n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '')
          );
          textCell = textChildren.length === 1 ? textChildren[0] : textChildren;
        }
      }
    }
    contentRows.push([mediaCell, textCell]);
  });

  // Determine the number of columns (should be 2 for this layout)
  const numCols = contentRows.reduce((max, row) => Math.max(max, row.length), 0);

  // Header row: block name in first col, others are empty
  const headerRow = ['Columns (columns109)'];
  while (headerRow.length < numCols) headerRow.push('');

  // Compose the table
  const cells = [headerRow, ...contentRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
