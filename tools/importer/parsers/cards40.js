/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion section content
  const accordionSection = element.querySelector('.frach-m-accordion__section-content');
  if (!accordionSection) return;
  // Find the contact grid
  const contactGrid = accordionSection.querySelector('.frach-m-contact-list.frach-grid');
  if (!contactGrid) return;

  // Get all card columns (each is one card)
  const cardCols = contactGrid.querySelectorAll('.frach-grid-col-mq1-12');

  const rows = [];
  // Header row exactly as in example
  rows.push(['Cards (cards40)']);

  cardCols.forEach(col => {
    // Image (custom element, leave as is)
    const img = col.querySelector('frach-e-lazy-image');

    // Text content: h6, p, a (can be multiple a)
    const address = col.querySelector('address.frach-m-contact__info');
    const textContent = [];
    if (address) {
      const heading = address.querySelector('h6');
      if (heading) textContent.push(heading);
      const desc = address.querySelector('p');
      if (desc) textContent.push(desc);
      // All CTAs (links)
      address.querySelectorAll('a').forEach(a => textContent.push(a));
    }
    // If only one text element, use it directly, else array
    rows.push([
      img,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Create the cards block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
