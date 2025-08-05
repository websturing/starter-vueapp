import { useShiftUserAssignmentStore } from "@module/shift-user-assignment/stores/shiftUserAssignment";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export function useShiftUserAssignment() {
    const store = useShiftUserAssignmentStore();

    const { dataSummary: summaryAssignment, loading: summaryAssignmentLoading } = storeToRefs(store);

    const fnfetchSUmmaryAssignments = async () => {
        await store.fetchShiftUserAssignmentSummary()
    }

    /** CHART VARIABEL 
     * 1. Chart Bar Horizontal
     * 
    */

    const chartDataBar = computed(() => ({
        labels: ['Assigned', 'Unassigned'],
        datasets: [
            {
                label: 'Jumlah Karyawan',
                data: [summaryAssignment.value?.assigned, summaryAssignment.value?.unassigned],
                backgroundColor: ['#04786e', '#ba1c63'],
                borderWidth: 1,
            },
        ],
    }));
    const chartOptionsBar = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `Total: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: '',
                },
                grid: {
                    display: false, // Hilangkan grid lines di sumbu X (horizontal)
                    drawBorder: false, // Hilangkan border garis sumbu X
                },
                ticks: {
                    display: true, // Tampilkan angka di sumbu X (opsional)
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Assignments',
                },
                maxBarThickness: 10,
            },
        },
    };

    return {
        summaryAssignment,
        summaryAssignmentLoading,
        chartDataBar,
        chartOptionsBar,
        fnfetchSUmmaryAssignments
    }
}