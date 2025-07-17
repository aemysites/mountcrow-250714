/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let leftCellContent = [];
  let rightCellContent = [];

  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > *');
    // LEFT CELL: usually text content (heading, subheading, button group)
    if (gridChildren.length > 0) {
      const left = gridChildren[0];
      // Collect all non-empty child nodes (elements and text)
      left.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
          leftCellContent.push(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          // Wrap non-empty text nodes in a <p>
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          leftCellContent.push(p);
        }
      });
    }
    // RIGHT CELL: typically image (or fallback to whatever is there)
    if (gridChildren.length > 1) {
      const right = gridChildren[1];
      // If it's an IMG directly
      if (right.tagName === 'IMG') {
        rightCellContent.push(right);
      } else {
        // If it contains an image
        const img = right.querySelector('img');
        if (img) {
          rightCellContent.push(img);
        } else if (right.textContent.trim()) {
          rightCellContent.push(right);
        }
      }
    }
  }
  // Fallback if grid is not present or empty
  if (leftCellContent.length === 0) {
    const h1 = element.querySelector('h1');
    if (h1) leftCellContent.push(h1);
    const subheading = element.querySelector('.subheading');
    if (subheading) leftCellContent.push(subheading);
    const btnGroup = element.querySelector('.button-group');
    if (btnGroup) leftCellContent.push(btnGroup);
  }
  if (rightCellContent.length === 0) {
    const fallbackImg = element.querySelector('img');
    if (fallbackImg) rightCellContent.push(fallbackImg);
  }

  // Make sure both cells are not empty
  if (leftCellContent.length === 0) leftCellContent = [''];
  if (rightCellContent.length === 0) rightCellContent = [''];

  // Build table header row (exact match)
  const headerRow = ['Columns (columns15)'];
  // Build content row (two columns)
  const contentRow = [leftCellContent, rightCellContent];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
