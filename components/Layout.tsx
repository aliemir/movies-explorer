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
            padding: 10px;
          }
        `}
      </style>
    </div>
  )
}

export default Layout
