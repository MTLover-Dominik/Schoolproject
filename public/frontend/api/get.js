import show_allArticles from "../functions/show_allArticles.js";
import show_allCustomers from "../functions/show_allCustomers.js";
import {showAllPatients} from "../functions/_general/showAllPatients.js";

export async function allArticles(listElement) {
    try {
        const response = await fetch('/api/get-articles');
        if (response.ok) {
            const articles = await response.json();
            show_allArticles(articles, listElement);
        } else {
            const status = await response.status;
            const text = await response.statusText;
            listElement.innerHTML = status + " " + text;
        }
    } catch (error) {
        console.error('Fehler:', error);
        document.getElementById('result').textContent = 'Fehler bei der Verbindung zur API.';
    }
}

export async function allCustomers(listElement) {
    try {
        const response = await fetch('/api/customer');

        if (response.ok) {
            const customers = await response.json();
            show_allCustomers(customers, listElement);
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