import { DialogTitle } from '@headlessui/react';
import ExpenseForm from './ExpenseForm';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { DraftExpense } from '@/src/schemas';
import { useFormState } from 'react-dom';
import editExpense from '@/actions/edit-expense-action';
import ErrorMessage from '../ui/ErrorMessage';
import { toast } from 'react-toastify';

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  const [expense, setExpense] = useState<DraftExpense>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get('editExpenseId')!;

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });
  const [state, dispatch] = useFormState(editExpenseWithBudgetId, {
    errors: [],
    success: '',
  });
  useEffect(() => {
    const fetchExpense = async () => {
      const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener el gasto');
        const data = await res.json();
        setExpense(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpense();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-lg text-gray-500 dark:text-gray-300">
        Cargando gasto...
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-10 text-center text-red-600 dark:text-red-400">
        Hubo un error al cargar el gasto. Intenta nuevamente más tarde.
      </div>
    );
  }

  return (
    <>
      <DialogTitle
        as="h3"
        className="my-5 text-4xl font-black text-purple-950 dark:text-purple-700"
      >
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <form
        className="mt-10 rounded-lg border bg-gray-100 p-10 shadow-lg dark:bg-[#121a2e]"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
