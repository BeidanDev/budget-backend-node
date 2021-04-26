const express = require('express');
const cors = require('cors');

const db = require('../db/connection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';

        // Database connection
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes of my application
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
          } catch (error) {
            console.log(error);
          }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Reading and parsing the body
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;