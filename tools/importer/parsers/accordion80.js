/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct accordion section elements
  function getAccordionSections(el) {
    // Find the <frach-m-accordion> inside the element
    const accordion = el.querySelector('frach-m-accordion');
    if (!accordion) return [];
    // Find all .frach-m-accordion__section inside .wcm-io-parsys.section, direct children
    return Array.from(accordion.querySelectorAll('.wcm-io-parsys.section > .frach-m-accordion__section'));
  }

  // Helper to extract title and content for each accordion section
  function extractAccordionRow(section) {
    // Title: the label span inside the label
    let titleCell = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      // Reference existing span, do not clone
      titleCell = label;
    }

    // Accordion content: everything inside .frach-m-accordion__section-content
    let contentCell = '';
    const contentWrap = section.querySelector('.frach-m-accordion__section-content');
    if (contentWrap) {
      // Collect all significant child elements within contentWrap
      // We'll keep only direct children that have meaningful content
      // Prefer referencing existing elements directly
      const cells = [];
      contentWrap.childNodes.forEach(child => {
        // Ignore empty text nodes
        if (child.nodeType === 3 && !child.textContent.trim()) return;
        // Ignore .frach-m-text__buttons if empty
        if (child.nodeType === 1 && child.classList.contains('frach-h-component-margin')) {
          // If child contains only an empty .frach-m-text__buttons, ignore
          const btns = child.querySelector('.frach-m-text__buttons');
          if (btns && btns.textContent.trim() === '') {
            // Remove the empty buttons to avoid blank content
            btns.remove();
          }
          // If after removal, child is empty, skip
          if (child.textContent.trim() === '') return;
        }
        cells.push(child);
      });
      if (cells.length === 1) {
        contentCell = cells[0];
      } else if (cells.length > 1) {
        contentCell = cells;
      }
    }
    return [titleCell, contentCell];
  }

  // Find all sections
  const accordionSections = getAccordionSections(element);

  // Build the rows
  const rows = [['Accordion (accordion80)']];
  accordionSections.forEach(section => {
    rows.push(extractAccordionRow(section));
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the table
  element.replaceWith(table);
}
