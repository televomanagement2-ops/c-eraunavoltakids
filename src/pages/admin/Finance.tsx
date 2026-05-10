import { useEffect, useMemo, useState } from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { mockFinance } from '../../data/mockFinance'
import {
  insertFinanceEntry,
  loadFinanceEntries,
} from '../../data/financeFromSupabase'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { FinanceEntry } from '../../types'

const formatShortDate = (value: string) => value.slice(5)

export default function AdminFinance () {
  const [entries, setEntries] = useState<FinanceEntry[]>([])
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('2026-05-07')

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setEntries(mockFinance)
      return
    }
    void loadFinanceEntries().then(setEntries)
  }, [])

  const chartData = useMemo(
    () =>
      entries.map((entry) => ({
        date: formatShortDate(entry.date),
        amount: entry.amount,
      })),
    [entries],
  )

  const addEntry = async () => {
    if (!label.trim() || !amount) {
      return
    }

    const next = {
      date,
      label: label.trim(),
      amount: Number(amount),
    }

    if (isSupabaseConfigured()) {
      const result = await insertFinanceEntry(next)
      if (result.ok && result.row) {
        setEntries((prev) => [result.row!, ...prev])
      } else if (result.error) {
        window.alert(result.error)
        return
      }
    } else {
      setEntries((prev) => [
        ...prev,
        {
          id: `fin-${prev.length + 1}`,
          ...next,
        },
      ])
    }

    setLabel('')
    setAmount('')
  }

  return (
    <section className="admin-page">
      <header className="admin-page__header">
        <div>
          <span className="eyebrow">FINANZA</span>
          <h2>Rimborsi e ricavi</h2>
          <p>Inserisci manualmente i guadagni e monitora l'andamento.</p>
        </div>
      </header>
      <div className="admin-finance">
        <div className="admin-card">
          <h3>Nuova voce</h3>
          <div className="admin-form">
            <label>
              Data
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
            <label>
              Descrizione
              <input
                type="text"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="Esempio: ordini boutique"
              />
            </label>
            <label>
              Importo
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="EUR"
              />
            </label>
            <button type="button" className="button button--primary" onClick={() => void addEntry()}>
              Aggiungi
            </button>
          </div>
        </div>
        <div className="admin-card admin-card--chart">
          <div className="admin-card__header">
            <h3>Ultimi 30 giorni</h3>
            <span className="muted">Ricavi cumulati</span>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" stroke="#9aa0aa" />
                <YAxis stroke="#9aa0aa" />
                <Tooltip
                  contentStyle={{
                    background: '#0f1218',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    color: '#e5e7eb',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#7bd0ff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="admin-card">
          <h3>Ultime voci</h3>
          <ul className="admin-list admin-list--compact">
            {entries.map((entry) => (
              <li key={entry.id}>
                <div>
                  <p>{entry.label}</p>
                  <span className="muted">{entry.date}</span>
                </div>
                <strong>{entry.amount.toFixed(0)} EUR</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
