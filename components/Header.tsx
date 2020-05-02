import React from 'react'
import css from 'styled-jsx/css'
import theme from '../styles/theme'
import Link from 'next/link'
import Navigation from './Navigation'

const styles = css`
  header {
    margin-bottom: 5px;
  }
  .header-title {
    padding: 15px 8px 20px;
  }
  a {
    text-decoration:none;
  }
  h1 {
    margin: 0;
    color ${theme.colors.primaryA};
  }
`

const title = 'Movies'

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-title">
        <Link href="/">
          <a>
            <h1>{title}</h1>
          </a>
        </Link>
      </div>
      <Navigation />
      <style jsx>{styles}</style>
    </header>
  )
}

export default Header
