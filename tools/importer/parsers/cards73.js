/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: convert <frach-e-lazy-image> to <img>
  function toImg(el) {
    if (!el) return null;
    const img = document.createElement('img');
    img.src = el.getAttribute('src');
    if (el.hasAttribute('alt')) img.alt = el.getAttribute('alt');
    if (el.hasAttribute('srcset')) img.setAttribute('srcset', el.getAttribute('srcset'));
    if (el.hasAttribute('sizes')) img.setAttribute('sizes', el.getAttribute('sizes'));
    return img;
  }

  // Find main grid
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;
  const gridRow = grid.querySelector('.frach-grid-row');
  if (!gridRow) return;
  const columns = Array.from(gridRow.querySelectorAll(':scope > div'));

  // Prepare card rows
  const rows = [];

  // Card columns (cards)
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    const cardSec = col.querySelector('section');
    if (!cardSec) continue;
    const card = cardSec.querySelector('.frach-m-card');
    if (card) {
      // IMAGE
      let img = null;
      const imgWrapper = card.querySelector('.frach-m-card__image-wrapper frach-e-lazy-image, .frach-m-card__image-wrapper > frach-e-lazy-image');
      if (imgWrapper) {
        img = toImg(imgWrapper);
      } else {
        const fallbackImg = card.querySelector('frach-e-lazy-image');
        if (fallbackImg) img = toImg(fallbackImg);
      }
      // TEXTS
      const textDiv = card.querySelector('.frach-m-card__text');
      const textContent = [];
      if (textDiv) {
        // Meta/description (usually <p>)
        const meta = textDiv.querySelector('.frach-m-card__meta');
        if (meta) {
          Array.from(meta.childNodes).forEach(n => {
            if (n.nodeType === Node.ELEMENT_NODE) textContent.push(n);
          });
        }
        // Title
        const hTitle = textDiv.querySelector('h5, .frach-h5');
        if (hTitle) textContent.push(hTitle);
      }
      rows.push([
        img || '',
        textContent
      ]);
    }
    // If no card, check for link box (CTA)
    else {
      const linkBox = cardSec.querySelector('.frach-m-link-box');
      if (linkBox) {
        // Editorial header
        const editorial = linkBox.querySelector('.frach-m-link-box__editorial');
        if (editorial) {
          const cellContent = [];
          const h6 = editorial.querySelector('h6');
          if (h6) cellContent.push(h6);
          // All cta buttons
          const ctas = editorial.querySelectorAll('.frach-m-link-box__cta-button-container > a');
          ctas.forEach(cta => cellContent.push(cta));
          rows.push(['', cellContent]);
        }
      }
    }
  }

  // Construct table
  const table = WebImporter.DOMUtils.createTable([
    ['Cards (cards73)'],
    ...rows
  ], document);

  element.replaceWith(table);
}
