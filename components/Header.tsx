import React from 'react'
import theme from '../styles/theme'
import Link from 'next/link'

interface Props {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header>
      <Link href="/">
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <style jsx>{`
        header {
        }
        a {
          text-decoration: none;
        }
        h1 {
          color: ${theme.colors.primaryA};
        }
      `}</style>
    </header>
  )
}

export default Header
