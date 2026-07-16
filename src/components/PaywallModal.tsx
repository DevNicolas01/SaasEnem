import { Product } from '../data/products'

interface PaywallModalProps {
  product: Product | null
  onClose: () => void
}

export default function PaywallModal({ product, onClose }: PaywallModalProps) {
  if (!product) return null

  function handleCheckout() {
    // TODO: trocar pela URL real de checkout desse produto (Lastlink, Stripe, etc)
    // ou, se já tiver a integração de pagamento pronta, chamar a API aqui.
    alert(`Aqui vai o checkout de: ${product.title}\n\nTroque este alert pela URL real de pagamento.`)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-7 animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient ?? 'from-brand-500 to-brand-700'} flex items-center justify-center text-2xl mb-4`}>
          {product.icon}
        </div>
        <h2 className="font-display font-semibold text-xl text-slate-900 mb-2">{product.title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{product.description}</p>

        <div className="bg-brand-50 rounded-xl p-3 mb-5 text-center">
          <span className="text-brand-700 font-bold text-lg">{product.price}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold py-3.5 rounded-xl transition-all mb-2"
        >
          Desbloquear agora
        </button>
        <button
          onClick={onClose}
          className="w-full text-slate-400 text-sm py-2"
        >
          Agora não
        </button>
      </div>
    </div>
  )
}
