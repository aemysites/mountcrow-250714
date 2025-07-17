/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards22)'];
  const cells = [headerRow];

  // Each .w-tab-pane contains a grid of cards
  const tabPanes = element.querySelectorAll('[class*="w-tab-pane"]');
  tabPanes.forEach(tabPane => {
    // Cards are always direct children of a grid div
    const grid = tabPane.querySelector('[class*="w-layout-grid"]');
    if (!grid) return;
    // All <a> elements are cards
    const cards = grid.querySelectorAll('a');
    cards.forEach(card => {
      // ----- IMAGE CELL -----
      let imgCell = '';
      // Try to find an <img> inside a .utility-aspect-3x2 div
      const imgDiv = card.querySelector('.utility-aspect-3x2');
      let imgEl = null;
      if (imgDiv) {
        imgEl = imgDiv.querySelector('img');
      } else {
        imgEl = card.querySelector('img');
      }
      if (imgEl) imgCell = imgEl;
      else {
        // Always create an empty cell if no image
        imgCell = document.createTextNode('');
      }
      // ----- TEXT CELL -----
      let textCellContent = [];
      // Heading/title (h1-h6)
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textCellContent.push(heading);
      // Description (prioritize .paragraph-sm, fallback to any <p>)
      let desc = card.querySelector('.paragraph-sm');
      if (!desc) desc = card.querySelector('p');
      if (desc) textCellContent.push(desc);
      // Ensure there are always two cells per row
      cells.push([
        imgCell,
        textCellContent.length ? textCellContent : document.createTextNode('')
      ]);
    });
  });

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
