/* global WebImporter */
export default function parse(element, { document }) {
  // Find the outer grid containing the cards
  const container = element.querySelector('.container');
  if (!container) return;
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length === 0) return;

  // First grid: sometimes main card + nested grid, sometimes just all cards
  // For this HTML, first grid has 2 children: [big card, nested grid with 4 cards]
  const firstGrid = grids[0];
  
  // Collect cards
  let allCards = [];
  // Direct cards in firstGrid
  allCards.push(...Array.from(firstGrid.querySelectorAll(':scope > .utility-link-content-block')));
  // Nested grids (usually right column)
  Array.from(firstGrid.querySelectorAll(':scope > .w-layout-grid')).forEach(nestedGrid => {
    allCards.push(...Array.from(nestedGrid.querySelectorAll(':scope > .utility-link-content-block')));
  });

  // Defensive: filter out any non-card elements
  allCards = allCards.filter(Boolean);

  // Table header as in the example: 'Cards (cards36)'
  const cells = [['Cards (cards36)']];

  // For each card, extract [image] and [text content] columns
  allCards.forEach(card => {
    // 1st column: image or icon (mandatory)
    // We need the closest div containing the image, for aspect ratio/layout
    let imgDiv = null;
    let img = card.querySelector('img.cover-image');
    if (img) {
      imgDiv = img.closest('div');
    }
    // Fallback to just img
    const imageCell = imgDiv || img;

    // 2nd column: text content
    const textContent = [];
    // Heading first (h2, h3, or styled heading)
    const heading = card.querySelector('h2, h3, .h2-heading, .h4-heading');
    if (heading) textContent.push(heading);
    // Description (p)
    const description = card.querySelector('p');
    if (description) textContent.push(description);
    // CTA/button (div.button or a.button)
    // Only include if present and visible
    const cta = card.querySelector('a.button, .button');
    // Avoid capturing container divs that are not real CTAs
    if (cta && (cta.tagName === 'A' || cta.tagName === 'BUTTON' || cta.classList.contains('button'))) {
      textContent.push(cta);
    }
    cells.push([
      imageCell,
      textContent
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
