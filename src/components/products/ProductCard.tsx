import { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const styles = {
  freeCard:
    "w-full text-left bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 rounded-3xl p-5 transition-all flex items-start gap-4 backdrop-blur",

  paidCard:
    "w-full text-left bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-slate-950 relative overflow-hidden group transition-all hover:-translate-y-1 shadow-xl shadow-orange-500/20",

  decoration:
    "absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10",

  icon: "w-11 h-11 bg-amber-400/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0",

  paidIcon: "text-3xl mb-3 block",

  content: "flex-1 min-w-0",

  title: "font-bold text-white text-sm mb-1",

  paidTitle: "font-bold text-slate-950 text-lg mb-1.5 relative",

  description: "text-slate-400 text-xs leading-relaxed mb-2",

  paidDescription: "text-slate-950/70 text-sm leading-relaxed mb-4 relative",

  freeCta: "text-amber-400 text-xs font-bold",

  footer: "flex items-center justify-between relative",

  price: "text-slate-950/80 text-xs font-bold",

  button:
    "bg-white/30 group-hover:bg-white/50 text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition-colors",
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
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
    );
  }

  return (
    <button onClick={onClick} className={styles.paidCard}>
      <div className={styles.decoration} />

      <span className={styles.paidIcon}>{product.icon}</span>

      <h3 className={styles.paidTitle}>{product.title}</h3>

      <p className={styles.paidDescription}>{product.description}</p>

      <div className={styles.footer}>
        <span className={styles.price}>{product.price}</span>

        <span className={styles.button}>{product.cta} →</span>
      </div>
    </button>
  );
}
