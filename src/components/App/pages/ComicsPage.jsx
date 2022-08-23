import ComicsList from '../../ComicsList/ComicsList'
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'

const ComicsPage = () => {
  return (
    <ErrorBoundary>
      <ComicsList />
    </ErrorBoundary>
  )
}

export default ComicsPage
