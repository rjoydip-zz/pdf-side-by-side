const actions = (_: any) => ({
  incrementPageNumber(state: any) {
    const maxPageNumber = Math.max(
      state.original.numPages,
      state.compare.numPages,
    )
    return {
      ...state,
      pageNumber:
        state.pageNumber >= 1 && state.pageNumber < maxPageNumber
          ? state.pageNumber + 1
          : state.pageNumber,
    }
  },
  decrementPageNumber(state: any) {
    return {
      ...state,
      pageNumber:
        state.pageNumber > 1 ? state.pageNumber - 1 : state.pageNumber,
    }
  },
  initilizePageNumber(state: any, payLoad: any) {
    const { id, numPages } = payLoad
    return {
      ...state,
      pageNumber: 1,
      [id]: {
        numPages
      },
    }
  },
})

export default actions
