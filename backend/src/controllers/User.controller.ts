import type { FastifyReply, FastifyRequest } from "fastify";
import type { IUserService } from "../interfaces/User.interface";
import type { InsertUser } from "../db/schema";
import { mapHttpStatus } from "../lib/utils";

export class UserController {
    private userService: IUserService;

    public constructor(userService: IUserService) {
        this.userService = userService
    }
    
    public async registerUser(req: FastifyRequest, reply: FastifyReply): Promise<any> {
        try {
            const newUser = req.body as InsertUser;
            const {data, message} = await this.userService.insertUser(newUser);

            return reply.code(mapHttpStatus(message)).send(data)
            
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    public async getUserById(req: FastifyRequest, reply: FastifyReply): Promise<any> {
        try {
            const { id } = req.params as any;
            const {data, message} = await this.userService.selectUserById(id);

            return reply.code(mapHttpStatus(message)).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }

    public async getUserByEmail(req: FastifyRequest, reply: FastifyReply): Promise<any> {
        try {
            const { email } = req.body as any;
            const {data, message} = await this.userService.selectUserByEmail(email);

            if (message === 'NOT_FOUND') {
                return reply.code(mapHttpStatus(message)).send({ message: 'Usuário não encontrado!' })
            }

            return reply.code(mapHttpStatus(message)).send(data)
        } catch (error) {
            reply.code(500).send(error)
        }
    }
}