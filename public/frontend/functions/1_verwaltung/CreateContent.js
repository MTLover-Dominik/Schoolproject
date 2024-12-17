import * as Select from "./selects.js";
import * as Get from "../../api/get.js";
import {showAllPatientsError} from "../_general/showAllPatients.js";

/*const newDiv = document.createElement('div');
newDiv.textContent = 'Ich bin ein neues Element';
newDiv.classList.add('new-class'); // Klasse hinzufügen
document.body.appendChild(newDiv);*/
    
export function CreateContent(content) {
    const cardContainer = document.createElement('div');
    const cardBreak = document.createElement('br');
    const patientsCard = document.createElement('div');
    const patientsCardText = document.createElement('p');
    const patientsOptionsContainer = document.createElement('div');
    const patientsOption1 = document.createElement('input');
    const patientsOption1Text = document.createElement('label');
    const patientsOption2 = document.createElement('input');
    const patientsOption2Text = document.createElement('label');
    const resultPatientDataList = document.createElement('ul');
    
    patientsCard.id = 'testCard';
    patientsCard.classList.add('card');
    patientsCardText.innerHTML = "Patienten anzeigen";
    
    patientsOption1.type = "radio";
    patientsOption1.name = "patientSearch";
    patientsOption1.id = "allPatients";
    patientsOption2.type = "radio";
    patientsOption2.name = "patientSearch";
    patientsOption2.id = "specificPatients";
    resultPatientDataList.id = 'patientsList';
    
    patientsOption1Text.innerHTML = "Alle Patienten";
    patientsOption1Text.setAttribute('for', 'allPatients')
    patientsOption2Text.innerHTML = "Bestimmter Patient";
    patientsOption2Text.setAttribute('for', 'specificPatients');
    
    
    content.appendChild(cardContainer);
    content.appendChild(resultPatientDataList);
    cardContainer.appendChild(patientsOptionsContainer);
    cardContainer.appendChild(cardBreak);
    cardContainer.appendChild(patientsCard);
    patientsCard.appendChild(patientsCardText);
    patientsOptionsContainer.appendChild(patientsOption1);
    patientsOptionsContainer.appendChild(patientsOption1Text);
    patientsOptionsContainer.appendChild(patientsOption2);
    patientsOptionsContainer.appendChild(patientsOption2Text);

    const patientsSelection = document.querySelectorAll('[name="patientSearch"]');
    let patientsSelectionResult;
    patientsSelection.forEach(radio => {
        radio.addEventListener('change', e => {
            patientsSelectionResult = Select.searchForPatients(e, cardContainer);
        });
    });
    
    patientsCard.addEventListener("click", async () => {
        if (patientsSelectionResult === "allPatients") {
            if (document.getElementById('patientsList')) {
                await Get.allPatients(resultPatientDataList);
            } else {
                showAllPatientsError(resultPatientDataList);
            }
        } else if (patientsSelectionResult === "specificPatients") {
            console.log("Specific patient was selected")
        }
        
        
    });

}