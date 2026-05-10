import { Link } from 'react-router-dom'

type BrandMarkLinkProps = {
  className?: string
}

export function BrandMarkLink({ className = '' }: BrandMarkLinkProps) {
  return (
    <Link to="/" className={['nav-brand', className].filter(Boolean).join(' ')}>
      <span className="nav-logo">C&apos;era una volta </span>
      <span className="nav-logo-accent">kids</span>
    </Link>
  )
}

type BrandMarkStaticProps = {
  className?: string
}

export function BrandMarkStatic({ className = '' }: BrandMarkStaticProps) {
  return (
    <div className={['nav-brand', className].filter(Boolean).join(' ')}>
      <span className="nav-logo">C&apos;era una volta </span>
      <span className="nav-logo-accent">kids</span>
    </div>
  )
}
