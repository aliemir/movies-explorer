import React, { useEffect } from 'react'
import theme from '../styles/theme'
import Link from 'next/link'
import Navigation from './Navigation'

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-title">
        <Link href="/">
          <a>
            <h1>Movies</h1>
          </a>
        </Link>
      </div>
      <Navigation />
      <style jsx>{`
        header {
          margin-bottom: 5px;
        }
        .header-title {
          padding: 15px 8px 0;
        }
        a {
          text-decoration:none;
        }
        h1 {
          margin: 0;
          color ${theme.colors.primaryA};
      }
    `}</style>
    </header>
  )
}

export default React.memo(Header)
