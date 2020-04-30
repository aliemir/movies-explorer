import React, { useEffect, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import css from 'styled-jsx/css'
import theme from '../styles/theme'

interface NavigationProps {
  onClick: () => void
  tabs: string[]
}

const styles = css`
  .navigation-wrapper {
    margin: 0 -10px;
  }
  .navigation-wrapper-shade {
    width: 22px;
    height: 29px;
    position: absolute;
  }
  .navigation-wrapper-shade.right {
    box-shadow: inset -27px 0px 20px -15px white;
    right: 0;
  }
  .navigation-wrapper-shade.left {
    box-shadow: inset 27px 0px 20px -15px white;
    left: 0;
  }
  .navigation-tabs {
    position: relative;
    box-sizing: border-box;
    padding: 0 20px;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    scroll-behavior: smooth;
  }
  .navigation-tabs::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Chrome/Safari/Webkit */
  }
  .navigation-tabs::after {
    content: '';
    flex: 0 0 20px;
  }
  .navigation-tabs > *:first-child {
    margin-left: 0;
  }
  .navigation-tabs > *:last-child {
    margin-right: 0;
  }
  .navigation-button {
    border: none;
    background: none;
    outline: none;
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: ${theme.fontWeight.semi};
    margin: 0 4px;
  }
  .active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.secondary};
    height: 4px;
    border-radius: 10px;
    width: 4px;
    transition: 0.2s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`

const Navigation: React.FC<NavigationProps> = ({ onClick, tabs }) => {
  const [barStyle, setBarStyle] = useState<Record<string, number>>({
    left: 20,
    width: 54,
  })

  const router: NextRouter = useRouter()
  const handleTabClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setBarStyle({
      left: event.currentTarget.offsetLeft,
      width: event.currentTarget.offsetWidth - 20,
    })
  }
  useEffect(() => {
    console.log(router.asPath)
  }, [router])
  return (
    <div className="navigation-wrapper">
      <div className="navigation-wrapper-shade left"></div>
      <div className="navigation-wrapper-shade right"></div>
      <div className="navigation-tabs">
        {tabs.map((t) => (
          <button
            className="navigation-button"
            key={t}
            onClick={handleTabClick}
          >
            {t}
          </button>
        ))}
        <div className="active-bar" style={barStyle}></div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Navigation
