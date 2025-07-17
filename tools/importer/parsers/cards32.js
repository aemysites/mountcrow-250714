/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Cards (cards32)'];

  // Each card is a direct child <a> of the grid
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardLinks.map((card) => {
    // Image: always the first <img> in the card
    const img = card.querySelector('img');

    // Find the first inner <div> that contains the h3 (title)
    // This is the div that also contains the rest of the text content
    let textDiv = null;
    const divs = card.querySelectorAll(':scope > div');
    for (const div of divs) {
      if (div.querySelector('h3')) {
        textDiv = div;
        break;
      }
    }
    if (!textDiv && divs.length > 0) {
      textDiv = divs[divs.length - 1]; // fallback
    }

    // Compose content for the text cell
    const cellContent = [];

    // Optional: tag and read time (shown before heading)
    const tagArea = textDiv ? textDiv.querySelector('.flex-horizontal') : null;
    if (tagArea) {
      // Reference the tag area directly
      cellContent.push(tagArea);
    }

    // Title (h3)
    const h3 = textDiv ? textDiv.querySelector('h3') : null;
    if (h3) {
      cellContent.push(h3);
    }

    // Description (p)
    const p = textDiv ? textDiv.querySelector('p') : null;
    if (p) {
      cellContent.push(p);
    }

    // CTA: div with text 'Read' (case-insensitive), make it a link to card.href
    let ctaDiv = null;
    if (textDiv) {
      ctaDiv = Array.from(textDiv.querySelectorAll('div')).find(
        d => d.textContent && d.textContent.trim().toLowerCase() === 'read'
      );
    }
    if (ctaDiv) {
      // Use a new <a> for the CTA, as in the guideline
      const a = document.createElement('a');
      a.href = card.href;
      a.textContent = ctaDiv.textContent.trim();
      cellContent.push(a);
    }

    // Each row: [image, content cell]
    return [img, cellContent];
  });

  // Assemble final table array
  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
