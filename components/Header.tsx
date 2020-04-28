import React from 'react'

interface Props {
  title: string
}

const Header: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>
}

export default Header
