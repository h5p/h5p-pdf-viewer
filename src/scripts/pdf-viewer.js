import { pdfjs } from 'react-pdf';
import { createRoot } from 'react-dom/client';
import React from 'react';

import { DocumentViewer } from './DocumentViewer';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default class PdfViewer extends H5P.EventDispatcher {
  /**
   * @constructor
   *
   * @param {object} params Parameters passed by the editor.
   * @param {number} contentId Content's id.
   * @param {object} [extras] Saved state, metadata, etc.
   */
  constructor(params, contentId, extras = {}) {
    super();
    let username = H5PIntegration && H5PIntegration.user && H5PIntegration.user.name || 'world';
    this.element = document.createElement('div');
    this.element.innerText = params.textField.replace('%username', username);

    /**
     * Attach library to wrapper.
     *
     * @param {jQuery} $wrapper Content's container.
     */
    this.attach = function ($wrapper) {
      const root = createRoot($wrapper.get(0));
      // const path = encodeURI(this.getLibraryFilePath('assets/Fruit for SI.pdf'));
      const path = encodeURI(this.getLibraryFilePath('assets/smartimportsolar.pdf'));
      root.render(<DocumentViewer filePath={path} instance={this} />);
    };
  }
}
