export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

// Helper function for API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `API Error: ${response.status}`)
  }

  // Handle empty responses (like DELETE)
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return null as T
  }

  return response.json()
}

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`)
  return res.json().catch(() => res.text())
}

export async function health(): Promise<string> {
  const res = await fetch(`${API_BASE}/`)
  return res.text()
}

// Types
export type AlunoDTO = {
  id?: number
  nome: string
  documento: string
  email: string
  login: string
  senha?: string
  rg: string
  endereco: string
  curso: string
  saldoMoedas: number
  instituicaoId: number
}

export type EmpresaDTO = {
  id?: number
  nome: string
  documento: string
  email: string
  login: string
  senha?: string
  nomeFantasia: string
  cnpj: string
}

export type VantagemDTO = {
  id?: number
  descricao: string
  foto?: string
  custoMoedas: number
}

export type LoginRequestDTO = {
  login: string
  senha: string
}

export type LoginResponseDTO = {
  id: number
  nome: string
  email: string
  login: string
  tipo: 'aluno' | 'professor' | 'empresa'
}

// Auth API
export const authAPI = {
  async login(login: string, senha: string): Promise<LoginResponseDTO> {
    return apiCall<LoginResponseDTO>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login, senha }),
    })
  },
}

// Alunos API
export const alunosAPI = {
  async listar(): Promise<AlunoDTO[]> {
    return apiCall<AlunoDTO[]>('/api/alunos')
  },

  async buscarPorId(id: number): Promise<AlunoDTO> {
    return apiCall<AlunoDTO>(`/api/alunos/${id}`)
  },

  async criar(data: Omit<AlunoDTO, 'id'>): Promise<AlunoDTO> {
    return apiCall<AlunoDTO>('/api/alunos', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async atualizar(id: number, data: Omit<AlunoDTO, 'id'>): Promise<AlunoDTO> {
    return apiCall<AlunoDTO>(`/api/alunos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async deletar(id: number): Promise<void> {
    return apiCall<void>(`/api/alunos/${id}`, {
      method: 'DELETE',
    })
  },

  async adicionarMoedas(id: number, quantidade: number): Promise<string> {
    return apiCall<string>(`/api/alunos/${id}/adicionar-moedas?quantidade=${quantidade}`, {
      method: 'PATCH',
    })
  },

  async debitarMoedas(id: number, quantidade: number): Promise<string> {
    return apiCall<string>(`/api/alunos/${id}/debitar-moedas?quantidade=${quantidade}`, {
      method: 'PATCH',
    })
  },
}

// Empresas API
export const empresasAPI = {
  async listar(): Promise<EmpresaDTO[]> {
    return apiCall<EmpresaDTO[]>('/api/empresas')
  },

  async buscarPorId(id: number): Promise<EmpresaDTO> {
    return apiCall<EmpresaDTO>(`/api/empresas/${id}`)
  },

  async criar(data: Omit<EmpresaDTO, 'id'>): Promise<EmpresaDTO> {
    return apiCall<EmpresaDTO>('/api/empresas', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async atualizar(id: number, data: Partial<EmpresaDTO>): Promise<EmpresaDTO> {
    return apiCall<EmpresaDTO>(`/api/empresas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async deletar(id: number): Promise<void> {
    return apiCall<void>(`/api/empresas/${id}`, {
      method: 'DELETE',
    })
  },
}
