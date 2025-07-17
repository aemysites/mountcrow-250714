/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should be exactly one column
  const headerRow = ['Carousel (carousel20)'];

  // Prepare array for slide rows
  const slides = [];

  // Find all .card-body elements for possible multiple slides
  const cardBodies = element.querySelectorAll('.card-body');
  cardBodies.forEach(cardBody => {
    // Image (mandatory): first <img> inside cardBody
    const img = cardBody.querySelector('img');
    // Text: title (optional, heading)
    let textCell = '';
    const heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
    if (heading) {
      textCell = heading;
    }
    // Each slide row must be an array of two cells
    slides.push([
      img || '',
      textCell || ''
    ]);
  });

  // Build the final table rows: header (single cell), then slides (two cells)
  const rows = [headerRow, ...slides];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
