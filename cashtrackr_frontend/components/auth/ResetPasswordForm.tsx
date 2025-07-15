import { resetPassword } from '@/actions/reset-password-action';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const resetPasswordWithToken = resetPassword.bind(null, token);
  const [state, dispatch] = useFormState(resetPasswordWithToken, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/auth/login');
        },
        onClick: () => {
          router.push('/auth/login');
        },
      });
    }
  }, [state]);

  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch}>
      <div className="flex flex-col gap-5">
        <label className="text-2xl font-bold">Password</label>

        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="text-2xl font-bold">Repetir Password</label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          name="password_confirmation"
        />
      </div>

      <input
        type="submit"
        value="Guardar Password"
        className="block w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
      />
    </form>
  );
}
