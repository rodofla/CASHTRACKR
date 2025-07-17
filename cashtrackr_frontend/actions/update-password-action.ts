'use server';

import getToken from '@/src/auth/token';
import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from '@/src/schemas';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updatePassword(prevState: ActionStateType, formData: FormData) {
  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formData.get('current_password'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  });

  if (!userPassword.success) {
    return {
      errors: userPassword.error.issues.map((issues) => issues.message),
      success: '',
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/auth/update-password`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: userPassword.data.current_password,
      newPassword: userPassword.data.password,
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
