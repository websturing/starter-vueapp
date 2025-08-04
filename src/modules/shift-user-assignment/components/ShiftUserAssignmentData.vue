<template>
  <div>
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body">
            <p>Users Assignments</p>
            <div class="d-flex  gap-2">
              <div class="flex-grow-1">
                <summary-panel></summary-panel>
              </div>
              <div>
                <distribution-chart></distribution-chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DistributionChart from "@/modules/shift-user-assignment/components/ShiftUserAssignmentDistributionChart.vue";
import SummaryPanel from "@/modules/shift-user-assignment/components/ShiftUserAssignmentSummaryPanel.vue";
import { useShiftUserAssignment } from '@module/shift-user-assignment/composables/useShiftUserAssignmentView';
const {
  summaryAssignment,
  summaryAssignmentLoading,
  fnfetchSUmmaryAssignments
} = useShiftUserAssignment()
</script>