/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as required by the block spec
  const headerRow = ['Accordion (accordion43)'];
  const cells = [headerRow];

  // 2. Find the main annotated image (if present)
  let imageEl = null;
  const imageContainer = element.querySelector('.frach-m-annotated-image__image-container');
  if (imageContainer) {
    const lazyImg = imageContainer.querySelector('frach-e-lazy-image');
    if (lazyImg) {
      // Convert to real <img> for block compatibility
      const img = document.createElement('img');
      img.src = lazyImg.getAttribute('src') || '';
      img.alt = lazyImg.getAttribute('alt') || '';
      if (lazyImg.hasAttribute('width')) img.setAttribute('width', lazyImg.getAttribute('width'));
      if (lazyImg.hasAttribute('height')) img.setAttribute('height', lazyImg.getAttribute('height'));
      imageEl = img;
    }
  }

  // 3. Find all accordion rows (mainly from slider slides)
  // Each slide represents an accordion item: title(left), content(right)
  const slides = element.querySelectorAll('.frach-m-annotated-image__slide');
  if (slides.length > 0) {
    slides.forEach((slide, idx) => {
      // --- Title extraction ---
      let titleNode = slide.querySelector('.frach-m-annotated-image__slide-title');
      let titleContent;
      if (titleNode) {
        // Use the actual element for semantic meaning (h6)
        titleContent = titleNode;
      } else {
        // Fallback: just use first heading or text node
        titleContent = slide.querySelector('h6') || document.createTextNode('');
      }
      // For the first row, combine image and title
      let titleCell;
      if (idx === 0 && imageEl) {
        const container = document.createElement('div');
        container.appendChild(imageEl);
        container.appendChild(document.createElement('br'));
        container.appendChild(titleContent);
        titleCell = container;
      } else {
        titleCell = titleContent;
      }

      // --- Content extraction ---
      let contentNode = slide.querySelector('.frach-m-annotated-image__slide-content');
      let contentCell;
      if (contentNode) {
        // Use the whole content block, which includes any formatting and semantics
        contentCell = contentNode;
      } else {
        // fallback: empty div
        contentCell = document.createElement('div');
      }
      cells.push([titleCell, contentCell]);
    });
  } else {
    // Fallback: try hotspot structure, as a safety net
    const hotspots = element.querySelectorAll('.frach-m-annotated-image__hotspot');
    hotspots.forEach((hotspot, idx) => {
      // Title: from tooltip title (h6)
      let titleEl = null;
      const tooltip = hotspot.querySelector('frach-e-tooltip');
      if (tooltip) {
        titleEl = tooltip.querySelector('.frach-e-tooltip__title');
      }
      let titleCell;
      if (idx === 0 && imageEl) {
        const container = document.createElement('div');
        container.appendChild(imageEl);
        if (titleEl) container.appendChild(titleEl);
        titleCell = container;
      } else {
        titleCell = titleEl || document.createTextNode('');
      }
      // Content: from tooltip content
      let contentCell;
      if (tooltip) {
        const contentDiv = tooltip.querySelector('.frach-e-tooltip__content');
        if (contentDiv) {
          contentCell = contentDiv;
        } else {
          contentCell = document.createElement('div');
        }
      } else {
        contentCell = document.createElement('div');
      }
      cells.push([titleCell, contentCell]);
    });
  }

  // 4. Create and replace the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
