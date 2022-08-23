import { Link } from 'react-router-dom'
import LoadError from '../../../loadingStatus/LoadError/LoadError'

import './404.scss'

const Page404 = () => {
  return (
    <div style={{ marginTop: '15%' }}>
      <LoadError />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn&apos;t exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 30,
          marginTop: 50,
          color: '#9f0013',
        }}
        className={'pulse404'}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  )
}

export default Page404
