const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });
const conectarDb = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
    } catch (error) {
        process.exit(1);
    }
}

module.exports = conectarDb;

// el navegador no soporta peticiones put y delete asique necesitamos instalar postman para poder hacerlas