import { toast } from 'sonner';

export const useToast = () => ({
  toast,
  toastSuccess: (message: string) => toast.success(message),
  toastError: (message: string) => toast.error(message),
  toastInfo: (message: string) => toast(message),
});
