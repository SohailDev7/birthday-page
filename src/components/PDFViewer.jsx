// PDFViewer.js
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';

// Fix PDF.js worker - use correct version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error) {
    console.error('PDF loading error:', error);
    setError('Failed to load PDF. Please try downloading it instead.');
  }

  const goToPreviousPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="pdf-viewer-container">
      {/* Controls */}
      <div className="pdf-controls">
        <div className="control-group">
          <button 
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="control-btn"
          >
            <FaChevronLeft />
          </button>
          
          <span className="page-info">
            Page {pageNumber} of {numPages || '?'}
          </span>
          
          <button 
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="control-btn"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="control-group">
          <button onClick={zoomOut} className="control-btn" disabled={scale <= 0.5}>
            <FaCompress />
          </button>
          <span className="scale-info">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="control-btn" disabled={scale >= 2.0}>
            <FaExpand />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="pdf-content">
        {error ? (
          <div className="pdf-error">
            <p>{error}</p>
            <a href={pdfFile} download className="download-fallback-btn">
              Download PDF Instead
            </a>
          </div>
        ) : (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Loading your beautiful poem...</p>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale}
              className="pdf-page"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;