/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion
  const accordion = element.querySelector('frach-m-accordion.frach-m-accordion');
  if (!accordion) return;

  // Compose the block table header
  const cells = [
    ['Accordion (accordion96)']
  ];

  // Get all accordion sections
  const sections = accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section');

  sections.forEach((section) => {
    // Title cell: get the text or element from the label
    const labelEl = section.querySelector('.frach-m-accordion__toggle-label');
    let titleCell = '';
    if (labelEl) {
      // Use the actual element (not a clone)
      titleCell = labelEl;
    }

    // Content cell: the .frach-m-accordion__section-content element
    const contentEl = section.querySelector('.frach-m-accordion__section-content');
    let contentCell;
    if (contentEl) {
      // Create a container and move all children of contentEl into it
      const div = document.createElement('div');
      while (contentEl.firstChild) {
        div.appendChild(contentEl.firstChild);
      }
      contentCell = div;
    } else {
      contentCell = '';
    }

    cells.push([titleCell, contentCell]);
  });

  // Generate the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
