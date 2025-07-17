/* global WebImporter */
export default function parse(element, { document }) {
  // Block table header row
  const headerRow = ['Cards (cards24)'];

  // Extract all card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // First cell: image element
    let image = null;
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) image = img;
    }
    // Second cell: text content (tag/date row and heading)
    const cellContent = [];
    // Tag and date row (flex horizontal)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) cellContent.push(meta);
    // Heading (h3 or .h4-heading)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) cellContent.push(heading);
    return [image, cellContent];
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
