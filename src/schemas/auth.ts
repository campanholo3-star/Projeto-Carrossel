import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ error: "O nome é obrigatório." })
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  email: z
    .string({ error: "O e-mail é obrigatório." })
    .email({ message: "Informe um e-mail válido." })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string({ error: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres." }),
});

export const loginSchema = z.object({
  email: z
    .string({ error: "O e-mail é obrigatório." })
    .email({ message: "Informe um e-mail válido." })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string({ error: "A senha é obrigatória." })
    .min(1, { message: "A senha não pode estar vazia." }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
