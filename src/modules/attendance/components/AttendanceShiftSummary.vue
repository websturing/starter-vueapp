<template>
    <div>
        <p class="mb-2 fw-bold">{{ titleData }} Shift Statistics</p>

        <template v-if="loading">
            <SkeletonShift />
        </template>
        <template v-else>

            <div class="d-flex gap-3">
                <div class="card" style="width:calc(30% - 0.5rem)" v-for="(item, key) in shiftStatistics" :key="key">
                    <div class="p-3 mt-2">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5 class="mb-1">{{ formatShiftStatisticsKey(key) }}</h5>
                                <p class="mt-0 text-sm">{{ item.startTime }} - {{ item.endTime }}</p>
                            </div>
                            <div class="me-3">
                                <i class="icon icon-arrow-door-in"></i>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-muted text-xs ">Check In Average</span>
                                <h2>{{ item.averageCheckIn }}</h2>
                            </div>
                            <div>
                                <span class="text-muted text-xs">On Time</span>
                                <h4 :class="formatShiftStatisticsClass(item.onTimePercentage).class">{{
                                    formatShiftStatisticsClass(item.onTimePercentage).format }}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import SkeletonShift from '@module/attendance/components/skeleton/AttendanceSkeletonShiftSummary.vue';
import { useAttendanceSummary } from '@module/attendance/composables/useAttendanceSummary';
const {
    titleData,
    loading,
    shiftStatistics,
    formatShiftStatisticsKey,
    formatShiftStatisticsClass
} = useAttendanceSummary()



</script>