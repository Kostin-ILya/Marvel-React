import useMarvelService from '../../services/MarvelService'
import useListLoad from '../../hooks/useListLoad'

import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'

import './comicsList.scss'

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService()
  const { list, isNewListLoading, isItemsEnded, onUpdateList } = useListLoad(
    getAllComics,
    8,
    250
  )

  const createComicsListItems = (comicsListArr) => {
    const comics = comicsListArr.map(({ id, title, price, thumbnail }) => {
      return (
        <li key={id} className="comics__item">
          <a href="#">
            <img className="comics__item-img" src={thumbnail} alt={title} />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </a>
        </li>
      )
    })

    return <ul className="comics__grid">{comics}</ul>
  }

  const elements = createComicsListItems(list)
  const spinner = loading && !isNewListLoading ? <Spinner /> : null
  const loadError = error ? <LoadError /> : null

  return (
    <div className="comics__list">
      {spinner}
      {loadError}
      {elements}
      <button
        className="button button__main button__long"
        style={{ display: isItemsEnded ? 'none' : 'block' }}
        type="button"
        disabled={isNewListLoading}
        onClick={onUpdateList}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList
