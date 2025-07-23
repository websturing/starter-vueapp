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
        role_name: Array<string>
    }>({
        validationSchema: userSchema,
        initialValues: {
            name: initialData?.name || '',
            email: initialData?.email || '',
            role_name: initialData?.role_name || []
        }
    })

    const { value: name } = useField<string>('name')
    const { value: email } = useField<string>('email')
    const { value: role_name } = useField<Array<string>>('role_name')

    const isEdit = ref(!!initialData?.id) // true kalau edit


    const resetForm = () => {
        veeResetForm({
            values: {
                name: '',
                email: '',
                role_name: []
            },
            errors: {}
        })
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            const moduleData = {
                name: values.name,
                email: values.email,
                role_name: values.role_name
            }

            if (isEdit.value) {
                console.log('INI EDIT')
                await store.updateRole(initialData.id, moduleData)
            } else {
                await store.createRole(moduleData)
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
        role_name,
        isEdit,
        roleData,
        onSubmit,
        resetForm,
        errors,
        isSubmitting,
    }
}
