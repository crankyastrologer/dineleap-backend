import {LoginRoute, RegisterRoute} from "@/auth/auth.routes";
import{ AppRouteHandler} from "@/lib/types";
import db from "@/db";
import {organizations, users} from "@/db/schema";
import {setCookie} from "hono/cookie";
import {getToken} from "@/helpers/auth";
import * as HttpStatusCodes from "stoker/http-status-codes";
const list: AppRouteHandler<LoginRoute> = async (c)=>{
    console.log(c.req.json())
    const user = c.req.valid('json')
    console.log(user)
    const users = await db.query.users.findFirst({
        with:
        {
            email:user.email
        }
})

    if(!users){
      return c.json({message:'Invalid credentials'},HttpStatusCodes.UNAUTHORIZED)

    }


    const token = await getToken(users.id,users.password,user.password)

    if(!token ){
        //return c.json({message:'Invalid credentials'},HttpStatusCodes.FORBIDDEN)
    }

    setCookie(c, 'token', token, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        secure: true,
        sameSite: 'None',
        httpOnly: true,
    });

    return c.json(users,HttpStatusCodes.OK)
}
const create: AppRouteHandler<RegisterRoute> = async (c)=>{
    const user = c.req.valid("json")
    const [inserted] = await db.insert(users).values(user).returning()
    return c.json(inserted)
}
export {list,create}