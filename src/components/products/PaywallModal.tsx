import { Product } from "../../data/products";

interface PaywallModalProps {
  product: Product | null;
  onClose: () => void;
}

const styles = {
  overlay:
    "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4",

  card: "bg-slate-950 border border-white/10 rounded-3xl max-w-sm w-full p-7 animate-in shadow-2xl",

  icon: "w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-orange-500/20",

  title: "text-xl font-bold text-white mb-2",

  description: "text-slate-400 text-sm leading-relaxed mb-5",

  priceBox:
    "bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 text-center",

  price: "text-amber-400 font-bold text-xl",

  action:
    "w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-orange-500/20 mb-3",

  close: "w-full text-slate-500 hover:text-white text-sm py-2 transition",
};

export default function PaywallModal({ product, onClose }: PaywallModalProps) {
  if (!product) return null;

  const selectedProduct = product;

  function handleCheckout() {
    // Futuramente colocar URL real de checkout aqui
    console.log("Checkout:", selectedProduct.title);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>{selectedProduct.icon}</div>

        <h2 className={styles.title}>{selectedProduct.title}</h2>

        <p className={styles.description}>{selectedProduct.description}</p>

        <div className={styles.priceBox}>
          <span className={styles.price}>{selectedProduct.price}</span>
        </div>

        <button onClick={handleCheckout} className={styles.action}>
          Desbloquear agora
        </button>

        <button onClick={onClose} className={styles.close}>
          Agora não
        </button>
      </div>
    </div>
  );
}
