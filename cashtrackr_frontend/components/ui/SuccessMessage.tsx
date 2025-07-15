export default function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 bg-amber-500 p-3 text-center text-sm font-bold uppercase text-white">
      {children}
    </p>
  );
}
