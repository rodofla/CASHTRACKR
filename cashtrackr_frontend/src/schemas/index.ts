import { z } from 'zod';

export const RegisterScheama = z
  .object({
    email: z.email({ message: 'Email no válido' }).min(1, { message: 'El email es obligatorio' }),
    name: z.string().min(1, { message: 'Tu nombre no puede ir vacio' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  });

export const LoginSchema = z.object({
  email: z.email({ message: 'Email no válido' }).min(1, { message: 'El email es obligatorio' }),
  password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
});

export const TokenSchema = z
  .string({ message: 'Token no valido' })
  .length(6, { message: 'Token no valido' });

export const ForgotPasswordSchema = z.object({
  email: z.email({ message: 'Email no válido' }).min(1, { message: 'El email es obligatorio' }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Los Passwords no son iguales',
    path: ['password_confirmation'],
  });

export const SuccessSchema = z.object({ message: z.string() });
export const ErrorResponseSchema = z.object({ error: z.string() });

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

export type User = z.infer<typeof UserSchema>;
