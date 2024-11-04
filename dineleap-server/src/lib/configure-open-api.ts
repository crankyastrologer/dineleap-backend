import {AppOpenAPI} from "@/lib/types";
import {apiReference} from "@scalar/hono-api-reference";
import packageJSON from '../../package.json'

export default function configureOpenAPI(app:AppOpenAPI) {
    app.doc('/doc',{
        openapi:'3.0.0',
        info:{
            title:'API Documentation',
            version: packageJSON.version,
        },
        servers:[
            {
                url:'http://localhost:9999'
            }
        ]
    })
    app.get('/reference',apiReference({
        spec:{
            url:'/doc'
        }

    }))
}