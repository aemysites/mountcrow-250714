/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Each accordion row is inside a .wcm-io-parsys.section > .frach-m-accordion__section
  const sectionContainers = accordion.querySelectorAll('.wcm-io-parsys.section');
  const rows = [];
  rows.push(['Accordion (accordion55)']); // Block header as in example

  sectionContainers.forEach(sectionContainer => {
    const section = sectionContainer.querySelector('.frach-m-accordion__section');
    if (!section) return;
    // Title: .frach-m-accordion__toggle-label
    const label = section.querySelector('.frach-m-accordion__toggle-label');
    const title = label ? label.textContent.trim() : '';
    // Content: .frach-m-accordion__section-content
    const contentContainer = section.querySelector('.frach-m-accordion__section-content');
    let contentFragment = document.createDocumentFragment();
    if (contentContainer) {
      // Move children into the fragment, preserving all HTML
      Array.from(contentContainer.children).forEach(child => {
        contentFragment.appendChild(child);
      });
    }
    rows.push([title, contentFragment]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
