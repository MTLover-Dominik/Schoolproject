import * as get from "./frontend/api/get.js";
import { navigate } from "./frontend/functions/navigateFunction.js";

let showAllCustomers = document.getElementById("showAllCustomers");
let customerList = document.getElementById("customerList");
let showAllArticles = document.getElementById("showAllArticles");
let articleList = document.getElementById("articleList");

// Funktion, die bei Klick auf den Button die API aufruft
showAllCustomers.addEventListener('click', async function() {
    await get.allCustomers(customerList);
});

showAllArticles.addEventListener('click', async function() {
   await get.allArticles(articleList);
});



document.addEventListener("DOMContentLoaded", async () => {
    console.log("try to get session data from server");
    try {
        const promise = await fetch('/api/dashboard')
            .then(response => {
                if (response.ok) {
                    return response.json(); // Rückgabe eines neuen Promises mit JSON-Daten
                } else {
                    throw new Error('Fehler beim Abrufen der Daten');
                }
            }).then(employee => {
                    console.log(employee); // Hier sind die fertigen Daten
                    document.getElementById('caption').innerHTML = `Willkommen zurück, ${employee.Name}`
                }).catch(error => {
                    console.error(error);
                    window.alert(`Keine Zugangsdaten vorhanden!\nZurück zum Login in 3 Sekunden`)
                    navigate('/', 1000);
                });
    } catch (error) {
        console.log("data could not be fetched! " + error);
    }
});

document.getElementById('headerIcon').addEventListener('click', () => {
    console.log("Icon was clicked");
    navigate('/');
});

