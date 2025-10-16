export type Role = 'aluno' | 'professor' | 'empresa'

export type User = {
  id: string
  role: Role
  name: string
  email: string
}

export type Student = {
  id: string
  name: string
  email: string
  saldo: number
}

export type Transaction = {
  id: string
  studentId: string
  title: string
  value: number
  author?: string
  date: string
  advantageId?: string
}

export type Advantage = {
  id: string
  title: string
  price: number
  description?: string
}

type DB = {
  users: User[]
  currentUserId?: string
  students: Student[]
  transactions: Transaction[]
  advantages: Advantage[]
  professor: { available: number }
  company: { name: string }
  passwords?: Record<string, string>
}

const KEY = 'lab03-db'

function seed(): DB {
  const db: DB = {
    users: [
      // Alunos (3)
      { id: 'u1', role: 'aluno', name: 'Ana', email: 'ana@uni.br' },
      { id: 'u2', role: 'aluno', name: 'Bruno', email: 'bruno@uni.br' },
      { id: 'u3', role: 'aluno', name: 'Clara', email: 'clara@uni.br' },
      // Professores (3)
      { id: 'u4', role: 'professor', name: 'Prof. Carlos', email: 'carlos@uni.br' },
      { id: 'u5', role: 'professor', name: 'Profª Maria', email: 'maria@uni.br' },
      { id: 'u6', role: 'professor', name: 'Prof. João', email: 'joao@uni.br' },
      // Empresas (3)
      { id: 'u7', role: 'empresa', name: 'Empresa XYZ', email: 'contato@empresa.com' },
      { id: 'u8', role: 'empresa', name: 'ACME Ltda', email: 'contato@acme.com' },
      { id: 'u9', role: 'empresa', name: 'TechStore', email: 'contato@techstore.com' },
    ],
    students: [
      { id: 's1', name: 'Ana', email: 'ana@uni.br', saldo: 1250 },
      { id: 's2', name: 'Bruno', email: 'bruno@uni.br', saldo: 800 },
      { id: 's3', name: 'Clara', email: 'clara@uni.br', saldo: 460 },
    ],
    transactions: [
      { id: 't1', studentId: 's1', title: 'Reconhecimento do Professor', value: 150, author: 'Prof. Ana Lima', date: '2025-10-01' },
      { id: 't2', studentId: 's1', title: 'Resgate de Vantagem', value: -300, author: 'Assinatura de Curso Online', date: '2025-10-03', advantageId: 'a2' },
      { id: 't3', studentId: 's1', title: 'Reconhecimento do Professor', value: 200, author: 'Prof. Carlos Souza', date: '2025-10-05' },
      { id: 't4', studentId: 's2', title: 'Reconhecimento do Professor', value: 250, author: 'Profª Maria', date: '2025-10-04' },
      { id: 't5', studentId: 's3', title: 'Resgate de Vantagem', value: -150, author: 'Caneca Personalizada', date: '2025-10-06', advantageId: 'a3' },
    ],
    advantages: [
      { id: 'a1', title: 'Gift Card Livraria', price: 300 },
      { id: 'a2', title: 'Curso Online', price: 500 },
      { id: 'a3', title: 'Caneca Personalizada', price: 150 },
    ],
    professor: { available: 5000 },
    company: { name: 'Empresa XYZ' },
    passwords: {
      u1: '123', u2: '123', u3: '123',
      u4: '123', u5: '123', u6: '123',
      u7: '123', u8: '123', u9: '123'
    },
  }
  return db
}

function load(): DB {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    const db = seed()
    localStorage.setItem(KEY, JSON.stringify(db))
    return db
  }
  const parsed: DB = JSON.parse(raw)
  // Backward-compat: ensure passwords map exists
  if (!parsed.passwords) {
    const pwd: Record<string, string> = {}
    for (const u of parsed.users) pwd[u.id] = '123'
    parsed.passwords = pwd
    save(parsed)
  }
  return parsed
}

function save(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db))
}

