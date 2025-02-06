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

export async function patients(db, req, res) {
    try {
        const result = await db.query(`SELECT * FROM patient`);
        if (result) {
            console.log(result[0]);
            res.status(200).send(result[0]);
        } else {
            res.status(404).send({ error: "Patienten nicht gefunden" });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Patienten:", error);
        res.status(500).send({ error: "Fehler beim Abrufen der Patienten" });
    }
}

export async function medicalInvoices(db, req, res, data) {
    try {
        const result = await db.query(`Select l.datum, l.patientNr, p.vorname, p.name As nachname, l.mdNummer, m.bezeichnung, m.preis, l.arztNr, a.name 
            From patient_mdLeistung As l
            Inner Join patient As p On p.patientNr = l.patientNr
            Inner Join arzt As a On a.arztNr = l.arztNr
            Inner Join mdLeistung As m On m.nummer = l.mdNummer Where l.patientNr = ${data}`);
        if (result) {
            console.log(result[0]);
            res.status(200).send(result[0]);
        } else {
            res.status(404).send({ error: "Patienten nicht gefunden" });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Patienten:", error);
        res.status(500).send({ error: "Fehler beim Abrufen der Patienten" });
    }
}

export async function patientsBy(db, req, res, searchTerm) {
    console.log("Specific patient was searched")
    try {
        let term;
        if (searchTerm === "id") { term = "patientNr"; }
        if (searchTerm === "name") { term = "vorname"; }
        if (searchTerm === "surname") { term = "name"; }
        const value = req.params.value;
        console.log(`Select * From patient Where ${term} = "${value}"`);
        let result;
        if (searchTerm === "id") {
             result = await db.query(`SELECT * FROM patient Where ${term} = ${value}`);
        } else {
            result = await db.query(`SELECT * FROM patient Where ${term} = "${value}"`);
        }
        if (result) {
            console.log(result[0]);
            res.status(200).send(result[0]);
        } else {
            res.status(404).send({ error: "Patienten nicht gefunden" });
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Patienten:", error);
        res.status(500).send({ error: "Fehler beim Abrufen der Patienten" });
    }
}
