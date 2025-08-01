import { z } from 'zod'

// Sementara pakai any, bisa ganti ke z.object({...}) nanti
export const shiftUserAssignmentFormSchema = z.object({
    employeeSelectedData: z.array(z.any()).min(1, 'Employee list is required'),
    shiftSelected: z.object({
        id: z.number().min(1, 'Shift must be selected'),
        name: z.string().min(1, 'Shift name is required'),
    }),
    effectiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format Must Y-m-d'),
})

export type ShiftUserAssignmentForm = z.infer<typeof shiftUserAssignmentFormSchema>
