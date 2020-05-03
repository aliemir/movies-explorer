export interface Tab {
  id: number
  path: string
  displayName: string
}

const tabs: Tab[] = [
  {
    id: 0,
    path: '/',
    displayName: 'Discover',
  },
  {
    id: 1,
    path: '/trending',
    displayName: 'Trending',
  },
  {
    id: 2,
    path: '/top100',
    displayName: 'Top100',
  },
  // {
  //   id: 3,
  //   path: '/liked',
  //   displayName: 'Liked',
  // },
]

export default tabs
