import { useState, useEffect } from 'react'

import PropTypes from 'prop-types'

import useMarvelService from '../../hooks/useMarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'
import Skeleton from '../Skeleton/Skeleton'

import './charInfo.scss'

const CharInfo = (props) => {
  const [char, setChar] = useState(null)

  const { isLoading, isError, getCharacter } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [props.charId])

  const updateChar = () => {
    if (props.charId) {
      getCharacter(props.charId).then(setChar)
    }
  }

  const skeleton = char || isLoading || isError ? null : <Skeleton />
  const spinner = isLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null
  const content = isLoading || isError || skeleton ? null : <View char={char} />

  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {loadError}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, comics, homepage, wiki } = char

  const imgStyle = thumbnail.includes('image_not_available')
    ? { objectFit: 'initial' }
    : null

  function createComics() {
    if (comics.length > 10) {
      return [...comics].splice(0, 10).map((item) => (
        <li className="char__comics-item" key={item.name}>
          {item.name}
        </li>
      ))
    }

    return comics.map((item) => (
      <li className="char__comics-item" key={item.name}>
        {item.name}
      </li>
    ))
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} tabIndex={0} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} tabIndex={0} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length !== 0
          ? createComics()
          : 'There is no comics for this character'}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

CharInfo.defaultProps = {
  charId: 1011500,
}

export default CharInfo
