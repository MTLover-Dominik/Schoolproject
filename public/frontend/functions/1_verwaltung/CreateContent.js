import * as Select from "./selectsPatientSearch.js";
import * as Get from "../../api/get.js";
import { showAllPatientsError } from "../_general/showAllPatients.js";
import { getSearchPatientsBy } from "../searchPatientsBy.js";
import { invoicesSearch } from "./invoicesSearch.js";
import { clearSelection } from "../clearSelection.js";
import { createPatient } from "./createPatient.js";
    
export function CreateContent(content) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    
    //Allgemeine ausgabe
    const additionalContainer = document.createElement('div');
    additionalContainer.classList.add('interactionMenu');

    //Patienten-Rechnungen anzeigen
    const cardArea1 = document.createElement('div');
    const patientsInvoice = document.createElement('button');
    cardArea1.classList.add('cardAreaWithoutOptions');
    cardArea1.classList.add('cardContainerItem');
    patientsInvoice.id = 'showPatientsInvoiceButton';
    patientsInvoice.classList.add('card');
    patientsInvoice.classList.add('cardWithoutSelection');
    patientsInvoice.textContent = "Rechnungen anzeigen";
    
    //Patienten anzeigen
    const cardArea2 = document.createElement('div');
    const patientsCard = document.createElement('button');
    cardArea2.classList.add('cardContainerItem');
    patientsCard.id = 'showPatientsButton';
    patientsCard.classList.add('card');
    patientsCard.textContent = "Patienten anzeigen";
    
    //Patient anlegen
    const cardArea3 = document.createElement('div');
    const patientsCreate = document.createElement('button');
    cardArea3.classList.add('cardAreaWithoutOptions');
    cardArea3.classList.add('cardContainerItem');
    patientsCreate.id = 'createPatient';
    patientsCreate.classList.add('card');
    patientsCreate.classList.add('cardWithoutSelections');
    patientsCreate.textContent = "Patient anlegen";
    
    //Patient anzeigen - Auswahl
    const patientsOption1 = document.createElement('input');
    const patientsOption2 = document.createElement('input');
    const resultPatientDataList = document.createElement('ul');
    patientsOption1.type = "radio";
    patientsOption1.name = "patientSearch";
    patientsOption1.id = "allPatients";
    patientsOption2.type = "radio";
    patientsOption2.name = "patientSearch";
    patientsOption2.id = "specificPatients";
    resultPatientDataList.id = 'patientsList';

    const patientsOption1Text = document.createElement('label');
    const patientsOption2Text = document.createElement('label');
    patientsOption1Text.innerHTML = "Alle Patienten";
    patientsOption1Text.setAttribute('for', 'allPatients')
    patientsOption2Text.innerHTML = "Bestimmter Patient";
    patientsOption2Text.setAttribute('for', 'specificPatients');
    
    //Seitenaufbau
    const patientsOptionsContainer = document.createElement('div');
    content.appendChild(cardContainer);
    content.appendChild(additionalContainer);
    content.appendChild(resultPatientDataList);
    cardContainer.appendChild(cardArea1);
    cardArea1.appendChild(patientsInvoice);
    cardContainer.appendChild(cardArea2)
    cardArea2.appendChild(patientsOptionsContainer);
    cardArea2.appendChild(document.createElement('br'));
    cardArea2.appendChild(patientsCard);
    cardContainer.appendChild(cardArea3);
    cardArea3.appendChild(patientsCreate);
    patientsOptionsContainer.appendChild(patientsOption1);
    patientsOptionsContainer.appendChild(patientsOption1Text);
    patientsOptionsContainer.appendChild(patientsOption2);
    patientsOptionsContainer.appendChild(patientsOption2Text);

    //Funktionalitäten
    //Rechnungen anzeigen
    patientsInvoice.addEventListener('click', () => {
        patientsSelection.forEach(radio =>{
            if (radio.checked) {
                radio.checked = false;
            }
        });
        clearSelection(additionalContainer)
        invoicesSearch(additionalContainer)
    })
    
    //Patient anlegen
    patientsCreate.addEventListener('click', () => {
        clearSelection(additionalContainer);
        createPatient(additionalContainer)
    })
    
    const patientsSelection = document.querySelectorAll('[name="patientSearch"]');
    let patientsSelectionResult;
    patientsSelection.forEach(radio => {
        radio.addEventListener('change', e => {
            patientsSelectionResult = Select.searchForPatients(e, additionalContainer);
        });
    });
    
    //Patienten anzeigen
    patientsCard.addEventListener("click", async e => {
        e.preventDefault();
        while (resultPatientDataList.firstChild) {
            resultPatientDataList.removeChild(resultPatientDataList.firstChild); // Entfernt das erste Kind so lange, bis keine mehr übrig sind
        }
        if (patientsSelectionResult === "allPatients") {
            if (document.getElementById('patientsList')) {
                await Get.allPatients(resultPatientDataList);
            } else {
                showAllPatientsError(resultPatientDataList);
            }
        } else if (patientsSelectionResult === "specificPatients") {
            if (document.getElementById('patientsList')) {
                let search = getSearchPatientsBy()
                if (search.searchFor === "id") {
                    await Get.patientBy(search.searchFor, document.getElementById('patientID').value, resultPatientDataList)
                } else if (search.searchFor === "name") {
                    await Get.patientBy(search.searchFor, document.getElementById('patientName').value, resultPatientDataList)
                } else if (search.searchFor === "surname") {
                    await Get.patientBy(search.searchFor, document.getElementById('patientSurname').value, resultPatientDataList)
                } else {
                    console.error("select a valid search term");
                }
                
            }
        }
    });
    

}