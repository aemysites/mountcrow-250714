/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the Accordion (accordion83) table
  const headerRow = ['Accordion (accordion83)'];
  const tableRows = [headerRow];

  // Find all accordion sections (should be just one in this case)
  const accordionSections = element.querySelectorAll('.frach-m-accordion__section');
  accordionSections.forEach(section => {
    // Title
    let title = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      title = label.textContent.trim();
    }

    // Content: everything (all children) in .frach-m-accordion__section-content
    const contentWrapper = section.querySelector('.frach-m-accordion__section-content');
    let contentEls = [];
    if (contentWrapper) {
      // Get all child nodes (filter out empty text nodes)
      contentEls = Array.from(contentWrapper.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') return true;
        return false;
      });
      // If only one node, use that directly
      if (contentEls.length === 1) contentEls = contentEls[0];
    }
    // Always add as two columns: [title, contentEls]
    tableRows.push([title, contentEls]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
