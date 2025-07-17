'use client';

import { updatePassword } from '@/actions/update-password-action';
import { useFormState } from 'react-dom';
import ErrorMessage from '../ui/ErrorMessage';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function ChangePasswordForm() {
  const ref = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useFormState(updatePassword, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      ref.current?.reset();
    }
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch} ref={ref}>
        {state.errors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold" htmlFor="current_password">
            Password Actual
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Password Actual"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-50"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold" htmlFor="password">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-50"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="password_confirmation" className="text-2xl font-bold">
            Repetir Password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-50"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value="Cambiar Password"
          className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
        />
      </form>
    </>
  );
}
