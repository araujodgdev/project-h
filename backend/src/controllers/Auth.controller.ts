import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/Auth.service";
import { UserService } from "../services/User.service";
import { db } from "../db";

export default class AuthController {
    private authService: AuthService;
    private userService: UserService;

    public constructor() {
        this.authService = new AuthService();
        this.userService = new UserService(db);
    }

    public async requestCode(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { email } = req.body as any;

            if (!email) {
                return reply.send({
                    message: 'Email é obrigatório!'
                }).code(401)
            }

            const { message } = await this.userService.selectUserByEmail(email);

            if (message === 'NOT_FOUND') {
                return reply.code(404).send({
                    message: 'Usuário não encontrado!'
                })
            } else {
                await this.authService.sendVerificationCode(email);

                reply.code(200).send({
                    message: 'Código enviado com sucesso!'
                })
            }


        } catch (error: any) {
            reply.code(500).send({ message: error.message })
        }
    }

    public async verifyCode(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { email, code } = req.body as any;

            if (!email || !code) {
                return reply.send({
                    message: 'Email e código são obrigatórios!'
                }).code(401)
            }

            const isValid = await this.authService.verifyCode(email, code);
            if (isValid) {
                reply.send({
                    isValid
                }).code(200)
            } else {
                reply.send({
                    isValid
                }).code(401)
            }
        } catch (error: any) {
            reply.send({ message: error.message }).code(500)
        }
    }
}