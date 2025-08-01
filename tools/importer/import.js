/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import accordion8Parser from './parsers/accordion8.js';
import accordion11Parser from './parsers/accordion11.js';
import columns2Parser from './parsers/columns2.js';
import cards10Parser from './parsers/cards10.js';
import accordion16Parser from './parsers/accordion16.js';
import accordion4Parser from './parsers/accordion4.js';
import cards15Parser from './parsers/cards15.js';
import accordion20Parser from './parsers/accordion20.js';
import columns21Parser from './parsers/columns21.js';
import columns18Parser from './parsers/columns18.js';
import columns19Parser from './parsers/columns19.js';
import columns22Parser from './parsers/columns22.js';
import columns1Parser from './parsers/columns1.js';
import cards24Parser from './parsers/cards24.js';
import tabs13Parser from './parsers/tabs13.js';
import columns23Parser from './parsers/columns23.js';
import tableStripedBordered26Parser from './parsers/tableStripedBordered26.js';
import hero30Parser from './parsers/hero30.js';
import accordion5Parser from './parsers/accordion5.js';
import cards25Parser from './parsers/cards25.js';
import columns29Parser from './parsers/columns29.js';
import hero35Parser from './parsers/hero35.js';
import accordion37Parser from './parsers/accordion37.js';
import carousel17Parser from './parsers/carousel17.js';
import hero36Parser from './parsers/hero36.js';
import cards42Parser from './parsers/cards42.js';
import cards41Parser from './parsers/cards41.js';
import accordion47Parser from './parsers/accordion47.js';
import columns44Parser from './parsers/columns44.js';
import cards40Parser from './parsers/cards40.js';
import tabs32Parser from './parsers/tabs32.js';
import columns50Parser from './parsers/columns50.js';
import carousel28Parser from './parsers/carousel28.js';
import columns48Parser from './parsers/columns48.js';
import hero49Parser from './parsers/hero49.js';
import columns53Parser from './parsers/columns53.js';
import columns34Parser from './parsers/columns34.js';
import accordion51Parser from './parsers/accordion51.js';
import cards52Parser from './parsers/cards52.js';
import cards7Parser from './parsers/cards7.js';
import accordion55Parser from './parsers/accordion55.js';
import columns54Parser from './parsers/columns54.js';
import accordion60Parser from './parsers/accordion60.js';
import accordion61Parser from './parsers/accordion61.js';
import accordion56Parser from './parsers/accordion56.js';
import accordion66Parser from './parsers/accordion66.js';
import columns65Parser from './parsers/columns65.js';
import accordion67Parser from './parsers/accordion67.js';
import columns64Parser from './parsers/columns64.js';
import accordion69Parser from './parsers/accordion69.js';
import accordion68Parser from './parsers/accordion68.js';
import accordion70Parser from './parsers/accordion70.js';
import accordion59Parser from './parsers/accordion59.js';
import accordion9Parser from './parsers/accordion9.js';
import accordion74Parser from './parsers/accordion74.js';
import cards33Parser from './parsers/cards33.js';
import accordion75Parser from './parsers/accordion75.js';
import cards72Parser from './parsers/cards72.js';
import columns62Parser from './parsers/columns62.js';
import accordion79Parser from './parsers/accordion79.js';
import columns77Parser from './parsers/columns77.js';
import accordion76Parser from './parsers/accordion76.js';
import accordion80Parser from './parsers/accordion80.js';
import columns78Parser from './parsers/columns78.js';
import accordion43Parser from './parsers/accordion43.js';
import accordion83Parser from './parsers/accordion83.js';
import columns71Parser from './parsers/columns71.js';
import hero88Parser from './parsers/hero88.js';
import accordion85Parser from './parsers/accordion85.js';
import accordion86Parser from './parsers/accordion86.js';
import accordion84Parser from './parsers/accordion84.js';
import columns87Parser from './parsers/columns87.js';
import columns93Parser from './parsers/columns93.js';
import cards73Parser from './parsers/cards73.js';
import columns91Parser from './parsers/columns91.js';
import columns92Parser from './parsers/columns92.js';
import accordion97Parser from './parsers/accordion97.js';
import accordion96Parser from './parsers/accordion96.js';
import columns63Parser from './parsers/columns63.js';
import columns98Parser from './parsers/columns98.js';
import columns82Parser from './parsers/columns82.js';
import columns99Parser from './parsers/columns99.js';
import accordion94Parser from './parsers/accordion94.js';
import columns95Parser from './parsers/columns95.js';
import accordion100Parser from './parsers/accordion100.js';
import accordion103Parser from './parsers/accordion103.js';
import columns106Parser from './parsers/columns106.js';
import accordion108Parser from './parsers/accordion108.js';
import columns107Parser from './parsers/columns107.js';
import columns110Parser from './parsers/columns110.js';
import columns109Parser from './parsers/columns109.js';
import accordion104Parser from './parsers/accordion104.js';
import carousel58Parser from './parsers/carousel58.js';
import hero81Parser from './parsers/hero81.js';
import video102Parser from './parsers/video102.js';
import accordion105Parser from './parsers/accordion105.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  accordion8: accordion8Parser,
  accordion11: accordion11Parser,
  columns2: columns2Parser,
  cards10: cards10Parser,
  accordion16: accordion16Parser,
  accordion4: accordion4Parser,
  cards15: cards15Parser,
  accordion20: accordion20Parser,
  columns21: columns21Parser,
  columns18: columns18Parser,
  columns19: columns19Parser,
  columns22: columns22Parser,
  columns1: columns1Parser,
  cards24: cards24Parser,
  tabs13: tabs13Parser,
  columns23: columns23Parser,
  tableStripedBordered26: tableStripedBordered26Parser,
  hero30: hero30Parser,
  accordion5: accordion5Parser,
  cards25: cards25Parser,
  columns29: columns29Parser,
  hero35: hero35Parser,
  accordion37: accordion37Parser,
  carousel17: carousel17Parser,
  hero36: hero36Parser,
  cards42: cards42Parser,
  cards41: cards41Parser,
  accordion47: accordion47Parser,
  columns44: columns44Parser,
  cards40: cards40Parser,
  tabs32: tabs32Parser,
  columns50: columns50Parser,
  carousel28: carousel28Parser,
  columns48: columns48Parser,
  hero49: hero49Parser,
  columns53: columns53Parser,
  columns34: columns34Parser,
  accordion51: accordion51Parser,
  cards52: cards52Parser,
  cards7: cards7Parser,
  accordion55: accordion55Parser,
  columns54: columns54Parser,
  accordion60: accordion60Parser,
  accordion61: accordion61Parser,
  accordion56: accordion56Parser,
  accordion66: accordion66Parser,
  columns65: columns65Parser,
  accordion67: accordion67Parser,
  columns64: columns64Parser,
  accordion69: accordion69Parser,
  accordion68: accordion68Parser,
  accordion70: accordion70Parser,
  accordion59: accordion59Parser,
  accordion9: accordion9Parser,
  accordion74: accordion74Parser,
  cards33: cards33Parser,
  accordion75: accordion75Parser,
  cards72: cards72Parser,
  columns62: columns62Parser,
  accordion79: accordion79Parser,
  columns77: columns77Parser,
  accordion76: accordion76Parser,
  accordion80: accordion80Parser,
  columns78: columns78Parser,
  accordion43: accordion43Parser,
  accordion83: accordion83Parser,
  columns71: columns71Parser,
  hero88: hero88Parser,
  accordion85: accordion85Parser,
  accordion86: accordion86Parser,
  accordion84: accordion84Parser,
  columns87: columns87Parser,
  columns93: columns93Parser,
  cards73: cards73Parser,
  columns91: columns91Parser,
  columns92: columns92Parser,
  accordion97: accordion97Parser,
  accordion96: accordion96Parser,
  columns63: columns63Parser,
  columns98: columns98Parser,
  columns82: columns82Parser,
  columns99: columns99Parser,
  accordion94: accordion94Parser,
  columns95: columns95Parser,
  accordion100: accordion100Parser,
  accordion103: accordion103Parser,
  columns106: columns106Parser,
  accordion108: accordion108Parser,
  columns107: columns107Parser,
  columns110: columns110Parser,
  columns109: columns109Parser,
  accordion104: accordion104Parser,
  carousel58: carousel58Parser,
  hero81: hero81Parser,
  video102: video102Parser,
  accordion105: accordion105Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
