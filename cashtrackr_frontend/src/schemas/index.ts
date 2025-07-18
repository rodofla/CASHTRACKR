import { z } from 'zod';

// ----- User Schemas -----
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});
export type User = z.infer<typeof UserSchema>;

// ----- Authentication Schemas -----
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

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: 'El Password es obligatorio' });

// ----- Expense Schemas -----
export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: 'El Nombre del gasto es obligatorio' }),
  amount: z.coerce.number().min(1, { message: 'Cantidad no válida' }),
});

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
});

export type Expense = z.infer<typeof ExpenseAPIResponseSchema>;
export type DraftExpense = z.infer<typeof DraftExpenseSchema>;

// ----- Budget Schemas -----
export const DraftBudgetSchema = z.object({
  name: z.string().min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce
    .number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema),
});
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({ expenses: true }));
export type Budget = z.infer<typeof BudgetAPIResponseSchema>;

// ----- profile Schemas -----
export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
    password: z.string().min(8, { message: 'El Nuevo Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Los Passwords no son iguales',
    path: ['password_confirmation'],
  });

export const ProfileFormSchema = z.object({
  name: z.string().min(1, { message: 'Tu Nombre no puede ir vacio' }),
  email: z.email({ message: 'Email no válido' }).min(1, { message: 'El email es obligatorio' }),
});

// ----- Response Schemas -----
export const SuccessSchema = z.object({ message: z.string() });
export const ErrorResponseSchema = z.object({ error: z.string() });
