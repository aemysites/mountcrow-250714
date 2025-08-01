/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the grid container exists
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;

  // Find all top-level column containers
  const cols = Array.from(grid.querySelectorAll('.frach-grid-row > .frach-grid-col-mq3-6'));
  if (cols.length !== 2) return; // Expect exactly 2 columns for this block

  // Helper: For each column, collect all content (preserving order)
  function getColContent(col) {
    const items = [];
    // Only look for top-level sections within the column (to preserve structure & robustness)
    const sections = col.querySelectorAll(':scope > .aem-Grid > section');
    sections.forEach((sec) => {
      // Only add if section contains visible content (i.e., not empty)
      if (sec.textContent.trim() || sec.querySelector('img, frach-e-lazy-image')) {
        items.push(sec);
      }
    });
    // If only one main content item, return it directly
    if (items.length === 1) return items[0];
    // Otherwise, return all found items in order
    return items;
  }

  const firstColContent = getColContent(cols[0]);
  const secondColContent = getColContent(cols[1]);

  // Compose the block table as in the example
  const cells = [
    ['Columns (columns53)'],
    [firstColContent, secondColContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
