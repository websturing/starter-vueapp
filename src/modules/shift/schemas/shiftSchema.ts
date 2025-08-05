import { z } from 'zod'

export const shiftSchema = z.object({
    id: z.number(),
    name: z.string(),
    startTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/), // HH:MM:SS
    endTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    isNightShift: z.boolean(),
    tolerance: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    toleranceBreakdown: z.object({
        value: z.number(),
        unit: z.enum(['hour', 'minute', 'second']),
        label: z.string(), // optional bisa pakai z.string().optional()
    })
})

export const shiftWithAssignmentsSchema = z.object({
    id: z.number(),
    name: z.string(),
    startTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/), // HH:MM:SS
    endTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    isNightShift: z.boolean(),
    tolerance: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    toleranceBreakdown: z.object({
        value: z.number(),
        unit: z.enum(['hour', 'minute', 'second']),
        label: z.string(), // optional bisa pakai z.string().optional()
    }),
    assignmentsCount: z.number(),
    assignments : z.array(
        z.object({
            id: z.number(),
            userId: z.number(),
            shiftId: z.number(),
            user: z.object({
                id: z.number(),
                name: z.string(),
                email: z.string()
            })
        })
    )
})

// Untuk list shift (misalnya pagination)
export const shiftListSchema = z.array(shiftSchema)
export const shiftWithAssignmentsListSchema = z.array(shiftWithAssignmentsSchema)
export type Shift = z.infer<typeof shiftSchema>
export type ShiftWithAssignments = z.infer<typeof shiftWithAssignmentsSchema>
