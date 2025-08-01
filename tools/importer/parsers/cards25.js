/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards25)'];

  // Find all direct card columns (each card)
  const cardColumns = element.querySelectorAll('.frach-grid-row > .frach-grid-col-mq1-12');
  const rows = [headerRow];

  cardColumns.forEach(col => {
    // Find the contact card
    const contact = col.querySelector('.frach-m-contact');
    if (!contact) return; // skip empty

    // Get the image (frach-e-lazy-image)
    const imgTag = contact.querySelector('frach-e-lazy-image');
    let imgEl = null;
    if (imgTag) {
      imgEl = document.createElement('img');
      imgEl.src = imgTag.getAttribute('src');
      imgEl.alt = imgTag.getAttribute('alt') || '';
      if (imgTag.hasAttribute('width')) imgEl.width = parseInt(imgTag.getAttribute('width'), 10);
      if (imgTag.hasAttribute('height')) imgEl.height = parseInt(imgTag.getAttribute('height'), 10);
    } else {
      imgEl = document.createElement('span'); // fallback for robustness
    }

    // Get the info block
    const info = contact.querySelector('address.frach-m-contact__info');
    const textCellContent = [];
    if (info) {
      // Name (h6) as <strong>
      const name = info.querySelector('h6');
      if (name && name.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = name.textContent.trim();
        textCellContent.push(strong);
      }
      // Description (p.frach-body)
      const desc = info.querySelector('p');
      if (desc && desc.textContent.trim()) {
        if (textCellContent.length) textCellContent.push(document.createElement('br'));
        textCellContent.push(desc);
      }
      // Phone/email links
      const links = info.querySelectorAll('a.frach-e-link');
      links.forEach(link => {
        if (link.textContent.trim()) {
          if (textCellContent.length) textCellContent.push(document.createElement('br'));
          // Remove any child <frach-e-icon> for clean link text
          const icons = link.querySelectorAll('frach-e-icon');
          icons.forEach(icon => icon.remove());
          textCellContent.push(link);
        }
      });
    }

    rows.push([imgEl, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
