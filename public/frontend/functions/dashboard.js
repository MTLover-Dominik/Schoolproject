import * as Get from "../api/get.js";
import * as Delete from "../api/delete.js";
import { CreateContent } from "./1_verwaltung/CreateContent.js"
import { navigate } from "./navigateFunction.js";

let showAllCustomers = document.getElementById("showAllCustomers");
let customerList = document.getElementById("customerList");
let showAllArticles = document.getElementById("showAllArticles");
let articleList = document.getElementById("articleList");
let logoutButton = document.getElementById("logout");
let card = document.getElementById("testCard");
//content
let content = document.getElementById("content");

// Funktion, die bei Klick auf den Button die API aufruft



showAllCustomers.addEventListener('click', async function() {
    await Get.allCustomers(customerList);
});

showAllArticles.addEventListener('click', async function() {
   await Get.allArticles(articleList);
});

logoutButton.addEventListener("click", async function() {
    await Delete.sessionData();
    navigate('/');
})

document.addEventListener("DOMContentLoaded", async () => {
    console.log("try to get session data from server");
    try {
        const promise = await fetch(`/api/dashboard/session-data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
                if (response.ok) {
                    return response.json(); // Rückgabe eines neuen Promises mit JSON-Daten
                } else {
                    throw new Error('Fehler beim Abrufen der Daten');
                }
            }).then(employee => {
                    let gender;
                    
                    if(employee.geschlecht === "w") {
                        gender = "Frau";
                    } else {
                        gender = "Herr";
                    }
                    
                    if(employee.abteilungsID !== null) {
                        switch (employee.abteilungsID) {
                            //undefined = Arzt
                            case undefined:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen zurück, ${gender} Dr. ${employee.name}`;
                                break;
                            //ID 1 = Verwaltung
                            case 1:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen zurück, ${gender} ${employee.name}`;
                                CreateContent(content);
                                break;
                            //ID 2 = IT
                            case 2:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen zurück, ${gender} ${employee.name}`;
                                break;
                            //ID 3 = Reinigung
                            case 3:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen zurück, ${gender} ${employee.name}`;
                                break;
                            //ID 4 = Hausmeister
                            case 4:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen zurück, ${gender} ${employee.name}`;
                                break;
                            //ID 5 = Arzthelfer
                            case 5:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen zurück, ${gender} ${employee.name}`;
                                break;
                            default:
                                console.log(employee); // Hier sind die fertigen Daten
                                document.getElementById('caption').innerHTML = `Willkommen`;
                        }
                    } else {
                        console.log("Daten sind nicht vorhanden")
                    }
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

