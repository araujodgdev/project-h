import type { FastifyInstance } from "fastify";
import UserRoute from "./routes/User.route";
import AuthRoute from "./routes/Auth.route";

export default class Server {
    private app: FastifyInstance
    private port: number

    public constructor(app: FastifyInstance, port: number) {
        this.app = app;
        this.port = port;

        
        this.registerUserRoutes()
        this.registerAuthRoutes()
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

    public registerUserRoutes() {
        const userRoutes = new UserRoute();
        this.app.register(userRoutes.createUser, {prefix: '/api'})
        this.app.register(userRoutes.getUserById, {prefix: '/api'})
    }

    public registerAuthRoutes() {
        const authRoutes = new AuthRoute();
        this.app.register(authRoutes.requestCode, {prefix: '/api'})

    }
}