import React from 'react'
import css from 'styled-jsx/css'
import theme from '../styles/theme'

const styles = css`
  footer {
    padding: 20px;
    margin: -10px;
    display: flex;
    flex-direction: column;
  }
  .footer-author {
    font-weight: ${theme.fontWeight.regular};
    text-align: center;
    color: ${theme.colors.primaryA};
    font-weight: ${theme.fontWeight.semi};
  }
`

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <div className="footer-author">@aliemir</div>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default Footer
