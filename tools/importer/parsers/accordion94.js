/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .frach-m-accordion element
  const accordion = element.querySelector('.frach-m-accordion');
  if (!accordion) return;

  // Accordion sections are direct children of .wcm-io-parsys.section inside the accordion
  const parsys = accordion.querySelector(':scope > .wcm-io-parsys.section');
  if (!parsys) return;
  const sections = Array.from(parsys.querySelectorAll(':scope > .frach-m-accordion__section'));
  if (!sections.length) return;

  const cells = [["Accordion (accordion94)"]];

  sections.forEach(section => {
    // Get the title cell as text content, keeping semantic heading/text
    let title = '';
    const labelSpan = section.querySelector('.frach-m-accordion__toggle-label');
    if (labelSpan) {
      title = labelSpan.textContent.trim();
    }

    // Content cell: collect all block-level content from section-content
    let contentCell = '';
    const contentBlock = section.querySelector('.frach-m-accordion__section-content');
    if (contentBlock) {
      // Gather all element and text nodes to preserve full content
      const contents = [];
      Array.from(contentBlock.childNodes).forEach((node) => {
        // Ignore empty text nodes
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
        contents.push(node);
      });
      if (contents.length === 1) {
        contentCell = contents[0];
      } else if (contents.length > 1) {
        contentCell = contents;
      } else {
        contentCell = '';
      }
    }
    cells.push([title, contentCell]);
  });

  // Create and replace with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
