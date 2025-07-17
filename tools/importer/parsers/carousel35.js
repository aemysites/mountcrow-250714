/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid that contains the images
  const grids = element.querySelectorAll('.w-layout-grid');
  let imagesGrid = null;
  for (const grid of grids) {
    if (grid.querySelectorAll('img').length > 0) {
      imagesGrid = grid;
      break;
    }
  }
  if (!imagesGrid) return;
  const imgs = Array.from(imagesGrid.querySelectorAll('img'));

  // 2. Get the main text panel (heading, subheading, buttons)
  // The left column div contains all text content
  let textCol = null;
  const gridCols = element.querySelectorAll('.w-layout-grid > div');
  if (gridCols.length > 0) {
    textCol = gridCols[0];
  } else {
    // fallback: try for direct child
    textCol = element.querySelector('h1, .h1-heading')?.parentElement;
  }

  // 3. Compose the carousel block table
  const cells = [['Carousel (carousel35)']];
  imgs.forEach((img, i) => {
    if (i === 0 && textCol) {
      cells.push([img, textCol]);
    } else {
      cells.push([img, '']);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
