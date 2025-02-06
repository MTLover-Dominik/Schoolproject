import {showAllPatientInvoices, showAllPatients} from "../functions/_general/showAllPatients.js";


export async function doctor(employeeID) {
    try {
        const response = await fetch(`/api/doctor/${employeeID}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Arzt nicht gefunden oder Fehler:", response.statusText);
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Arztes:", error);
    }
}

export async function employee(employeeID) {
    try {
        const response = await fetch(`/api/employee/${employeeID}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Mitarbeiter nicht gefunden oder Fehler:", response.statusText);
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mitarbeiters:", error);
    }
}

export async function allPatients(listElement) {
    try {
        const response = await fetch('/api/patients');
        if (response.ok) { 
            const patients = await response.json(); 
            showAllPatients(patients, listElement);
        } else {
            const status = response.status;
            const text = response.statusText;
            listElement.innerHTML = status + " " + text;
        }
    } catch (error) {
        console.error('Fehler:', error);
        document.getElementById('result').textContent = 'Fehler bei der Verbindung zur API.';
    }
}

export async function patientBy(term, value, listElement) {
    try {
        const response = await fetch(`/api/patients/${term}/${value}`);
        console.log(response);
        if (response.ok) {
            const patients = await response.json();
            showAllPatients(patients, listElement);
        } else {
            const status = response.status;
            const text = response.statusText;
            listElement.innerHTML = status + " " + text;
        }
    } catch (error) {
        console.error('Fehler:' + error);
        document.getElementById('result').textContent = 'Fehler bei der Verbindung zur API.';
    }
}

export async function searchService(serviceData, listElement) {
    try {
        const response = await fetch(`/api/patients/invoices/${serviceData.patientID}/${serviceData.type}`);
        if (response.ok) {
            const invoices = await response.json();
            showAllPatientInvoices(invoices, listElement);
            return console.log(JSON.stringify(invoices, null, 2));
        }
        const status = response.status;
        const text = response.statusText;
        console.log(status + " " + text);
    } catch (error) {
        console.error('Fehler:' + error);
    }
}