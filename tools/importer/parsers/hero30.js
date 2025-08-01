/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the block spec
  const headerRow = ['Hero (hero30)'];

  // There is no background image in the provided HTML, so leave this cell empty
  const backgroundRow = [''];

  // The main content is the highlight box (blue), which contains the text
  // Use the actual highlight box element from the DOM if it exists
  let contentCell = '';
  const highlightBox = element.querySelector('.frach-e-highlight-box');
  if (highlightBox) {
    contentCell = highlightBox;
  }
  const contentRow = [contentCell];

  // Assemble block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);

  // Replace the provided element with the Hero table block
  element.replaceWith(table);
}