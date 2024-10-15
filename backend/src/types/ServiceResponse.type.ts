export type ServiceResponseStatus = 'CREATED' | 'OK' | 'NOT_FOUND' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR'

export type ServiceResponse<T> = {
    data?: T,
    message: ServiceResponseStatus
}