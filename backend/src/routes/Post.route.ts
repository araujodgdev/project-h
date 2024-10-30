import type { FastifyPluginAsync, FastifyInstance } from "fastify";
import type PostController from "../controllers/Post.controller";

export default class PostRoute {
    private postController: PostController;

    public constructor(postController: PostController) {
        this.postController = postController;
    }

    public createPost: FastifyPluginAsync = async (fastify: FastifyInstance) => {
        fastify.post('/post', this.postController.createPost.bind(this.postController));
    }

    public deletePost: FastifyPluginAsync = async (fastify: FastifyInstance) => {
        fastify.delete('/post/:id', this.postController.deletePost.bind(this.postController));
    }
}
