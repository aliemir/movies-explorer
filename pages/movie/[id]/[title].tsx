import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import css from 'styled-jsx/css'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Genre } from '../../../utils/getGenre'
import theme from '../../../styles/theme'
import Head from 'next/head'
import Loading from '../../../components/Loading'

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
    box-shadow: inset 0px 50px 20px -30px rgba(255,255,255,1);
    margin: 0 -10px;
    opacity: 0.5;
    z-index: -1;
    height: 230px;
    border-bottom: 3px solid ${theme.colors.primaryA};
    background-color: ${theme.colors.primaryA};
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
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
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
  }
  .movie-title {
    margin-top: 120px;
    margin-bottom: auto;
    padding: 10px;
    color: ${theme.colors.primaryA};
    font-size: 21px;
    font-weight: ${theme.fontWeight.bold};
  }
  .movie-details {
    padding-top: 20px;
  }
  .movie-release-rating {
    display: flex;
    justify-content: space-around;
  }
  .movie-release-rating > div {
    padding: 7px 14px;
    /* border: 1px solid ${theme.colors.grayB}; */
    border-radius: 20px;
    font-size: 13px;
    color: ${theme.colors.primaryA};
  }
  .movie-release .value, .movie-rating .value {
    font-weight: ${theme.fontWeight.semi};
    padding: 0 2px;
  }
  .movie-release {
    border: 2px solid ${theme.colors.green};
    background: ${theme.colors.green}88;
  }
  .movie-rating {
    border: 2px solid ${theme.colors.yellow};
    background: ${theme.colors.yellow}88;
  }
  .movie-genres {
    padding-top: 15px;
    color: ${theme.colors.primaryC};
    text-align: center;
    font-size: 14px;
  }
  .genre-tag {
    display: inline-block;
    flex-shrink: 0;
    padding: 7px 12px;
    border-radius: 50px;
    font-size: 13px;
    line-height: 13px;
    margin: 0 4px;
    font-weight: 400;
    color: ${theme.colors.primaryB};
    border: 1px solid ${theme.colors.grayA};
  }
  .movie-overview {
    padding: 10px;
    color: ${theme.colors.primaryB};
  }
  .movie-overview p {
    text-align: justify;
    text-indent: 20px;
  }
  @media screen and (min-width: ${theme.breakpoint.m}) {
    .movie-backdrop {
      height: 400px;
    }
    .movie-poster img {
      width: 150px;
    }
    .movie-upper-info {
      margin-top: -150px;
      padding: 0 20px;
    }
    .movie-title {
      margin-top: 150px;
    }
  }
`

const MovieDetailPage: NextPage = () => {
  const router = useRouter()
  const [error, setError] = useState<boolean>(false)
  const [movie, setMovie] = useState<MovieDetailInterface | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${router.query.id}?api_key=${process.env.TMDB_API_KEY}`,
      )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res
          } else {
            throw res.statusText
          }
        })
        .then((json) => json.json())
        .then((data) => {
          const m: MovieDetailInterface = {
            id: (data as MovieDataInterface).id,
            title: (data as MovieDataInterface).title,
            genres: (data as MovieDataInterface).genres,
            overview: (data as MovieDataInterface).overview ?? undefined,
            release:
              (data as MovieDataInterface).release_date?.substring(0, 4) ??
              '0000',
            rating: (data as MovieDataInterface).vote_average,
            posterPath: (data as MovieDataInterface).poster_path ?? undefined,
            backdropPath:
              (data as MovieDataInterface).backdrop_path ?? undefined,
          }
          setMovie(m)
        })
        .catch((e) => {
          console.log('aaaa')
          setError(true)
          console.log(e)
        })
    }
    if (router.query.id !== undefined) {
      fetchData()
    }
  }, [router.query.id])

  if (error) {
    return <Error statusCode={404} />
  }

  if (!movie) {
    return <Loading />
  } else {
    return (
      <div className="movie-details">
        <Head>
          <title>{`Movies - ${movie.title}`}</title>
        </Head>
        <div className="movie-details-upper">
          <div
            className="movie-backdrop"
            style={
              movie.backdropPath
                ? {
                    backgroundImage: `url("https://image.tmdb.org/t/p/w780/${movie.backdropPath}")`,
                  }
                : {}
            }
          >
            {/* <img
              src={`https://image.tmdb.org/t/p/w780/${movie.backdropPath}`}
              alt="Movie backdrop poster"
            /> */}
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
          <div className="movie-release-rating">
            <div className="movie-release">
              Year: <span className="value">{movie.release}</span>
            </div>
            <div className="movie-rating">
              Rating: <span className="value">{movie.rating}</span>/10
            </div>
          </div>
          <div className="movie-genres">
            {movie.genres?.map((g) => (
              <div className="genre-tag">{g.name}</div>
            ))}
          </div>
          <div className="movie-overview">
            <p>{movie.overview}</p>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default MovieDetailPage
