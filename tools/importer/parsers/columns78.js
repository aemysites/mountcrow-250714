/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find grid row holding columns
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const row = grid.querySelector('.frach-grid-row');
  if (!row) return;

  // 2. Get all immediate column wrappers
  const columnWrappers = Array.from(row.children);

  // 3. For each column, extract main display content
  const columns = columnWrappers.map((colWrapper) => {
    // Find the main content section/div in this column
    let mainContent = colWrapper.querySelector(':scope > section, :scope > div');
    if (!mainContent) mainContent = colWrapper;

    // Card block (image, headline, meta, all clickable)
    const card = mainContent.querySelector('.frach-m-card');
    if (card) {
      const cardLink = card.querySelector('a.frach-m-card__link');
      if (cardLink) {
        // Use the anchor as the cell content (with all children inside)
        return cardLink;
      }
      return card;
    }

    // Link box block (headline and links)
    const linkBox = mainContent.querySelector('.frach-m-link-box');
    if (linkBox) {
      // Use the main editorial div or the box itself
      const editorial = linkBox.querySelector('.frach-m-link-box__editorial');
      if (editorial) return editorial;
      return linkBox;
    }

    // Fallback: entire main content
    return mainContent;
  });

  // 4. Build block table with EXACT header row: one cell only
  const cells = [];
  cells.push(['Columns (columns78)']);
  cells.push(columns);

  // 5. Create the table and make sure the header row has a single cell only
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
