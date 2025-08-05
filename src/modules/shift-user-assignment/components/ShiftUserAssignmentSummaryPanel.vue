<template>
    <div>
        <div>
            <Panel style="width:400px; height:310px">
                <template #header>
                    <div class="d-flex flex-column align-items-start">
                        <h6 class="mb-0">
                            <i class="pi pi-users me-2"></i>
                            Summary Assignments
                        </h6>
                        <p class="text-muted text-sm mb-0">Shift Management</p>
                    </div>
                </template>
                <template #icons>
                    <Button icon="icon icon-reload" severity="secondary" @click="fnfetchSUmmaryAssignments" rounded
                        text />
                </template>
                <div class="text-sm">
                    <transition enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut" mode="out-in">
                        <template v-if="summaryAssignmentLoading">
                            <div class="d-flex gap-2 justify-content-center">
                                <Skeleton class="mb-2"></Skeleton>
                                <Skeleton class="mb-2"></Skeleton>
                                <Skeleton class="mb-2"></Skeleton>
                            </div>
                        </template>
                        <template v-else>
                            <div class="d-flex gap-2">
                                <Tag :value="`Total Employee ${summaryAssignment.employeeCount}`"
                                    severity="secondary" />
                                <Tag :value="`Assigned ${summaryAssignment.assigned}`" />
                                <Tag :value="`Unassigned ${summaryAssignment.unassigned}`" severity="danger" />
                            </div>
                        </template>
                    </transition>

                       <Chart type="bar" :data="chartDataBar" :options="chartOptionsBar" />
                </div>
            </Panel>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useShiftUserAssignment } from '@module/shift-user-assignment/composables/useShiftUserAssignmentView';
import { onMounted } from 'vue';
const {
    summaryAssignment,
    summaryAssignmentLoading,
    chartDataBar,
    chartOptionsBar,
    fnfetchSUmmaryAssignments
} = useShiftUserAssignment()

onMounted(async () => {
    fnfetchSUmmaryAssignments()
})


</script>