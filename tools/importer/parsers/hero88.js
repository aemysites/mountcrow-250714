/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Hero (hero88)'];

  // 2nd row: Background image (optional, none present in HTML)
  const imageRow = [''];

  // 3rd row: Content (title, subheading, CTA)
  // Get the relevant containers
  const textContainer = element.querySelector('.frach-m-cta__text-container');
  const ctaContainer = element.querySelector('.frach-m-cta__cta-container');
  const content = [];

  if (textContainer) {
    // Include heading (could be h2/h3)
    const heading = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) content.push(heading);
    // Include additional text (p, span, etc)
    const paras = textContainer.querySelectorAll('p, span');
    paras.forEach((para) => content.push(para));
  }
  if (ctaContainer) {
    // Look for any button (a tag)
    const button = ctaContainer.querySelector('a');
    if (button) content.push(button);
  }

  const contentRow = [content];
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
