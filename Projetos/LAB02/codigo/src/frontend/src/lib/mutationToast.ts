import { ApiError } from './api';
import { toast } from '@/hooks/use-toast';

interface Messages {
      loading?: string;
      success?: string;
      error?: string | ((e: unknown) => string);
}

export async function withToast<T>(promiseFactory: () => Promise<T>, msgs: Messages): Promise<T> {
      if (msgs.loading) {
            toast({ title: msgs.loading });
      }
      try {
            const result = await promiseFactory();
            if (msgs.success) toast({ title: msgs.success });
            return result;
      } catch (e: any) {
            let base = 'Erro inesperado';
            if (e instanceof ApiError) {
                  base = `${e.status}: ${e.body || e.message}`;
            } else if (e?.message) base = e.message;
            const finalMsg = typeof msgs.error === 'function' ? msgs.error(e) : (msgs.error || base);
            toast({ title: 'Falha', description: finalMsg });
            throw e;
      }
}
