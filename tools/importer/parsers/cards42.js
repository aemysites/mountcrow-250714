/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Convert <frach-e-lazy-image> to <img>
  function toImg(lazyImg) {
    if (!lazyImg) return null;
    const img = document.createElement('img');
    img.src = lazyImg.getAttribute('src');
    img.alt = lazyImg.getAttribute('alt') || '';
    const width = lazyImg.getAttribute('width');
    const height = lazyImg.getAttribute('height');
    if (width) img.width = width;
    if (height) img.height = height;
    return img;
  }

  // Get all card columns
  const cardColumns = element.querySelectorAll(':scope > div');
  const rows = [['Cards (cards42)']];
  cardColumns.forEach(col => {
    // Find the card container
    const card = col.querySelector('.frach-m-contact');
    if (card) {
      // Get image
      const lazyImg = card.querySelector('frach-e-lazy-image');
      const img = toImg(lazyImg);

      // Get address/text container
      const address = card.querySelector('address');
      // We'll build a content fragment to collect everything in the right order
      const contentFrag = document.createElement('div');
      if (address) {
        // Title (h6)
        const heading = address.querySelector('h6');
        if (heading) {
          // Use <strong> for header (visual match), or h6 if strong not desired
          const strong = document.createElement('strong');
          strong.textContent = heading.textContent;
          contentFrag.appendChild(strong);
        }
        // Description (p)
        const desc = address.querySelector('p');
        if (desc) {
          if (heading) contentFrag.appendChild(document.createElement('br'));
          const span = document.createElement('span');
          span.textContent = desc.textContent;
          contentFrag.appendChild(span);
        }
        // Links (email, phone) - each as a block
        const links = address.querySelectorAll('a.frach-e-link');
        if (links.length) {
          if (heading || desc) contentFrag.appendChild(document.createElement('br'));
          links.forEach((a, i) => {
            // Reference the real anchor element (not clone), but remove icon inline if present
            a.querySelectorAll('frach-e-icon').forEach(icon => icon.remove());
            // Make sure the link shows on its own line
            a.style.display = 'block';
            contentFrag.appendChild(a);
          });
        }
      }
      rows.push([img, contentFrag]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
