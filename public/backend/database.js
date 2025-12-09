import mysql from "mysql2/promise";

class Database {
    constructor(credentials) {
        this.credentials = credentials;
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: this.credentials.host,
                user: this.credentials.username,
                password: this.credentials.password,
                database: this.credentials.database,
                port: this.credentials.port,
            });
            console.log('Datenbankverbindung erfolgreich hergestellt.');
        } catch (err) {
            console.error('Fehler beim Herstellen der Datenbankverbindung:', err.message);
            throw err;
        }
    }

    async query(sql, params) {
        if (!this.connection) {
            throw new Error("Datenbankverbindung wurde noch nicht hergestellt.");
        }
        return this.connection.execute(sql, params);
    }

    async closeConnection() {
        if (this.connection) {
            await this.connection.end();
            console.log('Datenbankverbindung geschlossen.');
        }
    }
}

export default Database;
