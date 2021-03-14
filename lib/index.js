const os = require( "os" );
const fs = require( "fs" );
const child_process = require( "child_process" );

const BASE_DIR = os.platform() === "win32" ? process.env.LOCALAPPDATA + "/redis" : "/var/lib/redis";

module.exports = class Redis {
    #proc;

    async run () {
        if ( !fs.existsSync( BASE_DIR ) ) fs.mkdirSync( BASE_DIR, { "recursive": true } );

        // run server
        this.#proc = child_process.spawn( "redis-server", ["--bind", "0.0.0.0", "--dbfilename", "redis.rdb", "--dir", BASE_DIR], { "stdio": "inherit", "detached": true } );

        this.#proc.on( "exit", () => process.exit() );

        console.log( `Redis started` );
    }
};
