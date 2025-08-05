import { useShiftStore } from "@/modules/shift/stores/shift";
import { useShiftUserAssignmentStore } from "@module/shift-user-assignment/stores/shiftUserAssignment";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export function useShiftUserAssignmentDistribution() {
    const store = useShiftUserAssignmentStore();
    const storeShift = useShiftStore();

    const { dataSummary: summaryAssignment, loading: summaryAssignmentLoading } = storeToRefs(store);
    const { dataAssingments: shiftData, loading: shiftLoading } = storeToRefs(storeShift);




    /** Function Shift Assignments */
    const fnfetchSUmmaryAssignments = async () => {
        await store.fetchShiftUserAssignmentSummary()
    }


    /** Function Shift  */
    const fnfetchShift = async () => {
        await storeShift.fetchShiftAssingments();
    }


    /** Function Charts Doug */
    const chartDataDoug = computed(() => {
        const documentStyle = getComputedStyle(document.body);

        return {
            labels: shiftData.value.map((item: any) => [
                `${item.name}`,
                `(${item.assignmentsCount} Employee)`
            ]),
            datasets: [
                {
                    data: shiftData.value.map((item: any) => item.assignmentsCount),
                    backgroundColor: [
                        documentStyle.getPropertyValue('--p-cyan-500'),
                        documentStyle.getPropertyValue('--p-orange-500'),
                        documentStyle.getPropertyValue('--p-gray-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--p-cyan-400'),
                        documentStyle.getPropertyValue('--p-orange-400'),
                        documentStyle.getPropertyValue('--p-gray-400')
                    ]
                }
            ]
        };
    });
    const chartOptionsDoug = computed(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');

        return {
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: textColor,
                        font: {
                            weight: '500',
                            family: "'Inter', sans-serif" // Pastikan font-family mendukung
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        // Tambahkan ini untuk multi-line
                        generateLabels: (chart: any) => {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label: string, i: number) => {
                                    const backgroundColor = data.datasets[0].backgroundColor[i];
                                    // Split label menjadi array untuk multi-line
                                    const labelParts = typeof label === 'string' ?
                                        label.split('(') :
                                        [label];

                                    return {
                                        text: labelParts.join('\n('), // Gunakan \n untuk line break
                                        fillStyle: backgroundColor,
                                        hidden: false,
                                        lineWidth: 0,
                                        strokeStyle: backgroundColor,
                                        pointStyle: 'circle',
                                        fontColor: textColor,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            return `Employees: ${context.raw}`;
                        }
                    }
                }
            },
            cutout: '60%',
            responsive: true,
            maintainAspectRatio: false
        };
    });


    return {
        summaryAssignment,
        summaryAssignmentLoading,
        shiftData,
        shiftLoading,
        fnfetchShift,
        fnfetchSUmmaryAssignments,
        chartDataDoug,
        chartOptionsDoug,
    }
}