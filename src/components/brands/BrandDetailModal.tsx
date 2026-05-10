import type { BrandProfile } from '../../data/mockBrands'

type BrandDetailModalProps = {
  brand: BrandProfile | null
  onClose: () => void
}

export function BrandDetailModal({ brand, onClose }: BrandDetailModalProps) {
  if (!brand) return null

  return (
    <>
      <div
        className="brand-modal__backdrop"
        role="presentation"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`brand-modal-title-${brand.id}`}
        className="brand-modal"
      >
        <div className="brand-modal__header">
          <h2 id={`brand-modal-title-${brand.id}`}>{brand.name}</h2>
          <button type="button" className="icon-button icon-button--ghost icon-button--sm brand-modal__x" aria-label="Chiudi" onClick={onClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {brand.tagline ? <p className="brand-modal__tag">{brand.tagline}</p> : null}
        <p className="brand-modal__desc">{brand.description}</p>
        {brand.highlights.length ? (
          <ul className="brand-modal__list">
            {brand.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
}
