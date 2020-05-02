import React, { useState, useLayoutEffect } from 'react'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import css from 'styled-jsx/css'
import theme from '../styles/theme'

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
  .navigation-link {
    display: block;
    text-decoration: none;
    color: ${theme.colors.primaryA};
    border: none;
    background: none;
    outline: none;
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: ${theme.fontWeight.semi};
    margin: 0 4px;
    cursor: pointer;
  }
  .active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.secondary};
    height: 4px;
    border-radius: 10px;
    width: 4px;
    transition: 0.3s left ease;
    /* transition: 0.2s all cubic-bezier(0.175, 0.885, 0.32, 1.275); */
  }
`

interface Tab {
  id: number
  path: string
  displayName: string
}

const tabs: Tab[] = [
  {
    id: 0,
    path: '/',
    displayName: 'Discover',
  },
  {
    id: 1,
    path: '/trending',
    displayName: 'Trending',
  },
  {
    id: 2,
    path: '/top100',
    displayName: 'Top100',
  },
  {
    id: 3,
    path: '/liked',
    displayName: 'Liked',
  },
]

const Navigation: React.FC = () => {
  const [barStyle, setBarStyle] = useState<Record<string, number>>({
    left: 0,
    width: 0,
  })
  const router: NextRouter = useRouter()

  useLayoutEffect(() => {
    const activeElement = document.querySelector('.active') as HTMLButtonElement
    if (activeElement) {
      setBarStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth - 20,
      })
    } else {
      // setBarStyle({
      //   left: -20,
      //   width: 0,
      // })
    }
  }, [router.pathname])

  return (
    <div className="navigation-wrapper">
      <div className="navigation-wrapper-shade left"></div>
      <div className="navigation-wrapper-shade right"></div>
      <div className="navigation-tabs">
        {tabs.map((t) => (
          <Link href={t.path} key={t.id}>
            <a
              className={`navigation-link ${
                router.pathname === t.path && 'active'
              }`}
            >
              {t.displayName}
            </a>
          </Link>
        ))}
        <div className="active-bar" style={barStyle}></div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Navigation
