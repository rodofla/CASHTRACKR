'use client';

import { forgotPassword } from '@/actions/forgot-password-action';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

export default function ForgotPasswordForm() {
  const [state, dispatch] = useFormState(forgotPassword, {
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
      toast.success(state.success);
    }
  }, [state]);
  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch}>
      <div className="mb-10 flex flex-col gap-2">
        <label className="text-2xl font-bold">Email</label>

        <input
          type="email"
          placeholder="Email de Registro"
          className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          name="email"
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
      />
    </form>
  );
}
