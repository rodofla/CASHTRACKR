import CreateBudgetForm from '@/components/budgets/CreateBudgetForm';
import Link from 'next/link';

export default function CreateBudgetPage() {
  return (
    <>
      <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
        <div className="w-full md:w-auto">
          <h1 className="my-5 text-4xl font-black text-purple-950 dark:text-purple-700">
            Nuevo Presupuesto
          </h1>
          <p className="text-xl font-bold">
            Llena el formulario y crea un nuevo {''}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={'/admin'}
          className="w-full rounded-lg bg-amber-500 p-2 text-center font-bold text-white md:w-auto"
        >
          Volver
        </Link>
      </div>

      <div className="mt-10 border p-10 shadow-lg">
        <CreateBudgetForm />
      </div>
    </>
  );
}
