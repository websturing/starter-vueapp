import { z } from 'zod';

const AttendanceLogSchema = z.object({
    id: z.number(),
    logType: z.string(),
    timestamp: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    accuracy: z.string(),
    deviceId: z.string(),
    notes: z.string().nullable(),
});

const AttendanceRecordSchema = z.object({
    id: z.number(),
    date: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    workingHours: z.string(),
    status: z.enum(['present', 'late', 'absent', 'on_leave', 'wfh']),
    user: z.string(),
    logs: z.array(AttendanceLogSchema),
    logCount: z.number(),
});

const AttendanceSummarySchema = z.object({
    present: z.number(),
    late: z.number(),
    absent: z.number(),
    onLeave: z.number(),
    wfh: z.number(),
});

const ShiftStatisticsSchema = z.object({
    averageCheckIn: z.string(),
    count: z.number().int().nonnegative(),
    onTimePercentage: z.number().min(0).max(100),
    startTime: z.string(),
    endTime: z.string(),
});

const ShiftAverageMapSchema = z.record(ShiftStatisticsSchema);

const AttendanceAnalyticsSchema = z.object({
    ontimePercentage: z.number(),
    ontimeCount: z.number(),
});

export const AttendanceReportSchema = z.object({
    summary: AttendanceSummarySchema,
    records: z.array(AttendanceRecordSchema),
    checkInAverage: z.string(),
    checkInAnalytics: AttendanceAnalyticsSchema,
    shiftStatistics: ShiftAverageMapSchema
});

export const AttendanceRecordListSchema = z.array(AttendanceRecordSchema);

// Type exports
export type AttendanceReport = z.infer<typeof AttendanceReportSchema>;
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;
export type AttendanceSummary = z.infer<typeof AttendanceSummarySchema>;
export type AttendanceLog = z.infer<typeof AttendanceLogSchema>;
export type ShiftStatistics = z.infer<typeof ShiftStatisticsSchema>;
export type AttendanceAnalytics = z.infer<typeof AttendanceAnalyticsSchema>;