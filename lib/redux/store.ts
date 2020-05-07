import createStore from 'unistore'

const initialState = {
  pageNumber: 0,
  compare: {
    numPages: 0
  }, 
  original: {
    numPages: 0
  }, 
}

export default () => createStore(initialState)
