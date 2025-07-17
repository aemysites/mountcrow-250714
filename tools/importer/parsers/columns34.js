/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // In this HTML, the first grid child holds heading and subheading, the second is a button.
  // For maximum semantic clarity and grouping per the markdown example, group the heading and subheading together in the first column, and the button in the second column.
  
  // First cell: collect all headings and paragraphs from the first column child
  const col0 = grid.children[0];
  const col1 = grid.children[1];
  let col0Content = [];
  if (col0) {
    // Collect all block-level text (headings, paragraphs, lists)
    col0Content = Array.from(col0.children).filter(
      el => el.tagName.match(/^H[1-6]$/) || el.tagName === 'P' || el.tagName === 'UL' || el.tagName === 'OL' || el.tagName === 'DIV'
    );
    // If nothing found, fallback to the whole column
    if (col0Content.length === 0) col0Content = [col0];
  }
  let col1Content = [];
  if (col1) {
    // Usually a button or secondary content
    col1Content = [col1];
  }

  // The block name/header, as specified in the requirements
  const headerRow = ['Columns (columns34)'];
  // Each column's content is grouped appropriately
  const columnsRow = [col0Content, col1Content];

  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
