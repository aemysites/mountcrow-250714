/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing the two columns
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const gridRow = grid.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get the immediate column divs
  const columns = gridRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: image (left)
  let col1Content = [];
  const col1 = columns[0];
  if (col1) {
    // Look for a frach-m-image or a frach-e-lazy-image inside
    const imageSection = col1.querySelector('frach-m-image, figure.frach-m-image__figure, frach-e-lazy-image');
    if (imageSection) {
      // If a frach-e-lazy-image, convert to img
      const lazyImg = imageSection.querySelector('frach-e-lazy-image') || (imageSection.tagName === 'FRACH-E-LAZY-IMAGE' ? imageSection : null);
      if (lazyImg) {
        const img = document.createElement('img');
        img.src = lazyImg.getAttribute('src');
        img.alt = lazyImg.getAttribute('alt') || '';
        col1Content.push(img);
      } else {
        // If it's a figure or frach-m-image, just include the whole section
        col1Content.push(imageSection);
      }
    } else {
      // If nothing found, just push all children as a fallback
      col1Content = Array.from(col1.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    }
  }

  // Second column: contact info and link (right)
  let col2Content = [];
  const col2 = columns[1];
  if (col2) {
    const mainGrid = col2.querySelector(':scope > .aem-Grid, :scope > section, :scope > div');
    if (mainGrid) {
      // Contact block
      const contactBlock = mainGrid.querySelector('.frach-m-contact');
      if (contactBlock) col2Content.push(contactBlock);
      // Text/Link section
      const textBlocks = mainGrid.querySelectorAll('.frach-m-text');
      textBlocks.forEach(tb => col2Content.push(tb));
    } else {
      // Fallback: push all children
      col2Content = Array.from(col2.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    }
  }

  // Compose the table rows
  const headerRow = ['Columns (columns99)'];
  const contentRow = [col1Content.length > 1 ? col1Content : col1Content[0], col2Content.length > 1 ? col2Content : col2Content[0]];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
