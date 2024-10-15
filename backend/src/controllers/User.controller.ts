import type { IUserService } from "../services/User.service";

export class UserController {
    private userService: IUserService;

    public constructor(userService: IUserService) {
        this.userService = userService
    }
}