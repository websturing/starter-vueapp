<template>
    <div>
        <div class="card">
            <div class="p-3 mt-2 pb-4">
                <p class="mt-0 text-sm text-muted">Attendance Management</p>
                <div class="d-flex align-items-center justify-content-center gap-2">
                    <Button label="Create Attendance" icon="pi pi-plus" iconPos="top" />
                    <Button label="Reload" icon="pi pi-refresh" severity="warn" iconPos="top" @click="fnReload" />
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getDateRange } from "@/lib/dynamicDate";
import { useAttendanceStore } from "@module/attendance/stores/attendance";
import { storeToRefs } from "pinia";

const store = useAttendanceStore();
const { dateRange } = storeToRefs(store);
const fnReload = () => {
    const range = getDateRange('today');
    if (dateRange.value.start && dateRange.value.end) {
        store.fetchAttendanceDateRange(dateRange.value.start, dateRange.value.end);
    } else {
        store.fetchAttendanceDateRange(range.start, range.end);
    }

}

</script>