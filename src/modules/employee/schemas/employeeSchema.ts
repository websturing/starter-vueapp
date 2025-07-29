import { z } from 'zod'

export const employeeSchema = z.object({
    id: z.number(),
    employeeCode: z.string(),
    position: z.string(), // HH:MM:SS
    department: z.string(),
    joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    active: z.boolean(),
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(), // optional bisa pakai z.string().optional()
    }).nullable()
})

export const employeeLastCodeSchema = z.string()

// Untuk list shift (misalnya pagination)
export const employeeListSchema = z.array(employeeSchema)
export type Employee = z.infer<typeof employeeSchema>
export type EmployeeLastCode = z.infer<typeof employeeLastCodeSchema>
