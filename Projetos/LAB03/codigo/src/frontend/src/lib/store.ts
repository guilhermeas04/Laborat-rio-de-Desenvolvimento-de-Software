// Types exported for use in components
export type Role = 'aluno' | 'professor' | 'empresa'

export type User = {
  id: number
  role: Role
  name: string
  email: string
}

export function defaultDashboard(role: Role) {
  if (role === 'aluno') return '/dashboard'
  if (role === 'professor') return '/prof/historico'
  return '/empresa'
}
