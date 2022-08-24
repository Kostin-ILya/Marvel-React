import { Link, useNavigate } from 'react-router-dom'
import LoadError from '../../../loadingStatus/LoadError/LoadError'

import './404.scss'

const Page404 = () => {
  const navigate = useNavigate()
  const onPrevPage = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    marginTop: 50,
    color: '#9f0013',
    cursor: 'pointer',
  }

  return (
    <div>
      <LoadError />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn&apos;t exist
      </p>
      <a style={linkStyle} onClick={onPrevPage}>
        Back to previous page
      </a>
      <Link to="../" style={linkStyle} className="pulse404">
        Back to main page
      </Link>
    </div>
  )
}

export default Page404
