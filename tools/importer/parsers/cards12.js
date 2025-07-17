/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, as per block
  const headerRow = ['Cards (cards12)'];

  // Helper to extract card text (h3 + p), referencing existing elements
  function extractText(card) {
    // Prefer .utility-padding-all-2rem if present
    const pad = card.querySelector('.utility-padding-all-2rem');
    if (pad) return pad;
    // Fall back to h3 + p if present
    const frag = document.createDocumentFragment();
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3) frag.appendChild(h3);
    if (p) frag.appendChild(p);
    return frag.childNodes.length ? frag : '';
  }

  // Each card is a direct child div that contains an img
  const cards = Array.from(element.querySelectorAll(':scope > div')).filter(card => card.querySelector('img'));

  const rows = cards.map(card => {
    const img = card.querySelector('img');
    // Only reference the existing img element
    const textCell = extractText(card);
    return [img, textCell];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
