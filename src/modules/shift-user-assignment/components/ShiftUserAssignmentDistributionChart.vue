<template>
    <div>

        <Panel style="width:400px; height:310px">
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
                <Button icon="icon icon-reload" severity="secondary" @click="fnfetchShift" rounded text />
            </template>
            <div class="text-sm gap-2 mt-4">
                <Chart type="doughnut" :data="chartDataDoug" :options="chartOptionsDoug" />
            </div>
        </Panel>
    </div>
</template>

<script setup>
import { useShiftUserAssignmentDistribution } from "@module/shift-user-assignment/composables/useShiftUserAssignmentDistribution";
import { onMounted } from "vue";


const {
    shiftData,
    shiftLoading,
    fnfetchShift,
    chartDataDoug,
    chartOptionsDoug
} = useShiftUserAssignmentDistribution()

onMounted(async () => {
    await fnfetchShift();
    chartData.value = setChartDataDoug();
    chartOptions.value = setChartOptionsDoug();
});




</script>
