import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { validateToken } from '@/actions/validate-token-action';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenForm({
  setIsValidToken,
  token,
  setToken,
}: ValidateTokenFormProps) {
  const [isComplete, setIsComplete] = useState(false);

  const validateTokenInput = validateToken.bind(null, token);
  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      setIsValidToken(true);
    }
  }, [state]);

  const handleChange = (token: string) => {
    setToken(token);
    setIsComplete(false);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
    <div className="my-10 flex justify-center gap-5">
      <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
        <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500" />
      </PinInput>
    </div>
  );
}
