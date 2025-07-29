import { z } from 'zod';

export const employeeFormSchema = z
    .object({
        id: z.number().optional(),
        employeeCode: z.string().nonempty(),
        position: z.string().nonempty(), // HH:MM:SS
        department: z.string().nonempty(),
        joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format Must Y-m-d'),
        active: z.boolean(),
    })
export type EmployeeForm = z.infer<typeof employeeFormSchema>