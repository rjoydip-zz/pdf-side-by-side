import * as types from './types'

// INCREMENT PAGE NUMBER BY 1
export const incrementPageNumber = () => ({ type: types.INCREMENT_PAGE_NUMBER })
// DECREMENT PAGE NUMBER BY 1
export const decrementPageNumber = () => ({ type: types.DECREMENT_PAGE_NUMBER })
// INITILIZE PAGE NUMBER
export const initilizePageNumber = (value: any) => ({
  type: types.INITILIZE_NUMBER_PAGES,
  payLoad: value,
})
