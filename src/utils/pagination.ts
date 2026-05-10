export function paginate<T>(items: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage
  return items.slice(start, start + perPage)
}

export function getPageCount(total: number, perPage: number) {
  return Math.max(1, Math.ceil(total / perPage))
}
