/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the frach-e-table__container
  const tableSection = element.querySelector('.frach-e-table__container');
  if (!tableSection) return;

  // Find the frach-e-table inside
  const frachTable = tableSection.querySelector('frach-e-table');
  if (!frachTable) return;

  // Reference the REAL TABLE element inside frach-e-table
  const realTable = frachTable.querySelector('table');
  if (!realTable) return;

  // Remove unnecessary classes/attributes from the table and its children for clean output
  function cleanTable(table) {
    table.removeAttribute('class');
    table.removeAttribute('style');
    ['thead', 'tfoot', 'caption'].forEach(sel => {
      const rem = table.querySelector(sel);
      if (rem) rem.remove();
    });
    Array.from(table.querySelectorAll('*')).forEach((node) => {
      node.removeAttribute('class');
      node.removeAttribute('style');
      node.removeAttribute('width');
      node.removeAttribute('height');
      node.removeAttribute('align');
      node.removeAttribute('colspan');
      node.removeAttribute('rowspan');
    });
  }
  cleanTable(realTable);

  // Build the block: header and table as cell
  const headerRow = ['Table (striped, bordered)'];
  const blockRows = [headerRow, [realTable]];

  // Replace the outermost wrapper of the data table with the block table
  // Try to replace the section containing the table
  let replaceTarget = tableSection;
  let parent = tableSection.parentElement;
  while (parent && parent !== element && parent.children.length === 1) {
    replaceTarget = parent;
    parent = parent.parentElement;
  }

  const block = WebImporter.DOMUtils.createTable(blockRows, document);
  replaceTarget.replaceWith(block);
}
