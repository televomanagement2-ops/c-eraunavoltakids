import { useEffect, useState } from 'react'
import type { Product } from '../../types'
import { useCatalogProducts } from '../../hooks/useCatalogProducts'

export default function AdminCatalog () {
  const { products, status } = useCatalogProducts()
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    if (status === 'ready' && products.length) {
      setItems(products)
    }
  }, [products, status])

  const updateItem = (id: string, patch: Partial<Product>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  }

  if (status === 'loading') {
    return (
      <section className="admin-page">
        <p className="muted">Caricamento catalogo…</p>
      </section>
    )
  }

  return (
    <section className="admin-page">
      <header className="admin-page__header">
        <div>
          <span className="eyebrow">CATALOGO</span>
          <h2>Prodotti e stock</h2>
          <p>Gestisci disponibilita, nuovi arrivi ed esauriti.</p>
        </div>
        <button type="button" className="button button--primary">
          Nuovo prodotto
        </button>
      </header>
      <div className="admin-list">
        {items.map((item) => (
          <div key={item.id} className="admin-list__row">
            <img src={item.images[0]} alt={item.name} />
            <div className="admin-list__info">
              <h3>{item.name}</h3>
              <p className="muted">{item.category}</p>
              <span className="price">{item.price.toFixed(2)} EUR</span>
            </div>
            <div className="admin-list__controls">
              <label>
                Stock
                <input
                  type="number"
                  min={0}
                  value={item.stock}
                  onChange={(event) =>
                    updateItem(item.id, {
                      stock: Number(event.target.value),
                      isSoldOut: Number(event.target.value) === 0,
                    })
                  }
                />
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={item.isNew}
                  onChange={(event) =>
                    updateItem(item.id, { isNew: event.target.checked })
                  }
                />
                <span>Nuovo arrivo</span>
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={item.isSoldOut}
                  onChange={(event) =>
                    updateItem(item.id, {
                      isSoldOut: event.target.checked,
                      stock: event.target.checked ? 0 : item.stock,
                    })
                  }
                />
                <span>Esaurito</span>
              </label>
              <button type="button" className="button button--ghost">
                Aggiorna stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
