import { combineReducers } from 'redux'
import * as types from './types'

const paginationReducer = (
  state = {
    numPages: 0,
    pageNumber: 0,
  },
  action: any
) => {
  const { type, payLoad } = action
  switch (type) {
    case types.INCREMENT_PAGE_NUMBER:
      return {
        ...state,
        pageNumber:
          state.pageNumber >= 1 && state.pageNumber < state.numPages
            ? state.pageNumber + 1
            : state.pageNumber,
      }
    case types.DECREMENT_PAGE_NUMBER:
      return {
        ...state,
        pageNumber:
          state.pageNumber > 1 ? state.pageNumber - 1 : state.pageNumber,
      }
    case types.INITILIZE_NUMBER_PAGES:
      return {
        pageNumber: 1,
        numPages: state.numPages < payLoad ? payLoad : state.numPages,
      }
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  pagination: paginationReducer,
}

export default combineReducers(reducers)
