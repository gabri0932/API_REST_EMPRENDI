import { nullable, z } from 'zod';
import { servicesIdentifiersArray } from '../consts/services.js';
import { technologiesIdentifiersArray } from '../consts/technologies.js';

const profileRoleSchema = z.object({
    role: z.enum([
        'freelancer', 'customer'
    ], { message: 'El rol debe ser "freelancer" o "customer".' })
});

const validationFreelancerSchema = profileRoleSchema.extend({
    description: z
        .string()
        .min(50, { message: 'La descripción debe tener al menos 50 caracteres.' })
        .max(500, { message: 'La descripción no puede superar los 500 caracteres.' }),
    phone: z.string().regex(/^(809|829|849)\d{7}$/, {
        message: 'El número de teléfono debe tener 10 dígitos y comenzar con 809, 829 o 849.'
    }),
    service: z.enum(servicesIdentifiersArray, { message: 'Debe elegir un valor válido como servicio.' }),
    technologies: z
        .array(z.enum(technologiesIdentifiersArray, { message: 'Hay un valor no válido en el array de technologies.' }))
        .min(1, { message: 'Debes seleccionar al menos una tecnología.' }),
    price: z.object({
        currency: z.enum(['usd', 'eur', 'dop'], { message: 'La moneda debe ser "usd", "eur" o "dop".' }),
        amount: z.number().min(0, { message: 'El monto debe ser un número positivo.' }),
    })
});

const validationFreelancerUpdateSchema = validationFreelancerSchema.extend({
    publicId: z
        .string()
        .min(3, { message: 'El identificador debe tener al menos 3 caracteres.' })
        .max(30, { message: 'El identificador no puede superar los 30 caracteres.' })
        .regex(/^[a-zA-Z0-9._]+$/, {
            message: 'El identificador solo puede contener letras, números, puntos y guiones bajos.',
        })
}).omit({ role: true });

const validateImageUpdateSchema = z.object({
    avatar: nullable(z.string().url({ message: 'La URL de la imagen de perfil no es válida.' })),
    cover: nullable(z.string().url({ message: 'La URL de la imagen de portada no es válida.' })),
});

const validationCustomerSchema = profileRoleSchema.extend({
    description: z
        .string()
        .min(50, { message: 'La descripción debe tener al menos 50 caracteres.' })
        .max(500, { message: 'La descripción no puede superar los 500 caracteres.' })
});

const validationCustomerUpdateSchema = validationCustomerSchema.extend({
    publicId: z
        .string()
        .min(3, { message: 'El identificador debe tener al menos 3 caracteres.' })
        .max(30, { message: 'El identificador no puede superar los 30 caracteres.' })
        .regex(/^[a-zA-Z0-9._]+$/, {
            message: 'El identificador solo puede contener letras, números, puntos y guiones bajos.',
        })
}).omit({ role: true });

export function validateImageUpdate(content) {
    return validateImageUpdateSchema.partial().safeParse(content);
}

export function validateRole(content) {
    return profileRoleSchema.safeParse(content);
}

export function validateFreelancerProfile(content) {
    return validationFreelancerSchema.safeParse(content);
}

export function validateCustomerProfile(content) {
    return validationCustomerSchema.safeParse(content);
}

export function validateCustomerProfileUpdate(content) {
    return validationCustomerUpdateSchema.partial().safeParse(content);
}

export function validateFreelancerProfileUpdate(content) {
    return validationFreelancerUpdateSchema.partial().safeParse(content);
}
