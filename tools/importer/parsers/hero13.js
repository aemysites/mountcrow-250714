/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header (block name)
  const headerRow = ['Hero (hero13)'];

  // 2. Background image (first image in the block)
  let image = null;
  // The background image is usually inside a .ix-parallax-scale-out-hero
  const bgImgContainer = element.querySelector('.ix-parallax-scale-out-hero');
  if (bgImgContainer) {
    image = bgImgContainer.querySelector('img');
  }
  // fallback to any img in the block
  if (!image) {
    image = element.querySelector('img');
  }

  // 3. Title/subtitle/button(s) content cell
  // Look for the grid second column: the first .container inside the grid
  let contentCell = '';
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const columns = grid.querySelectorAll(':scope > div');
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].classList.contains('container')) {
        // Collect all heading and button group content
        const cellContent = [];
        // Add all headings (h1, h2, h3, etc) in order
        const headings = columns[i].querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => cellContent.push(h));
        // Add all paragraphs (if present)
        const paragraphs = columns[i].querySelectorAll('p');
        paragraphs.forEach(p => cellContent.push(p));
        // Add button group (if has content)
        const btnGroup = columns[i].querySelector('.button-group');
        if (btnGroup && btnGroup.children.length > 0) {
          cellContent.push(btnGroup);
        }
        contentCell = cellContent.length ? cellContent : '';
        break;
      }
    }
  }

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [image || ''],
    [contentCell]
  ], document);

  element.replaceWith(table);
}