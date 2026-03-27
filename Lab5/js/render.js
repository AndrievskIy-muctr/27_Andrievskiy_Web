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

function buildShell() {
    document.body.insertAdjacentHTML('afterbegin', `
        <header>
            <h1>Моя колода</h1>
        </header>
        <main id="cards-container"></main>
        <footer>
            <p>Манчкин — моя колода карт</p>
        </footer>
        <dialog id="modal">
            <h2>Редактирование карты</h2>
            <div id="modal-body"></div>
            <button id="modal-close">Закрыть</button>
        </dialog>
    `)
}
