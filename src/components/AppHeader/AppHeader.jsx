import { Link, NavLink, Outlet } from 'react-router-dom'

import './appHeader.scss'

const AppHeader = () => {
  const activeStyle = {
    color: '#9f0013',
  }

  return (
    <>
      <header className="app__header">
        <h1 className="app__title">
          <Link to="/">
            <span>Marvel</span> information portal
          </Link>
        </h1>
        <nav className="app__menu">
          <ul>
            <li>
              <NavLink
                end
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                Characters
              </NavLink>
            </li>
            /
            <li>
              <NavLink
                end
                to="/comics"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                Comics
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AppHeader
