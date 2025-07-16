import { useParams, useSearchParams } from 'next/navigation';
import { DialogTitle } from '@headlessui/react';
import { useFormState } from 'react-dom';
import deleteExpense from '@/actions/delete-expense-action';
import { useEffect } from 'react';
import ErrorMessage from '../ui/ErrorMessage';
import { toast } from 'react-toastify';

type DeleteExpenseForm = {
  closeModal: () => void;
};

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get('deleteExpenseId')!;

  const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });

  const [state, dispatch] = useFormState(deleteExpenseWithBudgetId, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);

  useEffect(() => {
    if (!Number.isInteger(+budgetId) || !Number.isInteger(+expenseId)) {
      closeModal();
    }
  }, []);

  return (
    <>
      <DialogTitle
        as="h3"
        className="my-5 text-4xl font-black text-purple-950 dark:text-purple-700"
      >
        Eliminar Gasto
      </DialogTitle>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <p className="text-xl font-bold">
        Confirma para eliminar, {''}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        (Un gasto eliminado no se puede recuperar)
      </p>
      <div className="mt-10 grid grid-cols-2 gap-5">
        <button
          className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="w-full cursor-pointer bg-red-500 p-3 font-bold uppercase text-white transition-colors hover:bg-red-600"
          onClick={() => dispatch()}
        >
          Eliminar
        </button>
      </div>
    </>
  );
}
