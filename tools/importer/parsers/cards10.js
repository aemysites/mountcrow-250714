/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text for each card slot
  function extractCards(root) {
    const cards = [];
    // Find all grid column wrappers that contain the card content
    const columns = root.querySelectorAll('.frach-grid-col-mq1-12.frach-grid-col-mq3-4');
    columns.forEach(col => {
      // For each column, find the two content sections: image and text
      const sections = col.querySelectorAll(':scope > .aem-Grid > section');
      if (sections.length < 2) return;

      // Extract image from first section
      const imgSection = sections[0];
      let imageEl = null;
      const lazyImg = imgSection.querySelector('frach-e-lazy-image');
      if (lazyImg) {
        // Create an img element using existing attributes
        const img = document.createElement('img');
        img.src = lazyImg.getAttribute('src');
        img.alt = lazyImg.getAttribute('alt') || '';
        if (lazyImg.hasAttribute('srcset')) img.setAttribute('srcset', lazyImg.getAttribute('srcset'));
        if (lazyImg.hasAttribute('sizes')) img.setAttribute('sizes', lazyImg.getAttribute('sizes'));
        imageEl = img;
      }
      // Extract text from second section
      const textSection = sections[1];
      let textEl = null;
      const cmpText = textSection.querySelector('.cmp-text');
      if (cmpText) {
        // Use the cmpText element directly to retain original formatting
        textEl = cmpText;
      }
      if (imageEl && textEl) {
        cards.push([imageEl, textEl]);
      }
    });
    return cards;
  }

  // Build rows: header + one per card
  const cells = [['Cards (cards10)']];
  const cardRows = extractCards(element);
  cardRows.forEach(row => cells.push(row));

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
