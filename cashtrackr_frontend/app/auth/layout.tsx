import Logo from '@/components/ui/Logo';
import ToastNotification from '@/components/ui/ToastNotification';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex justify-center bg-purple-950 bg-left-bottom bg-no-repeat lg:bg-auth lg:bg-30">
          <div className="w-96 py-10 lg:py-20">
            <Link href={'/'}>
              <Logo />
            </Link>
          </div>
        </div>

        <div className="p-10 lg:py-28">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </div>

      <ToastNotification />
    </>
  );
}
