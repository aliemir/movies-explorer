import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import fetch from 'isomorphic-unfetch'

interface MovieDetailPageProps {
  id: string
  title: string
  overview: string
}

const MovieDetailPage: NextPage<MovieDetailPageProps> = ({
  id,
  title,
  overview,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{id}</h3>
      <p>{overview}</p>
    </div>
  )
}

export default MovieDetailPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
  )
    .then((res) => res.json())
    .catch((e) => {
      console.log(e)
    })

  const props: MovieDetailPageProps = {
    id: data.id ?? '',
    title: data.original_title ?? '',
    overview: data.overview ?? '',
  }

  return {
    props,
  }
}
