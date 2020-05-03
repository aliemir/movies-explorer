import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import css from 'styled-jsx/css'
import theme from '../styles/theme'

const styles = css`
  .navigation-wrapper {
    padding-top: 15px;
    paddong-bottom: 10px;
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
    user-select: none;
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
  // {
  //   id: 3,
  //   path: '/liked',
  //   displayName: 'Liked',
  // },
]

const ActiveBar: React.FC = () => {
  const [style, setStyle] = useState({
    left: '0',
    width: '0',
  })
  const router = useRouter()

  useEffect(() => {
    const active = tabs.find((t) => t.path === router.pathname)
    const tabsElement = document.querySelector('.navigation-tabs')
    if (!!active) {
      tabsElement?.childNodes.forEach((tab) => {
        if (
          (tab as HTMLLinkElement).getAttribute('data-pathname') ===
          active?.displayName
        ) {
          setStyle({
            left: (tab as HTMLLinkElement).offsetLeft + 'px',
            width: (tab as HTMLLinkElement).offsetWidth - 20 + 'px',
          })
        }
      })
    } else {
      setStyle({
        left: '0',
        width: '0',
      })
    }
  }, [router.pathname])

  return (
    <div className="active-bar" style={style}>
      <style jsx>{`
        .active-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: ${theme.colors.secondary};
          height: 4px;
          border-radius: 10px;
          width: 4px;
          transition-duration: 0.3s;
          transition-timing-function: ease;
          transition-property: width, left;
        }
      `}</style>
    </div>
  )
}

const Navigation: React.FC = () => {
  return (
    <div className="navigation-wrapper">
      <div className="navigation-wrapper-shade left"></div>
      <div className="navigation-wrapper-shade right"></div>
      <div className="navigation-tabs">
        {tabs.map((t) => (
          <Link href={t.path} key={t.id} passHref={true}>
            <a data-pathname={t.displayName} className={`navigation-link`}>
              {t.displayName}
            </a>
          </Link>
        ))}
        <ActiveBar />
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default React.memo(Navigation)
