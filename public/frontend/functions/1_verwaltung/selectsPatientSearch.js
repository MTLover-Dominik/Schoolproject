import { SearchPatientsBy } from "../searchPatientsBy.js";


export function searchForPatients (e, htmlContainer) {
    if (e.target.id === "allPatients") {
        if (document.getElementById('selectionContainer')) {
            htmlContainer.removeChild(document.getElementById('cardSeparator1'));
            htmlContainer.removeChild(document.getElementById('selectionContainer'));
            htmlContainer.removeChild(document.getElementById('cardSeparator2'));
        }
        return e.target.id;
    } else {
        while (htmlContainer.firstChild) {
            htmlContainer.removeChild(htmlContainer.firstChild);
        }
        const cardSeparator1 = document.createElement('hr');
        const cardSeparator2 = document.createElement('hr');
        const selectOptions = document.createElement('div');
        const divId = document.createElement('div');
        const radioId = document.createElement('div');
        const radioName = document.createElement('div');
        const radioSurname = document.createElement('div');
        const divBreak1 = document.createElement("div");
        const divName = document.createElement('div');
        const divBreak2 = document.createElement("div");
        const divSurname = document.createElement('div');
        const labelPatientId = document.createElement('label');
        const radioPatientId = document.createElement('input');
        const inputPatientId = document.createElement('input');
        const labelPatientName = document.createElement('label');
        const radioPatientName = document.createElement('input');
        const inputPatientName = document.createElement('input');
        const labelPatientSurname = document.createElement('label');
        const radioPatientSurname = document.createElement('input');
        const inputPatientSurname = document.createElement('input');
        
        selectOptions.id = 'selectionContainer';
        cardSeparator1.id = 'cardSeparator1';
        cardSeparator2.id = 'cardSeparator2';
        labelPatientId.innerHTML = "Patienten-ID: ";
        labelPatientId.setAttribute('for', 'radioPatientId');
        inputPatientId.id = "patientID";
        inputPatientId.type = "number";
        radioPatientId.id = "radioPatientId";
        radioPatientId.setAttribute('name', 'searchForPatientBy');
        radioPatientId.setAttribute('value', 'id');
        radioPatientId.type = "radio";
        labelPatientName.innerHTML = "Vorname des Patienten: ";
        labelPatientName.setAttribute('for', 'radioPatientName');
        inputPatientName.id = "patientName";
        inputPatientName.type = "text";
        radioPatientName.id = "radioPatientName";
        radioPatientName.setAttribute('name', 'searchForPatientBy');
        radioPatientName.setAttribute('value', 'name');
        radioPatientName.type = "radio";
        labelPatientSurname.innerHTML = "Nachname des Patienten: ";
        labelPatientSurname.setAttribute('for', 'radioPatientSurname');
        inputPatientSurname.id = "patientSurname";
        inputPatientSurname.type = "text";
        radioPatientSurname.id = "radioPatientSurname";
        radioPatientSurname.setAttribute('name', 'searchForPatientBy');
        radioPatientSurname.setAttribute('value', 'surname');
        radioPatientSurname.type = "radio";
        divBreak1.className = "breakDiv";
        divBreak2.className = "breakDiv";
        
        htmlContainer.appendChild(cardSeparator1);
        htmlContainer.appendChild(selectOptions);
        selectOptions.appendChild(divId);
        divId.appendChild(radioId);
        radioId.appendChild(radioPatientId);
        radioId.appendChild(labelPatientId);
        
        selectOptions.appendChild(divBreak1);
        selectOptions.appendChild(divName);
        divName.appendChild(radioName);
        radioName.appendChild(radioPatientName);
        radioName.appendChild(labelPatientName);
        
        
        selectOptions.appendChild(divBreak2);
        selectOptions.appendChild(divSurname);
        divSurname.appendChild(radioSurname);
        radioSurname.appendChild(radioPatientSurname);
        radioSurname.appendChild(labelPatientSurname);

        const patientSearch = document.querySelectorAll('[name="searchForPatientBy"]');
        patientSearch.forEach(radio => {
            radio.addEventListener('change', e => {
                const idField = document.getElementById('patientID');
                const nameField = document.getElementById('patientName');
                const surnameField = document.getElementById('patientSurname');
                if (e.target.value === "id") {
                    if (!idField) divId.appendChild(inputPatientId);
                    if (nameField) divName.removeChild(inputPatientName);
                    if (surnameField) divSurname.removeChild(inputPatientSurname);
                    SearchPatientsBy(e.target.value);
                } else if (e.target.value === "name") {
                    if (idField) divId.removeChild(inputPatientId);
                    if (!nameField) divName.appendChild(inputPatientName);
                    if (surnameField) divSurname.removeChild(inputPatientSurname);
                    SearchPatientsBy(e.target.value);
                } else if (e.target.value === "surname") {
                    if (idField) divId.removeChild(inputPatientId);
                    if (nameField) divName.removeChild(inputPatientName);
                    if (!surnameField) divSurname.appendChild(inputPatientSurname);
                    SearchPatientsBy(e.target.value);
                }
            });
        });
        
        inputPatientId.addEventListener("change", () => {
            console.log("value: " + inputPatientId.value);
        })
        
        htmlContainer.appendChild(cardSeparator2);
        return e.target.id;
    }
}