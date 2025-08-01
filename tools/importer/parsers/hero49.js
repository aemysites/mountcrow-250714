/* global WebImporter */
export default function parse(element, { document }) {
  // Header: must be exactly as in the example
  const headerRow = ['Hero (hero49)'];

  // Background image: not present in HTML, leave blank
  const backgroundRow = [''];

  // Content row: Collect all visible hero content (headline, body text, button)
  const contentArr = [];

  // 1. HEADLINE (h2 with gradient bg)
  // Accept h1/h2/h3 for resilience, but prefer .frach-m-section-title h2 (as in provided HTML)
  let headline = element.querySelector('.frach-m-section-title h2, h1, h2, h3');
  if (headline) contentArr.push(headline);

  // 2. Copy text (with mailto link, if present). This is inside .frach-m-text-media__copy
  let textCopy = element.querySelector('.frach-m-text-media__copy');
  // If not present, try to find the first non-empty paragraph or div (should not be headline)
  if (!textCopy) {
    let paragraphs = Array.from(element.querySelectorAll('p'));
    let para = paragraphs.find(p => p.textContent && p.textContent.trim().length > 0 && (!headline || !headline.contains(p)));
    if (para) textCopy = para;
  }
  if (textCopy) contentArr.push(textCopy);

  // 3. CTA button: blue button, <a> with button class
  let ctaBtn = element.querySelector('a.button, a.frach-e-button, a[class*="button"]');
  if (ctaBtn) contentArr.push(ctaBtn);

  // Compose the block table as per example: single column, 3 rows (header, bg, content)
  const cells = [
    headerRow,
    backgroundRow,
    [contentArr]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
