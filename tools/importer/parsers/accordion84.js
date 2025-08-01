/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion main component: find frach-m-accordion inside the block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Header is always block name as per instructions
  const rows = [['Accordion (accordion84)']];

  // Each section is a .wcm-io-parsys.section containing .frach-m-accordion__section
  const parsysSections = accordion.querySelectorAll('.wcm-io-parsys.section');

  parsysSections.forEach((parsys) => {
    const section = parsys.querySelector('.frach-m-accordion__section');
    if (!section) return;

    // Get the title: the span.frach-m-accordion__toggle-label is the heading
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    let titleNode = '';
    if (label) {
      // Use the original span element for preservation of formatting
      titleNode = label;
    }

    // Get the content: all direct children of .frach-m-accordion__section-content
    const contentContainer = section.querySelector('.frach-m-accordion__section-content');
    let contentNode = '';
    if (contentContainer) {
      // Reference existing children nodes (not cloning)
      // Filter out empty text nodes
      const children = Array.from(contentContainer.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') return true;
        return false;
      });
      if (children.length === 1) {
        contentNode = children[0];
      } else if (children.length > 1) {
        contentNode = children;
      } // else remains '' if empty
    }

    rows.push([titleNode, contentNode]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
