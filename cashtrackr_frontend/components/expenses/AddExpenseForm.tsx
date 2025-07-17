import { DialogTitle } from '@headlessui/react';
import ExpenseForm from './ExpenseForm';
import createExpense from '@/actions/create-expense-action';
import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';
import ErrorMessage from '../ui/ErrorMessage';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AddExpenseForm({ closeModal }: { closeModal: () => void }) {
  const { id } = useParams();

  const createExpenseWithBudgetId = createExpense.bind(null, +id);
  const [state, dispatch] = useFormState(createExpenseWithBudgetId, {
    errors: [],
    success: '',
  });

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
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {''}
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
        <ExpenseForm />

        <input
          type="submit"
          className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
}
