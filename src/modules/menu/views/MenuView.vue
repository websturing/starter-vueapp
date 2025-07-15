<template>
    <div>
        <DataTablePermission />
        <FormPermission />
    </div>
</template>

<script setup lang="ts">
import FormPermission from '@module/permission/components/PermissionForm.vue';
import DataTablePermission from '@module/permission/components/PermissionTable.vue';
</script>