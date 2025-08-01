/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root. Defensive: allow nested structure.
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find all top-level accordion sections
  const sectionContainers = accordion.querySelectorAll('.frach-m-accordion__section');

  // Block cells array (header, then rows)
  const cells = [];
  cells.push(['Accordion (accordion76)']);

  sectionContainers.forEach(section => {
    // --- TITLE CELL ---
    let titleText = '';
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      titleText = label.textContent.trim();
    } else {
      // fallback: use aria-labelledby if present
      const titleId = section.getAttribute('aria-labelledby');
      if (titleId) {
        const labelElem = section.querySelector(`#${titleId}`) || document.getElementById(titleId);
        if (labelElem) {
          titleText = labelElem.textContent.trim();
        }
      }
    }
    const titleCell = titleText;

    // --- CONTENT CELL ---
    let contentCell;    
    // Content for an accordion may include multiple elements
    const contentWrap = section.querySelector('.frach-m-accordion__section-content');
    if (contentWrap) {
      // Just reference all direct children of the content wrapper (usually <section> blocks)
      // We want to keep any HTML structure inside, not just text.
      const items = Array.from(contentWrap.childNodes).filter(n => {
        if (n.nodeType === 1) return true; // element
        if (n.nodeType === 3 && n.textContent.trim()) return true; // non-empty text
        return false;
      });
      contentCell = items.length === 1 ? items[0] : (items.length ? items : '');
    } else {
      contentCell = '';
    }

    cells.push([titleCell, contentCell]);
  });

  // Replace the element with the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
