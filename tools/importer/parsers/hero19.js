/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract all hero background images (they are in the 3-column grid)
  const gridLayout = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let bgImages = [];
  if (gridLayout) {
    bgImages = Array.from(gridLayout.querySelectorAll('img'));
  }
  // Wrap all images in a container for the cell
  const bgContainer = document.createElement('div');
  bgImages.forEach(img => bgContainer.appendChild(img));

  // 2. Extract the content (heading, subheading, buttons)
  let contentContainer = null;
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentSection) {
    contentContainer = contentSection;
  } else {
    // fallback: try to find first h1 in case of HTML variation
    const fallback = element.querySelector('h1');
    if (fallback) {
      contentContainer = document.createElement('div');
      contentContainer.appendChild(fallback);
      const p = element.querySelector('p');
      if (p) contentContainer.appendChild(p);
      const btns = element.querySelector('.button-group');
      if (btns) contentContainer.appendChild(btns);
    }
  }

  // Prepare table rows as per block requirements
  const headerRow = ['Hero (hero19)'];
  const bgImgRow = [bgContainer.childNodes.length > 0 ? bgContainer : ''];
  const contentRow = [contentContainer ? contentContainer : ''];

  const cells = [headerRow, bgImgRow, contentRow];

  // Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
