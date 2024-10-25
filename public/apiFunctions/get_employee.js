async function get_employee(employeeID) {
    try {
        const response = await fetch(`/api/get-employee?id=${employeeID}`);
        if (response.ok) {
            const employeeData = await response.json();
            console.log("Mitarbeiter gefunden:", employeeData);
        } else {
            console.error("Mitarbeiter nicht gefunden oder Fehler:", response.statusText);
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mitarbeiters:", error);
    }
}

export default get_employee;