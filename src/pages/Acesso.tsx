import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import PaywallModal from '../components/PaywallModal'
import Simulador from '../components/Simulador'
import { freeItems, paidProducts, Product } from '../data/products'

export default function Acesso() {
  const [tab, setTab] = useState('inicio')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showSimulador, setShowSimulador] = useState(false)

  function handleProductClick(product: Product) {
    if (product.id === 'simulador') {
      setShowSimulador(true)
      return
    }
    if (product.free) {
      alert(`Aqui abriria o conteúdo grátis: ${product.title}`)
      return
    }
    setSelectedProduct(product)
  }

  if (showSimulador) {
    return <Simulador onExit={() => setShowSimulador(false)} />
  }

  return (
    <div className="min-h-screen bg-brand-50 pb-24">
      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm">Boa volta,</p>
          <h1 className="font-display text-2xl font-bold text-slate-900">Bora estudar? 📚</h1>
        </div>

        {tab === 'inicio' && (
          <div className="animate-in">
            {/* DESTAQUE — Corretor IA */}
            <div className="mb-8">
              <ProductCard
                product={paidProducts[0]}
                onClick={() => handleProductClick(paidProducts[0])}
              />
            </div>

            {/* GRÁTIS */}
            <h2 className="font-semibold text-slate-800 mb-3">Conteúdo gratuito</h2>
            <div className="space-y-3 mb-8">
              {freeItems.map((item) => (
                <ProductCard key={item.id} product={item} onClick={() => handleProductClick(item)} />
              ))}
            </div>

            {/* OUTRAS FERRAMENTAS PAGAS */}
            <h2 className="font-semibold text-slate-800 mb-3">Ferramentas premium</h2>
            <div className="space-y-4">
              {paidProducts.slice(1).map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
              ))}
            </div>
          </div>
        )}

        {tab === 'ferramentas' && (
          <div className="animate-in">
            <h2 className="font-semibold text-slate-800 mb-3">Todas as ferramentas</h2>
            <div className="space-y-4">
              {paidProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
              ))}
            </div>
          </div>
        )}

        {tab === 'simulador' && (
          <div className="animate-in bg-white rounded-3xl p-8 text-center border border-slate-100">
            <span className="text-4xl mb-3 block">⏱️</span>
            <h2 className="font-display text-xl font-semibold text-slate-900 mb-2">Simulador Cronometrado</h2>
            <p className="text-slate-500 text-sm mb-5">
              Treine com um tema sorteado e o mesmo tempo da prova real.
            </p>
            <button
              onClick={() => setShowSimulador(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Começar agora
            </button>
          </div>
        )}

        {tab === 'perfil' && (
          <div className="animate-in bg-white rounded-3xl p-6 border border-slate-100">
            <h2 className="font-semibold text-slate-800 mb-4">Meu perfil</h2>
            <p className="text-slate-400 text-sm">
              Aqui entra a área de conta do usuário — nome, email, histórico de compras e redações
              corrigidas. Precisa ser conectado com o sistema de login (Firebase Auth).
            </p>
          </div>
        )}
      </div>

      <BottomNav active={tab} onChange={setTab} />
      <PaywallModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
