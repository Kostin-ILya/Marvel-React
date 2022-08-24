import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useMarvelService from '../../../../services/MarvelService'

import Spinner from '../../../loadingStatus/Spinner/Spinner'
import Page404 from '../404/404'

import './singleComicPage.scss'

const SingleComicPage = () => {
  const { comicId } = useParams()
  const [comic, setComic] = useState(null)

  const { loading, error, getComic } = useMarvelService()

  useEffect(() => {
    updateComic()
  }, [comicId])

  const updateComic = () => {
    getComic(comicId).then(setComic)
  }

  const spinner = loading ? <Spinner /> : null
  const loadError = error ? <Page404 /> : null
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null

  return (
    <>
      {loadError}
      {spinner}
      {content}
    </>
  )
}

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic

  const navigate = useNavigate()
  const onPrevPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{`${price}$`}</div>
      </div>
      <div className="linksWrapper">
        <Link to="../" className="navigateLink">
          Back to all comics
        </Link>
        <a className="navigateLink" onClick={onPrevPage}>
          Back to previous page
        </a>
      </div>
    </div>
  )
}

export default SingleComicPage
