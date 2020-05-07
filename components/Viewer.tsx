import React, { useState } from 'react'
import { NextPage } from 'next'
import { Document, Page, pdfjs } from 'react-pdf'
import { connect } from 'unistore/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

import { If } from './extras'
import { Uploader } from './Uploader'
import actions from '../lib/redux/actions'

const UploaderAndViewer = connect<
  {
    id: string
  },
  {},
  {},
  {}
>(
  ['original', 'compare', 'pageNumber'],
  actions
)(({ id = '', original, compare, pageNumber, initilizePageNumber }: any) => {
  const [file, setFile] = useState<any>(null)
  return (
    <div id={id} className="flex flex-row mr-2">
      <If condition={!file}>
        <Uploader
          onUpload={(file: FileReader) => setFile(file)}
          className="p-6 m-2 text-center text-sm border-solid outline-none shadow-lg"
        />
      </If>
      <If condition={file}>
        <Document
          file={file}
          renderMode="svg"
          onLoadSuccess={({ numPages }: any) =>
            initilizePageNumber({ id, numPages })
          }
          className="p-2 border-solid outline-none shadow-lg max-h-xs max-w-xs"
        >
          <If condition={pageNumber >= 1}>
            <Page
              scale={0.5}
              pageNumber={
                pageNumber <=
                (id === 'original' ? original.numPages : compare.numPages)
                  ? pageNumber
                  : 1
              }
              error={<div>Page not found</div>}
            />
          </If>
        </Document>
      </If>
    </div>
  )
})

const PageNavigate = connect(
  ['original', 'compare', 'pageNumber'],
  actions
)(
  ({
    original,
    compare,
    pageNumber,
    incrementPageNumber,
    decrementPageNumber,
  }: any) => {
    return (
      <>
        <button aria-label="Previous" onClick={decrementPageNumber}>
          <FiChevronLeft />
        </button>
        <p>
          Page {pageNumber} of {Math.max(original.numPages, compare.numPages)}
        </p>
        <button aria-label="Next" onClick={incrementPageNumber}>
          <FiChevronRight />
        </button>
      </>
    )
  }
)

const Viewer: NextPage<{}> = connect(
  [],
  actions
)(({}: any) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center">
        <UploaderAndViewer id="original" />
        <UploaderAndViewer id="compare" />
      </div>
      <div className="flex flex-row justify-center">
        <PageNavigate />
      </div>
    </div>
  )
})

export default Viewer
