/* global WebImporter */
export default function parse(element, { document }) {
  // Find the gallery and its card container
  const gallery = element.querySelector('frach-m-image-gallery-tiles');
  if (!gallery) return;
  const container = gallery.querySelector('.frach-m-image-gallery-tiles__container');
  if (!container) return;
  
  // Find any corresponding lightbox for more detailed text
  const lightbox = gallery.querySelector('frach-m-media-lightbox');
  const slides = lightbox ? Array.from(lightbox.querySelectorAll('.frach-m-slider__slide')) : [];

  // Gather all card elements
  const cards = Array.from(container.querySelectorAll('frach-m-image'));

  // Start with header row matching the example exactly
  const cells = [['Cards (cards7)']];

  cards.forEach((card, idx) => {
    // 1. Image: always extract the frach-e-lazy-image as <img>
    let imageEl = null;
    const lazyImg = card.querySelector('frach-e-lazy-image');
    if (lazyImg) {
      const img = document.createElement('img');
      img.src = lazyImg.getAttribute('src');
      img.alt = lazyImg.getAttribute('alt') || '';
      imageEl = img;
    }

    // 2. Text content: prefer lightbox heading and description, fallback to figcaption, fallback to alt
    let textCell = [];
    let gotText = false;

    // Prefer lightbox text (heading + description if present)
    if (slides[idx]) {
      const textBlock = slides[idx].querySelector('.frach-m-media-lightbox__text');
      if (textBlock) {
        // Heading (usually <h6>)
        const heading = textBlock.querySelector('h6');
        if (heading && heading.textContent.trim()) {
          const strong = document.createElement('strong');
          strong.textContent = heading.textContent.trim();
          textCell.push(strong);
          gotText = true;
        }
        // Description (usually <p.frach-m-media-lightbox__description>), skip if empty or whitespace
        const desc = textBlock.querySelector('.frach-m-media-lightbox__description');
        if (desc && desc.textContent.replace(/\u00a0/g, ' ').trim()) {
          const p = document.createElement('p');
          p.textContent = desc.textContent.replace(/\u00a0/g, ' ').trim();
          textCell.push(p);
          gotText = true;
        }
      }
    }

    // Fallback: figcaption from card for title text
    if (!gotText) {
      const figcaption = card.querySelector('figcaption');
      if (figcaption && figcaption.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = figcaption.textContent.trim();
        textCell.push(strong);
        gotText = true;
      }
    }

    // Last fallback: alt from image
    if (!gotText && lazyImg && lazyImg.getAttribute('alt')) {
      const strong = document.createElement('strong');
      strong.textContent = lazyImg.getAttribute('alt');
      textCell.push(strong);
    }

    // Compose row for this card (always 2 cells as in the example)
    cells.push([
      imageEl,
      textCell.length > 1 ? textCell : textCell[0]
    ]);
  });

  // Create and insert the final table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
