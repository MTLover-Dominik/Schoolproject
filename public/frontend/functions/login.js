import * as get from "../api/get.js";

let usertype = document.getElementById("usertype");
let registerButton = document.getElementById('register');
let loginButton = document.getElementById('loginButton');
let currentUserType;
let employeeData;

usertype.addEventListener('change', event => {
    currentUserType = usertype.value;
    let loginButtons = document.getElementsByClassName('buttons');
    switch (currentUserType) {
        case "patient":
            document.getElementById("patientLogin").style.display = "block";
            document.getElementById("patientname").required = true;
            document.getElementById("patientsurname").required = true;
            document.getElementById("birthday").required = true;
            document.getElementById("employeeLogin").style.display = "none";
            document.getElementById("employeenr").required = false;
            loginButtons[1].style.display = "block";
            break;
        default:
            document.getElementById("patientLogin").style.display = "none";
            document.getElementById("patientname").required = false;
            document.getElementById("patientsurname").required = false;
            document.getElementById("birthday").required = false;
            document.getElementById("employeeLogin").style.display = "block";
            document.getElementById("employeenr").required = true;
            loginButtons[1].style.display = "block";
            break;
    }
});

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    return handleLogin(currentUserType);
});

async function handleLogin(usertype) {
    const form = document.getElementById("login");
    // Überprüfe, ob das Formular die HTML-Validierungsanforderungen erfüllt
    if (form.checkValidity()) {
        if (usertype === "arzt") {
            let employeeID = document.getElementById("employeenr").value;
            employeeData = await get.doctor(employeeID);
            if (employeeData !== undefined) {
                window.location.href = '/dashboard';
            } else {
                window.alert("Fehler: die angegebenen Daten sind nicht gültig");
            }
        } else if (usertype === "arzthelfer" || usertype === "verwaltung") {
            let employeeID = document.getElementById("employeenr").value;
            try {
                employeeData = await get.employee(employeeID);
                if (employeeData !== undefined) {
                    window.location.href = '/dashboard';
                } else {
                    window.alert("Fehler: die angegebenen Daten sind nicht gültig");
                }
            } catch (error) {
                console.log("fehler ist aufgetreten: " + error);
            }
            
        }
        // Hier kannst du das machen, was du möchtest, z.B. Daten verarbeiten oder an eine API senden
        //TODO add check for "username" and "password"
        //checkCredentials(username, password);
        //TODO create file in "apiFunctions" to process data and check them
        
    } else {
        // Wenn das Formular nicht valide ist, wird die Standard-HTML-Validierung ausgeführt
        form.reportValidity(); // Zeigt die Standard-Hinweise an
    }
    
}