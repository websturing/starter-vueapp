import { z } from 'zod'

const LogSchema = z.object({
    id: z.number(),
    logType: z.string(),
    timestamp: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    accuracy: z.string(),
    deviceId: z.string(),
    notes: z.string().nullable(),
})

const AttendanceItemSchema = z.object({
    id: z.number(),
    date: z.string(), // bisa pakai zod.date() jika nanti convert ke Date object
    checkIn: z.string(),
    checkOut: z.string(),
    workingHours: z.string(),
    status: z.enum(['present', 'late', 'absent', 'on_leave', 'wfh']),
    user: z.string(),
    logs: z.array(LogSchema),
    logCount: z.number(),
})

const SummarySchema = z.object({
    present: z.number(),
    late: z.number(),
    absent: z.number(),
    onLeave: z.number(),
    wfh: z.number(),
})

export const AttendanceResponseSchema = z.object({
    summary: SummarySchema,
    items: z.array(AttendanceItemSchema),
})

export const AttendanceItemListSchema = z.array(AttendanceItemSchema)
export type AttendanceResponse = z.infer<typeof AttendanceResponseSchema>
export type AttendanceItem = z.infer<typeof AttendanceItemSchema>
export type AttendanceSummary = z.infer<typeof SummarySchema>