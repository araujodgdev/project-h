import fastify from "fastify";
import Server from "./server";

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const server = new Server(fastify(), Number(SERVER_PORT));

server.start()