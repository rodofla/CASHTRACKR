'use client';

import { updateUser } from '@/actions/update-user-action';
import { User } from '@/src/schemas';
import { useFormState } from 'react-dom';
import ErrorMessage from '../ui/ErrorMessage';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ProfileForm({ user }: { user: User }) {
  const [state, dispatch] = useFormState(updateUser, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    toast.success(state.success);
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        {state.errors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold">Nombre</label>
          <input
            type="name"
            placeholder="Tu Nombre"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-50"
            name="name"
            defaultValue={user.name}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Tu Email"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-50"
            name="email"
            defaultValue={user.email}
          />
        </div>

        <input
          type="submit"
          value="Guardar Cambios"
          className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
        />
      </form>
    </>
  );
}
