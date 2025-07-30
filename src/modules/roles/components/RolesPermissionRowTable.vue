<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

// Props
const props = defineProps<{
    item: any
    index: number
    level: number
    permissionCheckBox: number[]
}>()

// Emits
const emit = defineEmits(['update:permissionCheckBox'])

// Helper untuk cari ID berdasarkan action
function findPermissionId(perms: any[] = [], action: string) {
    const found = perms.find((p) => p.action === action)
    return found ? found.permissionId : null
}
</script>

<template>
    <tr v-if="item && item.name">
        <td class="text-center">{{ level == 0 ? index : "" }}</td>
        <td :style="{ paddingLeft: `${level * 20}px` }" style="text-align: left !important;">
            {{ level == 0 ? item.name : ` - ${item.name}` }}
        </td>

        <!-- Loop untuk setiap action permission -->
        <td class="text-center">
            <Checkbox v-if="findPermissionId(item.permissions, 'read')" :modelValue="permissionCheckBox"
                :value="findPermissionId(item.permissions, 'read')"
                @update:modelValue="val => emit('update:permissionCheckBox', val)" />
        </td>
        <td>
            <Checkbox v-if="findPermissionId(item.permissions, 'create')" :modelValue="permissionCheckBox"
                :value="findPermissionId(item.permissions, 'create')"
                @update:modelValue="val => emit('update:permissionCheckBox', val)" />
        </td>
        <td>
            <Checkbox v-if="findPermissionId(item.permissions, 'update')" :modelValue="permissionCheckBox"
                :value="findPermissionId(item.permissions, 'update')"
                @update:modelValue="val => emit('update:permissionCheckBox', val)" />
        </td>
        <td>
            <Checkbox v-if="findPermissionId(item.permissions, 'delete')" :modelValue="permissionCheckBox"
                :value="findPermissionId(item.permissions, 'delete')"
                @update:modelValue="val => emit('update:permissionCheckBox', val)" />
        </td>
        <td>
            <Checkbox v-if="findPermissionId(item.permissions, 'upload')" :modelValue="permissionCheckBox"
                :value="findPermissionId(item.permissions, 'upload')"
                @update:modelValue="val => emit('update:permissionCheckBox', val)" />
        </td>
        <td>
            <Checkbox v-if="findPermissionId(item.permissions, 'download')" :modelValue="permissionCheckBox"
                :value="findPermissionId(item.permissions, 'download')"
                @update:modelValue="val => emit('update:permissionCheckBox', val)" />
        </td>
    </tr>

    <!-- Render children jika ada -->
    <RolesPermissionRowTable v-if="Array.isArray(item.children)" v-for="(child, i) in item.children" :key="child.key"
        :item="child" :index="index" :level="level + 1" :permissionCheckBox="permissionCheckBox"
        @update:permissionCheckBox="val => emit('update:permissionCheckBox', val)" />
</template>
