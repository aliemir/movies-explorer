import React from 'react'
import css from 'styled-jsx/css'
import theme from '../styles/theme'
import Link from 'next/link'
import Navigation from './Navigation'

interface Props {
  title: string
}

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

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header>
      <div className="header-title">
        <Link href="/">
          <a>
            <h1>{title}</h1>
          </a>
        </Link>
      </div>
      <Navigation
        onClick={(): void => {
          /**/
        }}
        tabs={['Discover', 'Trending', 'Top100', 'Liked']}
      />
      <style jsx>{styles}</style>
    </header>
  )
}

export default Header
