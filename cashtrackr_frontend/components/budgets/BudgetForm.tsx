import { Budget } from '@/src/schemas';

export default function BudgetForm({ budget }: { budget?: Budget }) {
  return (
    <>
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm font-bold uppercase">
          Nombre Presupuesto
        </label>
        <input
          id="name"
          className="w-full border border-gray-100 bg-slate-100 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          type="text"
          placeholder="Nombre del Presupuesto"
          name="name"
          defaultValue={budget?.name}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm font-bold uppercase">
          Cantidad Presupuesto
        </label>
        <input
          type="number"
          id="amount"
          className="w-full border border-gray-100 bg-slate-100 p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          placeholder="Cantidad Presupuesto"
          name="amount"
          defaultValue={budget?.amount}
        />
      </div>
    </>
  );
}
