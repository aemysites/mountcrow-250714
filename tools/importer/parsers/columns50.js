/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid section
  const gridSection = element.querySelector('section.frach-h-component-margin');
  if (!gridSection) return;
  const grid = gridSection.querySelector('.frach-grid');
  if (!grid) return;
  const row = grid.querySelector('.frach-grid-row');
  if (!row) return;

  // Get both column containers - each is a .frach-grid-col-mq1-12 ...
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Left column: get the main text block
  let leftCol = columns[0];
  let textBlock = leftCol.querySelector('.cmp-text');
  if (!textBlock) {
    // fallback: get the first non-empty div or section
    textBlock = leftCol.querySelector('div,section');
  }

  // Right column: get the main image block (frach-m-image)
  let rightCol = columns[1];
  let imageBlock = rightCol.querySelector('frach-m-image');
  if (!imageBlock) {
    // fallback: get the first non-empty div or section
    imageBlock = rightCol.querySelector('div,section');
  }

  // Prepare header row as in the example (no hardcoded markdown)
  const header = ['Columns (columns50)'];
  // Second row with two columns: [text, image]
  const row1 = [textBlock, imageBlock];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    header,
    row1
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
