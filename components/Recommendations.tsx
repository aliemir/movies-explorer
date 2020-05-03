import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import Loading from './Loading'
import theme from '../styles/theme'
import titleToURL from '../utils/titleToURL'

interface RecommendationsProps {
  movieId: number
}

interface RecommendedMovie {
  posterPath: string | undefined
  title: string
  id: number
}

interface MovieData {
  poster_path: string | null
  title: string
  id: number
}

const styles = css`
  .movie-recommendations {
    margin: 0 -10px;
    position: relative;
  }
  .recommendations-list {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .recommendations-list::after {
    content: '';
    flex: 0 0 10px;
  }
  .recommendation-shade {
    width: 30px;
    height: 119px;
    position: absolute;
  }
  .recommendation-shade.right {
    box-shadow: inset -25px 0px 10px -10px white;
    right: 0;
  }
  .recommendation-shade.left {
    box-shadow: inset 25px 0px 10px -10px white;
    left: 0;
  }
  .recommendation {
    user-select: none;
    flex-shrink: 0;
    padding: 7px 7px;
    padding-bottom: 10px;
    border-radius: 8px;
    transition: 0.3s transform ease;
  }
  .recommendation:hover {
    transform: scale(1.1);
  }
  .recommendation:first-child {
    margin-left: 15px;
  }
  @media screen and (min-width: ${theme.breakpoint.m}) {
    .recommendations-list {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .recommendation img {
    width: 70px;
    border-radius: 8px;
    box-shadow: 0px 0px 3px 0px black;
  }
  .placeholder {
    width: 70px;
    height: 105px;
    background: ${theme.colors.grayA};
  }
`

const Recommendations: React.FC<RecommendationsProps> = ({ movieId }) => {
  const [movies, setMovies] = useState<RecommendedMovie[] | undefined>(
    undefined,
  )

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    const fetchData = async (): Promise<void> => {
      await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_API_KEY}`,
      )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res
          } else {
            throw res.statusText
          }
        })
        .then((res) => res.json())
        .then((data) => {
          const movies: RecommendedMovie[] =
            data.results?.map((m: MovieData) => {
              const movie: RecommendedMovie = {
                posterPath: m.poster_path ?? undefined,
                title: m.title,
                id: m.id,
              }
              return movie
            }) ?? undefined
          timeout = setTimeout(() => setMovies(movies.slice(0, 9)), 500)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    fetchData()
    return (): void => {
      if (timeout) clearTimeout(timeout)
    }
  }, [movieId])

  if (!!movies) {
    return (
      <>
        <div className="movie-recommendations">
          <div className="recommendation-shade left"></div>
          <div className="recommendation-shade right"></div>
          <div className="recommendations-list">
            {movies.map((m) => (
              <div className="recommendation" key={m.id}>
                <Link
                  href="/movie/[id]/[title]"
                  as={`/movie/${m.id}/${titleToURL(m.title)}`}
                >
                  <a>
                    {m.posterPath ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w780/${m.posterPath}`}
                        alt={m.title}
                      />
                    ) : (
                      <div className="placeholder"></div>
                    )}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{styles}</style>
      </>
    )
  } else {
    return <Loading />
  }
}

export default Recommendations
