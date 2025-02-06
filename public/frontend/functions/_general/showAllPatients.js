export function showAllPatients(patients, htmlList) {
    let i = 0;
    do {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div class="allDataItem"><b>Patient: ${patients[i].patientNr}</b><br>
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

export function showAllPatientInvoices(result, htmlList) {
    let i = 0;
    do {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div class="allDataItem"><b>Rechnung vom: ${result[i].datum}</b><br>
            <b>Patient ${result[i].patientNr}</b><br>
            ${result[i].vorname} ${result[i].nachname}<br>
            <b>Leistung: ${result[i].mdNummer}</b><br>
            ${result[i].bezeichnung}, Kosten: ${result[i].preis}€<br>
            <b>Arzt</b> ${result[i].name}</div>`;
        htmlList.appendChild(listItem);
        i++;
    } while (result.length > i);
}