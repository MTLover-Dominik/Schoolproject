export function clearSelection(selectionElement) {
    while (selectionElement.firstChild) {
        selectionElement.removeChild(selectionElement.firstChild);
    }
}