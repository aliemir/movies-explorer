/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import titleToURL from '../utils/titleToURL'

interface MovieItem {
  genres: number[]
  title: string
  id: number
}

interface AppProps {
  movies: Array<MovieItem>
}

const Index: NextPage<AppProps> = ({ movies }) => {
  return (
    <div>
      <h1>Movies</h1>
      <ul className="movie-list">
        {movies.map((m) => (
          <li key={m.id}>
            <div className="movie-item">
              <div className="movie-title">
                <Link
                  href="/movie/[id]/[title]"
                  as={`/movie/${m.id}/${titleToURL(m.title)}`}
                >
                  <a>{m.title}</a>
                </Link>
              </div>
              <div className="movie-genre">{m.genres.join(', ')}</div>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul.movie-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        ul.movie-list > li {
          padding: 0;
          margin: 0;
        }
        .movie-item {
          padding: 10px 20px;
          border-radius: 5px;
          background-color: #fefefe;
          margin: 10px 0;
          transition: 0.3s box-shadow ease;
        }
        .movie-item:hover {
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
        }
        .movie-title a {
          font-weight: bold;
          text-decoration: none;
          color: black;
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
    (m: { genre_ids: number[]; original_title: string; id: number }) => {
      const movie: MovieItem = {
        genres: m.genre_ids,
        title: m.original_title,
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
