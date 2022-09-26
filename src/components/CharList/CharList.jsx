import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import './charList.scss'

const CharList = (props) => {
  const [charList, setCharList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [offset, setOffset] = useState(210)
  const [isNewCharlistLoading, setNewCharlistLoading] = useState(false)
  const [isCharsEnded, setCharsEnded] = useState(false)
  const [isPageEnded, setPageEnded] = useState(false)

  const charItemsRefs = React.createRef(null)

  const marvelService = new MarvelService()

  useEffect(() => {
    onUpdateCharList()

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

  const onUpdateCharList = (currentOffset) => {
    setNewCharlistLoading(true)

    marvelService
      .getAllCharacters(currentOffset)
      .then(onCharListLoaded)
      .catch(onLoadError)
  }

  const onCharListLoaded = (newCharList) => {
    setCharList((prevCharList) => [...prevCharList, ...newCharList])
    setLoading(false)
    setNewCharlistLoading(false)
    setCharsEnded(newCharList.length < 9)
    setPageEnded(false)
    setOffset((prevOffset) => prevOffset + 9)
  }

  const onLoadError = (err) => {
    setLoading(false)
    setError(true)
    console.error(err)
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
  const spinner = loading ? <Spinner /> : null
  const loadError = error ? <Error /> : null
  const content = loading || error ? null : elements

  return (
    <div className="char__list">
      {spinner}
      {loadError}
      {content}

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
