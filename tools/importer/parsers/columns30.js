/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be exactly one cell: ['Columns (columns30)']
  const headerRow = ['Columns (columns30)'];

  // Find the grid containing the columns/images
  const mainGrid = element.querySelector('.w-layout-grid');
  if (!mainGrid) return;
  
  // Each immediate child of the grid is a column wrapper
  const columnDivs = Array.from(mainGrid.children);

  // For each column, try to find the image (if present)
  const contentCells = columnDivs.map(col => {
    // Try to find the 2x3 aspect ratio div (if present)
    const aspect = col.querySelector('.utility-aspect-2x3');
    if (aspect) {
      // Use the <img> inside, if any
      const img = aspect.querySelector('img');
      if (img) return img;
      // If no image, include the aspect div's content
      return aspect;
    }
    // If no aspect div, use the whole column
    return col;
  });

  // Compose the cells: single header row, then a row of columns
  const cells = [headerRow, contentCells];
  
  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
