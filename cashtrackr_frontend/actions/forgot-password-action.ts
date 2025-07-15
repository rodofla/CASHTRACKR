'use server';
import { ErrorResponseSchema, ForgotPasswordSchema, SuccessSchema } from '@/src/schemas';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function forgotPassword(prevState: ActionStateType, formData: FormData) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((issues) => issues.message),
      success: '',
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: forgotPassword.data.email,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: '',
    };
  }

  const { message } = SuccessSchema.parse(json);
  return {
    errors: [],
    success: message,
  };
}
