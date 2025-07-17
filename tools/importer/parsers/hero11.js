/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as in the example
  const headerRow = ['Hero (hero11)'];
  // Grab all immediate children of the grid, which are the divs each containing an image
  const gridChildren = Array.from(element.querySelectorAll(':scope > div'));
  // For this block, the example expects all images as background image(s) in the second row, stacked together
  // We will group the referenced image elements into a container div, as one cell
  const imagesDiv = document.createElement('div');
  gridChildren.forEach(child => {
    const img = child.querySelector('img');
    if (img) imagesDiv.appendChild(img);
  });
  // Third row is empty (no headings or CTA in this variant)
  const contentRow = [''];
  // Construct the cells array
  const cells = [
    headerRow,
    [imagesDiv],
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
