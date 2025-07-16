'use client';

import { createBudget } from '@/actions/create-budget-action';
import { useFormState } from 'react-dom';
import ErrorMessage from '../ui/ErrorMessage';
import { use, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import BudgetForm from './BudgetForm';

export default function CreateBudgetForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(createBudget, {
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
      <BudgetForm />
      <input
        type="submit"
        className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600"
        value="Crear Presupuesto"
      />
    </form>
  );
}
