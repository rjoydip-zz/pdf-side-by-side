import React, { useEffect } from 'react'
import { Layout } from '../components'
import { Title } from '../components/styles'
import { PDFDiffViewer } from '../components/PDFDiffViewer'

export default () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((_) => {
            console.log('service worker registration successful')
          })
          .catch((err) => {
            console.warn('service worker registration failed', err.message)
          })
      }
    }
  }, [])

  return (
    <Layout>
      <Title>Welcome to PDF diff viewer</Title>
      <PDFDiffViewer />
    </Layout>
  )
}
