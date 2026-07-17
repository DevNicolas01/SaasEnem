import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import BottomNav from '../components/navigation/BottomNav'
import ProductCard from '../components/products/ProductCard'
import PaywallModal from '../components/products/PaywallModal'
import Simulador from '../components/tools/Simulador'
import DefinirSenha from '../components/profile/DefinirSenha'
import { freeItems, paidProducts, anchorProduct, comboProduct, Product } from '../data/products'
import { trackEvent } from '../services/eventService'
import { getUserProfile, deleteAccount } from '../services/leadService'
import { auth } from '../services/firebase'

const styles = {
  page: 'min-h-dvh bg-slate-950 pb-24',
  container: 'max-w-2xl mx-auto px-6 py-8',
  header: 'mb-8',
  welcome: 'text-slate-500 text-sm',
  title: 'text-2xl font-bold text-white',
  sectionTitle: 'text-sm font-bold uppercase tracking-wider text-amber-400 mb-4',
  section: 'space-y-3 mb-8',
  emptyCard: 'bg-white/5 border border-white/10 rounded-3xl p-8 text-center',
  icon: 'text-4xl mb-3 block',
  cardTitle: 'text-xl font-bold text-white mb-2',
  description: 'text-slate-400 text-sm leading-relaxed mb-5',
  button: 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition hover:-translate-y-1',
  profileCard: 'bg-white/5 border border-white/10 rounded-3xl p-6',
  profileTitle: 'text-lg font-bold text-white mb-3',
  profileName: 'text-white font-semibold',
  profileEmail: 'text-slate-500 text-xs mt-1',
  profileLink: 'text-amber-400 text-sm font-semibold hover:underline',
  passwordBanner: 'w-full text-left bg-amber-400/10 border border-amber-400/30 rounded-2xl px-5 py-4 mb-6 flex items-center gap-3 hover:bg-amber-400/20 transition',
  logoutButton: 'w-full bg-white/5 border border-white/10 text-white font-semibold py-4 rounded-2xl hover:bg-white/10 transition',
  dangerZone: 'pt-2',
  dangerLink: 'text-red-400/80 text-xs font-medium hover:text-red-400 hover:underline',
}

interface UserProfile {
  name?: string
  plano?: string
  senhaDefinida?: boolean
}

