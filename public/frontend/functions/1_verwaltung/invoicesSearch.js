import * as Select from "./selectsPatientSearch.js";

export function invoicesSearch (htmlElement) {
    
    const cardSeparator1 = document.createElement('hr');
    const cardSeparator2 = document.createElement('hr');
    const selectOptions = document.createElement('div');
    const inputFields = document.createElement('div');
    const searchBreak = document.createElement('br');
    const searchButton = document.createElement('div');
    
    const labelRadioInvoiceMedical = document.createElement('label');
    const radioInvoiceMedical = document.createElement('input');
    const labelInputPatientId = document.createElement('label');
    const inputPatientId = document.createElement('input');

    const labelRadioInvoiceExtra = document.createElement('label');
    const radioInvoiceExtra = document.createElement('input');

    radioInvoiceMedical.type = "radio";
    radioInvoiceMedical.name = "invoiceType";
    radioInvoiceMedical.id = "medical";
    labelRadioInvoiceMedical.innerHTML = "Medizinische Leistungen";
    labelRadioInvoiceMedical.setAttribute('for', 'medical');

    radioInvoiceExtra.type = "radio";
    radioInvoiceExtra.name = "invoiceType";
    radioInvoiceExtra.id = "extra";
    labelRadioInvoiceExtra.innerHTML = "Zusatzleistungen";
    labelRadioInvoiceExtra.setAttribute('for', 'extra');
    
    labelInputPatientId.innerHTML = "Patienten-ID: ";
    labelInputPatientId.setAttribute('for', 'inputPatientId');
    inputPatientId.id = "patientId";
    inputPatientId.type = "number";

    searchBreak.id = 'searchBreak';
    searchButton.id = 'searchPatientsInvoices';
    searchButton.classList.add('searchButton');
    searchButton.textContent = "Suchen";
    
    searchBreak.setAttribute("display", "hidden");
    searchButton.setAttribute("display", "hidden");
    
    htmlElement.appendChild(cardSeparator1);
    htmlElement.appendChild(selectOptions);
    selectOptions.appendChild(radioInvoiceMedical);
    selectOptions.appendChild(labelRadioInvoiceMedical);
    selectOptions.appendChild(radioInvoiceExtra);
    selectOptions.appendChild(labelRadioInvoiceExtra);
    htmlElement.appendChild(document.createElement('br'));
    htmlElement.appendChild(inputFields);
    htmlElement.appendChild(searchBreak);
    htmlElement.appendChild(searchButton);

    const invoiceType = document.querySelectorAll('[name="invoiceType"]');
    invoiceType.forEach(radio => {
        radio.addEventListener('change', e => {
            if (e.target.id === "medical") {
                while (inputFields.firstChild) {
                    inputFields.removeChild(inputFields.firstChild);
                }
                inputFields.appendChild(labelInputPatientId);
                inputFields.appendChild(inputPatientId);
            } else if (e.target.id === "extra") {
                while (inputFields.firstChild) {
                    inputFields.removeChild(inputFields.firstChild);
                }
                inputFields.appendChild(labelInputPatientId);
                inputFields.appendChild(inputPatientId);
            } else {
                console.error("Something went wrong");
            }
            searchBreak.style.display = "block";
            searchButton.style.display = "block";
        });
    });
    
    //todo patientnr, leistungsnummer mdleistung | patientnr, leistung zusatzleistung
    
    htmlElement.appendChild(cardSeparator2);
}