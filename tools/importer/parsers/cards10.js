/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row per requirements
  const headerRow = ['Cards (cards10)'];
  // Find all card links (immediate children anchor tags)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = cardLinks.map(card => {
    // 1. Extract the image (mandatory)
    // The image is inside a div.utility-aspect-3x2
    let imgCell = '';
    const imgWrap = card.querySelector(':scope > .utility-aspect-3x2');
    if (imgWrap) {
      const img = imgWrap.querySelector('img');
      if (img) imgCell = img;
    }
    // 2. Compose the text cell
    const textCellParts = [];
    // Tag (optional)
    const tagGroup = card.querySelector(':scope > .utility-padding-all-1rem > .tag-group');
    if (tagGroup && tagGroup.textContent.trim()) {
      textCellParts.push(tagGroup);
    }
    // Heading (optional)
    const heading = card.querySelector(':scope > .utility-padding-all-1rem > h3');
    if (heading) textCellParts.push(heading);
    // Description (optional)
    const desc = card.querySelector(':scope > .utility-padding-all-1rem > p');
    if (desc) textCellParts.push(desc);
    // 3. return the row [image, text]
    return [imgCell, textCellParts];
  });
  // Compose the table array
  const tableData = [headerRow, ...rows];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
