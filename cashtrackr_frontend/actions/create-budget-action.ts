'use server';

import getToken from '@/src/auth/token';
import { DraftBudgetSchema, SuccessSchema } from '@/src/schemas';
import { revalidateTag } from 'next/cache';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createBudget(prevState: ActionStateType, formData: FormData) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
  });
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets`;

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });

  const json = await req.json();
  const { message } = SuccessSchema.parse(json);

  revalidateTag('/all-budgets');
  return {
    errors: [],
    success: message,
  };
}
