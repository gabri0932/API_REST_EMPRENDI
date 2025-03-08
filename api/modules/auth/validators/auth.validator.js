import { z } from "zod";

const userInputSchema = z.object({
    email: z
        .string({ required_error: "El email es obligatorio" })
        .email({ message: "El email no es válido" }),
    password: z
        .string({ required_error: "La contraseña es obligatoria" })
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
});

const userSchema = userInputSchema.extend({
    name: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
        .max(50, { message: "El nombre no puede superar los 50 caracteres" })
});

const userWithRoleSchema = userSchema.extend({
    role: z.enum(["freelancer", "customer"], {
        errorMap: () => ({ message: "El rol debe ser 'freelancer' o 'customer'" })
    })
})

export function validateUserInput(content) {
    return userInputSchema.safeParse(content);
}

export function validateUserCreation(content) {
    return userWithRoleSchema.safeParse(content);
}

export function validateUserUpdateInput(content) {
    return userSchema.partial().safeParse(content);
}
