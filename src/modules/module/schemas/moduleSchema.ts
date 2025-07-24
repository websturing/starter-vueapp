import * as yup from 'yup'

export const permissionModuleCreateSchema = yup.object({
    name: yup.string().required(),
    slug: yup.string().required(),
    icon: yup.string().required(),
})