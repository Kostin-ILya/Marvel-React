import { useRef } from 'react'

const useListEvent = () => {
  const itemsParentRef = useRef(null)

  const onItemFocus = (e) => {
    const items = [...itemsParentRef.current.children]
    items.forEach((item) => {
      item.classList.remove('item_selected')
    })
    e.target.classList.add('item_selected')
    e.target.focus()
  }

  const onKeyDownOnItem = (e) => {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      e.target.click()
    }
  }

  return { itemsParentRef, onItemFocus, onKeyDownOnItem }
}

export default useListEvent
