/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row is a single column
  const headerRow = ['Columns (columns5)'];

  // All immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The second row should have as many cells as columns
  const secondRow = columns;

  // Compose the block table: first row is single-cell header, second row is the columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
