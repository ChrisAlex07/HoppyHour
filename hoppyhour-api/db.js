const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_SERVER || '127.0.0.1',
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: false, // No cifrar para entornos locales
        trustServerCertificate: true, // Confiar en certificados para entornos locales
    },
};

// Si se proporciona el usuario y la contraseña en el archivo .env, se usa autenticación SQL
if (process.env.DB_USER && process.env.DB_PASSWORD) {
    config.user = process.env.DB_USER;
    config.password = process.env.DB_PASSWORD;
} else {
    // Si no se proporcionan credenciales, se usa autenticación de Windows
    config.options.trustedConnection = true; // Autenticación de Windows
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conexión a SQL Server establecida exitosamente');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a SQL Server:', err.message);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};
