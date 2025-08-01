/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block inside the provided element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;
  // Get the container holding all accordion sections
  const sectionsContainer = accordion.querySelector('.wcm-io-parsys.section');
  if (!sectionsContainer) return;
  // Gather all immediate accordion sections
  const sections = Array.from(sectionsContainer.querySelectorAll(':scope > .frach-m-accordion__section'));
  // Prepare rows: first row is header, exactly as in the example
  const rows = [['Accordion (accordion67)']];
  sections.forEach(section => {
    // Title cell: find the label text (use the label element for semantic meaning)
    let label = section.querySelector('.frach-m-accordion__toggle-label');
    let titleCell;
    if (label) {
      // Use the span directly
      titleCell = label;
    } else {
      // fallback: try the whole label element
      const labelEl = section.querySelector('label.frach-m-accordion__toggle');
      if (labelEl) {
        // Use its innerText as a fallback
        titleCell = document.createTextNode(labelEl.innerText);
      } else {
        titleCell = document.createTextNode('');
      }
    }
    // Content cell: find section-content
    const content = section.querySelector('.frach-m-accordion__section-content');
    let contentCell = '';
    if (content) {
      // For each section, use all children (e.g. <section> blocks with grid etc.)
      // Only use element nodes (not text nodes)
      const sectionContentNodes = Array.from(content.children).filter((node) => node.nodeType === 1);
      if (sectionContentNodes.length === 1) {
        contentCell = sectionContentNodes[0];
      } else if (sectionContentNodes.length > 1) {
        contentCell = sectionContentNodes;
      } else {
        // fallback: if empty, use the content container itself
        contentCell = content;
      }
    }
    rows.push([titleCell, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
