/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell
  const headerRow = ['Columns (columns19)'];

  // Find the .frach-grid-row containing the columns
  const gridRow = element.querySelector('.frach-grid-row');
  if (!gridRow) return;

  // Get all direct column children
  const columns = Array.from(gridRow.children).filter(col => col.classList.contains('frach-grid-col-mq1-12'));

  // For each column, collect ALL content from all frach-m-text-media blocks (headline and text)
  const columnContents = columns.map(col => {
    // Find all text-media blocks inside this column
    const medias = col.querySelectorAll('frach-m-text-media');
    const colContent = [];
    medias.forEach(media => {
      // Get the headline (h3)
      const headline = media.querySelector('h3, .frach-m-text-media__headline');
      if (headline) colContent.push(headline);
      // Get the main text content (rich text)
      const textWrappers = media.querySelectorAll('.frach-m-text__rte-wrapper');
      textWrappers.forEach(textWrapper => {
        // Append all children (paragraphs, etc) to maintain semantic structure
        Array.from(textWrapper.children).forEach(child => {
          colContent.push(child);
        });
      });
    });
    // If nothing found, fallback to empty string
    return colContent.length ? colContent : '';
  });

  // The second row is a single array containing one cell per column
  const dataRow = columnContents;

  // Compose the table: header row (single cell), then one row with N columns
  const cells = [
    headerRow,
    dataRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
