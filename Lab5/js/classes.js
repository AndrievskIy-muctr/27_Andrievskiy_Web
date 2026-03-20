class Card {
    constructor(name, description, image) {
        this.name = name
        this.description = description
        this.image = image
    }
    toHTML() {
        const div = document.createElement('div')
        div.className = 'card'
        return div
    }
}

class Monster extends Card {
    constructor(name, description, image, level, obscenity, riches) {
        super(name, description, image)
        this.type = 'Monster'
        this.level = level
        this.obscenity = obscenity
        this.riches = riches
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('monster')

        const type = document.createElement('span')
        type.textContent = 'Монстр'

        const level = document.createElement('h4')
        level.textContent = this.level

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        const obscenity = document.createElement('p')
        obscenity.textContent = `Непотребство: ${this.obscenity}`

        const riches = document.createElement('p')
        riches.textContent = `Сокровища: ${this.riches}`

        div.append(type, level, name, description, obscenity, img, riches)
        return div
    }
}

class Clothes extends Card {
    constructor(name, description, image, bonus, busy_hands, cost) {
        super(name, description, image)
        this.type = 'Clothes'
        this.bonus = bonus
        this.busy_hands = busy_hands
        this.cost = cost
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('clothes')

        const type = document.createElement('span')
        type.textContent = 'Шмотка'

        const bonus = document.createElement('h4')
        bonus.textContent = this.bonus

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        const busy_hands = document.createElement('p')
        busy_hands.textContent = `Руки: ${this.busy_hands}`

        const cost = document.createElement('p')
        cost.textContent = `Стоимость: ${this.cost} голды`

        div.append(type, bonus, name, description, img, busy_hands, cost)
        return div
    }
}

class Race extends Card {
    constructor(name, description, image, ability) {
        super(name, description, image)
        this.type = 'Race'
        this.ability = ability
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('race')

        const type = document.createElement('span')
        type.textContent = 'Раса'

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        const ability = document.createElement('p')
        ability.textContent = `Способность: ${this.ability}`

        div.append(type, name, img, description, ability)
        return div
    }
}

class Helper extends Card {
    constructor(name, description, image, bonus) {
        super(name, description, image)
        this.type = 'Helper'
        this.bonus = bonus
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('helper')

        const type = document.createElement('span')
        type.textContent = 'Прислужник'

        const bonus = document.createElement('h4')
        bonus.textContent = this.bonus

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        div.append(type, bonus, name, description, img)
        return div
    }
}

class Potion extends Card {
    constructor(name, description, image, bonus, cost) {
        super(name, description, image)
        this.type = 'Potion'
        this.bonus = bonus
        this.cost = cost
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('potion')

        const type = document.createElement('span')
        type.textContent = 'Зелье'

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        const bonus = document.createElement('h4')
        bonus.textContent = this.bonus

        const cost = document.createElement('p')
        cost.textContent = `Стоимость: ${this.cost} голды`

        div.append(type, name, img, description, bonus, cost)
        return div
    }
}

class Event extends Card {
    constructor(name, description, image, effect) {
        super(name, description, image)
        this.type = 'Event'
        this.effect = effect
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('event')

        const type = document.createElement('span')
        type.textContent = 'Событие'

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        const effect = document.createElement('p')
        effect.textContent = `Эффект: ${this.effect}`

        div.append(type, name, img, description, effect)
        return div
    }
}