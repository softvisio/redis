import os from "os";
import fs from "fs";
import child_process from "child_process";
import env from "#core/env";

const BASE_DIR = os.platform() === "win32" ? process.env.LOCALAPPDATA + "/redis" : "/var/lib/redis";
const CONFIG_PATH = BASE_DIR + "/redis.conf";

export default class Redis {
    #proc;

    async run () {
        if ( !fs.existsSync( BASE_DIR ) ) fs.mkdirSync( BASE_DIR, { "recursive": true } );

        const config = env.readConfig( "production" );

        if ( !config.config ) throw `Redis config not found`;

        fs.writeFileSync( CONFIG_PATH, config.config );

        // run server
        this.#proc = child_process.spawn( "redis-server",
            [

                //
                CONFIG_PATH,
                "--bind 0.0.0.0",
                "--daemonize no",
                "--dir " + BASE_DIR,
            ],
            { "stdio": "inherit", "detached": true } );

        this.#proc.on( "exit", () => process.exit() );

        console.log( `Redis started` );
    }
}
