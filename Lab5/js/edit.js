let currentCards = []

function enableEditing(cards) {
    currentCards = cards
    const main = document.querySelector('main')

    main.addEventListener('click', (e) => {
        if (e.target.closest('.add-card')) return
        if (e.target.closest('.delete-btn')) return

        const cardEl = e.target.closest('.card')
        if (!cardEl) return

        openModal(cardEl.dataset.index)
    })
}

function openModal(index) {
    const card = currentCards[index]
    const modal = document.getElementById('modal')
    const modalBody = document.getElementById('modal-body')

    modalBody.innerHTML = ''

    modalBody.append(
        createField('Название', 'name', card.name),
        createField('Описание', 'description', card.description),
        createField('Изображение', 'image', card.image, true)
    )

    if (card.type === 'Monster') {
        modalBody.append(
            createField('Уровень', 'level', card.level),
            createField('Непотребство', 'obscenity', card.obscenity),
            createField('Сокровища', 'riches', card.riches)
        )
    } else if (card.type === 'Clothes') {
        modalBody.append(
            createField('Бонус', 'bonus', card.bonus),
            createField('Руки', 'busy_hands', card.busy_hands),
            createField('Стоимость', 'cost', card.cost)
        )
    } else if (card.type === 'Race') {
        modalBody.append(createField('Способность', 'ability', card.ability))
    } else if (card.type === 'Helper') {
        modalBody.append(createField('Бонус', 'bonus', card.bonus))
    } else if (card.type === 'Potion') {
        modalBody.append(
            createField('Бонус', 'bonus', card.bonus),
            createField('Длительность', 'duration', card.duration),
            createField('Стоимость', 'cost', card.cost)
        )
    } else if (card.type === 'Event') {
        modalBody.append(createField('Эффект', 'effect', card.effect))
    }

    const buttons = document.createElement('div')
    buttons.className = 'modal-buttons'

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Сохранить'
    saveBtn.className = 'btn-save'
    saveBtn.addEventListener('click', () => saveCard(index))

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Удалить'
    deleteBtn.className = 'btn-delete'
    deleteBtn.addEventListener('click', () => {
        deleteCard(index)
        closeModal()
    })

    buttons.append(saveBtn, deleteBtn)
    modalBody.append(buttons)

    modal.showModal()
}

function createField(label, field, value, isFile = false) {
    const wrapper = document.createElement('div')
    wrapper.className = 'form-group'

    const labelEl = document.createElement('label')
    labelEl.textContent = label

    if (isFile) {
        const preview = document.createElement('img')
        preview.src = value
        preview.style.width = '100%'
        preview.style.height = '80px'
        preview.style.objectFit = 'contain'

        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.dataset.field = field
        input.dataset.currentValue = value

        input.addEventListener('change', () => {
            const reader = new FileReader()
            reader.onload = (e) => {
                preview.src = e.target.result
                input.dataset.currentValue = e.target.result
            }
            reader.readAsDataURL(input.files[0])
        })

        wrapper.append(labelEl, preview, input)
        return wrapper
    }

    const input = document.createElement('input')
    input.type = 'text'
    input.value = value
    input.dataset.field = field

    wrapper.append(labelEl, input)
    return wrapper
}

function saveCard(index) {
    const card = currentCards[index]
    const inputs = document.querySelectorAll('#modal-body input')

    inputs.forEach(input => {
        const field = input.dataset.field
        if (input.type === 'file') {
            card[field] = input.dataset.currentValue
        } else {
            card[field] = input.value
        }
    })

    saveToStorage(currentCards)
    buildPage(currentCards)
    closeModal()
}

function closeModal() {
    document.getElementById('modal').close()
}

function deleteCard(index) {
    currentCards.splice(index, 1)
    saveToStorage(currentCards)
    buildPage(currentCards)
}

