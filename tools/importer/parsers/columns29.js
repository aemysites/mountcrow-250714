/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single column with the block name
  const headerRow = ['Columns (columns29)'];
  // The next row should have as many columns as there are 'columns' (here, buttons)
  // In the future, this could be more than buttons, but for this HTML, all direct children are buttons
  const columns = Array.from(element.querySelectorAll(':scope > a'));
  // Each button should be its own cell/column in the second row
  const cells = [
    headerRow,
    columns
  ];
  // Create the table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
