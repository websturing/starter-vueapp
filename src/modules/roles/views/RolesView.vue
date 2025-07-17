<template>
    <div>
        <DataTable />
        <RoleForm />
    </div>
</template>
<script setup lang="ts">
import DataTable from '@/modules/roles/components/RolesTable.vue';
import RoleForm from "@module/roles/components/RolesForm.vue";
</script>