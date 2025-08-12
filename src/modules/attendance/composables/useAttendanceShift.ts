import { useAttendanceStore } from '@module/attendance/stores/attendance';

import { PercentageFormatter } from "@/lib/PercentageFormatter";
import { ShiftFormatter } from "@module/shift/services/shiftService";
import { storeToRefs } from "pinia";

export function useAttendanceShift() {

    /** SECTION VARIABLES
     *  1. Pinia Store
     *  2. Store To Refs
     *  3. Variables
     */

    const store = useAttendanceStore()
    const { shiftStatistics: data } = storeToRefs(store)


    /** SECTION FUNCTION
     * 1. Formated Shift Statistics Key
    */

    const formatShiftStatisticsKey = (key: string) => {
        return ShiftFormatter.getDisplayText(key);
    };
    const formatShiftStatisticsClass = (key: number) => {
        return {
            'class': `${PercentageFormatter.getColor(key)}`,
            'format': `${PercentageFormatter.getFormat(key)}`,
            'label': `${PercentageFormatter.getLabel(key)}`
        };
    };


    return {
        data,
        formatShiftStatisticsKey,
        formatShiftStatisticsClass

    }
}
