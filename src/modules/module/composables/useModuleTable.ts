import { useModuleStore } from '@/modules/module/stores/module'
import { computed, ref, watch } from 'vue'

export function useModuleTable() {
    const moduleStore = useModuleStore()

    const searchRef = ref('') // rename untuk hindari konflik dengan prop `search`
    const page = ref(0)
    const rows = ref(10)

    const filtered = computed(() => {
        if (!searchRef.value) return moduleStore.data

        return moduleStore.data.filter(module =>
            module.name.toLowerCase().includes(searchRef.value.toLowerCase()) ||
            module.slug.toLowerCase().includes(searchRef.value.toLowerCase())
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

    const onRowEdit = (row: any) => {
        alert(`Edit Module: ${row.name}`)
    }
    const onRowDelete = async (row: any) => {
        await moduleStore.deleteModule(row.id)
    }

    watch(searchRef, async () => {
        page.value = 0
        if (moduleStore.data.length === 0) {
            await refresh()
        }
    }, { immediate: true })

    // expose computed with getter/setter for v-model compatibility
    const search = computed({
        get: () => searchRef.value,
        set: val => searchRef.value = val
    })

    return {
        search,
        page,
        rows,
        data: paginated,
        totalRecords: computed(() => filtered.value.length),
        loading: computed(() => moduleStore.loading),
        refresh,
        onPageChange,
        onRowEdit,
        onRowDelete
    }
}
