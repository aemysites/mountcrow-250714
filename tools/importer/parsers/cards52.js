/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all card columns
  function extractCards(root) {
    const cards = [];
    const grid = root.querySelector('.frach-grid');
    if (!grid) return cards;
    // Only immediate children, as each card is a .frach-grid-col-mq1-12
    const gridCols = grid.querySelectorAll(':scope > .frach-grid-row > .frach-grid-col-mq1-12');
    gridCols.forEach(col => {
      // Each col contains a nested .aem-Grid (the card content)
      const gridInner = col.querySelector(':scope > .aem-Grid');
      if (!gridInner) return;
      // Find the sections for image and text (expecting 2 per card)
      const sections = gridInner.querySelectorAll(':scope > section');
      let imageSection = null;
      let textSection = null;
      // Defensive: check for image and text section presence
      if (sections.length) {
        // Assume first section is image, second is text
        imageSection = sections[0];
        textSection = sections[1];
      }
      // Get image/content
      let imageEl = null;
      if (imageSection) {
        const fig = imageSection.querySelector('figure');
        if (fig) {
          // Find the actual image (could be frach-e-lazy-image or img)
          const img = fig.querySelector('frach-e-lazy-image, img');
          if (img) {
            imageEl = img;
          }
        }
      }
      // Get text content (prefer .cmp-text, which holds h6/a)
      let textEl = null;
      if (textSection) {
        // The .cmp-text (contains the h6/link)
        const cmpText = textSection.querySelector('.cmp-text');
        if (cmpText) {
          textEl = cmpText;
        }
      }
      // Defensive: Always supply two cells, even if empty
      cards.push([imageEl || '', textEl || '']);
    });
    return cards;
  }

  const tableRows = [['Cards (cards52)']];
  const cards = extractCards(element);
  // For each card: first cell is image, second is text
  cards.forEach(([image, text]) => {
    tableRows.push([image, text]);
  });
  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
