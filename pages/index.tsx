import React, { useEffect } from 'react'
import { Layout } from '../components'
import { Title } from '../components/styles'
import { Viewer } from '../components/Viewer'

export default () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator)
      navigator.serviceWorker
        .register('/sw.js')
        .then((_) => {
          console.log('service worker registration successful')
        })
        .catch((err) => {
          console.warn('service worker registration failed', err.message)
        })
  }, [])

  return (
    <Layout>
      <Title>Welcome to PDF diff viewer</Title>
      <Viewer />
    </Layout>
  )
}
