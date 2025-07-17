/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const cells = [['Accordion (accordion33)']];

  // Each immediate child div is an accordion item
  const accordionItems = Array.from(element.querySelectorAll(':scope > div'));

  accordionItems.forEach((item) => {
    // Title: inside .w-dropdown-toggle > .paragraph-lg (keep as element for formatting)
    let title = item.querySelector(':scope > .w-dropdown-toggle > .paragraph-lg');
    if (!title) {
      // fallback: first .w-dropdown-toggle direct text
      const toggle = item.querySelector(':scope > .w-dropdown-toggle');
      if (toggle) {
        // try to find a div, or else use itself
        title = toggle.querySelector('div');
        if (!title && toggle.childNodes.length) title = toggle.childNodes[0];
      }
    }
    // Content: inside nav.accordion-content, prefer .w-richtext if it exists
    let content = item.querySelector('nav.accordion-content .w-richtext');
    if (!content) {
      const nav = item.querySelector('nav.accordion-content');
      if (nav) {
        // Use all content inside nav
        // If there's only one child, reference it, else wrap in a fragment
        const children = Array.from(nav.children);
        if (children.length === 1) {
          content = children[0];
        } else if (children.length > 1) {
          // Create a fragment for multiple children
          const frag = document.createDocumentFragment();
          children.forEach((el) => frag.appendChild(el));
          content = frag;
        }
      }
    }
    if (title && content) {
      cells.push([title, content]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
