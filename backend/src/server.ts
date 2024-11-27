import type { FastifyInstance } from "fastify";
import UserRoute from "./routes/User.route";
import AuthRoute from "./routes/Auth.route";
import fastifyCors from "@fastify/cors";
import cors from '@fastify/cors'
import { db } from "./db";
import PostService from "./services/Posts.service";
import PostController from "./controllers/Post.controller";
import PostRoute from "./routes/Post.route";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

export default class Server {
    private app: FastifyInstance
    private port: number
    private cors: typeof fastifyCors;

    public constructor(app: FastifyInstance, port: number) {
        this.app = app;
        this.port = port;
        this.cors = cors;

        this.config();
        this.registerUserRoutes()
        this.registerAuthRoutes()
        this.registerPostRoutes()
    }

    private config(): void {
        this.app.register(this.cors, {
            origin: "*"
        });

        this.app.register(fastifySwagger, {
            openapi: {
                info: {
                    title: "Project-H API",
                    version: "1.0.0"
                }
            }
        })
        this.app.register(fastifySwaggerUi, {
            routePrefix: "/docs"
        })
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
        this.app.register(userRoutes.createUser, { prefix: '/api' })
        this.app.register(userRoutes.getUserById, { prefix: '/api' })
        this.app.register(userRoutes.getUserByEmail, { prefix: '/api' })
    }

    public registerAuthRoutes() {
        const authRoutes = new AuthRoute();
        this.app.register(authRoutes.requestCode, { prefix: '/api' })
        this.app.register(authRoutes.verifyCode, { prefix: '/api' })

    }

    public registerPostRoutes() {
        const postService = new PostService();
        const postController = new PostController(postService);
        const postRoutes = new PostRoute(postController);
        this.app.register(postRoutes.createPost, { prefix: '/api' })
        this.app.register(postRoutes.deletePost, { prefix: '/api' })
        this.app.register(postRoutes.getAllPosts, { prefix: '/api' })
    }
}