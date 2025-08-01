/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion component inside the element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find all accordion sections
  const sectionContainer = accordion.querySelector('.wcm-io-parsys.section');
  if (!sectionContainer) return;
  const sections = Array.from(sectionContainer.querySelectorAll(':scope > .frach-m-accordion__section'));

  // Prepare the header row, matching the example exactly
  const rows = [
    ['Accordion (accordion8)'],
  ];

  sections.forEach((section) => {
    // Title cell: use the toggle label element directly if possible
    let titleCell = '';
    const toggleLabel = section.querySelector('.frach-m-accordion__toggle-label');
    if (toggleLabel) {
      // Use the toggleLabel span directly (includes formatting)
      titleCell = toggleLabel;
    }
    
    // Content cell: use the content area directly
    let contentCell = '';
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      // use all children inside the content cell
      const contentChildren = Array.from(content.children);
      // If only one element, use that directly, else use an array
      if (contentChildren.length === 1) {
        contentCell = contentChildren[0];
      } else if (contentChildren.length > 1) {
        contentCell = contentChildren;
      } else {
        contentCell = '';
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
