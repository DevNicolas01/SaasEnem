interface BottomNavProps {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { id: "inicio", label: "Início", icon: "🏠" },
  { id: "ferramentas", label: "Ferramentas", icon: "🛠️" },
  { id: "simulador", label: "Simulador", icon: "⏱️" },
  { id: "perfil", label: "Perfil", icon: "👤" },
];

const styles = {
  nav: "fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center py-3 z-50",

  button:
    "flex flex-col items-center gap-1 px-4 py-1.5 relative transition-all",

  icon: "text-lg",

  active: "text-amber-400 font-bold",

  inactive: "text-slate-500 font-medium",

  indicator:
    "absolute -bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50",
};

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={styles.button}
        >
          <span className={styles.icon}>{tab.icon}</span>

          <span
            className={`text-[11px] ${
              active === tab.id ? styles.active : styles.inactive
            }`}
          >
            {tab.label}
          </span>

          {active === tab.id && <span className={styles.indicator} />}
        </button>
      ))}
    </nav>
  );
}
