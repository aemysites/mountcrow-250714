/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the cards
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;

  // Find all card columns inside the grid row
  const cardCols = grid.querySelectorAll(':scope > .frach-grid-row > .frach-grid-col-mq1-12, :scope > .frach-grid-row > .frach-grid-col-mq4-6');
  const cards = [];

  cardCols.forEach((col) => {
    const entrySection = col.querySelector('section.entry');
    if (!entrySection) return;
    const box = entrySection.querySelector('.frach-m-link-box');
    if (!box) return;
    const editorial = box.querySelector('.frach-m-link-box__editorial');
    if (!editorial) return;

    // First cell: No image in the original cards, so keep empty string as per 'no images' variant
    const imageCell = '';
    // Second cell: gather all content preserving HTML structure
    const cellContent = [];
    // Heading
    const h6 = editorial.querySelector('h6');
    if (h6) cellContent.push(h6);
    // Date paragraph
    const dateP = editorial.querySelector('p');
    if (dateP) cellContent.push(dateP);
    // All details lists
    editorial.querySelectorAll('dl').forEach((dl) => cellContent.push(dl));
    // Call-to-action button (anchor only, without icon)
    const cta = box.querySelector('.frach-m-link-box__cta-button-container a');
    if (cta) {
      const icon = cta.querySelector('frach-e-icon');
      if (icon) icon.remove(); // Remove icon if present
      cellContent.push(cta);
    }
    cards.push([imageCell, cellContent]);
  });

  // Compose rows for the block table
  const rows = [
    ['Cards (cards24)'],
    ...cards,
  ];

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
