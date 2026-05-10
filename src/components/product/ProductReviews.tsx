import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabase'
import {
  getMyReview,
  listReviewsWithAuthors,
  upsertMyReview,
  type ReviewDisplay,
} from '../../data/reviewsFromSupabase'

type ProductReviewsProps = {
  productId: string
}

export function ProductReviews ({ productId }: ProductReviewsProps) {
  const { status, user } = useAuth()
  const signedIn = status === 'signedIn' && Boolean(user?.id)
  const configured = isSupabaseConfigured()

  const [reviews, setReviews] = useState<ReviewDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [myRating, setMyRating] = useState(5)
  const [myBody, setMyBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }
    setLoading(true)
    void listReviewsWithAuthors(productId).then((list) => {
      setReviews(list)
      setLoading(false)
    })
  }, [productId, configured])

  useEffect(() => {
    if (!signedIn || !user?.id || !configured) return
    void getMyReview(productId, user.id).then((row) => {
      if (row) {
        setMyRating(row.rating)
        setMyBody(row.body)
      }
    })
  }, [signedIn, user?.id, productId, configured])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return
    setSaving(true)
    setNotice(null)
    const { error } = await upsertMyReview({
      productId,
      userId: user.id,
      rating: myRating,
      body: myBody,
    })
    setSaving(false)
    if (error) {
      setNotice(error)
      return
    }
    setNotice('Recensione salvata. Grazie!')
    void listReviewsWithAuthors(productId).then(setReviews)
  }

  if (!configured) {
    return (
      <div className="review-card">
        <p className="muted">
          Le recensioni online saranno disponibili quando il backend sarà collegato.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="review-list">
        {loading ? (
          <p className="muted">Caricamento recensioni…</p>
        ) : reviews.length === 0 ? (
          <p className="muted">
            Questo prodotto non ha ancora recensioni. Condividi la tua.
          </p>
        ) : (
          <ul className="review-list__items">
            {reviews.map((r) => (
              <li key={r.id} className="review-list__item">
                <div className="review-list__meta">
                  <strong>{r.authorLabel}</strong>
                  <span className="muted">{r.createdAt}</span>
                  <span className="review-list__stars" aria-label={`${r.rating} su 5`}>
                    {'★'.repeat(r.rating)}
                    {'☆'.repeat(5 - r.rating)}
                  </span>
                </div>
                {r.body ? <p>{r.body}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      {signedIn ? (
        <form className="review-form" onSubmit={(e) => void handleSubmit(e)}>
          <h4 className="review-form__title">La tua recensione</h4>
          {notice ? <p className="login-card__notice">{notice}</p> : null}
          <label className="contact-field">
            <span>Valutazione (1–5)</span>
            <select
              value={myRating}
              onChange={(e) => setMyRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stelle
                </option>
              ))}
            </select>
          </label>
          <label className="contact-field">
            <span>Commento (opzionale)</span>
            <textarea
              value={myBody}
              onChange={(e) => setMyBody(e.target.value)}
              rows={3}
              placeholder="Com’è stato il prodotto?"
            />
          </label>
          <button
            type="submit"
            className="button button--primary"
            disabled={saving}
          >
            {saving ? 'Salvataggio…' : 'Pubblica recensione'}
          </button>
        </form>
      ) : (
        <div className="review-card">
          <p className="muted">
            <Link to="/login" state={{ from: { pathname: `/prodotto/${productId}` } }}>
              Accedi
            </Link>
            {' '}
            per lasciare una recensione.
          </p>
        </div>
      )}
    </>
  )
}
