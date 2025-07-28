export type SubmitHandlerResult<T> =
    | {
        values: T
        errors: undefined
        valid: true
    }
    | {
        values: undefined
        errors: Partial<Record<keyof T | '_form', string | undefined>>
        valid: false
    }
