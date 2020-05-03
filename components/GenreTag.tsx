import React from 'react'
import css from 'styled-jsx/css'
import theme from '../styles/theme'

interface GenreTagProps {
  id: number
  name: string
  selected: boolean
  onClick?: () => void
}

const styles = css`
  .genre-tag {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    background: ${theme.colors.background};
    flex-shrink: 0;
    padding: 7px 9px;
    border-radius: 50px;
    font-size: 13px;
    line-height: 13px;
    margin: 0 4px;
    font-weight: 400;
    border: 1px solid ${theme.colors.grayB};
    color: ${theme.colors.grayA};
    outline: none;
    transition: 0.3s color ease, 0.3s border ease, 0.3s transform ease;
  }
  .genre-tag.selected {
    color: ${theme.colors.primaryB};
    border: 1px solid ${theme.colors.grayA};
  }
  .genre-tag:focus {
  }
  .genre-tag:active {
    animation: pulse 0.5s ease;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.9);
    }
    66% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  @media screen and (min-width: ${theme.breakpoint.m}) {
    .genre-tag {
      margin: 3px 4px;
    }
  }
`

const GenreTag: React.FC<GenreTagProps> = React.memo(
  ({
    name,
    selected,
    onClick = (): void => {
      /**/
    },
  }) => {
    return (
      <>
        <button
          className={`genre-tag ${selected && 'selected'}`}
          onClick={(): void => onClick()}
        >
          {name}
        </button>
        <style jsx>{styles}</style>
      </>
    )
  },
)

export default GenreTag
