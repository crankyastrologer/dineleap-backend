import bcrypt from "bcryptjs";
import {sign} from "hono/jwt";



export async function getToken(id:number,db_pass:string, pass:string){
    if(!(await bcrypt.compare(pass,db_pass))){
        return false

    }
    const token = await sign({id},"hello_world")
    return token

}
