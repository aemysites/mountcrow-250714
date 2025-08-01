/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Get all accordion section nodes
  const parsys = accordion.querySelector('.wcm-io-parsys.section');
  if (!parsys) return;
  const sectionNodes = Array.from(parsys.querySelectorAll(':scope > .frach-m-accordion__section'));

  // Prepare table rows: header first, then one row for each accordion section
  const rows = [['Accordion (accordion70)']];

  sectionNodes.forEach((section) => {
    // Title cell
    let titleCell = '';
    const labelEl = section.querySelector('.frach-m-accordion__toggle-label');
    if (labelEl) {
      // Use the child span if present, else the label itself
      const innerSpan = labelEl.querySelector('span');
      titleCell = innerSpan ? innerSpan : labelEl;
    }
    // Content cell
    let contentCell = '';
    const contentDiv = section.querySelector('.frach-m-accordion__section-content');
    if (contentDiv) {
      // Include all children of the contentDiv in a fragment
      const fragment = document.createDocumentFragment();
      Array.from(contentDiv.childNodes).forEach((child) => {
        if (
          (child.nodeType === 1 && !(child.tagName === 'SCRIPT' || child.tagName === 'STYLE')) ||
          (child.nodeType === 3 && child.textContent.trim())
        ) {
          fragment.appendChild(child);
        }
      });
      contentCell = fragment.childNodes.length > 0 ? fragment : '';
    }
    rows.push([titleCell, contentCell]);
  });

  // If there are no sections, add an empty row for structure
  if (sectionNodes.length === 0) {
    rows.push(['', '']);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
