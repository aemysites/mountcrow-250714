/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create the header row as specified
  const headerRow = ['Carousel (carousel28)'];

  // Step 2: Find all slides
  // Slides are direct children of .frach-m-slider__slides under .frach-m-slider__viewport
  const slidesRoot = element.querySelector('.frach-m-slider__viewport .frach-m-slider__slides');
  // Defensive: If not found, fallback to finding all .frach-m-slider__slide inside the element
  const slideEls = slidesRoot ? slidesRoot.querySelectorAll(':scope > .frach-m-slider__slide') : element.querySelectorAll('.frach-m-slider__slide');

  const rows = [];
  
  slideEls.forEach(slide => {
    // For each slide: get the media and the text content
    let imgCell = '';
    let textCell = '';

    const textMediaRow = slide.querySelector('.frach-m-text-media__row');
    if (textMediaRow) {
      // Media (first cell)
      const media = textMediaRow.querySelector('.frach-m-text-media__media');
      if (media) imgCell = media;
      // Text (second cell)
      const text = textMediaRow.querySelector('.frach-m-text-media__text');
      if (text) textCell = text;
    }
    // Only push if media (image/video) exists
    if (imgCell) {
      rows.push([imgCell, textCell || '']);
    }
  });

  // Step 3: Construct the table
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Step 4: Replace the original element with the block table
  element.replaceWith(block);
}
