'use client';
import { Budget } from '@/src/schemas';
import BudgetForm from './BudgetForm';
import { useFormState } from 'react-dom';
import { editBudget } from '@/actions/edit-budget-action';
import ErrorMessage from '../ui/ErrorMessage';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function EditBudgetForm({ budget }: { budget: Budget }) {
  const router = useRouter();
  const editBudgetWithId = editBudget.bind(null, budget.id);
  const [state, dispatch] = useFormState(editBudgetWithId, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push('/admin');
    }
  }, [state]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <BudgetForm budget={budget} />
      <input
        type="submit"
        className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600"
        value="Guardar Cambios"
      />
    </form>
  );
}
