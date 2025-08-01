// utils/handleApiError.ts
import { showError } from '@/lib/toast'
type ApiError = {
    response?: {
        data?: {
            message?: string
        }
    }
    message?: string
}

export function handleApiError(error: unknown): string {
    let message = 'An unknown error occurred'

    if (typeof error === 'string') {
        message = error
    } else if (error instanceof Error) {
        message = error.message
    } else if (isApiError(error)) {
        message = error.response?.data?.message || error.message || message
    }

    showError(message)
    return message
}

function isApiError(error: unknown): error is ApiError {
    return error !== null && typeof error === 'object' && ('response' in error || 'message' in error)
}