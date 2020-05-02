import React from 'react'
import globalStyles from '../styles/global'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      <Header />
      <div className="content">{children}</div>
      <Footer />
      <style jsx global>
        {globalStyles}
      </style>
      <style jsx>
        {`
          .page-layout {
            margin-left: auto;
            margin-right: auto;
            max-width: 840px;
            box-sizing: border-box;
            padding: 10px;
            display: flex;
            min-height: 100vh;
            flex-direction: column;
          }
          .content {
            flex: 1;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
