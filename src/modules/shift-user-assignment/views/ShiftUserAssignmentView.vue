<template>
    <div class="container-fluid py-4">
        <div class="d-flex gap-2">
            <data-view></data-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import DataView from "@module/shift-user-assignment/components/ShiftUserAssignmentData.vue";
import { useHead } from '@vueuse/head';



useHead(() => ({
    title: "User Shift Assignments",
    meta: [
        {
            name: "Manage, track, and control all user Shift Attendance",
        }
    ]
}))
</script>
