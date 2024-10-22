import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/Auth.service";

export default class AuthController {
    private authService: AuthService;

    public constructor() {
        this.authService = new AuthService();
     }

    public async requestCode(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { email } = req.body as any;

            if (!email) {
                return reply.send({
                    message: 'Email é obrigatório!'
                }).code(401)
            }

            await this.authService.sendVerificationCode(email);

            reply.send({
                message: 'Código enviado com sucesso!'
            }).code(200)
        } catch (error: any) {
            reply.send({ message: error.message }).code(500)
        }
    }
}