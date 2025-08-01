/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Identify all accordion section elements (each item in the accordion)
  // Accordion sections are direct children of `.wcm-io-parsys.section` inside the accordion
  const sectionParsys = accordion.querySelectorAll(':scope > .wcm-io-parsys.section');

  // Prepare rows for the block table
  const rows = [];
  // The block header row, must match the example exactly
  rows.push(['Accordion (accordion11)']);

  // For each section, extract the title and content
  sectionParsys.forEach(parsys => {
    // There should only be one '.frach-m-accordion__section' per parsys
    const section = parsys.querySelector(':scope > .frach-m-accordion__section');
    if (!section) return; // Skip if missing

    // Title cell: get the label text as an element (strong)
    let titleCell = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label && label.textContent && label.textContent.trim()) {
      // Use a strong for semantic heading as in the example
      const strong = document.createElement('strong');
      strong.textContent = label.textContent.trim();
      titleCell = strong;
    }

    // Content cell: get the full content section for this accordion item
    let contentCell = '';
    // Content is inside .frach-m-accordion__section-content > section
    const sectionContent = section.querySelector(':scope > .frach-m-accordion__section-content');
    if (sectionContent) {
      // Usually a <section> as direct child, which wraps all content/media/etc.
      const innerSection = sectionContent.querySelector(':scope > section');
      if (innerSection) {
        contentCell = innerSection;
      } else {
        // fallback, if section is missing (shouldn't happen in this HTML)
        contentCell = sectionContent;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the element with the new block
  element.replaceWith(table);
}
