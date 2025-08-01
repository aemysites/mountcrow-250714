/* global WebImporter */
export default function parse(element, { document }) {
  // Find accordion root
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find all accordion sections (direct children)
  const sections = accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section');
  const cells = [['Accordion (accordion16)']];

  sections.forEach(section => {
    // --- Title cell: Use the label element (preserving icon etc.) ---
    let titleElem = null;
    const labelElem = section.querySelector(':scope > label.frach-m-accordion__toggle');
    if (labelElem) {
      titleElem = labelElem;
    } else {
      // fallback: use text content from span
      const span = section.querySelector('.frach-m-accordion__toggle-label');
      titleElem = span ? span.textContent.trim() : '';
    }

    // --- Content cell: all content from the content container ---
    let contentElem = null;
    const contentContainer = section.querySelector(':scope > .frach-m-accordion__section-content');
    if (contentContainer) {
      // gather all immediate <section> children (these are the content blocks)
      const innerSections = contentContainer.querySelectorAll(':scope > section');
      if (innerSections.length === 1) {
        contentElem = innerSections[0];
      } else if (innerSections.length > 1) {
        // If multiple sections, append all to a wrapper div
        const wrapper = document.createElement('div');
        innerSections.forEach(sec => wrapper.appendChild(sec));
        contentElem = wrapper;
      } else {
        // fallback: include whatever is in contentContainer
        contentElem = contentContainer;
      }
    }

    cells.push([titleElem, contentElem]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
