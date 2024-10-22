import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import AuthController from "../controllers/Auth.controller";

export default class AuthRoute {
    private authController: AuthController;

    public constructor() {
        this.authController = new AuthController();
    }

    public requestCode: FastifyPluginAsync = async (app: FastifyInstance) => {
        app.post('/auth/request-code', this.authController.requestCode.bind(this.authController));
    } 
}