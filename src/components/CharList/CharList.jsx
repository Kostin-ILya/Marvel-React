import React, { useState, useEffect } from 'react'
import useMarvelService from '../../hooks/useMarvelService'

import PropTypes from 'prop-types'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import './charList.scss'

const CharList = (props) => {
  const [charList, setCharList] = useState([])
  const [offset, setOffset] = useState(210)

  const [isNewCharlistLoading, setNewCharlistLoading] = useState(false)
  const [isCharsEnded, setCharsEnded] = useState(false)
  const [isPageEnded, setPageEnded] = useState(false)

  const charItemsRefs = React.createRef(null)

  const { isLoading, isError, getAllCharacters } = useMarvelService()

  useEffect(() => {
    onUpdateCharList(offset, true)

    window.addEventListener('scroll', checkPageEnded)

    return () => {
      window.removeEventListener('scroll', checkPageEnded)
    }
  }, [])

  useEffect(() => {
    if (isPageEnded && !isNewCharlistLoading) {
      onUpdateCharList(offset)
    }
  }, [isPageEnded, isNewCharlistLoading])

  const onUpdateCharList = (currentOffset, initialLoad) => {
    if (!initialLoad) {
      setNewCharlistLoading(true)
    }

    getAllCharacters(currentOffset).then(onCharListLoaded)
  }

  const onCharListLoaded = (newCharList) => {
    setCharList((prevCharList) => [...prevCharList, ...newCharList])
    setNewCharlistLoading(false)
    setCharsEnded(newCharList.length < 9)
    setPageEnded(false)
    setOffset((prevOffset) => prevOffset + 9)
  }

  const checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      setPageEnded(true)
    }
  }

  const onCharFocus = (e) => {
    const charItems = [...charItemsRefs.current.children]
    charItems.forEach((item) => {
      item.classList.remove('char__item_selected')
    })
    e.target.classList.add('char__item_selected')
  }

  const onKeyDownCharItem = (e) => {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      e.target.click()
    }
  }

  const createCharListItems = (charListArr) => {
    const chars = charListArr.map(({ id, name, thumbnail }) => {
      const imgStyle = thumbnail.includes('image_not_available')
        ? { objectFit: 'initial' }
        : null

      return (
        <li
          key={id}
          className="char__item"
          role="presentation"
          tabIndex={0}
          onFocus={onCharFocus}
          onKeyDown={onKeyDownCharItem}
          onClick={() => {
            props.onCharSelected(id)
          }}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      )
    })

    return (
      <ul ref={charItemsRefs} className="char__grid">
        {chars}
      </ul>
    )
  }

  const elements = createCharListItems(charList)
  const spinner = isLoading && !isNewCharlistLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null

  return (
    <div className="char__list">
      {spinner}
      {loadError}
      {elements}
      <button
        type="button"
        className="button button__main button__long"
        style={{ display: isCharsEnded ? 'none' : 'block' }}
        disabled={isNewCharlistLoading}
        onClick={() => {
          onUpdateCharList(offset)
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList
