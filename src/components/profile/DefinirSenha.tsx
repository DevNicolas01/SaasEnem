import { useState, type FormEvent } from 'react'
import { definePassword } from '../../services/leadService'
import { trackEvent } from '../../services/eventService'

interface DefinirSenhaProps {
  senhaDefinida: boolean | null
  onDefined: () => void
}

const styles = {
  card: 'bg-white/5 border border-white/10 rounded-3xl p-6',
  highlight: 'bg-amber-400/10 border border-amber-400/30 rounded-3xl p-6',
  title: 'text-lg font-bold text-white mb-2',
  description: 'text-slate-400 text-sm leading-relaxed mb-5',
  input: 'w-full bg-white rounded-2xl px-4 py-4 text-black mb-4',
  action:
    'w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold py-4 rounded-2xl disabled:opacity-50',
  error: 'text-red-400 text-sm mb-4',
  success: 'text-emerald-400 text-sm font-semibold',
  link: 'text-amber-400 text-sm font-semibold hover:underline mt-3',
}

export default function DefinirSenha({ senhaDefinida, onDefined }: DefinirSenhaProps) {
  const [editing, setEditing] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      setLoading(true)
      await definePassword(password)
      trackEvent('password_defined')
      setPassword('')
      setConfirmPassword('')
      setEditing(false)
      onDefined()
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError('Por segurança, saia e entre novamente para trocar a senha.')
      } else {
        setError('Não foi possível salvar a senha. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Ainda carregando o perfil — não sabemos se a senha já foi definida
  if (senhaDefinida === null) {
    return null
  }

  // Senha já definida e não está editando: mostra confirmação + opção de trocar
  if (senhaDefinida && !editing) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>Senha de acesso</h2>
        <p className={styles.success}>✅ Sua senha já está configurada</p>
        <button onClick={() => setEditing(true)} className={styles.link}>
          Trocar senha
        </button>
      </div>
    )
  }

  return (
    <div className={senhaDefinida ? styles.card : styles.highlight}>
      <h2 className={styles.title}>
        {senhaDefinida ? 'Trocar senha' : 'Crie sua senha de acesso 🔐'}
      </h2>
      <p className={styles.description}>
        {senhaDefinida
          ? 'Defina uma nova senha para acessar sua conta.'
          : 'Você entrou pelo diagnóstico com uma senha automática. Crie a sua própria senha para conseguir acessar sua conta de qualquer dispositivo, sempre que quiser.'}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nova senha"
          className={styles.input}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a nova senha"
          className={styles.input}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} className={styles.action}>
          {loading ? 'Salvando...' : 'Salvar senha'}
        </button>
      </form>
    </div>
  )
}
