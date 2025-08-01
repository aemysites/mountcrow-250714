/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Hero (hero81)'];

  // Background row (no image found in provided HTML, leave blank)
  const backgroundRow = [''];

  // Content row: collect highlight (optional), main copy (heading), and CTA (button)
  const contentParts = [];

  // 1. Highlight box (callout bar)
  const highlight = element.querySelector('.frach-e-highlight-box');
  if (highlight) {
    contentParts.push(highlight);
  }

  // 2. Main text copy (headline/subheading)
  const copy = element.querySelector('.frach-m-text-media__copy');
  if (copy) {
    contentParts.push(copy);
  }

  // 3. Button (CTA)
  const buttons = element.querySelector('.frach-m-text__buttons');
  if (buttons) {
    contentParts.push(buttons);
  }

  // assemble the block table
  const cells = [
    headerRow,
    backgroundRow,
    [contentParts]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}