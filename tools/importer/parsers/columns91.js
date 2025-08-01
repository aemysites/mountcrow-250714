/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the grid row containing the columns
  const grid = element.querySelector('.frach-grid');
  let columns = [];

  if (grid) {
    const gridRow = grid.querySelector('.frach-grid-row');
    if (gridRow) {
      // The columns are direct children of gridRow with class frach-grid-col-mq1-12
      const colNodes = getImmediateChildren(gridRow, 'div.frach-grid-col-mq1-12');
      // For each column, extract the main content for use as the cell
      columns = colNodes.map(col => {
        // Look for the .aem-Grid inside
        const gridInner = col.querySelector('.aem-Grid');
        if (gridInner) {
          // There may be one or more sections inside .aem-Grid
          const sections = getImmediateChildren(gridInner, 'section');
          if (sections.length === 1) {
            // Just use the section
            return sections[0];
          } else if (sections.length > 1) {
            // Wrap multiple sections in a container
            const wrapper = document.createElement('div');
            sections.forEach(child => wrapper.appendChild(child));
            return wrapper;
          } else {
            // Fallback: use gridInner
            return gridInner;
          }
        } else {
          // Fallback: use the column node itself
          return col;
        }
      });
    }
  }

  // Compose the table rows
  // The header row must be a single cell (array of one string element)
  const headerRow = ['Columns (columns91)'];
  // The second row should have one cell for each column
  const tableRows = [headerRow, columns];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // After table creation, manually adjust the header row to span all columns if there are multiple columns
  if (columns.length > 1) {
    // Get the first tr (header row)
    const firstTr = table.querySelector('tr');
    if (firstTr) {
      const firstTh = firstTr.querySelector('th');
      if (firstTh) {
        firstTh.setAttribute('colspan', columns.length);
      }
      // Remove any extra th elements if there are (defensive, in case createTable adds empty ths)
      while (firstTh.nextElementSibling) {
        firstTr.removeChild(firstTh.nextElementSibling);
      }
    }
  }

  // Replace the element with the block table
  element.replaceWith(table);
}
