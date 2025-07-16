import { Metadata } from 'next';
import Link from 'next/link';
import EditBudgetForm from '@/components/budgets/EditBudgetForm';
import { getBudgetbyId } from '@/src/services/budget';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const budget = await getBudgetbyId(params.id);
  return {
    title: `CashTrackr - ${budget.name}`,
    description: `Editar presupuesto: ${budget.name}`,
  };
}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const budget = await getBudgetbyId(id);

  return (
    <>
      <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
        <div className="w-full md:w-auto">
          <h1 className="my-5 text-4xl font-black text-purple-950 dark:text-purple-700">
            Editar Presupuesto: <span className="text-amber-500">{budget.name}</span>
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
      <div className="mt-10 border p-10 shadow-lg dark:shadow-slate-700">
        <EditBudgetForm budget={budget} />
      </div>
    </>
  );
}
