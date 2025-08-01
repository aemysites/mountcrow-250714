/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid row containing the columns
  const gridRow = element.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get the immediate children that are columns
  const columns = Array.from(gridRow.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Get everything under .frach-m-text-media__text and .frach-m-text__buttons
  let leftCellContent = [];
  {
    const textMedia = columns[0].querySelector('.frach-m-text-media');
    if (textMedia) {
      const textArea = textMedia.querySelector('.frach-m-text-media__text');
      if (textArea) {
        Array.from(textArea.children).forEach(child => {
          leftCellContent.push(child);
        });
      }
      const buttonsArea = textMedia.querySelector('.frach-m-text__buttons');
      if (buttonsArea) {
        Array.from(buttonsArea.children).forEach(child => {
          leftCellContent.push(child);
        });
      }
    } else {
      leftCellContent = [columns[0]];
    }
  }

  // RIGHT COLUMN: Get the image
  let rightCellContent = [];
  {
    let imgParent = columns[1];
    let frachImage = imgParent.querySelector('.frach-m-image');
    if (frachImage) {
      rightCellContent = [frachImage];
    } else {
      rightCellContent = [imgParent];
    }
  }

  // The header row must be a single cell, matching the example
  const headerRow = ['Columns (columns95)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the table using DOMUtils
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // The table's first row must have a single <th> with colspan spanning the number of columns (contentRow.length)
  // Patch the header row to set colspan if needed
  const firstRow = table.querySelector('tr');
  if (firstRow && contentRow.length > 1) {
    const th = firstRow.querySelector('th');
    if (th) {
      th.setAttribute('colspan', contentRow.length);
    }
    // Remove any extra th/td in the header row (in case DOMUtils created extra)
    while (th.nextSibling) {
      firstRow.removeChild(th.nextSibling);
    }
  }

  element.replaceWith(table);
}
