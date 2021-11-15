import create, { State } from 'zustand'
import { devtools } from 'zustand/middleware'

import { User } from '@tensei/components'

interface AuthState extends State {
  user: User
  setUser: (user: User) => void
}

interface AuthMethods extends State {}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {}

export const useAuthStore = create<AuthState & AuthMethods>(
  devtools((set, get) => ({
    user: null as any,
    setUser(user: User) {
      set({
        user
      })
    },
    async login(credentials: LoginCredentials) {
      return window.Tensei.api.post('/auth/login', credentials)
    },
    async register(credentials: RegisterCredentials) {
      return window.Tensei.api.post('/auth/register', credentials)
    }
  }))
)
