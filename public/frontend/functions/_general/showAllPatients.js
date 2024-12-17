export function showAllPatients(patients, htmlList) {
    let i = 0;
    do {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div class="allDataItem"><b>Kunde ${patients[i].patientNr}</b><br>
            ${patients[i].vorname} ${patients[i].name}<br>
            ${patients[i].strasse}<br>
            ${patients[i].plz} ${patients[i].ort}</div>`;
        htmlList.appendChild(listItem);
        i++;
    } while (patients.length > i);
}

export function showAllPatientsError(htmlList) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<div class="allDataItem"><b>Fehler</b><br/>Ein Fehler ist aufgetreten</div>`;
    htmlList.appendChild(listItem);
}