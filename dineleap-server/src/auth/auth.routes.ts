import {createRoute, z} from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {jsonContent, jsonContentRequired} from "stoker/openapi/helpers";
import {selectOrgSchema,selectUserSchema,insertUserSchema} from "@/db/schema";
import type {message, token} from "@/lib/types";
import {createMessageObjectSchema} from "stoker/openapi/schemas";

const tags = ['Tasks']
const login = createRoute({
    path: '/login',
    method: 'get',
    tags: tags,
    request: {
        body: jsonContentRequired(selectUserSchema,'The login details'),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("error")
        ,"Token"),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(createMessageObjectSchema("error")
        ,
            "Invalid credentials"),

       [HttpStatusCodes.FORBIDDEN]: jsonContent(createMessageObjectSchema("error"),'user not found')

    }
})
const register = createRoute({
    path: '/register',
    method: 'post',
    request: {
        body: jsonContentRequired(insertUserSchema,'The Registration details'),
    },
    tags: tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectUserSchema
        ,"Created task")
    }
})
export type LoginRoute = typeof login
export type RegisterRoute = typeof register
export {login, register}