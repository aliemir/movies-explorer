/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Head from 'next/head'
import css from 'styled-jsx'
import titleToURL from '../utils/titleToURL'
import Header from '../components/Header'
import getGenre, { genres, Genre } from '../utils/getGenre'
import theme from '../styles/theme'
import Genres from '../components/Genres'

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
      <Header title="Discover" />
      <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        onSelect={onGenreSelect}
      />
      <div className="movie-list">
        {movies.map((m) => (
          <div key={m.id} className="movie-item">
            <div className="movie-poster">
              {!!m.posterPath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w154/${m.posterPath}`}
                  alt={`${m.title} poster`}
                />
              ) : (
                <div className="fallback" />
              )}
            </div>
            <div className="movie-info">
              <div className="movie-title">
                <Link
                  href="/movie/[id]/[title]"
                  as={`/movie/${m.id}/${titleToURL(m.title)}`}
                >
                  <a className="line-limit limit-three">{m.title}</a>
                </Link>
              </div>
              <div className="movie-info-detail">
                <div className="movie-rating">{`${m.rating}/10`}</div>
                <div className="movie-genres">
                  <span className="genre line-limit limit-two">
                    {m.genres.map((g) => getGenre(g)).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .movie-list {
          padding: 20px 0;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }
        .movie-item {
          width: 100%;
          height: 138px;
          max-width: 350px;
          display: flex;
          flex-direction: row;
          border-radius: 12px;
          box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
          padding: 0 15px;
          margin: 15px;
          margin-bottom: 30px;
        }
        .movie-poster {
          margin-top: -25px;
        }
        .movie-poster > * {
          border-radius: 10px;
          box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.5);
        }
        .movie-poster img {
          width: 96px;
        }
        .movie-poster .fallback {
          width: 96px;
          height: 144px;
          background: #7b4397; /* fallback for old browsers */
          background: linear-gradient(to right, #7b4397, #dc2430);
        }
        .movie-info {
          width: 100%;
          padding-left: 10px;
          padding-top: 10px;
          padding-bottom: 15px;
          display: flex;
          flex-direction: column;
        }
        .movie-title {
          text-align: left;
          font-weight: ${theme.fontWeight.bold};
          color: ${theme.colors.primaryB};
          text-style: none;
        }
        .movie-title a {
          text-decoration: none;
          color: unset;
        }
        .movie-info-detail {
          margin-top: auto;
          padding-bottom: 10px;
        }
        .movie-rating {
          font-weight: ${theme.fontWeight.semi};
          font-size: 0.7em;
          padding-bottom: 10px;
        }
        .movie-genres {
          font-size: 0.7em;
          color: ${theme.colors.primaryC};
        }
        .line-limit {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-limit.limit-two {
          -webkit-line-clamp: 2;
        }
        .line-limit.limit-three {
          -webkit-line-clamp: 3;
        }

         {
          /* .movie-item {
          width: 154px;
          border-radius: 5px;
          background-color: #fefefe;
          margin: 10px 0;
          transition: 0.3s box-shadow ease;
        } */
        }
         {
          /* .movie-item:hover {
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
        } */
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
