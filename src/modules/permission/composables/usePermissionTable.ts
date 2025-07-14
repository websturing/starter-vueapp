import { usePermissionStore } from '@module/permission/stores/permission'
import { computed, ref, watch } from 'vue'

export function usePermissionTable() {
    const permissionStore = usePermissionStore()

    const search = ref('')
    const page = ref(0)
    const rows = ref(10)

    const filtered = computed(() => {
        if (!search.value) return permissionStore.data

        return permissionStore.data.filter(module =>
            module.name.toLowerCase().includes(search.value.toLowerCase()) ||
            module.slug.toLowerCase().includes(search.value.toLowerCase()) ||
            module.permissions.some((p: any) =>
                p.action.toLowerCase().includes(search.value.toLowerCase()) ||
                p.permission_name.toLowerCase().includes(search.value.toLowerCase())
            )
        )
    })

    const paginated = computed(() => {
        const start = page.value * rows.value
        return filtered.value.slice(start, start + rows.value)
    })

    const refresh = async () => {
        await permissionStore.fetchPermissions()
    }

    // initial fetch
    watch(search, refresh, { immediate: true })

    return {
        search,
        page,
        rows,
        data: paginated,
        totalRecords: computed(() => filtered.value.length),
        loading: computed(() => permissionStore.loading),
        refresh
    }
}
