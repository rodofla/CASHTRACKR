'use server';

import SuccessMessage from '@/components/ui/SuccessMessage';
import getToken from '@/src/auth/token';
import { Budget, Expense, ErrorResponseSchema, SuccessSchema } from '@/src/schemas';
import { revalidateTag } from 'next/cache';

type BudgetAndExpenseType = {
  budgetId: Budget['id'];
  expenseId: Expense['id'];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseType,
  prevState: ActionStateType,
) {
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: '',
    };
  }

  const { message } = SuccessSchema.parse(json);
  revalidateTag(`budget/${budgetId}`);

  return {
    errors: [],
    success: message,
  };
}
