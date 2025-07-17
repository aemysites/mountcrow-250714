/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  // Get tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  if (!tabLinks.length || !tabPanes.length) {
    return;
  }

  // Header row must have TWO columns: ['Tabs', '']
  const rows = [['Tabs', '']];

  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    let label = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv && labelDiv.textContent.trim()) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }

    let tabContentBlock;
    if (tabPanes[i].children.length === 1) {
      tabContentBlock = tabPanes[i].children[0];
    } else if (tabPanes[i].children.length > 1) {
      const frag = document.createDocumentFragment();
      Array.from(tabPanes[i].children).forEach(child => frag.appendChild(child));
      tabContentBlock = frag;
    } else {
      tabContentBlock = tabPanes[i];
    }

    rows.push([label, tabContentBlock]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
