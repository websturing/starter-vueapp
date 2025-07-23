import { handleApiResponse } from "@/lib/toast"
import { useRoleStore } from '@/modules/roles/stores/roles'
import { useUserStore } from '@/modules/user/stores/user'
import { userSchema } from '@module/user/schemas/userSchema'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'

export function useUserForm(initialData: any = null) {
    const store = useUserStore()
    const roleStore = useRoleStore()


    const { data: roleData } = storeToRefs(roleStore);

    const { handleSubmit, errors, isSubmitting, resetForm: veeResetForm, setValues } = useForm<{
        name: string
        email: string,
        role_names: Array<string>
    }>({
        validationSchema: userSchema,
        initialValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            role_names: initialData?.role_names || []
        }
    })

    const { value: name } = useField<string>('name')
    const { value: email } = useField<string>('email')
    const { value: role_names } = useField<Array<string>>('role_names')

    const isEdit = ref(!!initialData?.id) // true kalau edit


    const resetForm = () => {
        veeResetForm({
            values: {
                name: '',
                email: '',
                role_names: []
            },
            errors: {}
        })
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            const moduleData = {
                name: values.name,
                email: values.email,
                role_names: values.role_names
            }

            if (isEdit.value) {
                const res = await store.updateUser(initialData.id, moduleData)
                handleApiResponse(res);
            } else {
                const res = await store.createUser(moduleData)
                handleApiResponse(res);
                resetForm()
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    })

    onMounted(async () => {
        try {
            await store.fetchUserWithRoles()
            await roleStore.fetchRole()
        } catch (error) {
            console.error('Error fetching modules:', error)
        }
    })


    return {
        name,
        email,
        role_names,
        isEdit,
        roleData,
        onSubmit,
        resetForm,
        errors,
        isSubmitting,
    }
}
