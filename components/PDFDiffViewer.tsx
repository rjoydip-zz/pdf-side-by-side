import { useState } from 'react'
import { NextPage } from 'next'
import { Document, Page } from 'react-pdf'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { If } from './extras'
import { Uploader } from './Uploader'
import { Grid } from './styles'

const UploaderPDFViewer = () => {
  const [file, setFile] = useState<any>(null)
  const [page, setPage] = useState<any>({
    numPages: null,
    pageNumber: 1,
  })
  return (
    <>
      <If condition={file === null}>
        <Uploader onUpload={(file: FileReader) => setFile(file)} />
      </If>
      <If condition={file !== null}>
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setPage({ ...page, numPages })}
        >
          <Page pageNumber={page.pageNumber} />
        </Document>
        <Grid className="grid gap-4">
          <button
            onClick={() => {
              const pageNumber = page.pageNumber
              if (pageNumber > 1)
                setPage({ ...page, pageNumber: pageNumber - 1 })
            }}
          >
            <FiChevronLeft />
          </button>
          <button>
            {' '}
            <p>
              Page {page.pageNumber} of {page.numPages}
            </p>
          </button>
          <button
            onClick={() => {
              const pageNumber = page.pageNumber
              if (pageNumber < page.numPages)
                setPage({ ...page, pageNumber: pageNumber + 1 })
            }}
          >
            <FiChevronRight />
          </button>
        </Grid>
      </If>
    </>
  )
}

const PDFDiffViewer: NextPage<{}> = ({}) => {
  return (
    <div>
      <UploaderPDFViewer />
    </div>
  )
}
export { PDFDiffViewer }
