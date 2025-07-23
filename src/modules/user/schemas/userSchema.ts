import * as yup from 'yup'

export const userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    role_name: yup.array().min(1).required()
})