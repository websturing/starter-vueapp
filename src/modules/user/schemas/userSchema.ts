import * as yup from 'yup';
import z from 'zod';

export const userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    role_names: yup.array().min(1).required()
})

export const userCreateSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    roleNames: z.string().nonempty()
});

export type UserForm = z.infer<typeof userCreateSchema>