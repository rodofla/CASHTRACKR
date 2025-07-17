import { useCallback, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { DialogTitle } from '@headlessui/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { deleteBudget } from '@/actions/delete-budget-action';
import ErrorMessage from '../ui/ErrorMessage';

export default function ConfirmPasswordForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const BudgetId = +searchParams.get('deleteBudgetId')!;

  const deleteBudgetWithPassword = deleteBudget.bind(null, BudgetId);
  const [state, dispatch] = useFormState(deleteBudgetWithPassword, {
    errors: [],
    success: '',
  });

  const closeModal = useCallback(() => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete('deleteBudgetId');
    router.replace(`${pathname}?${hideModal}`);
  }, [searchParams, router, pathname]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state, closeModal]);

  return (
    <>
      <DialogTitle
        as="h3"
        className="my-5 text-4xl font-black text-purple-950 dark:text-purple-700"
      >
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">
        Ingresa tu Password para {''}
        <span className="text-amber-500">eliminar el presupuesto {''}</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>

      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}

      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold" htmlFor="password">
            Ingresa tu Password para eliminar
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Eliminar Presupuesto"
            className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 font-black text-white transition-colors hover:bg-purple-800"
          />
          <button
            className="w-full cursor-pointer rounded-lg bg-amber-500 p-3 font-black text-white transition-colors hover:bg-amber-600"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
