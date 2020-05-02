import React, { useState } from 'react'
import css from 'styled-jsx/css'
import StarSVG from './Star'
import titleToURL from '../utils/titleToURL'
import Link from 'next/link'
import theme from '../styles/theme'
import getGenre from '../utils/getGenre'
import HeartSVG from './Heart'

interface MovieItemProps {
  posterPath?: string
  genres: number[]
  rating: number
  release: string
  title: string
  id: number
}

interface StarsProps {
  color: string
}

const Stars: React.FC<StarsProps> = ({ color }) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <StarSVG
        key={i}
        height="15"
        width="15"
        className="star-svg"
        color={color}
      />,
    )
  }
  return <>{stars}</>
}

const styles = css`
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
  .movie-item:active {
    /* box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.6); */
  }
  .movie-item:active .movie-poster {
    margin-top: -27px;
  }
  .movie-item:active .movie-poster > a > * {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.75);
    transform: scale(1.05);
  }
  .movie-poster {
    margin-top: -22px;
    transition: 0.3s margin ease;
  }
  .movie-poster > a > * {
    border-radius: 10px;
    box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.5);
    transition-timing-function: ease;
    transition-duration: 0.3s;
    transition-property: box-shadow, transform;
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
    display: flex;
    text-align: left;
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primaryB};
    text-style: none;
  }
  .movie-title a {
    flex: 1;
    text-decoration: none;
    color: unset;
  }
  .movie-like {
    border: none;
    background: none;
    outline: none;
    margin: 0;
    height: 24px;
    padding-top: 3px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: -10px;
    padding-bottom: 5px;
    cursor: pointer;
  }
  .movie-info-detail {
    margin-top: auto;
    padding-bottom: 10px;
  }
  .movie-release-rating {
    display: flex;
  }
  .movie-release {
    font-size: 12px;
    color: ${theme.colors.grayA};
    padding-right: 15px;
    line-height: 15px;
  }
  .movie-rating {
    position: relative;
    box-sizing: border-box;
    font-weight: ${theme.fontWeight.semi};
    font-size: 0.75em;
    padding-bottom: 5px;
  }
  .movie-rating-stars {
    display: inline;
    height: 15px;
  }
  .movie-rating-stars.back {
    position: absolute;
    left: 0;
  }
  .movie-genres {
    font-size: 0.75em;
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
`

const MovieItem: React.FC<MovieItemProps> = ({
  posterPath,
  genres,
  rating,
  release,
  title,
  id,
}) => {
  const [liked, setLiked] = useState<boolean>(false)
  const toggleLike = (): void => {
    setLiked(!liked)
  }
  return (
    <div className="movie-item">
      <div className="movie-poster">
        {!!posterPath ? (
          <Link
            href="/movie/[id]/[title]"
            as={`/movie/${id}/${titleToURL(title)}`}
          >
            <a>
              <img
                src={`https://image.tmdb.org/t/p/w154/${posterPath}`}
                alt={`${title} poster`}
              />
            </a>
          </Link>
        ) : (
          <div className="fallback" />
        )}
      </div>
      <div className="movie-info">
        <div className="movie-title">
          <Link
            href="/movie/[id]/[title]"
            as={`/movie/${id}/${titleToURL(title)}`}
          >
            <a className="line-limit limit-three">{title}</a>
          </Link>
          <button className="movie-like" onClick={(): void => toggleLike()}>
            <HeartSVG
              height={16}
              width={16}
              fill={liked ? theme.colors.secondary : 'none'}
              stroke={liked ? theme.colors.secondary : theme.colors.primaryB}
              style={{
                transition: `0.3s all ease`,
              }}
            />
          </button>
        </div>
        <div className="movie-info-detail">
          <div className="movie-release-rating">
            <div className="movie-release">{release}</div>
            <div className="movie-rating">
              <div className="movie-rating-stars back">
                <Stars color={theme.colors.grayB} />
              </div>
              <div
                className="movie-rating-stars"
                style={{
                  clipPath: `polygon(0 0, ${rating * 10}% 0, ${
                    rating * 10
                  }% 100%, 0% 100%)`,
                }}
              >
                <Stars color={theme.colors.yellow} />
              </div>
            </div>
          </div>
          <div className="movie-genres">
            <span className="genre line-limit limit-two">
              {genres.map((g) => getGenre(g)).join(', ')}
            </span>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default MovieItem
