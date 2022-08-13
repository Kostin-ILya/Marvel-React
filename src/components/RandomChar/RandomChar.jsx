import { useState, useEffect } from 'react'
import MarvelService from '../../services/MarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'

import mjolnir from '../../resources/img/mjolnir.png'
import './randomChar.scss'

const RandomChar = () => {
  const [char, setChar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    updateChar()
  }, [])
  // state = {
  //   char: {},
  //   loading: true,
  //   error: false,
  // }

  const marvelService = new MarvelService()

  // componentDidMount() {
  //   this.updateChar()
  // }

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

    charLoading()
    marvelService
      .getCharacter(id)
      .then((res) => {
        onCharLoaded(res)
      })
      .catch((err) => {
        onLoadError(err)
      })
    //   .then(this.onCharLoaded) - идентичная запись. res автоматом передается в виде аргумента в метод
  }

  const charLoading = () => {
    setLoading(true)
    setError(false)
  }

  const onCharLoaded = (character) => {
    setChar(character)
    setLoading(false)
  }

  const onLoadError = (err) => {
    setError(true)
    setLoading(false)
    console.error(err)
  }

  // charLoading = () => {
  //   this.setState({ loading: true, error: false })
  // }

  // onCharLoaded = (char) => {
  //   this.setState({ char, loading: false })
  // }

  // onLoadError = (err) => {
  //   this.setState({ error: true, loading: false })
  //   console.error(err)
  // }

  const spinner = loading ? <Spinner /> : null
  const loadError = error ? <LoadError /> : null
  const content = loading || error ? null : <View char={char} />

  return (
    <div className="randomchar">
      {spinner}
      {loadError}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          type="button"
          className="button button__main"
          onClick={updateChar}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char

  const imgStyle = thumbnail.includes('image_not_available')
    ? { objectFit: 'initial' }
    : null

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description || 'There is no description for this character'}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar
