/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion element
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Find all accordion sections
  const sections = accordion.querySelectorAll('.frach-m-accordion__section');

  // Prepare the header row with the exact block name
  const rows = [['Accordion (accordion66)']];

  sections.forEach(section => {
    // Title cell: Get the visible label, prefer span inside label
    let title = '';
    const labelEl = section.querySelector('.frach-m-accordion__toggle-label');
    if (labelEl) {
      title = labelEl.textContent.trim();
    } else {
      // fallback: get label's text
      const label = section.querySelector('label');
      if (label) {
        title = label.textContent.trim();
      }
    }

    // Content cell: get the .frach-m-accordion__section-content element
    // and inside it, grab the <section> or whatever content block is present
    let content = null;
    const contentWrapper = section.querySelector('.frach-m-accordion__section-content');
    if (contentWrapper) {
      // Find first significant content element inside contentWrapper
      // Prefer the <section> block if it exists, otherwise everything inside contentWrapper
      let sectionBlock = contentWrapper.querySelector('section');
      if (sectionBlock) {
        content = sectionBlock;
      } else {
        // fallback: just use all children of contentWrapper
        const children = Array.from(contentWrapper.children);
        if (children.length) {
          content = children;
        } else {
          // fallback: use contentWrapper itself
          content = contentWrapper;
        }
      }
    }

    // Only push row if we have both title and content
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
