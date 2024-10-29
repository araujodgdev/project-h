import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { UserController } from "../controllers/User.controller";
import { UserService } from "../services/User.service";
import { db } from "../db";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";

export default class UserRoute {
    private userController: UserController;
    private userService: UserService;
    private db: PostgresJsDatabase;

    public constructor() {
        this.db = db;
        this.userService = new UserService(this.db);
        this.userController = new UserController(this.userService);
    }

    public createUser: FastifyPluginAsync = async (fastify: FastifyInstance) => {
        fastify.post('/user', this.userController.registerUser.bind(this.userController));
    }

    public getUserById: FastifyPluginAsync = async (fastify: FastifyInstance) => {
        fastify.get('/user/:id', this.userController.getUserById.bind(this.userController));
    }

    public getUserByEmail: FastifyPluginAsync = async (fastify: FastifyInstance) => {
        fastify.get('/user/email', this.userController.getUserByEmail.bind(this.userController));
    }
}