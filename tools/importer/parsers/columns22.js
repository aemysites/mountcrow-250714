/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing all columns
  const gridRow = element.querySelector('.frach-grid > .frach-grid-row');
  if (!gridRow) return;

  // Get all top-level columns in the grid row
  const gridCols = Array.from(gridRow.querySelectorAll(':scope > .frach-grid-col-mq1-12'));
  if (!gridCols.length) return;

  // For each gridCol, extract the content
  const contentCells = gridCols.map(col => {
    // Try to find .aem-Grid, then all its direct section children
    const grid = col.querySelector('.aem-Grid, .aem-Grid--12, .aem-Grid--default--12');
    if (grid) {
      // There may be multiple sections for images, etc
      const sections = Array.from(grid.querySelectorAll(':scope > section'));
      if (sections.length === 1) {
        return sections[0];
      }
      if (sections.length > 1) {
        return sections;
      }
    }
    // If no .aem-Grid, fallback: return col's contents itself
    return col;
  });

  // Compose the table: header row is a single cell, then content row with as many columns as needed
  const cells = [
    ['Columns (columns22)'], // single cell header row
    contentCells            // content row with as many columns as needed
  ];

  // Create and replace with a structured table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
