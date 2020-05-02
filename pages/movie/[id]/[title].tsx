import React, { useState, useEffect } from 'react'
import css from 'styled-jsx/css'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { Genre } from '../../../utils/getGenre'
import theme from '../../../styles/theme'
import Head from 'next/head'

interface MovieDetailInterface {
  id: number
  title: string
  genres: Genre[]
  overview: string | undefined
  release: string
  rating: number
  posterPath: string | undefined
  backdropPath: string | undefined
}

interface MovieDataInterface {
  id: number
  title: string
  genres: Genre[]
  overview: string | null
  release_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
}

const styles = css`
  .movie-details {
    display: flex;
    flex-direction: column;
  }
  .movie-details-upper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .movie-backdrop {
    margin: 0 -10px;
    border-top: 4px solid ${theme.colors.secondary};
    
    z-index: -1;
  }
  .movie-backdrop > img {
    width: 100%;
    opacity: 0.75;
  }
  .movie-upper-info {
    margin-top: -120px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .movie-poster {
  }
  .movie-poster img {
    width: 120px;
    border-radius: 12px;
    /* border: 2px solid ${theme.colors.primaryA}; */
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.75);
  }
  .movie-title {
    margin-top: 110px;
    margin-bottom: auto;
    padding: 10px;
    color: ${theme.colors.primaryA};
    font-size: 21px;
    font-weight: ${theme.fontWeight.bold};
  }
`

const MovieDetailPage: NextPage = () => {
  const router = useRouter()
  const [movie, setMovie] = useState<MovieDetailInterface | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${router.query.id}?api_key=${process.env.TMDB_API_KEY}`,
      )
        .then((res) => res.json())
        .catch((e) => {
          console.log(e)
        })

      const m: MovieDetailInterface = {
        id: (data as MovieDataInterface).id,
        title: (data as MovieDataInterface).title,
        genres: (data as MovieDataInterface).genres,
        overview: (data as MovieDataInterface).overview ?? undefined,
        release:
          (data as MovieDataInterface).release_date?.substring(0, 4) ?? '0000',
        rating: (data as MovieDataInterface).vote_average,
        posterPath: (data as MovieDataInterface).poster_path ?? undefined,
        backdropPath: (data as MovieDataInterface).backdrop_path ?? undefined,
      }
      setMovie(m)
    }
    if (router.query.id !== undefined) {
      fetchData()
    }
  }, [router.query.id])

  if (!movie) {
    return <p>Loading...</p>
  } else {
    return (
      <div className="movie-details">
        <Head>
          <title>{`Movies - ${movie.title}`}</title>
        </Head>
        <div className="movie-details-upper">
          <div className="movie-backdrop">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movie.backdropPath}`}
              alt="Movie backdrop poster"
            />
          </div>
          <div className="movie-upper-info">
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w154/${movie.posterPath}`}
                alt={movie.title}
              />
            </div>
            <div className="movie-title">{movie.title}</div>
          </div>
        </div>
        <div className="movie-details">
          <div>
            <span>{movie.release}</span>
            {'  -  '}
            <span>{movie.rating}</span>
          </div>
          <div>{movie.genres?.map((g) => g.name).join(', ')}</div>
          <p>{movie.overview}</p>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default MovieDetailPage
