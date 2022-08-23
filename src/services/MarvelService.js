import useHttp from '../hooks/http.hook'

const useMarvelService = () => {
  const { request, loading, error } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=23c90e69b415b3efe1b9220eca93562b'
  const _baseOffset = '210'

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    )
    return res.data.results.map(_transformChar)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)

    return _transformChar(res.data.results[0])
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    )
    return res.data.results.map(_transformComics)
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComics(res.data.results[0])
  }

  const _transformChar = (char) => ({
    id: char.id,
    name: char.name,
    description:
      char.description.length > 210
        ? `${char.description.slice(0, 210)}...`
        : char.description,
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    comics: char.comics.items,
    homepage: char.urls[1].url,
    wiki: char.urls[0].url,
  })

  const _transformComics = (comics) => ({
    id: comics.id,
    title: comics.title,
    description: comics.description || 'There is no description',
    pageCount: comics.pageCount
      ? `${comics.pageCount} pages`
      : 'No information about the number of pages',
    price: comics.prices[0].price,
    thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    language: comics.textObjects.language || 'en-us',
  })

  return {
    loading,
    error,
    getAllCharacters,
    getAllComics,
    getComic,
    getCharacter,
  }
}

export default useMarvelService
