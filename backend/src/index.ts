import fastify, { type FastifyReply, type FastifyRequest } from "fastify";

const app = fastify({logger: true})

app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({message: "Hello Fastify with Bun!"})
})

app.listen({port: 3000})

