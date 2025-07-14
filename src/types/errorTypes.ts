// utils/handleApiError.ts
import { showError } from '@/lib/toast'
export function handleApiError(error: unknown): string {
    let message = 'An unknown error occurred'

    if (error instanceof Error) {
        message = error.message
    } else if (typeof error === 'string') {
        message = error
    } else if (typeof error === 'object' && error !== null) {
        const e = error as any
        if (e.response?.data?.message) message = e.response.data.message
        else if (e.message) message = e.message
    }

    showError(message)
    return message
}
