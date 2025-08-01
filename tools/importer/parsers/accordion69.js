/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion block
  const accordion = element.querySelector('frach-m-accordion');
  if (!accordion) return;

  // Compose table header from block name (must match example exactly)
  const cells = [
    ['Accordion (accordion69)']
  ];

  // Gather all accordion rows (accordion items)
  const rows = Array.from(accordion.querySelectorAll('.frach-m-accordion__section'));
  rows.forEach((row) => {
    // Title Cell: the text label for the accordion (inside .frach-m-accordion__toggle-label)
    let titleCell = '';
    const label = row.querySelector('.frach-m-accordion__toggle-label');
    if (label) {
      // Use the <span> directly (preserve any inline formatting, if present)
      // If you must wrap in <strong>, but example does not require, use as-is.
      // We'll use the native element for reference.
      titleCell = label;
    }

    // Content Cell: all block content that appears when panel is open
    let contentCell = '';
    const content = row.querySelector('.frach-m-accordion__section-content');
    if (content) {
      // Look for .frach-m-text-media__media and .frach-m-text-media__copy
      // Sometimes, the .frach-m-text-media__media (image etc) comes before text
      const media = content.querySelector('.frach-m-text-media__media');
      const copy = content.querySelector('.frach-m-text-media__copy');
      if (media && copy) {
        // If both present, preserve their order in the DOM
        // Need to check which comes first in .frach-m-text-media__row
        const rowEl = content.querySelector('.frach-m-text-media__row');
        if (rowEl) {
          const children = Array.from(rowEl.children);
          let ordered = [];
          children.forEach(child => {
            if (child.classList.contains('frach-m-text-media__media')) {
              ordered.push(media);
            } else if (child.classList.contains('frach-m-text-media__text')) {
              ordered.push(copy);
            }
          });
          contentCell = ordered;
        } else {
          // fallback: [media, copy]
          contentCell = [media, copy];
        }
      } else if (copy) {
        contentCell = copy;
      } else if (media) {
        contentCell = media;
      } else {
        // fallback: reference all content
        contentCell = content;
      }
    }
    // Add the row only if it has some content
    if (titleCell || contentCell) {
      cells.push([
        titleCell,
        contentCell
      ]);
    }
  });

  // Create accordion block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
