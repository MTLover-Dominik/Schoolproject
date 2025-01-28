export async function createPatient(patientData) {
    try {
        const response = await fetch(`/api/patients/${patientData.patientID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });
        if (response.ok) {
            const patients = await response.json();
            return console.log(JSON.stringify(patients, null, 2));
        }
        const status = response.status;
        const text = response.statusText;
        console.log(status + " " + text);
    } catch (error) {
        console.error('Fehler:' + error);
    }
}