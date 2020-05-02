import React from 'react'
import css from 'styled-jsx/css'
import MovieItem from './MovieItem'

export interface MovieItemInterface {
  posterPath: string | undefined
  genres: number[]
  rating: number
  release: string
  title: string
  id: number
}

export interface MovieListProps {
  movies: MovieItemInterface[]
}

const styles = css`
  .movie-list {
    padding: 20px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }
`

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 &&
        movies.map((m) => (
          <MovieItem
            key={m.id}
            id={m.id}
            posterPath={m.posterPath && m.posterPath}
            genres={m.genres}
            rating={m.rating}
            release={m.release}
            title={m.title}
          />
        ))}
      <style jsx>{styles}</style>
    </div>
  )
}

export default MovieList
