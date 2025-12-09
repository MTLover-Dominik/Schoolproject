let timer = 3;

export function navigate(location, delay = 0) {
    let count = 0;

    if (delay === 0) {
        window.location.href = location;
    } else {
        console.log(`Verlassen der Seite in: ${timer}`);
        const intervalId = setInterval(async () => {
            count++;
            timer--;
            console.log(`Verlassen der Seite in: ${timer}`);
            if (count === 3) {
                clearInterval(intervalId);
                window.location.href = location;
            }
        }, delay);
    }
}