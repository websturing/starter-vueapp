<template>
    <div>
        <div class="d-flex gap-3 mb-3">
            <div class="card">
                <div class="p-3 mt-2">
                    <p class="mt-0 text-sm">{{ titleData }} attendance</p>
                    <template v-if="loading">
                        <SkeletonSummaryCard />
                    </template>
                    <template v-else>
                        <div class="d-flex align-items-center justify-content-center">
                            <div v-for="(item, key, index) in data" :key="key"
                                class="d-flex align-items-center justify-content-center">
                                <div style="width:70px">
                                    <h4 class="m-0 p-0">{{ item }}</h4>
                                    <p class="text-muted text-sm">{{ formatAttendanceKey(key) }}</p>
                                </div>
                                <Divider layout="vertical" v-if="index != (Object.keys(data).length - 1)"
                                    style="height: 40px !important;" />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div>
                <button-view></button-view>
            </div>
            <div>
                <filter-view></filter-view>
            </div>
        </div>

        <shift-summary class="mb-5"></shift-summary>
        <chart-bary-view />
    </div>
</template>
<script setup lang="ts">
import ButtonView from '@module/attendance/components/AttendanceButton.vue';
import ChartBaryView from '@module/attendance/components/AttendanceChartBarY.vue';
import FilterView from '@module/attendance/components/AttendanceFilter.vue';
import ShiftSummary from '@module/attendance/components/AttendanceShiftSummary.vue';

import SkeletonSummaryCard from '@module/attendance/components/skeleton/AttendanceSkeletonSummaryCard.vue';
import { useAttendanceSummary } from '@module/attendance/composables/useAttendanceSummary';
const {
    titleData,
    loading,
    data,
    totalValue,
    chartDataStacked,
    chartOptionsStacked,
    formatAttendanceKey,
} = useAttendanceSummary()


</script>