<template>
    <div class="d-flex flex-column gap-3  mb-3">
        <div class="card">
            <template v-if="loading">
                <SkeletonChartBary />
            </template>
            <template v-else>
                <div class="p-3 mt-2">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="mb-1">Total Strength</h5>
                            <p class="mt-0 text-sm">Your overall {{ titleData }} team attendance</p>
                        </div>
                        <div class="me-3">
                            <h2>{{ totalValue }}</h2>
                        </div>
                    </div>
                    <div class="p-3 mt-2">
                        <Chart v-if="chartDataStacked && chartDataStacked.datasets?.length" type="bar"
                            :data="chartDataStacked" :options="chartOptionsStacked" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import SkeletonChartBary from '@module/attendance/components/skeleton/AttendanceSkeletonChartBarY.vue';
import { useAttendanceSummary } from '@module/attendance/composables/useAttendanceSummary';
const {
    titleData,
    loading,
    totalValue,
    chartDataStacked,
    chartOptionsStacked,
} = useAttendanceSummary()


</script>