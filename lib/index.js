const os = require( "os" );
const fs = require( "fs" );
const child_process = require( "child_process" );
const env = require( "@softvisio/core/utils/env" );

const BASE_DIR = os.platform() === "win32" ? process.env.LOCALAPPDATA + "/redis" : "/var/lib/redis";
const CONFIG_PATH = BASE_DIR + "/redis.conf";

module.exports = class Redis {
    #proc;

    async run () {
        if ( !fs.existsSync( BASE_DIR ) ) fs.mkdirSync( BASE_DIR, { "recursive": true } );

        const config = env.read( "production" );

        if ( !config.redis ) throw `Redis config not found`;

        fs.writeFileSync( CONFIG_PATH, config.redis );

        // run server
        this.#proc = child_process.spawn( "redis-server",
            [

                //
                "--bind=0.0.0.0",
                "--daemonize=no",
                "--dir=" + BASE_DIR,
                "/var/lib/redis.conf",
            ],
            { "stdio": "inherit", "detached": true } );

        this.#proc.on( "exit", () => process.exit() );

        console.log( `Redis started` );
    }
};
