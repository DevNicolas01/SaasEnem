import { useState } from 'react'
import { Product } from '../../data/products'
import { trackEvent } from '../../services/eventService'

interface PaywallModalProps {
  product: Product | null
  onClose: () => void
}

const styles = {
  overlay: 'fixed inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-end sm:items-center justify-center px-0 sm:px-6',
  modal: 'w-full sm:max-w-md bg-slate-900 border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 relative animate-in',
  close: 'absolute top-4 right-4 text-slate-500 hover:text-white transition text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10',
  icon: 'text-4xl mb-4 block',
  title: 'text-xl font-bold text-white mb-2',
  description: 'text-slate-400 text-sm leading-relaxed mb-4',
  firstFree: 'text-emerald-400 text-sm font-semibold mb-4',
  socialProof: 'text-slate-500 text-xs font-medium mb-4',
  comparisonNote: 'text-slate-500 text-xs mb-4',
  includesList: 'space-y-2 mb-5',
  includesItem: 'flex items-start gap-2 text-sm text-slate-300',
  includesCheck: 'text-emerald-400 mt-0.5',
  packages: 'space-y-2 mb-5',
  packageOption: 'w-full text-left rounded-2xl p-4 border transition flex items-center justify-between',
  packageOptionActive: 'border-amber-400 bg-amber-400/10',
  packageOptionInactive: 'border-white/10 bg-white/5 hover:border-white/20',
  packageLabel: 'text-white font-semibold text-sm flex items-center gap-2',
  packageBadge: 'text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full',
  packageDescription: 'text-slate-500 text-xs',
  packagePrice: 'text-white font-bold text-sm',
  priceBox: 'bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 flex items-center justify-between',
  priceLabel: 'text-slate-500 text-xs',
  price: 'text-white font-bold',
  cta: 'w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl transition hover:-translate-y-0.5 mb-3',
  secondary: 'w-full text-slate-400 text-sm font-semibold py-2 hover:text-white transition',
}

export default function PaywallModal({ product, onClose }: PaywallModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)

  if (!product) return null

  const packages = product.packages
  const selectedPackage =
    packages?.find((p) => p.id === selectedPackageId) ?? packages?.[0] ?? null

  function handleCheckout() {
    trackEvent('checkout_click', {
      productId: product!.id,
      packageId: selectedPackage?.id ?? '',
    })

    const url = selectedPackage?.checkoutUrl ?? product!.checkoutUrl

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      // Ainda não tem link de checkout configurado nesse produto/pacote
      // (ver TODOs em data/products.ts).
      alert(`Checkout de "${product!.title}" ainda não configurado.`)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.close} aria-label="Fechar">
          ✕
        </button>

        <span className={styles.icon}>{product.icon}</span>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>

        {product.firstFree && (
          <p className={styles.firstFree}>
            🎁 Sua primeira correção é grátis — sem cartão, sem compromisso
          </p>
        )}

        {product.socialProof && (
          <p className={styles.socialProof}>✨ {product.socialProof}</p>
        )}

        {product.includes && (
          <ul className={styles.includesList}>
            {product.includes.map((item) => (
              <li key={item} className={styles.includesItem}>
                <span className={styles.includesCheck}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {product.comparisonNote && (
          <p className={styles.comparisonNote}>{product.comparisonNote}</p>
        )}

        {packages ? (
          <div className={styles.packages}>
            {packages.map((pkg) => {
              const isActive = (selectedPackage?.id ?? packages[0].id) === pkg.id
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`${styles.packageOption} ${
                    isActive ? styles.packageOptionActive : styles.packageOptionInactive
                  }`}
                >
                  <div>
                    <p className={styles.packageLabel}>
                      {pkg.label}
                      {pkg.highlight && <span className={styles.packageBadge}>MELHOR CUSTO</span>}
                    </p>
                    {pkg.description && (
                      <p className={styles.packageDescription}>{pkg.description}</p>
                    )}
                  </div>
                  <span className={styles.packagePrice}>{pkg.price}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className={styles.priceBox}>
            <span className={styles.priceLabel}>Investimento</span>
            <span className={styles.price}>{product.price}</span>
          </div>
        )}

        <button onClick={handleCheckout} className={styles.cta}>
          {product.cta} →
        </button>
        <button onClick={onClose} className={styles.secondary}>
          Agora não
        </button>
      </div>
    </div>
  )
}
