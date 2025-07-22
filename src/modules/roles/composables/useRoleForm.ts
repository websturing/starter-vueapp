import { handleApiResponse } from "@/lib/toast"
import { useModuleStore } from '@/modules/module/stores/module'
import { roleCreateSchema } from '@module/roles/schemas/rolesSchema'
import { useRoleStore } from '@module/roles/stores/roles'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'

export function useRoleForm(initialData: any = null) {


    const store = useRoleStore()
    const moduleStore = useModuleStore();
    const { data: parentData } = storeToRefs(store)
    const { data: permissionData } = storeToRefs(moduleStore)
    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, setValues } = useForm<{
        name: string,
        guard_name: string,
        permissions: Array<number>
    }>({
        validationSchema: roleCreateSchema,
        initialValues: {
            name: initialData?.name || '',
            guard_name: initialData?.guard_name || 'web',
            permissions: initialData?.permissions || []
        }
    })

    const { value: name } = useField<string>('name')
    const { value: permissions } = useField<Array<number>>('permissions')
    const isEdit = ref(!!initialData?.id) // true kalau edit

    const resetForm = () => {
        veeResetForm({
            values: {
                name: ''
            },
            errors: {}
        })
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            const moduleData = {
                name: values.name,
                guard_name: values.guard_name,
                permissions: values.permissions
            }

            if (isEdit.value) {
                const res = await store.updateRole(initialData.id, moduleData)
                handleApiResponse(res);
            } else {
                const res = await store.createRole(moduleData)
                handleApiResponse(res);
                resetForm()
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    })

    onMounted(async () => {
        try {
            await store.fetchRole()
            await moduleStore.fetchModuleWithPermissions()
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    })



    return {
        name,
        permissions,
        isEdit,
        onSubmit,
        resetForm,
        parentData,
        errors,
        isSubmitting,
        permissionData
    }
}
