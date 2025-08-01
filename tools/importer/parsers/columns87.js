/* global WebImporter */
export default function parse(element, { document }) {
  // Find the pictogram key figures block
  const pictogramBlock = element.querySelector('.frach-m-pictogram-key-figures');
  if (!pictogramBlock) return;

  // Find the items container
  const itemsContainer = pictogramBlock.querySelector('.frach-m-pictogram-key-figures__items');
  if (!itemsContainer) return;

  // Find all item columns
  const items = Array.from(
    itemsContainer.querySelectorAll('.frach-m-pictogram-key-figures__item')
  );
  if (!items.length) return;

  // Remove extraneous info buttons with only an icon and no associated info text
  items.forEach(item => {
    const infoBtn = item.querySelector('.frach-m-pictogram-key-figures__percentage');
    const infoText = item.querySelector('.frach-m-pictogram-key-figures__info-text');
    if (infoBtn && !infoText && !infoBtn.textContent.trim()) {
      infoBtn.remove();
    }
  });

  // Ensure the header row is a single cell as per requirements
  const headerRow = ['Columns (columns87)'];
  // The content row is a single row with N columns (one for each item)
  const contentRow = items.map(item => item);
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
