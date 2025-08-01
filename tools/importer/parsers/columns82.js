/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Columns (columns82)'];

  // Find the main grid
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;

  const gridRow = grid.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get immediate columns (should be 2 for this block)
  const gridCols = gridRow.querySelectorAll(':scope > div');
  if (gridCols.length < 2) return;

  // LEFT COLUMN: Text content
  let leftCol = gridCols[0];
  // Usually there's a section > div > cmp-text, but grab the main section for resilience
  let leftSection = leftCol.querySelector('section');
  let leftContent;
  if (leftSection) {
    // Only include the .cmp-text (which contains heading and paragraphs)
    let textWrapper = leftSection.querySelector('.cmp-text');
    leftContent = textWrapper || leftSection;
  } else {
    leftContent = leftCol;
  }

  // RIGHT COLUMN: Image content
  let rightCol = gridCols[1];
  let rightContent;
  // Look for frach-m-image (the main image block)
  let imageBlock = rightCol.querySelector('frach-m-image');
  if (imageBlock) {
    rightContent = imageBlock;
  } else {
    // fallback to whole column
    rightContent = rightCol;
  }

  // Compose table (one header row, one content row with two columns)
  const tableCells = [
    headerRow,
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
