import Link from 'next/link';

export default async function Adminpage() {
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
          href={'/admin/budget/new'}
          className="w-full rounded-lg bg-amber-500 p-2 text-center font-bold text-white md:w-auto"
        >
          Crear Presupuesto
        </Link>
      </div>
    </>
  );
}
