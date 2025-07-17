/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the grid
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const grid = container.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Find the top-level grid direct children (should be 3):
  // [0]: heading, [1]: paragraph, [2]: sub-grid with author & logo
  const gridChildren = Array.from(grid.children);

  // First two items are heading and paragraph
  const heading = gridChildren[0];
  const quote = gridChildren[1];

  // Third item is a grid with two flexboxes: left (avatar block), right (logo svg)
  const subGrid = gridChildren[2];
  let authorFlex = null;
  let logoBox = null;
  if (subGrid) {
    // children: [0]: divider, [1]: author flex, [2]: logo right
    const subGridChildren = Array.from(subGrid.children);
    // We only want the author flex and logo (not divider)
    // Find the flex-horizontal and the utility-display-inline-block
    subGridChildren.forEach(child => {
      if (child.classList.contains('flex-horizontal')) {
        authorFlex = child;
      } else if (child.classList.contains('utility-display-inline-block')) {
        logoBox = child;
      }
    });
  }

  // Build the Columns block table rows
  const headerRow = ['Columns (columns25)'];
  const bodyRow = [
    [heading, quote, authorFlex].filter(Boolean),
    logoBox ? [logoBox] : ['']
  ];

  const cells = [
    headerRow,
    bodyRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
