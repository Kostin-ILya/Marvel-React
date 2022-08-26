import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Spinner from '../loadingStatus/Spinner/Spinner'
import AppHeader from '../AppHeader/AppHeader'
import AppBanner from '../AppBanner/AppBanner'

// import { MainPage, ComicsPage, SingleComicPage, Page404 } from './pages'
const MainPage = lazy(() => import('./pages/MainPage'))
const ComicsPage = lazy(() => import('./pages/ComicsPage'))
const SingleComicPage = lazy(() =>
  import('./pages/SingleComicPage/SingleComicPage')
)
const Page404 = lazy(() => import('./pages/404/404'))

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<Spinner center />}>
          <Routes>
            <Route path="/" element={<AppHeader />}>
              <Route index element={<MainPage />} />
              <Route path="comics" element={<AppBanner />}>
                <Route index element={<ComicsPage />} />
                <Route path=":comicId" element={<SingleComicPage />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="app">
//         <AppHeader />
//         <main>
//           <Routes>
//             <Route path="/" element={<MainPage />} />
//             <Route path="/comics" element={<ComicsPage />}></Route>
//             <Route path="/comics/:comicId" element={<SingleComicPage />} />
//             <Route path="*" element={<Page404 />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   )
// }

export default App
