/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section containing the two columns (flyer image and text block)
  const mainSection = element.querySelector('.frach-h-bg--grey.frach-h-component-padding');
  if (!mainSection) return;

  // Find the grid row containing both columns
  const gridRow = mainSection.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Extract the left and right column containers
  // The left column is typically col-mq3-4, the right is col-mq3-8
  const leftCol = gridRow.querySelector('.frach-grid-col-mq3-4');
  const rightCol = gridRow.querySelector('.frach-grid-col-mq3-8');

  let leftContent = null;
  if (leftCol) {
    // Look for the image block inside (frach-m-image)
    const imgBlock = leftCol.querySelector('.frach-m-image');
    if (imgBlock) leftContent = imgBlock;
    else leftContent = leftCol;
  }

  let rightContent = null;
  if (rightCol) {
    // Look for the right text media area
    const textMedia = rightCol.querySelector('.frach-m-text-media');
    if (textMedia) rightContent = textMedia;
    else rightContent = rightCol;
  }

  // Only build the block if both sides exist
  if (leftContent && rightContent) {
    const cells = [
      ['Columns (columns48)'],
      [leftContent, rightContent],
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    mainSection.replaceWith(block);
  }
}
