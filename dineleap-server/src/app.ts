
import createApp from "@/lib/create-app";
import configureOpenAPI from "@/lib/configure-open-api";
import index from './routes/index.route'
import auth from './auth/auth.index'
import {jwt} from 'hono/jwt'
const app = createApp()
const routes =
[
    index,
    auth

]

configureOpenAPI(app)
routes.forEach((route)=>{
    app.route('/',route);
})
export default  app