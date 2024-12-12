export async function customer(db, req, res) {
    let connection;
    try {
        const [results] = await db.query('SELECT * FROM kunde');

        res.status(200).json(results);
    } catch (error) {
        console.error('Datenbankfehler:', error);
        res.status(500).send('Fehler bei der Verbindung zur Datenbank');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export async function articles(db, req, res) {
    let connection;
    try {
        const [results] = await db.query('SELECT * FROM artikel'); 

        res.status(200).json(results);
    } catch (error) {
        console.error('Datenbankfehler:', error);
        res.status(500).send('Fehler bei der Verbindung zur Datenbank');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export async function doctor(db, req, res) {
    const employeeId = req.params.id;
    try {
        const result = await db.query(`SELECT * FROM arzt WHERE arztNr = ${employeeId}`);
        if (result) {
            req.session.employeeData = result[0][0];

            res.status(200).send(result[0][0]);
        } else {
            res.status(404).send({ error: "Arzt nicht gefunden" });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Arztes:", error);
        res.status(500).send({ error: "Fehler beim Abrufen des Arztes" });
    }
}

export async function employee(db, req, res) {
    const employeeId = req.params.id;
    try {
        const result = await db.query(`SELECT * FROM mitarbeiter WHERE personalNr = ${employeeId}`);
        if (result) {
            req.session.employeeData = result[0][0];

            res.status(200).send(result[0][0]);
        } else {
            res.status(404).send({ error: "Mitarbeiter nicht gefunden" });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mitarbeiters:", error);
        res.status(500).send({ error: "Fehler beim Abrufen des Mitarbeiters" });
    }
}
