/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the frach-grid row container
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const row = grid.querySelector('.frach-grid-row');
  if (!row) return;

  // Find the immediate grid columns
  const columns = Array.from(row.children).filter((col) => (
    col.classList && col.classList.contains('frach-grid-col-mq1-12')
  ));
  
  // For each column, try to find the main section block (section.frach-m-text)
  const columnContents = columns.map((col) => {
    // The section is nested under .aem-Grid in each column
    const gridInner = col.querySelector('.aem-Grid');
    if (gridInner) {
      const section = gridInner.querySelector('section.frach-m-text');
      if (section) return section;
    }
    // fallback: return the whole column if not matched
    return col;
  });

  // Header row must match the block name exactly
  const cells = [
    ['Columns (columns93)'],
    columnContents
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
