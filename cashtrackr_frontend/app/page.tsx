import Logo from '@/components/ui/Logo';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="bg-purple-950 py-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center lg:flex-row">
          <div className="w-96 lg:w-[500px]">
            <Logo />
          </div>
          <nav className="flex w-full flex-col gap-5 lg:flex-row lg:justify-end">
            <Link
              href="/auth/login"
              className="text-center text-sm font-bold uppercase text-white hover:text-amber-500"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="text-center text-sm font-bold uppercase text-white hover:text-amber-500"
            >
              Registrarme
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto mt-20 max-w-3xl space-y-5 p-5">
        <h1 className="text-4xl font-black text-purple-950 lg:text-6xl dark:text-purple-700">
          Administrador de Gastos
        </h1>
        <p className="text-3xl font-bold">
          controla tus <span className="text-amber-500">finanzas</span>
        </p>
        <p className="text-lg">
          Domina tus finanzas con nuestro Administrador de Gastos. Simplifica la gestión de tus
          ingresos y egresos en un solo lugar, de manera intuitiva y eficiente. Toma el control
          total de tus finanzas personales o empresariales con nuestra plataforma fácil de usar.
        </p>

        <h2 className="text-4xl font-black text-purple-950 dark:text-purple-700">
          Ventajas de CashTrackr
        </h2>

        <ol className="grid grid-cols-1 items-start gap-5">
          <li className="p-5 text-lg shadow-lg dark:border dark:border-white/10 dark:shadow-white/10">
            <span className="font-black text-purple-950 dark:text-purple-700">
              Organización sin Esfuerzo:{' '}
            </span>
            Clasifica y visualiza tus gastos de forma clara y ordenada, sin complicaciones con
            nuestro panel amigable y fácil de usar.
          </li>
          <li className="p-5 text-lg shadow-lg dark:border dark:border-white/10 dark:shadow-white/10">
            <span className="font-black text-purple-950 dark:text-purple-700">
              Presupuestación Inteligente:{' '}
            </span>
            Establece objetivos financieros realistas y sigue tu progreso con nuestras herramientas
            de presupuestación inteligente.
          </li>
          <li className="p-5 text-lg shadow-lg dark:border dark:border-white/10 dark:shadow-white/10">
            <span className="font-black text-purple-950 dark:text-purple-700">
              Acceso en cualquier lugar:{' '}
            </span>
            Nuestra plataforma está disponible para que puedas gestionar tus finanzas desde donde te
            encuentres.
          </li>
          <li className="p-5 text-lg shadow-lg dark:border dark:border-white/10 dark:shadow-white/10">
            <span className="font-black text-purple-950 dark:text-purple-700">
              Seguridad Garantizada:{' '}
            </span>
            Protegemos tus datos con los más altos estándares de seguridad, para que puedas utilizar
            nuestra plataforma con total tranquilidad.
          </li>
        </ol>
      </main>

      <nav className="mx-auto mt-10 flex max-w-3xl flex-col gap-5 pb-20 lg:flex-row lg:justify-between">
        <Link href="/auth/register" className="text-center text-sm uppercase text-gray-500">
          ¿No tienes cuenta? Crea una
        </Link>
        <Link href="/auth/login" className="text-center text-sm uppercase text-gray-500">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
      </nav>
    </>
  );
}
