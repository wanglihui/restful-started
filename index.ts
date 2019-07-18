import { scannerDecoration , groups} from 'ts-express-restful';
import express from 'express';
import { registerControllerToRouter } from 'ts-express-restful';
import * as http from 'http';
import db, { IDatabaseOptions } from './db';

type PORT = number | string

export interface IRouteOptions { 
    scannerDir?: string;
    urlPrefix?: string;
}

export interface IServerOptions { 
    listen?: PORT;
}

const DEFAULT_OPTIONS = {
    scannerDir: process.cwd(),
    urlPrefix: '',
}

const SERVER_OPTIONS = {
    listen: 5000,
}

export class RestfulServer { 

    app = express()

    configRoute(options?: IRouteOptions) {
        options = Object.assign(DEFAULT_OPTIONS, options);
        scannerDecoration(options.scannerDir as string, [/node_modules/, /\.d.ts$/, /\.map\.js$/]);
        let _groups: (string|boolean)[] = [...groups, false];
        for (let group of _groups) {
            const route = express.Router();
            registerControllerToRouter(route, { group: group as string, isShowUrls: true, swagger: true });
            if (group) {
                this.app.use(`/${group}`, route);
            } else { 
                //如果group 为false，直接挂在到 "/"
                this.app.use('/', route);
            }
        }
        return this;
    }

    configDb(options?: IDatabaseOptions) { 
        if (!options) { 
            return this;
        }
        db.config(options);
        return this;
    }

    async start(options?: IServerOptions) {
        await db.dbInit();
        options = Object.assign(SERVER_OPTIONS, options);
        const server = http.createServer(this.app);
        server.on('listening', function () {
            console.log(`SERVER HAS STARTED ON ${options!.listen}`);
        })
        server.listen(options.listen);
    }
}

const restfulServer = new RestfulServer();
export default restfulServer;