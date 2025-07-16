import BudgetMenu from '@/components/budgets/BudgetMenu';
import DeleteBudgetModal from '@/components/budgets/DeleteBudgetModal';
import getToken from '@/src/auth/token';
import { BudgetsAPIResponseSchema } from '@/src/schemas';
import { formatcurrency, formatDate } from '@/src/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CashTrackr - Panel de Administración',
  description: 'Panel de administración para gestionar presupuestos y gastos',
};

async function getUserBudgets() {
  const token = getToken();
  const url = `${process.env.API_URL}/budgets`;
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ['all-budgets'],
    },
  });

  const json = await req.json();
  const budgets = BudgetsAPIResponseSchema.parse(json);
  return budgets;
}

export default async function Adminpage() {
  const budgets = await getUserBudgets();

  return (
    <>
      <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
        <div className="w-full md:w-auto">
          <h1 className="my-5 text-4xl font-black text-purple-950 dark:text-purple-700">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold">
            Maneja y administra tus {''}
            <span className="text-amber-500">presupuestos</span>
          </p>
        </div>
        <Link
          href={'/admin/budgets/new'}
          className="w-full rounded-lg bg-amber-500 p-2 text-center font-bold text-white md:w-auto"
        >
          Crear Presupuesto
        </Link>
      </div>
      {budgets.length ? (
        <>
          <ul role="list" className="mt-10 divide-y divide-gray-300 border shadow-lg">
            {budgets.map((budget) => (
              <li key={budget.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                      <Link
                        href={`/admin/budgets/${budget.id}`}
                        className="cursor-pointer text-2xl font-bold hover:underline"
                      >
                        {budget.name}
                      </Link>
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatcurrency(+budget.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ultima Actualización: {''}
                      <span className="font-bold">{formatDate(budget.updatedAt)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <BudgetMenu budgetId={budget.id} />
                </div>
              </li>
            ))}
          </ul>
          <DeleteBudgetModal />
        </>
      ) : (
        <p className="py-20 text-center">
          No hay presupuesto aún {''}
          <Link
            href={'/admin/budgets/new'}
            className="font-bold text-purple-950 dark:text-purple-700"
          >
            comienza creando uno
          </Link>
        </p>
      )}
    </>
  );
}
