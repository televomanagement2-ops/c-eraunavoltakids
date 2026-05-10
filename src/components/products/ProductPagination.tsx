type ProductPaginationProps = {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

export function ProductPagination({
  page,
  pageCount,
  onChange,
}: ProductPaginationProps) {
  if (pageCount <= 1) {
    return null
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <div className="pagination">
      <button
        type="button"
        className="button button--ghost"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Indietro
      </button>
      <div className="pagination__pages">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`pagination__page ${
              pageNumber === page ? 'is-active' : ''
            }`}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="button button--ghost"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
      >
        Avanti
      </button>
    </div>
  )
}
