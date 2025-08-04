import { z } from 'zod';

export const shiftUserAssignmentSummarySchema = z.object({
    employeeCount: z.number(),
    unassigned: z.number(),
    assigned: z.number(),
    assignments: z.array( // <-- Harus array karena hasilnya multiple shifts
        z.object({
            shiftId: z.number(),
            shiftName: z.string(), // <-- Typo: 'shittName' -> 'shiftName'
            startTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
            endTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
            userCount: z.number(),
            users: z.array( // <-- Harus array karena tiap shift bisa multiple users
                z.object({
                    userId: z.number(),
                    userName: z.string()
                })
            )
        })
    ).optional()
});

export type ShiftUserAssignmentSummary = z.infer<typeof shiftUserAssignmentSummarySchema>;

