interface BottomNavProps {
  active: string
  onChange: (tab: string) => void
}

const tabs = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'ferramentas', label: 'Ferramentas', icon: '🧰' },
  { id: 'simulador', label: 'Simulado', icon: '⏱️' },
  { id: 'perfil', label: 'Perfil', icon: '👤' },
]

const styles = {
  nav: 'fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-white/10 backdrop-blur z-20',
  container: 'max-w-2xl mx-auto grid grid-cols-4',
  button: 'flex flex-col items-center justify-center gap-1 py-3 transition-colors',
  icon: 'text-lg',
  label: 'text-[11px] font-semibold',
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`${styles.button} ${isActive ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.label}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
