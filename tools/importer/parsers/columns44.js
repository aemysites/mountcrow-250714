/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by selector
  function getChildrenBySelector(parent, selector) {
    return Array.from(parent.querySelectorAll(`:scope > ${selector}`));
  }

  // Find the grid
  const grid = element.querySelector(':scope > .frach-grid');
  if (!grid) return;

  // --- CONTACT ROW ---
  // Get contact columns from the first frach-m-accordion's section-content > grid-row > grid-col-mq1-3
  let contactColumns = [];
  const accordions = getChildrenBySelector(grid, 'frach-m-accordion');
  if (accordions.length > 0) {
    const contactAccordion = accordions[0];
    const sectionContent = contactAccordion.querySelector('.frach-m-accordion__section-content');
    if (sectionContent) {
      const contactRow = sectionContent.querySelector(':scope > .frach-grid-row');
      if (contactRow) {
        contactColumns = getChildrenBySelector(contactRow, '.frach-grid-col-mq1-3');
      }
    }
  }
  // Pad to 4 columns (for table structure)
  while (contactColumns.length < 4) contactColumns.push('');

  // --- LINK & SOCIAL ROW ---
  // Find the first grid-row with 4 cols: 3 link-lists, 1 social
  let linkSocialRow = null;
  let linkSocialCols = [];
  const gridRows = getChildrenBySelector(grid, '.frach-grid-row');
  for (const row of gridRows) {
    const cols = getChildrenBySelector(row, '.frach-grid-col-mq1-3');
    // Look for the row with 4 columns
    if (cols.length === 4) {
      linkSocialRow = row;
      linkSocialCols = cols;
      break;
    }
  }

  // --- COPYRIGHT ROW ---
  // Find grid-row with .frach-meta
  let copyrightCol = null;
  for (const row of gridRows) {
    const col = row.querySelector(':scope > .frach-grid-col-mq1-12');
    if (col && col.querySelector('.frach-meta')) {
      copyrightCol = col;
      break;
    }
  }

  // --- TABLE BUILD ---
  const tableRows = [];
  tableRows.push(['Columns (columns44)']);
  tableRows.push(contactColumns);
  if (linkSocialCols.length === 4) {
    tableRows.push(linkSocialCols);
  }
  if (copyrightCol) {
    // Copyright row is a single row spanning all columns (put in col 0, rest empty for table shape)
    const row = [copyrightCol];
    while (row.length < 4) row.push('');
    tableRows.push(row);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