export default function Acesso() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('inicio')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showSimulador, setShowSimulador] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    trackEvent('acesso_view')
  }, [])

  useEffect(() => {
    getUserProfile().then((data) => {
      setProfile({
        name: typeof data?.name === 'string' ? data.name : undefined,
        plano: typeof data?.plano === 'string' ? data.plano : undefined,
        senhaDefinida: Boolean(data?.senhaDefinida),
      })
    })
  }, [])

  const senhaDefinida = profile?.senhaDefinida ?? null
  const primeiroNome = profile?.name?.trim().split(' ')[0]
  const temPlanoAtivo = Boolean(profile?.plano && profile.plano !== 'nenhum')

  const otherPaidProducts = paidProducts.filter((p) => p.id !== 'corretor-ia')

  function handleProductClick(product: Product) {
    trackEvent(product.id === 'combo-completo' ? 'combo_click' : 'product_click', {
      productId: product.id,
      productTitle: product.title,
    })

    if (product.id === 'simulador') {
      setShowSimulador(true)
      return
    }
    if (product.free) {
      if (product.contentUrl) {
        window.open(product.contentUrl, '_blank', 'noopener,noreferrer')
      } else {
        // Ainda não tem link de conteúdo configurado (ver TODOs em data/products.ts)
        alert(`Conteúdo de "${product.title}" ainda não tem link configurado.`)
      }
      return
    }
    setSelectedProduct(product)
  }

  async function handleLogout() {
    await signOut(auth)
    navigate('/login')
  }

  async function handleDeleteAccount() {
    const confirmar = confirm(
      'Isso vai apagar sua conta e todos os seus dados permanentemente. Tem certeza?'
    )
    if (!confirmar) return

    try {
      await deleteAccount()
      navigate('/')
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        alert('Por segurança, saia e entre novamente antes de excluir sua conta.')
      } else {
        alert('Não foi possível excluir a conta agora. Tente novamente.')
      }
    }
  }

  if (showSimulador) {
    return (
      <Simulador
        onExit={() => setShowSimulador(false)}
        onWantCorrection={() => {
          setShowSimulador(false)
          setSelectedProduct(anchorProduct)
        }}
      />
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.welcome}>Boa volta{primeiroNome ? `, ${primeiroNome}` : ''}</p>
          <h1 className={styles.title}>Bora estudar? 📚</h1>
        </header>

        {tab === 'inicio' && (
          <div className="animate-in">
            {senhaDefinida === false && (
              <button onClick={() => setTab('perfil')} className={styles.passwordBanner}>
                <span className="text-xl">🔐</span>
                <span className="text-sm text-amber-300 font-semibold">
                  Crie sua senha de acesso para não perder sua conta →
                </span>
              </button>
            )}

            {/* PRODUTO ÂNCORA — destaque máximo, sozinho, grande */}
            <div className="mb-4">
              <ProductCard product={anchorProduct} onClick={() => handleProductClick(anchorProduct)} large />
            </div>
            <p className="text-slate-500 text-xs text-center mb-8">
              👆 A ferramenta mais usada por quem quer evoluir rápido
            </p>

            {/* COMBO — banner de oferta completa */}
            <div className="mb-8">
              <ProductCard product={comboProduct} onClick={() => handleProductClick(comboProduct)} />
            </div>

            {/* GRÁTIS */}
            <h2 className={styles.sectionTitle}>Conteúdo gratuito</h2>
            <div className={styles.section}>
              {freeItems.map((item) => (
                <ProductCard key={item.id} product={item} onClick={() => handleProductClick(item)} />
              ))}
            </div>

            {/* OUTRAS FERRAMENTAS */}
            <h2 className={styles.sectionTitle}>Depois de testar, desbloqueie mais</h2>
            <div className="space-y-4">
              {otherPaidProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
              ))}
            </div>
          </div>
        )}

        {tab === 'ferramentas' && (
          <div className="animate-in">
            <div className="mb-6">
              <ProductCard product={comboProduct} onClick={() => handleProductClick(comboProduct)} />
            </div>
            <h2 className={styles.sectionTitle}>Todas as ferramentas</h2>
            <div className="space-y-4">
              {paidProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
              ))}
            </div>
          </div>
        )}

        {tab === 'simulador' && (
          <div className={`${styles.emptyCard} animate-in`}>
            <span className={styles.icon}>⏱️</span>
            <h2 className={styles.cardTitle}>Simulador Cronometrado</h2>
            <p className={styles.description}>
              Treine com um tema sorteado e o mesmo tempo da prova real.
            </p>
            <button onClick={() => setShowSimulador(true)} className={styles.button}>
              Começar agora
            </button>
          </div>
        )}

        {tab === 'perfil' && (
          <div className="animate-in space-y-4">
            <div className={styles.profileCard}>
              <h2 className={styles.profileTitle}>Meu perfil</h2>
              <p className={styles.profileName}>{profile?.name ?? '—'}</p>
              <p className={styles.profileEmail}>{auth.currentUser?.email ?? '—'}</p>
            </div>

            <div className={styles.profileCard}>
              <h2 className={styles.profileTitle}>Meu plano</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {temPlanoAtivo
                  ? `Você tem acesso: ${profile?.plano}`
                  : 'Nenhum produto ativo ainda.'}
              </p>
              <button onClick={() => setTab('ferramentas')} className={styles.profileLink}>
                Ver ferramentas disponíveis →
              </button>
            </div>

            <DefinirSenha
              senhaDefinida={senhaDefinida}
              onDefined={() =>
                setProfile((p) => (p ? { ...p, senhaDefinida: true } : p))
              }
            />

            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair da conta
            </button>

            <div className={styles.dangerZone}>
              <button onClick={handleDeleteAccount} className={styles.dangerLink}>
                Excluir minha conta
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav active={tab} onChange={setTab} />
      <PaywallModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  )
}
