import { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  if (product.free) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left bg-white border border-slate-100 hover:border-brand-200 hover:shadow-md rounded-2xl p-5 transition-all flex items-start gap-4"
      >
        <span className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
          {product.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm mb-1">{product.title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-2">{product.description}</p>
          <span className="text-brand-600 text-xs font-semibold">{product.cta} →</span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-gradient-to-br ${product.gradient} rounded-3xl p-6 text-white relative overflow-hidden group transition-transform hover:-translate-y-0.5`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
      <span className="text-3xl mb-3 block">{product.icon}</span>
      <h3 className="font-display font-semibold text-lg mb-1.5 relative">{product.title}</h3>
      <p className="text-white/80 text-sm leading-relaxed mb-4 relative">{product.description}</p>
      <div className="flex items-center justify-between relative">
        <span className="text-white/90 text-xs font-medium">{product.price}</span>
        <span className="bg-white/20 group-hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
          {product.cta} →
        </span>
      </div>
    </button>
  )
}
