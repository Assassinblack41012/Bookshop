process.env.ORA_SDTZ = 'UTC';

const fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('../../config/db');

let libPath; // [Linux]: export LD_LIBRARY_PATH=/path/to/your/instantclient_19_14:$LD_LIBRARY_PATH

if (process.platform === 'win32') {      // Windows
    libPath = 'C:\\oracle\\instantclient_19_14';
} else if (process.platform === 'darwin') {   // macOS
    libPath = process.env.HOME + '/Downloads/instantclient_19_8';
}
if (libPath && fs.existsSync(libPath)) {
    oracledb.initOracleClient({libDir: libPath});
}

let connection;

(async () => {
    connection = await oracledb.getConnection(dbConfig);
})().catch(error => {
    console.log(error)
});

const binds = {};
const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
    // extendedMetaData: true,               // get extra metadata
    // prefetchRows:     100,                // internal buffer allocation size for tuning
    // fetchArraySize:   100                 // internal buffer allocation size for tuning
};

async function getAllProducts() {
    const sql = `SELECT * FROM PRODUCT`;

    return await connection.execute(sql, binds, options);
}


module.exports = {getAllProducts}
