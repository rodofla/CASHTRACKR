'use client';

import { register } from '@/actions/create-account-action';
import { useFormState } from 'react-dom';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';
import { useEffect, useRef } from 'react';

export default function RegisterForm() {
  // Create a ref to the form element to reset it after successful registration
  const ref = useRef<HTMLFormElement>(null);
  // Use the useFormState hook to manage the form state
  const [state, dispatch] = useFormState(register, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.success) {
      // Reset the form state after a successful registration
      ref.current?.reset();
    }
  }, [state]);

  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch} ref={ref}>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}

      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

      <div className="flex flex-col gap-2">
        <label className="text-2xl font-bold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          name="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-2xl font-bold">Nombre</label>
        <input
          type="name"
          placeholder="Nombre de Registro"
          className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          name="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-2xl font-bold">Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-2">
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
        value="Registrarme"
        className="block w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
      />
    </form>
  );
}
