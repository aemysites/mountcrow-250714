/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row exactly as specified
  const headerRow = ['Accordion (accordion74)'];
  const rows = [headerRow];

  // Find the accordion block, which contains all sections
  const accordion = element.querySelector('.frach-m-accordion');
  if (!accordion) return;

  // Find all accordion items (direct children of the accordion parsys)
  const sectionContainers = accordion.querySelectorAll(':scope > .wcm-io-parsys.section > .frach-m-accordion__section');
  sectionContainers.forEach(item => {
    // Title cell: use the exact .frach-m-accordion__toggle-label span element
    let titleContent = null;
    const label = item.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      // Use only the contents (not the icon)
      const labelSpan = label.querySelector('.frach-m-accordion__toggle-label');
      // If labelSpan exists, use that; otherwise, fallback to label
      titleContent = labelSpan || label;
    } else {
      titleContent = document.createTextNode('');
    }
    
    // Content cell: select the section inside .frach-m-accordion__section-content
    let contentCell = null;
    const sectionContent = item.querySelector('.frach-m-accordion__section-content');
    if (sectionContent) {
      // Use the entire <section> element if present
      const contentSection = sectionContent.querySelector(':scope > section');
      if (contentSection) {
        contentCell = contentSection;
      } else {
        // Fallback: use the sectionContent div itself
        contentCell = sectionContent;
      }
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleContent, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
