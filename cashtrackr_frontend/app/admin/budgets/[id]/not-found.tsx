import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-black text-purple-950 dark:text-purple-700">No Encontrado</h1>
      <p className="text-xl font-bold">
        El Presupuesto que intentas acceder {''} <span className="text-amber-500">no existe</span>
      </p>
      <Link
        href="/admin"
        className="inline-block cursor-pointer rounded-lg bg-amber-500 px-10 py-2 font-bold text-white"
      >
        Ir a Presupuestos
      </Link>
    </div>
  );
}
