import React from 'react'
import css from 'styled-jsx/css'
import theme from '../styles/theme'

const styles = css`
  footer {
    height: 100px;
    margin: -10px;
    background: ${theme.colors.grayB};
    display: flex;
    flex-direction: column;
  }
  .footer-name {
    text-align: center;
    margin-top: auto;
    color: white;
  }
  .footer-author {
    font-weight: ${theme.fontWeight.regular};
    text-align: center;
    color: white;
  }
`

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <h4 className="footer-name">Movie Explorer</h4>
        <div className="footer-author">@aliemir</div>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}

export default Footer
