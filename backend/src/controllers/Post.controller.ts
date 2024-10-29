import type { FastifyReply, FastifyRequest } from "fastify";
import type PostService from "../services/Posts.service";
import type { InsertPost } from "../db/schema";
import { mapHttpStatus } from "../lib/utils";

export default class PostController {
    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    public async createPost(req: FastifyRequest, reply: FastifyReply): Promise<any> {
        try {
            const newPost = req.body as InsertPost;
            const { data, message } = await this.postService.insertPost(newPost);

            return reply.code(mapHttpStatus(message)).send(data);
        } catch (error: any) {
            return reply.code(500).send(error);
        }
    }

}