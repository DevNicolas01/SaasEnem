interface BottomNavProps {
  active: string
  onChange: (tab: string) => void
}

const tabs = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'ferramentas', label: 'Ferramentas', icon: '🛠️' },
  { id: 'simulador', label: 'Simulador', icon: '⏱️' },
  { id: 'perfil', label: 'Perfil', icon: '👤' },
]

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center py-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 relative"
        >
          <span className="text-lg">{tab.icon}</span>
          <span className={`text-[11px] font-medium ${active === tab.id ? 'text-brand-600' : 'text-slate-400'}`}>
            {tab.label}
          </span>
          {active === tab.id && (
            <span className="absolute -bottom-1.5 w-1 h-1 bg-brand-600 rounded-full" />
          )}
        </button>
      ))}
    </nav>
  )
}
