import { Sequelize } from "sequelize";
import * as fs from 'fs';
import * as path from 'path';

export class DB { 
    db!: Sequelize;
    _options !: IDatabaseOptions;
    isConfig = false;

    config(options: IDatabaseOptions) { 
        this.db = new Sequelize(options.url as string);
        this.isConfig = true;
    }

    async dbInit() {
        if (!this.isConfig) { 
            return;
        }
        if (!this.db) { 
            throw new Error("need call config before!");
        }
        let finalOptions = Object.assign(DEFAULT_DATABASE_OPTIONS, this._options);
        let files = fs.readdirSync(finalOptions.modelDir as string);
        for (let f of files) {
            if (!/\.map\.js/.test(f) && !/\.d\.ts/.test(f) && !/^_\w/.test(f)) {
                let model = require(path.resolve(finalOptions.modelDir as string, f));
                if (model.init && typeof model.init == 'function') {
                    console.debug("init ", f);
                    await model.init(this.db);
                }
            }
        }
        return this.db.sync({ force: finalOptions.force });
    }
}

export interface IDatabaseOptions { 
    modelDir?: string;
    force?: boolean;
    url?: string;
}
export const DEFAULT_DATABASE_OPTIONS ={ 
    modelDir: path.join(process.cwd(), 'model'),
    force: false,
}

const db = new DB()
export default db;