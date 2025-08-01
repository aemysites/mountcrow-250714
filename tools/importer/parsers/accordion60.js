/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion container
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find all accordion section blocks
  // These are direct children of .wcm-io-parsys.section under the main accordion
  const sectionWrappers = accordion.querySelectorAll('.wcm-io-parsys.section');

  // Prepare the table rows, first row is the header (block name as per spec)
  const rows = [['Accordion (accordion60)']];

  sectionWrappers.forEach((wrapper) => {
    const section = wrapper.querySelector('.frach-m-accordion__section');
    if (!section) return;

    // Title cell: get the visible label text of the accordion
    let titleText = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      titleText = label.textContent.trim();
    }

    // Content cell: get only the <section> under the section content (preserves all body markup)
    let contentElement = null;
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      const innerSection = content.querySelector('section');
      if (innerSection) {
        contentElement = innerSection;
      } else {
        // fallback, reference all direct children (should not usually happen)
        contentElement = content;
      }
    }

    // Only add row if there's a title (defensive for malformed HTML)
    if (titleText && contentElement) {
      rows.push([titleText, contentElement]);
    }
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
