import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import ToastNotification from '@/components/ui/ToastNotification';
import { verifySession } from '@/src/auth/dal';
import AdminMenu from '@/components/admin/AdminMenu';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  return (
    <>
      <header className="bg-purple-950 py-5">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between lg:flex-row">
          <div className="w-96">
            <Link href={'/admin'}>
              <Logo />
            </Link>
          </div>
          <AdminMenu user={user} />
        </div>
      </header>
      <section className="mx-auto mt-20 max-w-5xl p-3 py-10">{children}</section>
      <ToastNotification />

      <footer className="py-5">
        <p className="text-center">Todos los Derechos Reservados {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
