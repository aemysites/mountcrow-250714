/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid row containing the cards
  const gridRow = element.querySelector('.frach-grid-row');
  if (!gridRow) return;
  const cardColumns = gridRow.querySelectorAll(':scope > div');
  const cards = [];

  cardColumns.forEach(col => {
    // Each grid column contains multiple <section>s, each with a <frach-m-image>
    const sections = col.querySelectorAll(':scope section');
    sections.forEach(section => {
      const imageBlock = section.querySelector('frach-m-image');
      if (imageBlock) {
        const figure = imageBlock.querySelector('figure');
        if (figure) {
          cards.push(figure);
        }
      }
    });
  });

  const rows = [
    ['Cards (cards72)']
  ];

  cards.forEach(figure => {
    // First column: image
    let imageEl = null;
    const imageLink = figure.querySelector('a');
    if (imageLink) {
      imageEl = imageLink.querySelector('img, frach-e-lazy-image');
    }
    // Second column: caption text as heading (strong), plus any additional figcaption text nodes
    const caption = figure.querySelector('figcaption');
    let textContent = document.createElement('div');
    if (caption) {
      // Heading
      if (caption.textContent && caption.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = caption.textContent.trim();
        textContent.appendChild(strong);
      }
      // Description: Any extra text or inline html after the heading in figcaption
      // Try to preserve html markup in figcaption (in case of <br> or <span> etc)
      let descNodes = Array.from(caption.childNodes).filter(node => {
        // Skip pure whitespace and the first text node (used for heading)
        if (node.nodeType === Node.TEXT_NODE) {
          // skip if same as heading
          return node.textContent.trim() && node.textContent.trim() !== caption.textContent.trim();
        }
        return true;
      });
      descNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textContent.appendChild(p);
        } else {
          textContent.appendChild(node.cloneNode(true));
        }
      });
    }
    rows.push([
      imageEl || '',
      textContent.childNodes.length ? textContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
