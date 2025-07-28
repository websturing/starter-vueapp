import { z } from 'zod';

export const shiftFormSchema = z
    .object({
        id: z.number().optional(),
        name: z.string().nonempty(),
        startTime: z.string()
            .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'Format harus HH:MM (00:00-23:59)'),
        endTime: z.string()
            .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'Format harus HH:MM (00:00-23:59)'),
        isNightShift: z.boolean(),
        tolerance: z.string().regex(/^\d{2}:\d{2}$/, 'Time format must HH:MM'),
    })
    .refine((data) => {
        return data.endTime > data.startTime
    }, {
        path: ['endTime'], // agar error muncul di field endTime
        message: 'End Time must be after Start Time',
    })
export type ShiftForm = z.infer<typeof shiftFormSchema>