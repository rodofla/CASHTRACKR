import ProgressBar from '@/components/budgets/ProgressBar';
import AddExpenseButton from '@/components/expenses/AddExpenseButton';
import ExpenseMenu from '@/components/expenses/ExpenseMenu';
import Amount from '@/components/ui/Amount';
import ModalContainer from '@/components/ui/ModalContainer';
import { getBudgetbyId } from '@/src/services/budget';
import { formatcurrency, formatDate } from '@/src/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const budget = await getBudgetbyId(params.id);
  return {
    title: `CashTrackr - ${budget.name}`,
    description: `Editar presupuesto: ${budget.name}`,
  };
}

export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {
  const budget = await getBudgetbyId(params.id);

  const totalSpent = budget.expenses.reduce((total, expense) => +expense.amount + total, 0);
  const available = +budget.amount - totalSpent;
  const percentage = +((totalSpent / +budget.amount) * 100).toFixed(2);
  const overBudget = totalSpent > +budget.amount;
  const negativeAvailable = available < 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-purple-950 dark:text-purple-700">
            {budget.name}
          </h1>
          <p className="text-xl font-bold">
            Administra tus {''} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>
      {budget.expenses.length ? (
        <>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
            <ProgressBar percentage={percentage} />
            <div className="flex flex-col items-center justify-center gap-5 md:items-start">
              <Amount label="Presupuesto" amount={+budget.amount} />
              <Amount
                label="Disponible"
                amount={available}
                className={negativeAvailable ? 'text-red-600' : 'text-amber-500'}
              />
              <Amount
                label="Gastado"
                amount={totalSpent}
                className={overBudget ? 'text-red-600' : 'text-amber-500'}
              />
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-black text-purple-950 dark:text-purple-700">
            Gastos en este presupuesto
          </h1>
          <ul role="list" className="mt-10 divide-y divide-gray-300 border shadow-lg">
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatcurrency(+expense.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Agregado: {''}
                      <span className="font-bold">{formatDate(expense.updatedAt)}</span>
                    </p>
                  </div>
                </div>
                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="py-20 text-center">No hay gastos aún</p>
      )}
      <ModalContainer />
    </>
  );
}
