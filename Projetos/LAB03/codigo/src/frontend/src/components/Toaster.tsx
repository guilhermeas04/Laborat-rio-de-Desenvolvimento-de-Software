import { useToast } from '../hooks/use-toast'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'

export function Toaster() {
      const { toasts, dismiss } = useToast()

      if (toasts.length === 0) return null

      return (
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
                  {toasts.map((toast) => {
                        const icons = {
                              success: <CheckCircle className="text-emerald-500" size={20} />,
                              error: <XCircle className="text-rose-500" size={20} />,
                              info: <Info className="text-blue-500" size={20} />,
                              warning: <AlertTriangle className="text-amber-500" size={20} />,
                        }

                        const bgColors = {
                              success: 'bg-emerald-50 border-emerald-200',
                              error: 'bg-rose-50 border-rose-200',
                              info: 'bg-blue-50 border-blue-200',
                              warning: 'bg-amber-50 border-amber-200',
                        }

                        return (
                              <div
                                    key={toast.id}
                                    className={`${bgColors[toast.type]} border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-right`}
                              >
                                    {icons[toast.type]}
                                    <p className="flex-1 text-sm text-slate-900">{toast.message}</p>
                                    <button
                                          onClick={() => dismiss(toast.id)}
                                          className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                          <X size={16} />
                                    </button>
                              </div>
                        )
                  })}
            </div>
      )
}
