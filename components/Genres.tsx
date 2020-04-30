import React from 'react'
import css from 'styled-jsx/css'
import { Genre } from '../utils/getGenre'
import theme from '../styles/theme'
import GenreTag from './GenreTag'

interface GenresProps {
  onSelect: (genre: Genre) => void
  genres: Genre[]
  selectedGenres: Genre[]
}

const styles = css`
  .genres-wrapper {
    margin: 0 -10px;
  }
  .genres-wrapper-shade {
    width: 22px;
    height: 29px;
    position: absolute;
  }
  .genres-wrapper-shade.right {
    box-shadow: inset -27px 0px 20px -15px white;
    right: 0;
  }
  .genres-wrapper-shade.left {
    box-shadow: inset 27px 0px 20px -15px white;
    left: 0;
  }
  .genre-tags {
    padding: 0 16px;

    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    scroll-behavior: smooth;
  }
  .genre-tags::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Chrome/Safari/Webkit */
  }
  .genre-tags::after {
    content: '';
    flex: 0 0 20px;
  }
  .genre-tags > *:first-child {
    margin-left: 0;
  }
  .genre-tags > *:last-child {
    margin-right: 0;
  }
`

const Genres: React.FC<GenresProps> = ({
  genres,
  selectedGenres,
  onSelect,
}) => {
  return (
    <div className="genres-wrapper">
      <div className="genres-wrapper-shade left"></div>
      <div className="genres-wrapper-shade right"></div>
      <div className="genre-tags">
        {genres.map((g) => (
          <GenreTag
            {...g}
            key={g.id}
            onClick={(): void => onSelect(g)}
            selected={selectedGenres.length === 0 || selectedGenres.includes(g)}
          />
        ))}
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Genres
