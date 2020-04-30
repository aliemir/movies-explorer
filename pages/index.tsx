/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Head from 'next/head'
import css from 'styled-jsx'
import titleToURL from '../utils/titleToURL'
import Header from '../components/Header'
import getGenre, { genres } from '../utils/getGenre'
import theme from '../styles/theme'

interface MovieItem {
  posterPath: string | undefined
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
      <Head>
        <title>Discover</title>
      </Head>
      <Header title="Discover" />
      <div className="genres-wrapper">
        <div className="genres-wrapper-shade left"></div>
        <div className="genres-wrapper-shade right"></div>
        <div className="genre-tags">
          {genres.map((g) => (
            <div className="genre-tag" key={g.id}>
              {g.name}
            </div>
          ))}
        </div>
      </div>
      <div className="movie-list">
        {movies.map((m) => (
          <div key={m.id}>
            <div className="movie-item">
              {!!m.posterPath && (
                <img
                  src={`https://image.tmdb.org/t/p/w154/${m.posterPath}`}
                  alt={`${m.title} poster`}
                />
              )}
              <div className="movie-title">
                <Link
                  href="/movie/[id]/[title]"
                  as={`/movie/${m.id}/${titleToURL(m.title)}`}
                >
                  <a>{m.title}</a>
                </Link>
              </div>
              {/* <div className="movie-genre">
                {m.genres
                  .map((g) => getGenre(g))
                  .map((g) => (
                    <div className="genre-tag" key={g}>
                      {g}
                    </div>
                  ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .movie-list {
          padding: 10px 0;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }
        .movie-item {
          width: 154px;
          border-radius: 5px;
          background-color: #fefefe;
          margin: 10px 0;
          transition: 0.3s box-shadow ease;
        }
        .movie-item:hover {
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
        }
        .movie-title {
          text-align: center;
        }
        .movie-title a {
          font-weight: bold;
          text-decoration: none;
        }
        .movie-genre {
          display: flex;
          flex-wrap: wrap;
        }
        .genres-wrapper {
          margin: 0 -10px;
           {
            /* -webkit-box-shadow: inset -22px 0px 14px -18px rgba(255, 255, 255, 1);
          -moz-box-shadow: inset -22px 0px 14px -18px rgba(255, 255, 255, 1); */
          }
        }
        .genres-wrapper-shade {
          width: 22px;
          height: 29px;
          position: absolute;
        }
        .genres-wrapper-shade.right {
          box-shadow: inset -30px 0px 20px -15px white;
          right: 0;
        }
        .genres-wrapper-shade.left {
          box-shadow: inset 30px 0px 20px -15px white;
          left: 0;
        }
        .genre-tags {
          padding: 0 20px;

          display: flex;
          flex-wrap: nowrap;
          overflow: scroll;
        }

        .genre-tags::after {
          content: '';
          flex: 0 0 20px;
        }
        .genre-tags .genre-tag:first-child {
          margin-left: 0;
        }
        .genre-tags .genre-tag:last-child {
          margin-right: 0;
        }
        .genre-tag {
          display: inline-block;
          flex-shrink: 0;
          padding: 7px 9px;
          border-radius: 50px;
          font-size: 13px;
          line-height: 13px;
          border: 1px solid ${theme.colors.border};
          margin: 0 4px;
          font-weight: 500;
          color: ${theme.colors.primaryB};
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
      title: string
      id: number
    }) => {
      const movie: MovieItem = {
        posterPath: m.poster_path ?? undefined,
        genres: m.genre_ids,
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
