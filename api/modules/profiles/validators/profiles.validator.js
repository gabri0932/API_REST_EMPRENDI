import { z } from 'zod';

const profileRoleSchema = z.object({
    role: z.enum([
        'freelancer', 'customer'
    ], { message: 'El rol debe ser "freelancer" o "customer".' })
});

const validationFreelancerSchema = profileRoleSchema.extend({
    description: z
        .string()
        .max(500, { message: 'La descripción no puede superar los 500 caracteres.' })
        .optional(),
    phone: z.string().regex(/^(809|829|849)\d{7}$/, {
        message: 'El número de teléfono debe tener 10 dígitos y comenzar con 809, 829 o 849.'
    }),
    service: z.enum([
            'web_development', 'apps_development', 'graphic_design', 'video_editing', 'photography',
            'writing', 'marketing', 'consulting', 'finance', 'translation'
        ], { message: 'Debe elegir un valor válido como servicio.' }),
    technologies: z
        .array(z.enum([
            'javascript', 'typescript', 'python', 'java', 'php', 'ruby', 'swift', 'html', 'css',
            'react', 'vue', 'angular', 'nodejs', 'express', 'android', 'ios', 'postgresql', 'sqlite', 'mongodb'
        ], { message: 'Hay un valor no válido en el array de technologies.' }))
        .min(1, { message: 'Debes seleccionar al menos una tecnología.' }),
    price: z.object({
        currency: z.enum(['usd', 'eur', 'dop'], { message: 'La moneda debe ser USD, EUR o DOP.' }),
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
});

const validationCustomerSchema = profileRoleSchema.extend(
    validationFreelancerSchema.omit({ price: true, services: true, technologies: true })
);

const validationCustomerUpdateSchema = validationCustomerSchema.extend(
    validationFreelancerUpdateSchema.pick({ publicId: true })
);

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
