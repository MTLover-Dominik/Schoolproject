import express from 'express';
import session from 'express-session';
import fs from 'fs';
import Database from './database.js';
import check_connection from './apiTasks/task_checkDatabase.js';
import get_customer from './apiTasks/get_customer.js';
import get_articles from "./apiTasks/get_articles.js";

const app = express();
const port = 3000;

// Lade die Anmeldeinformationen aus der JSON-Datei TODO credentials anpassen
const credentials = JSON.parse(fs.readFileSync('H:/ITP/lilHecht/gui/credentials.json', 'utf8'));

// Erstelle eine Instanz der Datenbankklasse
const db = new Database(credentials);

// API-Endpoint zum Überprüfen der Datenbankverbindung
app.get('/api/check-database', async (req, res) => {
    await check_connection(db, req, res);
});

app.get('/api/get-customer', async (req, res) => {
    await get_customer(db, req, res);
});

app.get('/api/get-articles', async (req, res) => {
    await get_articles(db, req, res);
})

app.get('/api/get-employee', async (req, res) => {
    await get_employee(db, req, res);
});

// Funktion zum Abrufen eines bestimmten Mitarbeiters
async function get_employee(db, req, res) {
    const employeeId = req.query.id;
    try {
        const result = await db.query('SELECT * FROM employees WHERE id = $1', [employeeId]);
        if (result.rows.length > 0) {
            res.status(200).send(result.rows[0]);
        } else {
            res.status(404).send({ error: "Mitarbeiter nicht gefunden" });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mitarbeiters:", error);
        res.status(500).send({ error: "Fehler beim Abrufen des Mitarbeiters" });
    }
};

//TODO create endpoint for getting "username" and "password" for login process
/*app.get('/api/get-loginData', async (req, res) => {
    
});
*/

// Stelle statische Dateien im Ordner 'public' bereit
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
