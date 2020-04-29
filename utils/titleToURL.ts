type TitleToURL = (title: string) => string

const titleToURL: TitleToURL = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default titleToURL
