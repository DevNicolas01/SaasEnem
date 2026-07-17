import { Product } from '../../data/products'

interface ProductCardProps {
  product: Product
  onClick: () => void
  large?: boolean
}

const styles = {
  freeCard: 'w-full text-left bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 rounded-3xl p-5 transition-all flex items-start gap-4 backdrop-blur',
  paidCard: 'w-full text-left rounded-3xl p-6 text-slate-950 relative overflow-hidden group transition-all hover:-translate-y-1 shadow-xl shadow-orange-500/20',
  decoration: 'absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10',
  icon: 'w-11 h-11 bg-amber-400/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0',
  content: 'flex-1 min-w-0',
  title: 'font-bold text-white text-sm mb-1',
  description: 'text-slate-400 text-xs leading-relaxed mb-2',
  freeCta: 'text-amber-400 text-xs font-bold',
  footer: 'flex items-center justify-between relative',
  price: 'text-slate-950/80 text-xs font-bold',
  button: 'bg-white/30 group-hover:bg-white/50 text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition-colors',
  badge: 'absolute top-4 left-4 bg-slate-950 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 tracking-wide',
}

export default function ProductCard({ product, onClick, large }: ProductCardProps) {
  if (product.free) {
    return (
      <button onClick={onClick} className={styles.freeCard}>
        <span className={styles.icon}>{product.icon}</span>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.description}>{product.description}</p>
          <span className={styles.freeCta}>{product.cta} →</span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.paidCard} bg-gradient-to-br ${product.gradient ?? 'from-amber-400 to-orange-500'} ${large ? 'p-8 ring-2 ring-amber-400/50 ring-offset-4 ring-offset-slate-950' : ''}`}
    >
      {product.badge && <span className={styles.badge}>{product.badge}</span>}
      <div className={styles.decoration} />

      <span className={`${large ? 'text-4xl mb-4' : 'text-3xl mb-3'} block relative mt-2`}>{product.icon}</span>

      <h3 className={`font-bold text-slate-950 relative ${large ? 'text-2xl mb-2' : 'text-lg mb-1.5'}`}>
        {product.title}
      </h3>

      <p className={`text-slate-950/70 leading-relaxed relative ${large ? 'text-sm mb-5' : 'text-sm mb-4'}`}>
        {product.description}
      </p>

      {product.socialProof && (
        <p className="text-slate-950/60 text-xs font-medium mb-3 relative">✨ {product.socialProof}</p>
      )}

      <div className={styles.footer}>
        <span className={styles.price}>{product.price}</span>
        <span className={styles.button}>{product.cta} →</span>
      </div>
    </button>
  )
}
