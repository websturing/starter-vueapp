<template>
    <div class="container-fluid py-4">
        <data-view></data-view>
        <form-view class="mt-3"></form-view>
    </div>
</template>
<script setup lang="ts">
import DataView from "@module/shift-user-assignment/components/ShiftUserAssignmentData.vue";
import FormView from "@module/shift-user-assignment/components/ShiftUserAssignmentForm.vue";
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
