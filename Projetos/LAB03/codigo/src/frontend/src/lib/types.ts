export type Student = {
  id: string
  nome: string
  email: string
  cpf?: string
  rg?: string
  instituicao?: string
  curso?: string
  endereco?: string
  saldo?: number
}

export type Transaction = {
  id: string
  titulo: string
  descricao?: string
  valor: number // positivo = crédito; negativo = débito
  autor?: string // professor/empresa
  data: string
}

export type Advantage = {
  id: string
  titulo: string
  preco: number
  imagem?: string
  descricao?: string
  empresa?: string
}

export const mockStudents: Student[] = [
  { id: '1', nome: 'Ana', email: 'ana@uni.br', saldo: 1250 },
  { id: '2', nome: 'Bruno', email: 'bruno@uni.br', saldo: 800 },
]

export const mockTransactions: Transaction[] = [
  { id: 't1', titulo: 'Reconhecimento do Professor', autor: 'Prof. Ana Lima', valor: 150, data: '2025-10-01' },
  { id: 't2', titulo: 'Resgate de Vantagem', descricao: 'Assinatura de Curso Online', valor: -300, data: '2025-10-03' },
  { id: 't3', titulo: 'Reconhecimento do Professor', autor: 'Prof. Carlos Souza', valor: 200, data: '2025-10-05' },
]

export const mockAdvantages: Advantage[] = [
  { id: 'a1', titulo: 'Gift Card Livraria', preco: 300 },
  { id: 'a2', titulo: 'Curso Online', preco: 500 },
  { id: 'a3', titulo: 'Caneca Personalizada', preco: 150 },
  { id: 'a4', titulo: 'Mensalidade Academia', preco: 1200 },
  { id: 'a5', titulo: 'Assinatura Software', preco: 600 },
  { id: 'a6', titulo: 'Ingressos Cinema', preco: 250 },
]
