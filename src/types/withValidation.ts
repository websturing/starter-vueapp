import type { SubmissionHandler } from 'vee-validate'
import type { SubmitHandlerResult } from './SubmitHandlerResult'

export function withValidation<T>(
    fn: (values: T) => Promise<void>
): SubmissionHandler<T, SubmitHandlerResult<T>> {
    return async (values): Promise<SubmitHandlerResult<T>> => {
        try {
            await fn(values)

            return {
                valid: true,
                values,
                errors: undefined,
            }
        } catch (error: any) {
            console.error('Validation error:', error)

            return {
                valid: false,
                values: undefined,
                errors: {
                    _form: error?.message ?? 'Unknown error',
                },
            }
        }
    }
}
