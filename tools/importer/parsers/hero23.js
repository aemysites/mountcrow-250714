/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header, exactly as specified
  const headerRow = ['Hero (hero23)'];

  // 2. Find the main image (background/hero image)
  // Search for the first <img> descendant in the section
  const imageEl = element.querySelector('img');

  // 3. Find the content area (title, subheading/paragraph, CTAs)
  // Look for the first .section descendant
  const contentSection = element.querySelector('.section');
  const contentBits = [];

  if (contentSection) {
    // Heading (h1/h2/h3...)
    const heading = contentSection.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentBits.push(heading);

    // Subheading/paragraph(s): .rich-text or .w-richtext, or plain <p>
    // Add all paragraphs in .rich-text/.w-richtext
    const richText = contentSection.querySelector('.rich-text, .w-richtext');
    if (richText) {
      // Add each top-level <p> (do not duplicate those included below)
      richText.querySelectorAll(':scope > p').forEach(p => contentBits.push(p));
    } else {
      // Fallback: single <p>
      const para = contentSection.querySelector('p');
      if (para) contentBits.push(para);
    }

    // Button group (CTAs): group as one node if present, else collect individual buttons
    const buttonGroup = contentSection.querySelector('.button-group');
    if (buttonGroup) {
      contentBits.push(buttonGroup);
    } else {
      const buttons = contentSection.querySelectorAll('a.button');
      if (buttons.length > 0) {
        contentBits.push(Array.from(buttons));
      }
    }
  }

  // 4. Compose the 1-column, 3-row table
  //    Row 1: header; Row 2: image; Row 3: content
  const cells = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentBits]
  ];

  // 5. Replace the input element with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
