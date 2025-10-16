import { useAuth } from '../context/Auth'

export default function TopBar() {
  const { user } = useAuth()
  return (
    <div className="flex items-center justify-end mb-4">
      <div className="text-sm text-slate-600">{user ? user.email : 'Visitante'}</div>
    </div>
  )
}
