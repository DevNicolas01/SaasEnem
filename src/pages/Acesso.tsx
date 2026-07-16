import { useState } from "react";

import BottomNav from "../components/navigation/BottomNav";
import ProductCard from "../components/products/ProductCard";
import PaywallModal from "../components/products/PaywallModal";
import Simulador from "../components/tools/Simulador";

import { freeItems, paidProducts, Product } from "../data/products";

const styles = {
  page: "min-h-dvh bg-slate-950 pb-24",

  container: "max-w-2xl mx-auto px-6 py-8",

  header: "mb-8",

  welcome: "text-slate-500 text-sm",

  title: "text-2xl font-bold text-white",

  sectionTitle:
    "text-sm font-bold uppercase tracking-wider text-amber-400 mb-4",

  section: "space-y-3 mb-8",

  emptyCard: "bg-white/5 border border-white/10 rounded-3xl p-8 text-center",

  icon: "text-4xl mb-3 block",

  cardTitle: "text-xl font-bold text-white mb-2",

  description: "text-slate-400 text-sm leading-relaxed mb-5",

  button:
    "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition hover:-translate-y-1",

  profileCard: "bg-white/5 border border-white/10 rounded-3xl p-6",

  profileTitle: "text-lg font-bold text-white mb-4",
};

export default function Acesso() {
  const [tab, setTab] = useState("inicio");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [showSimulador, setShowSimulador] = useState(false);

  function handleProductClick(product: Product) {
    if (product.id === "simulador") {
      setShowSimulador(true);
      return;
    }

    if (product.free) {
      alert(`Aqui abriria o conteúdo grátis: ${product.title}`);

      return;
    }

    setSelectedProduct(product);
  }

  if (showSimulador) {
    return <Simulador onExit={() => setShowSimulador(false)} />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.welcome}>Boa volta,</p>

          <h1 className={styles.title}>Bora estudar? 📚</h1>
        </header>

        {tab === "inicio" && (
          <div className="animate-in">
            <div className="mb-8">
              <ProductCard
                product={paidProducts[0]}
                onClick={() => handleProductClick(paidProducts[0])}
              />
            </div>

            <h2 className={styles.sectionTitle}>Conteúdo gratuito</h2>

            <div className={styles.section}>
              {freeItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onClick={() => handleProductClick(item)}
                />
              ))}
            </div>

            <h2 className={styles.sectionTitle}>Ferramentas premium</h2>

            <div className="space-y-4">
              {paidProducts.slice(1).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        )}

        {tab === "ferramentas" && (
          <div className="animate-in">
            <h2 className={styles.sectionTitle}>Todas as ferramentas</h2>

            <div className="space-y-4">
              {paidProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        )}

        {tab === "simulador" && (
          <div className={`${styles.emptyCard} animate-in`}>
            <span className={styles.icon}>⏱️</span>

            <h2 className={styles.cardTitle}>Simulador Cronometrado</h2>

            <p className={styles.description}>
              Treine com um tema sorteado e o mesmo tempo da prova real.
            </p>

            <button
              onClick={() => setShowSimulador(true)}
              className={styles.button}
            >
              Começar agora
            </button>
          </div>
        )}

        {tab === "perfil" && (
          <div className={`${styles.profileCard} animate-in`}>
            <h2 className={styles.profileTitle}>Meu perfil</h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Aqui entra a área de conta do usuário — nome, email, histórico de
              compras e redações corrigidas. Precisa ser conectado com o sistema
              de login.
            </p>
          </div>
        )}
      </div>

      <BottomNav active={tab} onChange={setTab} />

      <PaywallModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
