import { DraftExpense } from '@/src/schemas';

type ExpenseFormProps = {
  expense?: DraftExpense;
};

export default function ExpenseForm({ expense }: ExpenseFormProps) {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="text-sm font-bold uppercase">
          Nombre Gasto
        </label>
        <input
          id="name"
          className="w-full border border-gray-100 bg-white p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          type="text"
          placeholder="Nombre del Gasto"
          name="name"
          defaultValue={expense?.name}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="text-sm font-bold uppercase">
          Cantidad Gasto
        </label>
        <input
          id="amount"
          className="w-full border border-gray-100 bg-white p-3 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
          type="number"
          placeholder="Cantidad Gasto"
          name="amount"
          defaultValue={expense?.amount}
        />
      </div>
    </>
  );
}
