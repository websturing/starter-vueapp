<template>
    <div>

        <Panel>
            <template #header>
                <div class="d-flex flex-column align-items-start">
                    <h6 class="mb-0">
                        <i class="pi pi-clock me-2"></i>
                        Distribution Shift Assignment
                    </h6>
                    <p class="text-muted text-sm mb-0">Shift Management</p>
                </div>
            </template>
            <template #icons>
                <Button icon="icon icon-reload" severity="secondary" @click="fnfetchSUmmaryAssignments" rounded text />
            </template>
            <div class="text-sm gap-2">
                <Chart type="doughnut" width="400" :data="chartData" :options="chartOptions" />
                <div>{{ shiftData }}</div>
            </div>
        </Panel>
    </div>
</template>

<script setup>
import { useShiftUserAssignmentDistribution } from "@module/shift-user-assignment/composables/useShiftUserAssignmentDistribution";
import { onMounted, ref } from "vue";


const {
    shiftData,
    shiftLoading,
    fnfetchShift
} = useShiftUserAssignmentDistribution()

onMounted(async () => {
    await fnfetchShift();
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                display: false,
                position: "right",
                labels: {
                    usePointStyle: false,
                    color: textColor
                }
            }
        }
    };
};


</script>
