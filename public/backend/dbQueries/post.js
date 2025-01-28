export async function patient(db, req, res, data) {
    let connection;
    try {
        const sql = `INSERT INTO patient (patientNr, name, vorname, strasse, plz, ort) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            parseInt(data.patientID),
            data.surname,
            data.name,
            data.street,
            data.postalcode,
            data.city
        ];

        const [results] = await db.query(sql, values)
        res.status(201).json(results);
    } catch (error) {
        console.error('Datenbankfehler:', error);
        res.status(500).send('Fehler bei der Verbindung zur Datenbank');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}