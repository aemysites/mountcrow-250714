/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row per block name
  const headerRow = ['Accordion (accordion27)'];
  const tableRows = [headerRow];

  // Each .divider is an accordion item
  const accordionItems = element.querySelectorAll(':scope > .divider');
  accordionItems.forEach((divider) => {
    // Get grid (direct child of divider)
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    // Get title (h4-heading)
    const title = grid.querySelector(':scope > .h4-heading');
    // Get content (rich-text)
    const content = grid.querySelector(':scope > .rich-text, :scope > .w-richtext');

    // For edge cases: if title or content missing, use empty string
    const titleCell = title ? title : '';
    const contentCell = content ? content : '';
    tableRows.push([titleCell, contentCell]);
  });

  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
