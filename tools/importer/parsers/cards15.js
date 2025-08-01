/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Cards (cards15)'];

  // Find all direct card elements
  const cardElements = element.querySelectorAll(':scope > frach-m-image');

  const rows = Array.from(cardElements).map((card) => {
    // Get figure
    const figure = card.querySelector('figure');

    // Get image (from frach-e-lazy-image)
    let imgEl = null;
    if (figure) {
      const a = figure.querySelector('a');
      if (a) {
        const lazy = a.querySelector('frach-e-lazy-image');
        if (lazy) {
          // create <img> referencing the src/alt from frach-e-lazy-image
          imgEl = document.createElement('img');
          if (lazy.hasAttribute('src')) imgEl.src = lazy.getAttribute('src');
          if (lazy.hasAttribute('alt')) imgEl.alt = lazy.getAttribute('alt');
        }
      }
    }
    if (!imgEl) {
      // fallback empty div to avoid null
      imgEl = document.createElement('div');
    }

    // Get caption as title
    let titleText = '';
    if (figure) {
      const cap = figure.querySelector('figcaption');
      if (cap) titleText = cap.textContent.trim();
    }

    // Title should be a strong element if present
    let textContent;
    if (titleText) {
      const strong = document.createElement('strong');
      strong.textContent = titleText;
      textContent = strong;
    } else {
      textContent = document.createTextNode('');
    }

    return [imgEl, textContent];
  });

  // Compose table cells
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
