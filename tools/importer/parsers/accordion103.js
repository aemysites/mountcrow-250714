/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find all accordion sections
  const sections = accordion.querySelectorAll('.frach-m-accordion__section');
  const rows = [];
  // Header row as in the example
  rows.push(['Accordion (accordion103)']);

  sections.forEach(section => {
    // Title cell: use the label span with the question/title
    let titleCell = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label && label.textContent.trim()) {
      // Use a div to wrap the title (preserves structure and semantics for downstream)
      const div = document.createElement('div');
      div.textContent = label.textContent.trim();
      titleCell = div;
    }

    // Content cell: use the actual content element
    let contentCell = '';
    const sectionContent = section.querySelector('.frach-m-accordion__section-content');
    if (sectionContent) {
      // Find the .frach-m-text__rte-wrapper inside for main content
      const rteWrapper = sectionContent.querySelector('.frach-m-text__rte-wrapper');
      if (rteWrapper) {
        // Use the .cmp-text child if available, else use the wrapper
        const cmpText = rteWrapper.querySelector('.cmp-text');
        if (cmpText) {
          contentCell = cmpText;
        } else {
          contentCell = rteWrapper;
        }
      } else {
        // fallback: use all children of sectionContent
        if (sectionContent.children.length === 1) {
          contentCell = sectionContent.children[0];
        } else {
          // combine content
          const div = document.createElement('div');
          Array.from(sectionContent.childNodes).forEach(child => {
            if (child.nodeType === 1) div.appendChild(child);
          });
          contentCell = div;
        }
      }
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
