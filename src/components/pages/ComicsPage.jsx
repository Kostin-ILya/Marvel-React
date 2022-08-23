import ComicsList from '../ComicsList/ComicsList'
import AppBanner from '../AppBanner/AppBanner'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const ComicsPage = () => {
  return (
    <ErrorBoundary>
      <AppBanner />
      <ComicsList />
    </ErrorBoundary>
  )
}

export default ComicsPage
