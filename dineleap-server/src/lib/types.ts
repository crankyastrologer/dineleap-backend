import  type {PinoLogger} from "hono-pino";
import {OpenAPIHono, RouteConfig, RouteHandler} from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
export type AppBindings = {
    Variables: {
        logger: PinoLogger;
    }
}
export type message ={
    message: z.ZodString
}
export type token ={
    data: z.ZodString
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig >  = RouteHandler<R, AppBindings>

