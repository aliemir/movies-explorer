import React from 'react'
import globalStyles from '../styles/global'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      {children}
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
          }
        `}
      </style>
    </div>
  )
}

export default Layout
