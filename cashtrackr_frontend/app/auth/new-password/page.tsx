import PasswordResetHandler from '@/components/auth/PasswordResetHandler';

export default function NewPasswordPage() {
  return (
    <>
      <h1 className="text-6xl font-black text-purple-950 dark:text-purple-700">
        Reestablecer Password
      </h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>

      <PasswordResetHandler />
    </>
  );
}
