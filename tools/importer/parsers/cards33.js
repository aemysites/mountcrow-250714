/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const cells = [['Cards (cards33)']];

  // Find the slider
  const slider = element.querySelector('.frach-m-slider');
  if (!slider) return;

  // Get all slides
  const slides = slider.querySelectorAll('.frach-m-slider__slide');

  slides.forEach(slide => {
    // Each slide may contain multiple .frach-m-teaser (some slides have two stacked)
    const teasers = slide.querySelectorAll(':scope > .frach-m-teaser');

    teasers.forEach(teaser => {
      // --- IMAGE CELL (first col) ---
      let imgCell = '';
      const imgWrapper = teaser.querySelector('.frach-m-teaser__image-wrapper');
      if (imgWrapper) {
        // Prefer <img> if present, otherwise create from <frach-e-lazy-image>
        let img = imgWrapper.querySelector('img');
        if (!img) {
          const lazyImg = imgWrapper.querySelector('frach-e-lazy-image');
          if (lazyImg) {
            img = document.createElement('img');
            img.src = lazyImg.getAttribute('src') || '';
            img.alt = lazyImg.getAttribute('alt') || '';
          }
        }
        if (img) imgCell = img;
      }

      // --- TEXT CELL (second col) ---
      const textCellContent = [];
      // Theme (if present and not just whitespace)
      const theme = teaser.querySelector('.frach-m-teaser__theme');
      if (theme && theme.textContent.trim()) {
        const themeDiv = document.createElement('div');
        themeDiv.textContent = theme.textContent.trim();
        textCellContent.push(themeDiv);
      }
      // Headline (h6 containing link)
      const headline = teaser.querySelector('.frach-m-teaser__headline');
      if (headline) {
        const link = headline.querySelector('a');
        if (link) {
          // Use <h3> for semantic clarity, as in block example
          const h3 = document.createElement('h3');
          h3.appendChild(link);
          textCellContent.push(h3);
        } else {
          textCellContent.push(headline);
        }
      }
      // Description
      const desc = teaser.querySelector('.frach-m-teaser__text');
      if (desc && desc.textContent.trim()) {
        textCellContent.push(desc);
      }
      // CTA link at bottom
      const cta = teaser.querySelector('.frach-m-teaser__link');
      if (cta && cta.href) {
        const label = cta.querySelector('.frach-e-button__label');
        if (label) {
          const ctaLink = document.createElement('a');
          ctaLink.href = cta.href;
          ctaLink.textContent = label.textContent;
          if (cta.target) ctaLink.target = cta.target;
          // Wrap in <div> for vertical stacking
          const ctaDiv = document.createElement('div');
          ctaDiv.appendChild(ctaLink);
          textCellContent.push(ctaDiv);
        }
      }
      // If no textCellContent, add empty string to preserve cell
      cells.push([
        imgCell,
        textCellContent.length ? textCellContent : ''
      ]);
    });
  });

  // Replace the element with the new table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