function openAddModal() {
    const modal = document.getElementById('modal')
    const modalBody = document.getElementById('modal-body')

    modalBody.innerHTML = ''

    // выбор типа карты
    const typeGroup = document.createElement('div')
    typeGroup.className = 'form-group'

    const typeLabel = document.createElement('label')
    typeLabel.textContent = 'Тип карты'

    const typeSelect = document.createElement('select')
    typeSelect.id = 'card-type-select'

    const types = ['Monster', 'Clothes', 'Race', 'Helper', 'Potion', 'Event']
    types.forEach(t => {
        const option = document.createElement('option')
        option.value = t
        option.textContent = t
        typeSelect.append(option)
    })

    typeGroup.append(typeLabel, typeSelect)
    modalBody.append(typeGroup)

    // общие поля
    const commonFields = document.createElement('div')
    commonFields.id = 'common-fields'
    commonFields.append(
        createField('Название', 'name', ''),
        createField('Описание', 'description', ''),
        createField('Изображение', 'image', '', true)
    )
    modalBody.append(commonFields)

    // уникальные поля — меняются при смене типа
    const uniqueFields = document.createElement('div')
    uniqueFields.id = 'unique-fields'
    modalBody.append(uniqueFields)

    // при смене типа меняем уникальные поля
    typeSelect.addEventListener('change', () => {
        renderUniqueFields(typeSelect.value)
    })

    // сразу показываем поля для первого типа
    renderUniqueFields('Monster')

    const buttons = document.createElement('div')
    buttons.className = 'modal-buttons'

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Создать'
    saveBtn.className = 'btn-save'
    saveBtn.addEventListener('click', () => saveNewCard())

    buttons.append(saveBtn)
    modalBody.append(buttons)

    modal.showModal()
}

function renderUniqueFields(type) {
    const uniqueFields = document.getElementById('unique-fields')
    uniqueFields.innerHTML = ''

    if (type === 'Monster') {
        uniqueFields.append(
            createField('Уровень', 'level', ''),
            createField('Непотребство', 'obscenity', ''),
            createField('Сокровища', 'riches', '')
        )
    } else if (type === 'Clothes') {
        uniqueFields.append(
            createField('Бонус', 'bonus', ''),
            createField('Руки', 'busy_hands', ''),
            createField('Стоимость', 'cost', '')
        )
    } else if (type === 'Race') {
        uniqueFields.append(createField('Способность', 'ability', ''))
    } else if (type === 'Helper') {
        uniqueFields.append(createField('Бонус', 'bonus', ''))
    } else if (type === 'Potion') {
        uniqueFields.append(
            createField('Бонус', 'bonus', ''),
            createField('Стоимость', 'cost', '')
        )
    } else if (type === 'Event') {
        uniqueFields.append(createField('Эффект', 'effect', ''))
    }
}

function saveNewCard() {
    const type = document.getElementById('card-type-select').value
    const inputs = document.querySelectorAll('#modal-body input[type="text"]')
    const fileInput = document.querySelector('#modal-body input[type="file"]')

    const values = {}
    inputs.forEach(input => {
        values[input.dataset.field] = input.value
    })
    values['image'] = fileInput.dataset.currentValue || ''

    let card
    if (type === 'Monster') {
        card = new Monster(values.name, values.description, values.image, values.level, values.obscenity, values.riches)
    } else if (type === 'Clothes') {
        card = new Clothes(values.name, values.description, values.image, values.bonus, values.busy_hands, values.cost)
    } else if (type === 'Race') {
        card = new Race(values.name, values.description, values.image, values.ability)
    } else if (type === 'Helper') {
        card = new Helper(values.name, values.description, values.image, values.bonus)
    } else if (type === 'Potion') {
        card = new Potion(values.name, values.description, values.image, values.bonus, values.cost)
    } else if (type === 'Event') {
        card = new Event(values.name, values.description, values.image, values.effect)
    }

    currentCards.push(card)
    saveToStorage(currentCards)
    buildPage(currentCards)
    closeModal()
}