import * as Post from "../../api/post.js";

export function createPatient(htmlElement) {
    const cardSeparator1 = document.createElement('hr');
    const cardSeparator2 = document.createElement('hr');
    const searchButton = document.createElement('div');
    
    //Überschrift
    const headline = document.createElement('h3');
    headline.innerText = "Bitte Patientendaten angeben";
    
    //Patienten Daten - Eingabe
    const patientNumberLabel = document.createElement('label');
    const patientNumberInput = document.createElement('input');
    patientNumberLabel.innerHTML = "Patienten-Nr.:  "
    patientNumberLabel.setAttribute('for', 'patientNumber');
    patientNumberInput.type = "text";
    patientNumberInput.id = "patientNumber";

    const patientSurnameLabel = document.createElement('label');
    const patientSurnameInput = document.createElement('input');
    patientSurnameLabel.innerHTML = "Nachname:  ";
    patientSurnameLabel.setAttribute('for', 'patientSurname');
    patientSurnameInput.type = "text";
    patientSurnameInput.id = "patientSurname";
    
    const patientNameLabel = document.createElement('label');
    const patientNameInput = document.createElement('input');
    patientNameLabel.innerHTML = "Vorname:  "
    patientNameLabel.setAttribute('for', 'patientName');
    patientNameInput.type = "text";
    patientNameInput.id = "patientName";
    
    const patientStreetLabel = document.createElement('label');
    const patientStreetInput = document.createElement('input');
    patientStreetLabel.innerHTML = "Straße:  ";
    patientStreetLabel.setAttribute('for', 'patientStreet');
    patientStreetInput.type = "text";
    patientStreetInput.id = "patientStreet";
    
    const patientPostalCodeLabel = document.createElement('label');
    const patientPostalCodeInput = document.createElement('input');
    patientPostalCodeLabel.innerHTML = "PLZ: ";
    patientPostalCodeInput.setAttribute('for', 'patientPostalCode');
    patientPostalCodeInput.type = "text";
    patientPostalCodeInput.id = "patientPostalCode";
    
    const patientCityLabel = document.createElement('label');
    const patientCityInput = document.createElement('input');
    patientCityLabel.innerHTML = "Ort: ";
    patientCityLabel.setAttribute('for', 'patientCity');
    patientCityInput.type = "text";
    patientCityInput.id = "patientCity";
    
    //Anlegen Button
    searchButton.id = 'createPatientButton';
    searchButton.classList.add('searchButton');
    searchButton.textContent = "Anlegen";
    searchButton.setAttribute("display", "hidden");

    //Seitenaufbau
    const patientData = document.createElement('div');
    patientData.classList.add('patientDataItem');

    htmlElement.appendChild(cardSeparator1);
    htmlElement.appendChild(headline);
    htmlElement.appendChild(patientData);
    patientData.appendChild(patientNumberLabel);
    patientData.appendChild(patientNumberInput);
    patientData.appendChild(patientSurnameLabel);
    patientData.appendChild(patientSurnameInput);
    patientData.appendChild(document.createElement('br'));
    patientData.appendChild(document.createElement('br'));
    patientData.appendChild(patientNameLabel);
    patientData.appendChild(patientNameInput);
    patientData.appendChild(patientStreetLabel);
    patientData.appendChild(patientStreetInput);
    patientData.appendChild(document.createElement('br'));
    patientData.appendChild(document.createElement('br'));
    patientData.appendChild(patientPostalCodeLabel);
    patientData.appendChild(patientPostalCodeInput);
    patientData.appendChild(patientCityLabel);
    patientData.appendChild(patientCityInput);
    htmlElement.appendChild(document.createElement('br'));
    
    htmlElement.appendChild(searchButton);


    htmlElement.appendChild(cardSeparator2);
    searchButton.addEventListener('click', () => {
        let patientData = {
            patientID: patientNumberInput.value,
            surname: patientSurnameInput.value,
            name: patientNameInput.value,
            street: patientStreetInput.value,
            postalcode: patientPostalCodeInput.value,
            city: patientCityInput.value
        }
        return Post.createPatient(patientData);
    });
}