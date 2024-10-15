import crypto from 'crypto'
import type { ServiceResponseStatus } from '../types/ServiceResponse.type';

const genTemporaryCode = (): string => {
    return crypto.randomBytes(3).toString('hex');
}

const mapHttpStatus = (status: ServiceResponseStatus) => {
    const statusMap: Record<string, number> = {
        'OK': 200,
        'CREATED': 201,
        'NOT_FOUND': 404,
        'BAD_REQUEST': 400,
        'UNAUTHORIZED': 401,
        'FORBIDDEN': 403,
        'CONFLICT': 409,
        'INTERNAL_SERVER_ERROR': 500
    }

    return statusMap[status]
}

export {
    genTemporaryCode,
    mapHttpStatus
}
