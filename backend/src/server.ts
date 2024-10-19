import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { MailService } from "./services/Mail.service";
import { genTemporaryCode } from "./lib/utils";
import UserRoute from "./routes/User.route";

export default class Server {
    private app: FastifyInstance
    private port: number

    public constructor(app: FastifyInstance, port: number) {
        this.app = app;
        this.port = port;

        this.app.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                const { email } = req.body as any;

                if (!email) {
                    return reply.send({
                        message: 'Email é obrigatório!'
                    }).code(401)
                }

                const mailling = new MailService();
                const randomCode = genTemporaryCode();
                const mailOptions = {
                    from: 'araujodgdev@gmail.com',
                    to: email,
                    subject: 'Seu código de verificação',
                    text: `Olá, seu código de verificação é ${randomCode}`
                }

                const result = await mailling.sendVerificationCode(mailOptions)

                reply.send({
                    message: result
                }).code(200)
            } catch (error) {
                reply.send({
                    error
                })
            }
        })

        this.registerRoutes()
    }

    public start(): void {
        try {
            this.app.listen({
                port: this.port
            })
            console.log("Server running on port: " + this.port)
        } catch (error) {
            console.log(error)
        }
    }

    public registerRoutes() {
        const userRoutes = new UserRoute();
        this.app.register(userRoutes.createUser, {prefix: '/api'})
        this.app.register(userRoutes.getUserById, {prefix: '/api'})
    }
}