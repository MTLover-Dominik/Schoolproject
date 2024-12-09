function show_allCustomers(customers, htmlList) {
    let i = 0;
    do {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div class="allDataItem"><b>Kunde ${customers[i].kunnr}</b><br>
            ${customers[i].vorname} ${customers[i].name}<br>
            ${customers[i].strasse}<br>
            ${customers[i].plz} ${customers[i].ort}</div>`;
        htmlList.appendChild(listItem);
        i++;
    } while (customers.length > i);
}

export default show_allCustomers;