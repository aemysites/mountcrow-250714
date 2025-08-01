/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with the columns
  const grid = element.querySelector('.frach-grid');
  if (!grid) return;

  // Get all column wrappers
  const colElements = Array.from(grid.querySelectorAll(':scope > .frach-grid-row > .frach-grid-col-mq1-12'));

  // For each column, find the section containing all content
  const columns = colElements.map(colEl => {
    // Usually a div.aem-Grid > section
    const section = colEl.querySelector('section');
    if (!section) return colEl; // fallback

    // The text content is inside .frach-m-text__rte-wrapper > .cmp-text
    const contentArr = [];
    const textWrapper = section.querySelector('.frach-m-text__rte-wrapper');
    if (textWrapper) {
      const cmpText = textWrapper.querySelector('.cmp-text');
      if (cmpText) {
        // Add all children to preserve heading, paragraph, list
        contentArr.push(...Array.from(cmpText.children));
      }
    }
    // The button is in .frach-m-text__buttons
    const buttonWrapper = section.querySelector('.frach-m-text__buttons');
    if (buttonWrapper) {
      const btn = buttonWrapper.querySelector('a,button');
      if (btn) contentArr.push(btn);
    }
    // Wrap all content in a div to ensure single element per cell
    const cellDiv = document.createElement('div');
    contentArr.forEach(child => cellDiv.appendChild(child));
    return cellDiv;
  });

  // Compose the table
  const cells = [
    ['Columns (columns110)'],
    columns
  ];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
