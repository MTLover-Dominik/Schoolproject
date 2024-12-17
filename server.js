import express from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Database from './public/backend/database.js';
import * as get from './public/backend/dbQueries/get.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statischer Ordner für Dateien
app.use(express.static(path.join(__dirname, 'public')));

// Lade die Anmeldeinformationen aus der JSON-Datei TODO credentials anpassen
const credentials = JSON.parse(fs.readFileSync('H:/ITP/lilHecht/_gui/credentials.json', 'utf8'));

// Erstelle eine Instanz der Datenbankklasse
const db = new Database(credentials);
await db.connect();

app.use(session({
    secret: 'mySecret',  // Geheime Schlüssel für die Session
    resave: false,
    saveUninitialized: true,
}));

//default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//html routes
app.get('/dashboard' , (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'views', 'dashboard.html'));
});

app.get('/dashboard', async (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'frontend', 'views', 'dashboard.html'));
})

app.get('/api/customer', async (req, res) => {
    await get.customer(db, req, res);
});

app.get('/api/get-articles', async (req, res) => {
    await get.articles(db, req, res);
})

app.get('/api/doctor/:id', async (req, res) => {
    await get.doctor(db, req, res);
});

app.get('/api/employee/:id', async (req, res) => {
    await get.employee(db, req, res);
});

app.get('/api/patients', async (req, res) => {
    await get.patients(db, req, res);
})
app.get('/api/dashboard/session-data', async (req, res) => {
    const employeeData = req.session.employeeData;
    console.log(employeeData);
    res.status(200).send(employeeData);
});


app.delete('/api/dashboard/session-data', async (req, res) => {
   req.session.employeeData = null;
   res.status(200).send({data: req.session.employeeData});
});

//TODO create endpoint for getting "username" and "password" for login process
/*app.get('/api/get-loginData', async (req, res) => {
    
});
*/

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
