<template>
    <div>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-8">
                    <div class="card">
                        <div class="card-body">

                            <data-table></data-table>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <attendancy-summary class="mb-5"></attendancy-summary>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import AttendancySummary from "@module/attendance/components/AttendanceSummary.vue";
import DataTable from "@module/attendance/components/AttendanceTable.vue";
</script>