import { useModuleStore } from '@/modules/module/stores/module'
import { computed, ref, watch } from 'vue'

export function useModuleTable() {
    const moduleStore = useModuleStore()

    const search = ref('')
    const page = ref(0)
    const rows = ref(10)

    const filtered = computed(() => {
        if (!search.value) return moduleStore.data

        return moduleStore.data.filter(module =>
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
        await moduleStore.fetchModule()
    }

    const onPageChange = (e: any) => {
        page.value = e.page
        rows.value = e.rows
    }

    watch(search, async () => {
        page.value = 0
        if (moduleStore.data.length === 0) {
            await refresh()
        }
    }, { immediate: true })


    return {
        search,
        page,
        rows,
        data: paginated,
        totalRecords: computed(() => filtered.value.length),
        loading: computed(() => moduleStore.loading),
        refresh,
        onPageChange,
    }
}
