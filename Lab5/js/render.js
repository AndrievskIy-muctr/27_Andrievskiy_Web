function buildPage(cards) {
    const main = document.querySelector('main')
    main.innerHTML = ''

    cards.forEach((card, index) => {
        const cardEl = card.toHTML()
        cardEl.dataset.index = index
        main.append(cardEl)
    })

    const addBtn = document.createElement('div')
    addBtn.className = 'card add-card'
    addBtn.innerHTML = `
        <span>+</span>
        <p>Создать новую карту</p>
    `
    addBtn.addEventListener('click', () => openAddModal())
    main.append(addBtn)
}