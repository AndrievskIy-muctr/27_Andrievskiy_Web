document.addEventListener('DOMContentLoaded', () => {
    const cards = loadFromStorage() || defaultCards
    saveToStorage(cards)
    buildPage(cards)
    enableEditing(cards)
    document.getElementById('modal-close').addEventListener('click', closeModal)
})