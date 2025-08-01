/* global WebImporter */
export default function parse(element, { document }) {
  // According to the HTML provided, the element is only the overlay <div> (background layer)
  // There is no child or visible content; no image, headings, or CTA are present in the element itself

  // Per block structure: 1 col x 3 rows:
  // 1. Header: 'Hero (hero35)'
  // 2. Background image (optional, not found in element)
  // 3. Title, subheading, CTA (not found in element)

  // All rows must be present, but as there's no relevant content, we use empty strings for those cells
  const cells = [
    ['Hero (hero35)'],
    [''],
    ['']
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}