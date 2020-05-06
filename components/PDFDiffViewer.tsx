import { useState } from 'react'
import { NextPage } from 'next'
import { Document, Page, pdfjs } from 'react-pdf'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { If } from './extras'
import { Uploader } from './Uploader'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PDFViewerProps {
  file: ArrayBuffer
  className: string
  pageInfo?: Function
}

const loop = (..._: any[]) => {}

const PDFViewer = ({
  file,
  pageInfo = loop,
  className = '',
}: PDFViewerProps) => {
  const [page, setPage] = useState<any>({
    numPages: null,
    pageNumber: 1,
  })
  if (page.numPages) pageInfo(page)
  return (
    <div className={className}>
      <Document
        file={file}
        renderMode="svg"
        onLoadSuccess={({ numPages }) => setPage({ ...page, numPages })}
      >
        <Page
          height={400}
          width={400}
          scale={0.5}
          pageNumber={page.pageNumber}
        />
      </Document>
    </div>
  )
}

const PDFUploadViewer = ({ id = '', pageInfo = loop }) => {
  const [file, setFile] = useState<any>(null)
  return (
    <>
      <If condition={!file}>
        <Uploader
          onUpload={(file: FileReader) => setFile(file)}
          className="p-3 m-2 text-center text-sm text-gray-600 border-solid border-1 border-gray-300 outline-none shadow-lg"
        />
      </If>
      <If condition={file}>
        <PDFViewer
          className="p-2 border-solid border-1 border-gray-300 outline-none shadow-lg max-h-xs max-w-xs"
          file={file}
          pageInfo={(info: any[]) => pageInfo({ info, id })}
        />
      </If>
    </>
  )
}

const PageNavigate = ({
  pageNumber,
  numPages,
}: {
  pageNumber: number
  numPages: number
}) => {
  const [page, setPage] = useState<any>({
    numPages,
    pageNumber,
  })
  return (
    <div className="grid gap-4">
      <button
        onClick={() => {
          const pageNumber = page.pageNumber
          if (pageNumber > 1) setPage({ ...page, pageNumber: pageNumber - 1 })
        }}
      >
        <FiChevronLeft />
      </button>
      <button> Page {pageNumber} of {numPages}</button>
      <button
        onClick={() => {
          const pageNumber = page.pageNumber
          if (pageNumber < page.numPages)
            setPage({ ...page, pageNumber: pageNumber + 1 })
        }}
      >
        <FiChevronRight />
      </button>
    </div>
  )
}

const PDFDiffViewer: NextPage<{}> = ({}) => {
  const [payload] = useState({
    originalNumPages: 0,
    compareNumPages: 0,
    pageNumber: 1,
  })
  return (
    <div className="flex flex-row justify-center">
      <PDFUploadViewer id="original" pageInfo={({}) => {}} />
      <PDFUploadViewer id="compare" pageInfo={({}) => {}} />
      <If condition={payload.originalNumPages && payload.compareNumPages}>
        <PageNavigate
          pageNumber={payload.pageNumber}
          numPages={Math.max(
            payload.originalNumPages && payload.compareNumPages
          )}
        />
      </If>
    </div>
  )
}

export { PDFDiffViewer }
