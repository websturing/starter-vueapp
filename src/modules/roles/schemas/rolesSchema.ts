import * as yup from 'yup'

export const roleCreateSchema = yup.object({
    name: yup.string().required(),
})