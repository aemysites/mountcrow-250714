/* global WebImporter */
export default function parse(element, { document }) {
  // Create the table header as in example
  const headerRow = ['Accordion (accordion108)'];

  // Find the accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Get all .frach-m-accordion__section elements under all .wcm-io-parsys.section in the accordion
  const sections = Array.from(
    accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section')
  );

  // For each accordion section, create a table row
  const rows = sections.map((section) => {
    // Title cell: the label text and any formatting
    let titleContent = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      titleContent = label;
    } else {
      // fallback to label element text if present
      const lab = section.querySelector('.frach-m-accordion__toggle');
      if (lab) titleContent = lab;
      else titleContent = '';
    }

    // Content cell: the accordion content
    // Use the .frach-m-accordion__section-content, and within it grab the first section if present,
    // otherwise use the content container directly (to handle unforeseen variations)
    let contentCell = '';
    const content = section.querySelector('.frach-m-accordion__section-content');
    if (content) {
      // Check for a single wrapping section inside the content
      const innerSection = content.querySelector(':scope > section');
      if (innerSection) {
        contentCell = innerSection;
      } else {
        // No wrapping section, use whole content container
        contentCell = content;
      }
    }
    return [titleContent, contentCell];
  });

  // Assemble table
  const table = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
