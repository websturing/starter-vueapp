export type AttendanceKey = 'present' | 'late' | 'absent' | 'onLeave' | 'wfh';

export class AttendanceFormatter {
    private static readonly displayMap: Record<AttendanceKey, string> = {
        present: 'Present',
        late: 'Late',
        absent: 'Absent',
        onLeave: 'On Leave',
        wfh: 'WFH'
    };

    private static readonly classMap: Record<AttendanceKey, string> = {
        present: 'text-green-500',
        late: 'text-yellow-400',
        absent: 'text-red-400',
        onLeave: 'text-info',
        wfh: ''
    };

    static getDisplayText(key: AttendanceKey): string {
        return this.displayMap[key] || key;
    }

    static getClass(key: AttendanceKey): string {
        return this.classMap[key] || '';
    }
}