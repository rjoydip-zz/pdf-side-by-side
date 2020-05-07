import { useState } from 'react'
import { NextPage } from 'next'
import { Document, Page, pdfjs } from 'react-pdf'
import { useSelector } from 'react-redux'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { If } from './extras'
import { Uploader } from './Uploader'
import { initilizePageNumber } from '../lib/redux/actions'
import { useDispatchWrapper } from '../hooks'
import { loop } from '../utils'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PDFViewerProps {
  file: ArrayBuffer
  className: string
  pageInfo?: Function
}

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

const PDFUploadViewer = ({ id = '', onPageInfo = loop }) => {
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
          pageInfo={(info: any) => onPageInfo({ numPages: info.numPages, id })}
        />
      </If>
    </>
  )
}

const PageNavigate = ({}) => {
  const { numPages, pageNumber } = useSelector((state: any) => state.pagination)
  return (
    <>
      <button onClick={() => {}}>
        <FiChevronLeft />
      </button>
      <button>
        Page {pageNumber} of {numPages}
      </button>
      <button onClick={() => {}}>
        <FiChevronRight />
      </button>
    </>
  )
}

const Viewer: NextPage<{}> = ({}) => {
  const state = useSelector((state: any) => state)
  console.log(state)
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center">
        <PDFUploadViewer
          id="original"
          onPageInfo={({ numPages }) =>
            useDispatchWrapper(initilizePageNumber(numPages))
          }
        />
      </div>
      <div className="flex flex-row justify-center">
        <PageNavigate />
      </div>
    </div>
  )
}

export { Viewer }
