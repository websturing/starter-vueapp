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

export const shiftUserAssignmentSchema = z.object({
    id: z.number(),
    userId: z.number(),
    shiftId: z.number(),
    user: z.string(),
    shift: z.string(),
    time: z.string(),
    dateStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dateEnd: z.string()
});


export const shiftUserAssignmentListSchema = z.array(shiftUserAssignmentSchema)
export type ShiftUserAssignmentSummary = z.infer<typeof shiftUserAssignmentSummarySchema>;
export type ShiftUserAssignment = z.infer<typeof shiftUserAssignmentSchema>;

