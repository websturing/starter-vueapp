// utils/toast.ts
import { push } from 'notivue'


export const showSuccess = (message: string) => {
    push.success({
        message,
        duration: 5000,
    })
}

export const showError = (message: string) => {
    push.error({
        message,
        duration: 5000,
    })
}

export const showInfo = (message: string) => {
    push.info({
        message,
        duration: 5000,
    })
}

export const showWarning = (message: string) => {
    push.warning({
        message,
        duration: 5000,
    })
}

// utils/notify.ts



export function handleApiResponse(response: any) {
    if (response?.status == true) {
        push.success({
            message: response.message || 'Operation succeeded',
        })
    } else {
        push.error({
            message: response.message || 'Something went wrong',
        })
    }
}

