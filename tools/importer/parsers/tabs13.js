/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab navigation containing tab labels
  const nav = element.querySelector('frach-m-tab-navigation ul');
  if (!nav) return;
  const tabLinks = Array.from(nav.querySelectorAll('a'));

  // Find all tab panels (content containers)
  const tabPanels = Array.from(element.querySelectorAll('.frach-m-tabbed-content__panel'));
  // Map panel ids for easy access
  const panelById = {};
  tabPanels.forEach(panel => { if (panel.id) panelById[panel.id] = panel; });

  function getAllPanelContent(panel) {
    // Get all direct children except tab navigation, scripts, and empty whitespace
    return Array.from(panel.childNodes).filter(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') return false;
      if (node.nodeType === Node.ELEMENT_NODE && node.matches('frach-m-tab-navigation')) return false;
      return true;
    });
  }

  // Build block table array: header + one row per tab [label, content]
  // Ensure header row is exactly one cell, all other rows are two cells
  const cells = [
    ['Tabs (tabs13)']
  ];
  tabLinks.forEach((a, idx) => {
    // Tab label in <strong>
    const strong = document.createElement('strong');
    strong.textContent = a.textContent.trim();
    // Tab content
    const href = a.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : href;
    let panel = panelById[id] || tabPanels[idx];
    let cellContent = '';
    if (panel) {
      const contentNodes = getAllPanelContent(panel);
      // If only one content node, just use it; if more, array
      cellContent = contentNodes.length === 1 ? contentNodes[0] : contentNodes;
    }
    cells.push([strong, cellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
