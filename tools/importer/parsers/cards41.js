/* global WebImporter */
export default function parse(element, { document }) {
  // Find the wrapper that contains all cards
  const wrapper = element.querySelector('.frach-m-teaser-collection__list-wrapper');
  if (!wrapper) return;
  // Select all card anchors
  const cardLinks = wrapper.querySelectorAll(':scope > .frach-m-teaser-collection__list-item');
  const rows = [['Cards (cards41)']]; // Header row exactly as in the example

  cardLinks.forEach(card => {
    // Image cell
    let imgCell = null;
    const imgWrapper = card.querySelector('.frach-m-teaser-collection__list-item-image-wrapper');
    if (imgWrapper) {
      const frachImg = imgWrapper.querySelector('frach-e-lazy-image');
      if (frachImg) {
        // Build a real img element with all relevant attributes
        const img = document.createElement('img');
        if (frachImg.getAttribute('src')) img.src = frachImg.getAttribute('src');
        if (frachImg.getAttribute('alt')) img.alt = frachImg.getAttribute('alt');
        if (frachImg.getAttribute('srcset')) img.setAttribute('srcset', frachImg.getAttribute('srcset'));
        if (frachImg.getAttribute('sizes')) img.setAttribute('sizes', frachImg.getAttribute('sizes'));
        imgCell = img;
      }
    }
    // Text cell
    const textWrapper = card.querySelector('.frach-m-teaser-collection__list-item-text-wrapper');
    let textCellContent = [];
    if (textWrapper) {
      // Date line (if present)
      const dateElem = textWrapper.querySelector('.frach-m-teaser-collection__list-item-date');
      if (dateElem) {
        // Use original element reference to keep structure
        textCellContent.push(dateElem);
      }
      // Headline (if present)
      const headlineElem = textWrapper.querySelector('.frach-m-teaser-collection__list-item-headline');
      if (headlineElem) {
        // Use <strong> for headline as in the visual example (not <h5>, keep inline)
        const strong = document.createElement('strong');
        strong.innerHTML = headlineElem.innerHTML;
        textCellContent.push(strong);
        textCellContent.push(document.createElement('br'));
      }
      // Description (if present)
      const descElem = textWrapper.querySelector('.frach-m-teaser-collection__list-item-description');
      if (descElem) {
        textCellContent.push(descElem);
      }
    }
    // Wrap text cell in a link if card has an href
    let textCell = textCellContent;
    const href = card.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      // If only one element, append directly; else append all
      if (textCellContent.length === 1) {
        link.append(textCellContent[0]);
      } else {
        link.append(...textCellContent);
      }
      textCell = link;
    }
    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
