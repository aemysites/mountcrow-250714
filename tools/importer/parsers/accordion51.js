/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion block in the source element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find each accordion section (each group is a .wcm-io-parsys.section > .frach-m-accordion__section)
  const sectionContainers = accordion.querySelectorAll(':scope > .wcm-io-parsys.section');
  const rows = [];

  // Block header row, as per example
  rows.push(['Accordion (accordion51)']);

  sectionContainers.forEach(sectionContainer => {
    const accSection = sectionContainer.querySelector('.frach-m-accordion__section');
    if (!accSection) return;

    // Extract title text from label > .frach-m-accordion__toggle-label
    let titleText = '';
    const label = accSection.querySelector('label.frach-m-accordion__toggle');
    if (label) {
      const labelSpan = label.querySelector('.frach-m-accordion__toggle-label');
      if (labelSpan && labelSpan.textContent.trim()) {
        titleText = labelSpan.textContent.trim();
      } else {
        // fallback: entire label text
        titleText = label.textContent.trim();
      }
    }

    // Extract content (all children of .frach-m-accordion__section-content)
    let contentCell = '';
    const content = accSection.querySelector('.frach-m-accordion__section-content');
    if (content) {
      // Only include element children (skip text nodes)
      const children = Array.from(content.children).filter(n => n.nodeType === 1);
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        // If no element children, fallback to the entire content element
        contentCell = content;
      }
    }

    // Add the accordion row
    rows.push([titleText, contentCell]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
