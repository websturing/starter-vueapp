<template>
    <div>
        <div class="card">
            <div class="p-3 mt-2 pb-5">
                <p class="mt-0 text-sm text-muted">Filter</p>
                <div class="d-flex align-items-center justify-content-center">
                    <Select v-model="selectedRange" @update:model-value="fnSelectedRange" optionLabel="name"
                        placeholder="Select a City" :options="rangeLabel" style="width:150px" />

                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getDateRange } from "@/lib/dynamicDate";
import { useAttendanceStore } from "@module/attendance/stores/attendance";
import { ref } from 'vue';


const store = useAttendanceStore();

const rangeLabel = ref([
    {
        name: 'Today',
        value: getDateRange('today'),
        dynamicValue: 'today'
    },
    {
        name: 'This Week',
        value: getDateRange('this_week'),
        dynamicValue: 'this_week'
    },
    {
        name: 'This Month',
        value: getDateRange('this_month'),
        dynamicValue: 'this_month'
    },
    {
        name: 'This Year',
        value: getDateRange('this_year'),
        dynamicValue: 'this_year'
    },
]);

const selectedRange = ref(rangeLabel.value[0]);
const fnSelectedRange = (value: any) => {
    selectedRange.value = value;
    store.fetchAttendanceDateRange(value.value.start, value.value.end);
    store.setTitleData(value.name);
    store.dateRange.start = value.value.start;
    store.dateRange.end = value.value.end;
};
</script>