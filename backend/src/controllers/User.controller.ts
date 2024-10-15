import type { IUserService } from "../interfaces/User.interfaces";

export class UserController {
    private userService: IUserService;

    public constructor(userService: IUserService) {
        this.userService = userService
    }
}