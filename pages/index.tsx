/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { genres, Genre } from '../utils/getGenre'
import Genres from '../components/Genres'
import MovieItem from '../components/MovieItem'

interface MovieItem {
  posterPath: string | undefined
  genres: number[]
  rating: number
  title: string
  id: number
}

interface AppProps {
  movies: Array<MovieItem>
}

const Index: NextPage<AppProps> = ({ movies }) => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
  const onGenreSelect = (genre: Genre): void => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres].filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }
  return (
    <div>
      <Head>
        <title>Discover</title>
      </Head>
      <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        onSelect={onGenreSelect}
      />
      <div className="movie-list">
        {movies.map((m) => (
          <MovieItem
            key={m.id}
            id={m.id}
            posterPath={m.posterPath && m.posterPath}
            genres={m.genres}
            rating={m.rating}
            title={m.title}
          />
        ))}
      </div>
      <style jsx>{`
        .movie-list {
          padding: 20px 0;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`,
  )
    .then((res) => res.json())
    .catch((e) => {
      console.log(e)
    })

  const movies: MovieItem[] = data.results?.map(
    (m: {
      poster_path: string | null
      genre_ids: number[]
      vote_average: number
      title: string
      id: number
    }) => {
      const movie: MovieItem = {
        posterPath: m.poster_path ?? undefined,
        genres: m.genre_ids,
        rating: m.vote_average,
        title: m.title,
        id: m.id,
      }
      return movie
    },
  )

  const props: AppProps = {
    movies: movies,
  }

  return {
    props,
  }
}

export default Index
