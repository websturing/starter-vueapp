<template>
    <div>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <attendancy-summary class="mb-5"></attendancy-summary>
                            <data-table></data-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import AttendancySummary from "@module/attendance/components/AttendanceSummary.vue";
import DataTable from "@module/attendance/components/AttendanceTable.vue";
</script>