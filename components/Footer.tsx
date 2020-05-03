import React from 'react'
import css from 'styled-jsx/css'
import theme from '../styles/theme'
import GithubSVG from './Github'
import TwitterSVG from './Twitter'

const styles = css`
  footer {
    border-top: 1px solid ${theme.colors.grayB};
    padding-top: 15px;
    padding-bottom: 5px;
    display: flex;
    justify-content: center;
  }
  .footer-link {
    padding: 0 10px;
  }
`

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <a className="footer-link" href="https://github.com/aliemir">
          <GithubSVG width={24} fill={theme.colors.primaryB} />
        </a>
        <a className="footer-link" href="https://twitter.com/aliemirsen">
          <TwitterSVG width={24} fill={theme.colors.primaryB} />
        </a>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default Footer
