import type { InsertUser, SelectUser } from "../db/schema"
import type { ServiceResponse } from "../types/ServiceResponse.type"

export interface IUserService {
    insertUser: (data: InsertUser) => Promise<ServiceResponse<SelectUser>>
    selectUserById: (id: SelectUser['id']) => Promise<ServiceResponse<SelectUser>>
}