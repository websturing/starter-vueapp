export interface Shift {
    id: number
    name: string
    start_time: `${number}:${number}:${number}`;
    end_time: `${number}:${number}:${number}`;
    tolerance: `${number} Minutes`;
    isNightShift: boolean
}