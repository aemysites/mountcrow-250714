/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first frach-m-accordion in the element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Accordion sections are direct children of .wcm-io-parsys.section
  const accordionContainers = accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section');
  const rows = Array.from(accordionContainers);

  // Table header as per instructions and example
  const table = [['Accordion (accordion100)']];

  // For each accordion row, get the label and contents
  rows.forEach((row) => {
    // Title cell: from label .frach-m-accordion__toggle-label
    let title = '';
    const labelSpan = row.querySelector('.frach-m-accordion__toggle-label');
    if (labelSpan) {
      title = labelSpan.textContent.trim();
    } else {
      // fallback: try the label for attribute's text
      const labelEl = row.querySelector('label.frach-m-accordion__toggle');
      if (labelEl) title = labelEl.textContent.trim();
      else title = '';
    }

    // Content cell: all content inside .frach-m-accordion__section-content
    const sectionContent = row.querySelector('.frach-m-accordion__section-content');
    let contentCell;
    if (sectionContent) {
      // Get ALL children, including text nodes
      // If only one child, use it directly. If multiple, group in a div.
      const children = Array.from(sectionContent.childNodes).filter(
        (node) => {
          // Ignore empty text nodes
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent.trim().length > 0;
          }
          return true;
        }
      );
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        const div = document.createElement('div');
        children.forEach((child) => div.appendChild(child));
        contentCell = div;
      } else {
        // No content, create empty div
        contentCell = document.createElement('div');
      }
    } else {
      // No content section, create empty div
      contentCell = document.createElement('div');
    }
    table.push([title, contentCell]);
  });

  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
