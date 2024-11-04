import {createRouter} from "@/lib/create-app";
import {createRoute, z} from "@hono/zod-openapi";
import {jsonContent} from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {createMessageObjectSchema} from "stoker/openapi/schemas";
const router = createRouter()
.openapi(createRoute({
    method: 'get',
    tags: ['Index'],
    path: '/',
   responses: {

       [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("error"),"Task API Index")
   }
}),(c)=>{
    return c.json({message:'Hello World'},HttpStatusCodes.OK)
    }
)

export default router;