/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from example
  const headerRow = ['Accordion (accordion104)'];
  const rows = [headerRow];

  // Each accordion section (in this HTML, only one, but handle multiple generally)
  const accordionSections = element.querySelectorAll('.frach-m-accordion__section');

  accordionSections.forEach(section => {
    // Get the label/title (reference actual element)
    let labelNode = null;
    const toggleLabel = section.querySelector('.frach-m-accordion__toggle-label');
    if (toggleLabel) {
      // Use the label node directly
      labelNode = toggleLabel;
    } else {
      // fallback: just use text if no element
      const labelText = section.querySelector('label')?.textContent?.trim() || '';
      labelNode = document.createTextNode(labelText);
    }

    // Get the content node (direct reference)
    let contentNode = null;
    const contentSection = section.querySelector('.frach-m-accordion__section-content');
    if (contentSection) {
      contentNode = contentSection;
    } else {
      contentNode = document.createTextNode('');
    }

    rows.push([labelNode, contentNode]);
  });

  // Create and replace with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
