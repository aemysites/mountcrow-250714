/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell array
  const headerRow = ['Tabs (tabs32)'];

  // Find the tab navigation list (ul with tab labels)
  const tabList = element.querySelector('ul');
  const tabItems = tabList ? tabList.querySelectorAll('li') : [];

  // Edge case: If no tabList or tabItems, do nothing
  if (!tabList || tabItems.length === 0) {
    return;
  }

  // Each tab row: [label, content], content is empty since not present in nav HTML
  const rows = Array.from(tabItems).map((li) => {
    const link = li.querySelector('a');
    // Handle missing anchor gracefully
    const label = link ? link.textContent.trim() : '';
    // Content is intentionally empty string as per HTML input
    return [label, ''];
  });

  // Correct table shape: header is a single cell, following rows are two cells
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element in the DOM with the new table
  element.replaceWith(table);
}