export const store = {
  reset() {
    const db = seed()
    save(db)
    return db
  },
  getDB(): DB {
    return load()
  },
  registerStudent(name: string, email: string, password: string) {
    const db = load()
    if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('E-mail já cadastrado')
    }
    const newUserId = 'u' + (db.users.length + 1)
    const newStudentId = 's' + (db.students.length + 1)
    const user: User = { id: newUserId, role: 'aluno', name, email }
    const student: Student = { id: newStudentId, name, email, saldo: 0 }
    db.users.push(user)
    db.students.push(student)
    if (!db.passwords) db.passwords = {}
    db.passwords[newUserId] = password
    save(db)
    return { user, student }
  },
  updateStudent(id: string, data: Partial<Pick<Student, 'name' | 'email' | 'saldo'>>) {
    const db = load()
    const st = db.students.find(s => s.id === id)
    if (!st) throw new Error('Aluno não encontrado')
    Object.assign(st, data)
    // keep user email/name in sync if email or name changed
    const user = db.users.find(u => u.email === st.email || u.id === db.users.find(u2=>u2.email===st.email)?.id)
    if (user) {
      if (data.name) user.name = data.name
      if (data.email) user.email = data.email
    }
    save(db)
    return st
  },
  deleteStudent(id: string) {
    const db = load()
    const st = db.students.find(s => s.id === id)
    if (!st) return
    db.students = db.students.filter(s => s.id !== id)
    db.transactions = db.transactions.filter(t => t.studentId !== id)
    // remove user with same email
    const user = db.users.find(u => u.email === st.email)
    if (user) {
      db.users = db.users.filter(u => u.id !== user.id)
      if (db.passwords) delete db.passwords[user.id]
      if (db.currentUserId === user.id) delete db.currentUserId
    }
    save(db)
  },
  login(email: string, role: Role) {
    const db = load()
    const user = db.users.find(u => u.email === email && u.role === role)
    if (!user) throw new Error('Usuário não encontrado para o papel informado')
    db.currentUserId = user.id
    save(db)
    return user
  },
  logout() {
    const db = load()
    delete db.currentUserId
    save(db)
  },
  currentUser(): User | undefined {
    const db = load()
    return db.users.find(u => u.id === db.currentUserId)
  },
  // Aluno
  studentOverview(studentId?: string) {
    const db = load()
    let sid = studentId
    if (!sid) {
      const cu = db.users.find(u => u.id === db.currentUserId)
      if (cu?.role === 'aluno') {
        const st = db.students.find(s => s.email === cu.email)
        if (st) sid = st.id
      }
    }
    if (!sid) sid = 's1'
    const student = db.students.find(s => s.id === sid)!
    const tx = db.transactions.filter(t => t.studentId === sid).sort((a,b)=>a.date>b.date?-1:1)
    return { student, tx }
  },
  redeem(studentId: string, advantageId: string) {
    const db = load()
    const adv = db.advantages.find(a => a.id === advantageId)
    const st = db.students.find(s => s.id === studentId)
    if (!adv || !st) throw new Error('Dados inválidos')
    st.saldo -= adv.price
    db.transactions.push({ id: 't'+(db.transactions.length+1), studentId, title: 'Resgate de Vantagem', value: -adv.price, date: new Date().toISOString().slice(0,10), advantageId })
    save(db)
  },
  // Professor
  recognize(studentId: string, value: number, reason: string) {
    const db = load()
    const st = db.students.find(s => s.id === studentId)
    if (!st) throw new Error('Aluno inválido')
    st.saldo += value
    db.professor.available -= value
    db.transactions.push({ id: 't'+(db.transactions.length+1), studentId, title: reason || 'Reconhecimento', value, date: new Date().toISOString().slice(0,10) })
    save(db)
  },
  // Empresa
  addAdvantage(title: string, price: number) {
    const db = load()
    db.advantages.push({ id: 'a'+(db.advantages.length+1), title, price })
    save(db)
  }
}

export function defaultDashboard(role: Role) {
  if (role === 'aluno') return '/dashboard'
  if (role === 'professor') return '/prof/historico'
  return '/empresa'
}
