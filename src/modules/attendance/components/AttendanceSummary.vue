<template>
    <div>
        <div class="d-flex flex-column gap-3">
            <div class="card">
                <div class="p-3 mt-2">
                    <p class="mt-0 text-sm">Today attendance</p>
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
                </div>
            </div>

            <div class="card">
                <div class="p-3 mt-2">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="mb-1">Total Strength</h5>
                            <p class="mt-0 text-sm">Your overall today team attendance</p>
                        </div>
                        <div class="me-3">
                            <h2>{{ totalValue }}</h2>
                        </div>
                    </div>
                    <Chart type="bar" :data="chartDataStacked" :options="chartOptionsStacked" class="h-40rem" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAttendanceSummary } from '@module/attendance/composables/useAttendanceSummary';
const {
    data,
    totalValue,
    chartDataStacked,
    chartOptionsStacked,
    formatAttendanceKey,
    getAttendanceClass
} = useAttendanceSummary()


</script>