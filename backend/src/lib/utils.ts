import crypto from 'crypto'

const genTemporaryCode = (): string => {
    return crypto.randomBytes(3).toString('hex');
}

export {
    genTemporaryCode
}