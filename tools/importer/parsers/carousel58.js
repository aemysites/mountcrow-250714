/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel gallery block
  const gallery = element.querySelector('frach-m-image-gallery-tiles');
  if (!gallery) return;
  const lightbox = gallery.querySelector('frach-m-media-lightbox');
  const slider = lightbox && lightbox.querySelector('.frach-m-slider__slides');
  if (!slider) return;

  // Prepare the table rows (excluding header)
  const rows = [];
  slider.querySelectorAll(':scope > .frach-m-slider__slide').forEach(slide => {
    // IMAGE CELL
    let imageCell = '';
    const imgWrapper = slide.querySelector('.frach-m-media-lightbox__image-wrapper');
    if (imgWrapper) {
      const lazyImg = imgWrapper.querySelector('frach-e-lazy-image');
      if (lazyImg) {
        // Create <img> from frach-e-lazy-image attributes
        const img = document.createElement('img');
        if (lazyImg.getAttribute('src')) img.src = lazyImg.getAttribute('src');
        if (lazyImg.getAttribute('alt')) img.alt = lazyImg.getAttribute('alt');
        if (lazyImg.getAttribute('srcset')) img.setAttribute('srcset', lazyImg.getAttribute('srcset'));
        if (lazyImg.getAttribute('sizes')) img.setAttribute('sizes', lazyImg.getAttribute('sizes'));
        imageCell = img;
      }
    }
    // TEXT CELL
    let textCell = '';
    const meta = slide.querySelector('.frach-m-media-lightbox__meta');
    if (meta) {
      const content = [];
      const textBlock = meta.querySelector('.frach-m-media-lightbox__text');
      if (textBlock) {
        // Title (h6 or .frach-h6)
        const h6 = textBlock.querySelector('h6, .frach-h6');
        if (h6 && h6.textContent.trim()) {
          const h2 = document.createElement('h2');
          h2.textContent = h6.textContent.trim();
          content.push(h2);
        }
        // Description (p)
        const p = textBlock.querySelector('p');
        if (p && p.innerHTML.replace(/\s|&nbsp;/g, '').length > 0) {
          const desc = document.createElement('p');
          desc.innerHTML = p.innerHTML;
          content.push(desc);
        }
      }
      // CTA (if any)
      const btnDiv = meta.querySelector('.frach-m-media-lightbox__button');
      if (btnDiv) {
        const a = btnDiv.querySelector('a');
        if (a) content.push(a);
      }
      textCell = content.length ? content : '';
    }
    rows.push([imageCell, textCell]);
  });

  // Manually build the table with a header row with colspan=2
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Carousel (carousel58)';
  headerTh.setAttribute('colspan', '2');
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      if (typeof cell === 'string') {
        td.innerHTML = cell;
      } else if (Array.isArray(cell)) {
        td.append(...cell);
      } else if (cell instanceof Element) {
        td.append(cell);
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  element.replaceWith(table);
}
