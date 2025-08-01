/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero36)'];

  // Find frach-m-hero inside the section
  const hero = element.querySelector('frach-m-hero');

  // --- ROW 2: Image ---
  let imageCell = [''];
  if (hero) {
    const imgContainer = hero.querySelector('.frach-m-hero__media-container');
    if (imgContainer) {
      const lazyImg = imgContainer.querySelector('frach-e-lazy-image');
      if (lazyImg) {
        const img = document.createElement('img');
        if (lazyImg.hasAttribute('src')) img.src = lazyImg.getAttribute('src');
        if (lazyImg.hasAttribute('alt')) img.alt = lazyImg.getAttribute('alt');
        imageCell = [img];
      }
    }
  }

  // --- ROW 3: Headline/Text/CTA ---
  // Gather all non-image direct children of .frach-grid-row
  let textCellContent = [];
  if (hero) {
    const gridRow = hero.querySelector('.frach-grid-row');
    if (gridRow) {
      const children = Array.from(gridRow.children);
      for (const child of children) {
        if (child.classList.contains('frach-m-hero__media')) continue;
        // Only include if contains visible text or elements (e.g. h1, h2, p, button, etc)
        if (child.textContent.trim() !== '' || child.querySelector('*')) {
          textCellContent.push(child);
        }
      }
    }
  }
  // Ensure cell is never empty: if no text/call-to-action, put an empty string
  if (textCellContent.length === 0) {
    textCellContent = [''];
  }

  // Compose the table
  const cells = [
    headerRow,
    [imageCell],
    [textCellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
