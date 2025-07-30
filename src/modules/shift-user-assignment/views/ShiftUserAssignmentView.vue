<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-lg-12 mb-lg-0 mb-4">
                <div class="card">
                    <div class="card-body">
                        <p>Users Assignments</p>
                        <div class="d-flex  gap-2">
                            <div class="flex-grow-1" v-for="shift in shiftData" :key="shift.id">
                                <Panel toggleable>
                                    <template #header>
                                        <div class="d-flex flex-column align-items-start">
                                            <h5 class="text-uppercase mb-0">{{ shift.name }}</h5>
                                            <p class="text-muted text-sm mb-0">{{ shift.startTime }} - {{ shift.endTime
                                                }}
                                            </p>
                                        </div>
                                    </template>
                                    <template #icons>
                                        <Button icon="pi pi-cog" severity="secondary" rounded text />
                                    </template>
                                </Panel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useShiftUserAssignment } from '@module/shift-user-assignment/composables/useShiftUserAssignmentView';
import { useHead } from '@vueuse/head';


useHead(() => ({
    title: "User Shift Assignments",
    meta: [
        {
            name: "Manage, track, and control all user Shift Attendance",
        }
    ]
}))
const {
    shiftData
} = useShiftUserAssignment()
</script>
