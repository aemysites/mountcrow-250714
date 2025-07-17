/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block header as per the example
  const headerRow = ['Cards (cards8)'];

  // Each direct child div represents a card containing an image only (no text in these examples)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardDivs.forEach(cardDiv => {
    // First cell: image (should always exist in this structure)
    const img = cardDiv.querySelector('img');
    // Second cell: empty string (no text content provided in this example)
    rows.push([img, '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
