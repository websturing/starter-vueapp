import { computed, ref } from 'vue'
export function useUserTable() {
    const userStore = useUserStore()
    const search = ref('')
    const page = ref(0)
    const rows = ref(10)

    const filtered = computed(() => {
        // logic pencarian
    })

    const paginated = computed(() => {
        // logic paging
    })

    return {
        data: paginated,
        loading: computed(() => userStore.loading),
        page,
        rows,
        search,
        totalRecords: computed(() => filtered.value.length),
        refresh: () => userStore.fetchUsers(search.value),
    }
}
