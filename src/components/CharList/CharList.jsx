import useMarvelService from '../../services/MarvelService'
import useListLoad from '../../hooks/useListLoad'
import useListEvent from '../../hooks/useListEvent'
import PropTypes from 'prop-types'

import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'

import './charList.scss'

const CharList = (props) => {
  const { loading, error, getAllCharacters } = useMarvelService()
  const { list, isNewListLoading, isItemsEnded, onUpdateList } = useListLoad(
    getAllCharacters,
    9
  )
  const { itemsParentRef, onItemFocus, onKeyDownOnItem } = useListEvent()

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
          onFocus={onItemFocus}
          onKeyDown={onKeyDownOnItem}
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
      <ul ref={itemsParentRef} className="char__grid">
        {chars}
      </ul>
    )
  }

  const elements = createCharListItems(list)
  const spinner = loading && !isNewListLoading ? <Spinner /> : null
  const loadError = error ? <LoadError /> : null
  // const content = loading || error ? null : elements

  return (
    <div className="char__list">
      {spinner}
      {loadError}
      {elements}
      <button
        type="button"
        className="button button__main button__long"
        style={{ display: isItemsEnded ? 'none' : 'block' }}
        disabled={isNewListLoading}
        onClick={onUpdateList}
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
