export async function sessionData() {
    try {
        const response = await fetch(`/api/dashboard/session-data`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Mitarbeiter nicht gefunden oder Fehler:", response.statusText);
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Mitarbeiters:", error);
    }
}