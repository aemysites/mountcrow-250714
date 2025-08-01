/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Get all immediate accordion section elements
  const accordionSections = Array.from(
    accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section')
  );

  // Defensive: handle alternate markup variant where .frach-m-accordion__section is nested directly
  if (accordionSections.length === 0) {
    // Try fallback selector
    Array.from(accordion.querySelectorAll('.frach-m-accordion__section')).forEach(e => {
      if (!accordionSections.includes(e)) accordionSections.push(e);
    });
  }

  // Table header as in the example
  const headerRow = ['Accordion (accordion56)'];
  const rows = [headerRow];

  accordionSections.forEach(section => {
    // Title cell: find the label span inside the toggle label
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    let titleCell = '';
    if (label) {
      titleCell = label;
    } else {
      // fallback: try label text
      const labelAlt = section.querySelector('.frach-m-accordion__toggle');
      if (labelAlt) {
        titleCell = labelAlt.textContent.trim();
      }
    }
    // Content cell: collect all direct children of the content area
    const content = section.querySelector('.frach-m-accordion__section-content');
    let contentCell = '';
    if (content) {
      // collect only direct children (to avoid table structure issues)
      const children = Array.from(content.children);
      if (children.length > 0) {
        contentCell = children;
      } else {
        // Some edge cases: if no children, but there's text or content
        if (content.textContent && content.textContent.trim() !== '') {
          // Create a <div> to preserve content
          const div = document.createElement('div');
          div.textContent = content.textContent;
          contentCell = div;
        } else {
          contentCell = content;
        }
      }
    }
    rows.push([
      titleCell,
      contentCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
