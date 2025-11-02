import { z } from 'zod';
import { isAdult } from "@/utils/fieldValidations"

export const jpgFile = z
    .instanceof(File, { message: 'El campo es obligatorio' })
    .refine(f => f.type === 'image/jpeg', 'Debe ser un JPG').nullable();

const birthDateSchema = z.string({ required_error: 'El campo es obligatorio' })
    .min(1, { message: 'El campo es obligatorio' })
    .pipe(z.coerce.date({ invalid_type_error: 'Fecha inválida' }))
    .refine(isAdult, 'Debes ser mayor de 18 años').nullable();

export const genderSchema = z.union([
    z.enum(['Femenino', 'Masculino', 'Otro']),
    z.literal('')
]).refine(val => val !== '', { message: 'El campo es obligatorio' });

export const docTypeSchema = z.union([
    z.enum(['Cédula de ciudadanía', 'Pasaporte', 'Cédula de extranjería']),
    z.literal('')
]).refine(val => val !== '', { message: 'El campo es obligatorio' });

export const stepOneSchema = z.object({
    country: z.string().min(1, 'El campo es obligatorio'),
    gender: genderSchema,
    firstName: z.string().min(1, 'El campo es obligatorio'),
    lastName: z.string().min(1, 'El campo es obligatorio'),
    birthDate: birthDateSchema.refine(val => val !== null, { message: "El campo es obligatorio" }),
    docType: docTypeSchema,
    docNumber: z.string().regex(/^\d+$/, 'Solo dígitos').min(5, 'Debe tener al menos 5 dígitos'),
    docFront: jpgFile.refine(val => val !== null, { message: "El campo es obligatorio" }),
    docBack: jpgFile.refine(val => val !== null, { message: "El campo es obligatorio" }),
});

export const stepTwoSchema = z.object({
    email: z.string().email('Correo inválido').min(1, 'El campo es obligatorio'),
    password: z.string().min(1, 'El campo es obligatorio'),
    confirmPassword: z.string().min(1, 'El campo es obligatorio'),
    phone: z.string().regex(/^\d+$/, 'Solo dígitos'),
    mobile: z.string().regex(/^\d+$/, 'Solo dígitos'),
})
export const stepThreeSchema = z.object({
    address: z.string().min(1, 'El campo es obligatorio'),
    zip: z.string().regex(/^\d+$/, 'Solo dígitos'),
});

export const RegisterSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema).refine(d => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
});

export type RegisterForm = z.infer<typeof RegisterSchema>;

export type RegisterState = {
    country: string;
    gender: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    docType: string;
    docNumber: string;
    docFront: File | null;
    docBack: File | null;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    mobile: string;
    address: string;
    zip: string;
};