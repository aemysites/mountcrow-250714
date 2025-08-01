/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Carousel (carousel17)'];

  // Extract the slide image (first/only slide)
  let imageCell = '';
  const figure = element.querySelector('figure');
  if (figure) {
    const lazyImg = figure.querySelector('frach-e-lazy-image');
    if (lazyImg) {
      const img = document.createElement('img');
      const src = lazyImg.getAttribute('src');
      if (src) img.setAttribute('src', src);
      const alt = lazyImg.getAttribute('alt');
      if (alt) img.setAttribute('alt', alt);
      const srcset = lazyImg.getAttribute('srcset');
      if (srcset) img.setAttribute('srcset', srcset);
      const sizes = lazyImg.getAttribute('sizes');
      if (sizes) img.setAttribute('sizes', sizes);
      imageCell = img;
    }
  } else {
    // fallback: any frach-e-lazy-image within the block
    const lazyImg = element.querySelector('frach-e-lazy-image');
    if (lazyImg) {
      const img = document.createElement('img');
      const src = lazyImg.getAttribute('src');
      if (src) img.setAttribute('src', src);
      const alt = lazyImg.getAttribute('alt');
      if (alt) img.setAttribute('alt', alt);
      const srcset = lazyImg.getAttribute('srcset');
      if (srcset) img.setAttribute('srcset', srcset);
      const sizes = lazyImg.getAttribute('sizes');
      if (sizes) img.setAttribute('sizes', sizes);
      imageCell = img;
    }
  }

  // Extract text cell: heading, all non-empty paragraphs, and CTAs
  let textNodes = [];
  // Prefer overlay text if available
  let textBlock = element.querySelector('.frach-m-media-lightbox__text') || element;

  // Heading (h6...h1)
  let heading = textBlock.querySelector('h6, h5, h4, h3, h2, h1');
  if (heading && heading.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    textNodes.push(h2);
  }
  // All non-empty paragraphs
  let paragraphs = textBlock.querySelectorAll('p');
  paragraphs.forEach(p => {
    const txt = p.textContent.replace(/\u00A0/g, '').trim();
    if (txt) {
      const np = document.createElement('p');
      np.textContent = txt;
      textNodes.push(np);
    }
  });
  // Any links (CTAs)
  let links = textBlock.querySelectorAll('a[href]');
  links.forEach(a => {
    if (a.textContent.trim()) {
      // Reference original anchor element
      textNodes.push(a);
    }
  });

  // Fallback: If textNodes is empty, try any text content in the element
  if (!textNodes.length) {
    const txt = element.textContent.replace(/\u00A0/g, '').trim();
    if (txt) {
      textNodes.push(document.createTextNode(txt));
    }
  }

  const textCell = textNodes.length ? textNodes : '';
  const rows = [headerRow, [imageCell, textCell]];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
