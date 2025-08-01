/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct accordion sections
  function getAccordionSections(container) {
    // Accordion is always inside a .frach-m-accordion
    const acc = container.querySelector('.frach-m-accordion');
    if (!acc) return [];
    // Find all direct accordion sections (not nested)
    return Array.from(acc.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section'));
  }

  const headerRow = ['Accordion (accordion85)'];
  const rows = [headerRow];
  const accordionSections = getAccordionSections(element);

  accordionSections.forEach(section => {
    // Title: Use the actual <span> node for the title (preserves inline formatting)
    let titleCell = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      titleCell = label;
    } else {
      // fallback: try to use the label element's textContent
      const fallbackLabel = section.querySelector('.frach-m-accordion__toggle');
      titleCell = fallbackLabel ? document.createTextNode(fallbackLabel.textContent.trim()) : document.createTextNode('');
    }

    // Content cell: use the <section> inside .frach-m-accordion__section-content, or the content div itself
    let contentCell = '';
    const contentDiv = section.querySelector('.frach-m-accordion__section-content');
    if (contentDiv) {
      const innerSection = contentDiv.querySelector(':scope > section');
      if (innerSection) {
        contentCell = innerSection;
      } else {
        // fallback: include the contentDiv itself
        contentCell = contentDiv;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
