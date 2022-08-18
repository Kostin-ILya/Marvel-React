import { useState, useEffect } from 'react'

const useListLoad = (requestFn, requestItemsQuantity, initOffset = 210) => {
  const [list, setList] = useState([])
  const [isNewListLoading, setIsNewCListLoading] = useState(false)
  const [isItemsEnded, setItemsEnded] = useState(false)
  const [isPageEnded, setIsPageEnded] = useState(false)
  const [offset, setOffset] = useState(initOffset)

  useEffect(() => {
    window.addEventListener('scroll', checkPageEnded)
    onUpdateList(offset, true)

    return () => {
      window.removeEventListener('scroll', checkPageEnded)
    }
  }, [])

  useEffect(() => {
    if (isPageEnded && !isNewListLoading && !isItemsEnded) {
      onUpdateList(offset)
    }
  }, [isPageEnded])

  const onUpdateList = (stateOffset, initLoad) => {
    if (!initLoad) {
      setIsNewCListLoading(true)
    }

    requestFn(stateOffset).then(onListLoaded)
  }

  const onListLoaded = (newList) => {
    setList((prevList) => [...prevList, ...newList])
    setIsNewCListLoading(false)
    setIsPageEnded(false)

    setItemsEnded(newList.length < requestItemsQuantity)
    setOffset((prevOffset) => prevOffset + requestItemsQuantity)
  }

  const checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      setIsPageEnded(true)
    }
  }

  return { list, isNewListLoading, isPageEnded, onUpdateList, offset }
}

export default useListLoad
