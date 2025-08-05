<template>
  <div>
    <div class="card">
      <div class="card-body">
        <p>Users Assignments</p>
        <div class="d-flex gap-2 mb-3">
          <summary-panel></summary-panel>
          <distribution-chart></distribution-chart>
        </div>
        <table-view></table-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DistributionChart from "@/modules/shift-user-assignment/components/ShiftUserAssignmentDistributionChart.vue";
import SummaryPanel from "@/modules/shift-user-assignment/components/ShiftUserAssignmentSummaryPanel.vue";
import TableView from "@module/shift-user-assignment/components/ShiftUserAssignmentTable.vue";
import { useShiftUserAssignmentDistribution } from "@module/shift-user-assignment/composables/useShiftUserAssignmentDistribution";
import { useShiftUserAssignmentTable } from '@module/shift-user-assignment/composables/useShiftUserAssignmentTable';
import { useShiftUserAssignment } from '@module/shift-user-assignment/composables/useShiftUserAssignmentView';
const {
  fnfetchShift
} = useShiftUserAssignmentDistribution()

const {
  summaryAssignment,
  summaryAssignmentLoading,
  fnfetchSUmmaryAssignments
} = useShiftUserAssignment()

const {
  search,
  page,
  rows,
  data,
  totalRecords,
  loading,
  onPageChange,
  refresh,
  onRowEdit,
  onRowDelete,
} = useShiftUserAssignmentTable()
</script>