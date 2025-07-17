'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { confirmAccount } from '@/actions/confirm-account-action';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

export default function ConfirmAccountForm() {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [token, setToken] = useState('');

  const confirmAccountWithToken = confirmAccount.bind(null, token);
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (isCompleted) {
      dispatch();
    }
  }, [isCompleted, dispatch]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/auth/login');
        },
      });
    }
  }, [state, router]);

  const handleChange = (token: string) => {
    setIsCompleted(false);
    setToken(token);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div className="my-10 flex justify-center gap-5">
      <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
        <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
      </PinInput>
    </div>
  );
}
