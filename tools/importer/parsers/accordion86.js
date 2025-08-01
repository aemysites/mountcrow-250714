/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child accordion sections
  function getAccordionSections(accordionEl) {
    // Some accordions have a parsys section wrapper
    const parsysSections = Array.from(accordionEl.children).filter(
      c => c.classList && c.classList.contains('wcm-io-parsys')
    );
    let sections = [];
    parsysSections.forEach(parsys => {
      const sec = Array.from(parsys.children).filter(
        e => e.classList && e.classList.contains('frach-m-accordion__section')
      );
      sections = sections.concat(sec);
    });
    return sections;
  }

  // Find the accordion root in this block
  let accordion = element.querySelector('.frach-m-accordion');
  if (!accordion) {
    // fallback: search deeper
    accordion = element.querySelector('frach-m-accordion');
  }
  if (!accordion) return;

  const headerRow = ['Accordion (accordion86)'];
  const rows = [headerRow];

  const accordionSections = getAccordionSections(accordion);

  accordionSections.forEach(section => {
    // Get the label (title span)
    const labelEl = section.querySelector('.frach-m-accordion__toggle-label');
    // We need to preserve any formatting or icon inside the label
    let titleContent = labelEl ? labelEl : '';

    // Get the section content
    const contentEl = section.querySelector('.frach-m-accordion__section-content');
    let contentCell;
    if (contentEl) {
      // Only gather direct children of .frach-m-accordion__section-content that are ELEMENT_NODEs and not empty
      const nodes = Array.from(contentEl.childNodes).filter(node => {
        if (node.nodeType === 1) {
          // Element: keep if not visually empty
          return node.textContent.trim() !== '' || node.querySelector('*');
        } else if (node.nodeType === 3) {
          // Text node: keep if not whitespace
          return node.textContent.trim() !== '';
        }
        return false;
      });
      // If only one node, just use it, else array
      contentCell = nodes.length === 1 ? nodes[0] : nodes;
    } else {
      contentCell = '';
    }
    rows.push([titleContent, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
