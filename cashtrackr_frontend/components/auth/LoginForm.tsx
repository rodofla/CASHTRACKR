'use client';

import { useFormState } from 'react-dom';
import { authenticate } from '@/actions/authenticate-user-action';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, {
    errors: [],
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <>
      <form action={dispatch} className="mt-14 space-y-5" noValidate>
        {/* Input para el correo electrónico */}
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            name="email"
          />
        </div>

        {/* Input para la contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            name="password"
          />
        </div>

        {/* Botón para iniciar sesión */}
        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
        />
      </form>
    </>
  );
}
