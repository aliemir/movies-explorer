/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { genres, Genre } from '../utils/getGenre'
import Genres from '../components/Genres'
import MovieList, { MovieItemInterface } from '../components/MovieList'
import Loading from '../components/Loading'

interface MovieData {
  poster_path: string | null
  genre_ids: number[]
  vote_average: number
  release_date: string
  title: string
  id: number
}

const Discover: NextPage = () => {
  const [movies, setMovies] = useState<MovieItemInterface[] | undefined>(
    undefined,
  )
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.TMDB_API_KEY
        }${
          selectedGenres.length > 0
            ? '&with_genres=' + selectedGenres.map((g) => g.id).join(',') + ''
            : ''
        }`,
      )
        .then((res) => res.json())
        .catch((e) => {
          console.log(e)
        })

      const movies: MovieItemInterface[] =
        data.results?.map((m: MovieData) => {
          const movie: MovieItemInterface = {
            posterPath: m.poster_path ?? undefined,
            genres: m.genre_ids,
            rating: m.vote_average,
            release: m.release_date.substring(0, 4),
            title: m.title,
            id: m.id,
          }
          return movie
        }) ?? undefined

      setMovies(movies)
    }
    const delayedFetch = setTimeout(() => fetchData(), 500)
    return (): void => {
      clearTimeout(delayedFetch)
    }
  }, [selectedGenres])

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
        <title>Movies - Discover</title>
      </Head>
      <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        onSelect={onGenreSelect}
      />
      {movies ? <MovieList movies={movies} /> : <Loading />}
      <style jsx>{``}</style>
    </div>
  )
}

export default Discover
