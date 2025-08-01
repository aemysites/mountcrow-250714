/* global WebImporter */
export default function parse(element, { document }) {
  // Block header exactly as in the example
  const headerRow = ['Video'];

  const cellContent = [];

  // 1. Gather ALL visible text content (except overlay UI labels/buttons)
  // We'll only add text nodes that are not inside script/style/noscript
  function extractVisibleText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        // Only accept if parent is not script/style/noscript and has non-empty trimmed content
        if (
          node.parentNode &&
          !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentNode.tagName) &&
          node.textContent &&
          node.textContent.trim()
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    });
    let node;
    const texts = [];
    while ((node = walker.nextNode())) {
      // Exclude known overlay/slider UI labels
      if (!['0', 'Close overlay', 'Previous Slide', 'Next Slide', ''].includes(node.textContent.trim())) {
        texts.push(node.textContent.trim());
      }
    }
    return texts;
  }

  const textContents = extractVisibleText(element);
  textContents.forEach(text => {
    // Use <p> for each text chunk for semantic clarity and block display
    const p = document.createElement('p');
    p.textContent = text;
    cellContent.push(p);
  });

  // 2. Find poster image (img[data-src]) and reference it from the live DOM
  let imgEl = null;
  const lazyVideo = element.querySelector('frach-e-lazy-video');
  if (lazyVideo) {
    const img = lazyVideo.querySelector('img[data-src]');
    if (img) {
      if (!img.hasAttribute('src')) {
        img.setAttribute('src', img.getAttribute('data-src'));
      }
      imgEl = img;
      cellContent.push(imgEl);
    }
  }

  // 3. Find the video file URL (prefer <video><source src>) or fallback to <source data-src>
  let videoUrl = '';
  if (lazyVideo) {
    // Prefer <video><source src>
    const video = lazyVideo.querySelector('video');
    let source = null;
    if (video) {
      source = video.querySelector('source[src]');
      if (source) {
        videoUrl = source.getAttribute('src');
      }
    }
    // Fallback <source data-src>
    if (!videoUrl) {
      source = lazyVideo.querySelector('source[data-src]');
      if (source) {
        videoUrl = source.getAttribute('data-src');
      }
    }
  }
  if (videoUrl) {
    // Add a <br> if there is text or image already
    if (cellContent.length > 0) {
      cellContent.push(document.createElement('br'));
    }
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(a);
  }

  // 4. Compose the table structure (1 column, 2 rows)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [cellContent.length ? cellContent : '']
  ], document);

  element.replaceWith(table);
}
