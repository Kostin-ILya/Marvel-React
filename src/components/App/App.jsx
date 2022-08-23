import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainPage, ComicsPage, SingleComicPage, Page404 } from './pages'
import AppHeader from '../AppHeader/AppHeader'
import AppBanner from '../AppBanner/AppBanner'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
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
