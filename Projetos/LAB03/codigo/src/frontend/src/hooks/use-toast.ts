import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
      id: string
      message: string
      type: ToastType
      duration?: number
}

type ToastState = {
      toasts: Toast[]
}

let toastCount = 0
const listeners = new Set<(state: ToastState) => void>()
let memoryState: ToastState = { toasts: [] }

function dispatch(toast: Omit<Toast, 'id'>) {
      const id = `toast-${++toastCount}`
      const newToast: Toast = { ...toast, id }

      memoryState = {
            toasts: [...memoryState.toasts, newToast]
      }

      listeners.forEach((listener) => listener(memoryState))

      // Auto remove after duration
      const duration = toast.duration || 3000
      setTimeout(() => {
            dismiss(id)
      }, duration)

      return id
}

function dismiss(toastId: string) {
      memoryState = {
            toasts: memoryState.toasts.filter((t) => t.id !== toastId)
      }
      listeners.forEach((listener) => listener(memoryState))
}

export function useToast() {
      const [state, setState] = useState<ToastState>(memoryState)

      const subscribe = useCallback((listener: (state: ToastState) => void) => {
            listeners.add(listener)
            return () => listeners.delete(listener)
      }, [])

      // Subscribe to updates
      useState(() => {
            return subscribe(setState)
      })

      const toast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
            return dispatch({ message, type, duration })
      }, [])

      const success = useCallback((message: string, duration?: number) => {
            return toast(message, 'success', duration)
      }, [toast])

      const error = useCallback((message: string, duration?: number) => {
            return toast(message, 'error', duration)
      }, [toast])

      const info = useCallback((message: string, duration?: number) => {
            return toast(message, 'info', duration)
      }, [toast])

      const warning = useCallback((message: string, duration?: number) => {
            return toast(message, 'warning', duration)
      }, [toast])

      return {
            toasts: state.toasts,
            toast,
            success,
            error,
            info,
            warning,
            dismiss,
      }
}
