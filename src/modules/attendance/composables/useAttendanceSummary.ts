import { useAttendanceStore } from '@module/attendance/stores/attendance';

import { PercentageFormatter } from "@/lib/PercentageFormatter";
import { AttendanceFormatter, type AttendanceKey } from "@module/attendance/services/attendanceService";
import { ShiftFormatter } from "@module/shift/services/shiftService";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export function useAttendanceSummary() {

    /** SECTION VARIABLES
     *  1. Pinia Store
     *  2. Store To Refs
     *  3. Variables
     */

    const store = useAttendanceStore()

    const { summary: data, checkInAverage, checkInPercentage, shiftStatistics, loading, titleData } = storeToRefs(store)



    const chartData = computed(() => {
        return Object.entries(data.value)
            .map(([key, value]) => ({
                label: formatAttendanceKey(key),
                data: [value],
            }));
    });
    const totalValue = computed(() => {
        const numbers = Object.values(data.value).filter(
            (val): val is number => typeof val === 'number' && !isNaN(val)
        );

        return numbers.reduce((sum, val) => sum + val, 0);
    });



    /** SECTION FUNCTION
     * 1. Formated summary display
     * 2. Formated summary class text
     * 3. Function Chart Stacked Bar
    */


    const formatAttendanceKey = (key: string) => {
        return AttendanceFormatter.getDisplayText(key as AttendanceKey);
    };
    const getAttendanceClass = (key: string) => {
        return `${AttendanceFormatter.getClass(key as AttendanceKey)}`;
    };

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


    const chartDataStacked = computed(() => {
        const documentStyle = getComputedStyle(document.body);
        return {
            labels: ['Assignment'], // Ganti dengan data dinamis jika perlu
            datasets: Object.entries(data.value)
                .map(([key, value]) => ({
                    label: formatAttendanceKey(key),
                    data: [value],
                }))
        };
    });
    const chartOptionsStacked = computed(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-surface-border');

        return {
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        font: {
                            weight: '500',
                            family: "'Inter', sans-serif"
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    max: totalValue.value,
                    stacked: true,
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColor,
                        precision: 0,
                        // Atur step size berdasarkan nilai maksimum
                        stepSize: 10
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    });

    return {
        titleData,
        loading,
        data,
        chartDataStacked,
        chartOptionsStacked,
        totalValue,
        checkInAverage,
        checkInPercentage,
        shiftStatistics,
        formatAttendanceKey,
        getAttendanceClass,
        formatShiftStatisticsKey,
        formatShiftStatisticsClass

    }
}
