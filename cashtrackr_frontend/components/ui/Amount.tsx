import { formatcurrency } from '@/src/utils';

type AmountProps = {
  label: string;
  amount: number;
  className?: string;
};

export default function Amount({ label, amount, className = 'text-amber-500' }: AmountProps) {
  return (
    <p className="text-2xl font-bold">
      {label}: <span className={className}>{formatcurrency(amount)}</span>
    </p>
  );
}
