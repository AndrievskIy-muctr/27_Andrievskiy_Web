document.addEventListener('DOMContentLoaded', () => {
    const cards = loadFromStorage() || defaultCards
    saveToStorage(cards)
    buildShell()
    buildPage(cards)
    enableEditing(cards)
    document.getElementById('modal-close').addEventListener('click', closeModal)
})