'use server';

import { ErrorResponseSchema, RegisterScheama, SuccessSchema } from '@/src/schemas';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  };

  //validar
  const register = RegisterScheama.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: '',
    };
  }
  // registrar el usuario
  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password,
    }),
  });

  const json = await req.json();

  // si la respuesta es exitosa
  const success = SuccessSchema.safeParse(json);

  // si la respuesta no es exitosa
  if (req.status === 409) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: '',
    };
  }

  return {
    errors: [],
    success: success.success ? success.data.message : prevState.success,
  };
}
