class Card {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
    toHTML() {
        const div = document.createElement('div')
        div.className = 'card'
        return div // просто возвращаем пустой div, так как расположение тегов у каждого подкласса будет своё
    }
}

class Monster extends Card {
    constructor(name, description, image, level, obscenity, riches) {
        super(name, description, image)
        this.level = level
        this.obscenity = obscenity
        this.riches = riches
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('monster')

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
        obscenity.textContent = this.obscenity

        const riches = document.createElement('p')
        riches.textContent = this.riches

        div.append(level, name, description, obscenity, img, riches)
        return div
    }
}

class Clothes extends Card {
    constructor(name, description, image, bonus, busy_hands, cost) {
        super(name, description, image)
        this.bonus = bonus
        this.busy_hands = busy_hands
        this.cost = cost
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('clothes')

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
        busy_hands.textContent = this.busy_hands

        const cost = document.createElement('p')
        cost.textContent = this.cost

        div.append(bonus, name, description, img, busy_hands, cost)
        return div
    }
}

class Race extends Card {
    constructor(name, description, image, ability) {
        super(name, description, image)
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
        ability.textContent = this.ability

        div.append(type, name, img, description, ability)
        return div
    }
}

class Helper extends Card {
    constructor(name, description, image, bonus) {
        super(name, description, image)
        this.bonus = bonus
    }

    toHTML() {

        const div = super.toHTML()
        div.classList.add('helper')

        const bonus = document.createElement('h4')
        bonus.textContent = this.bonus

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        div.append(bonus, name, description, img)
        return div
    }
}

class Potion extends Card {
    constructor(name, description, image, bonus, duration, cost) {
        super(name, description, image)
        this.bonus = bonus
        this.duration = duration
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

        const duration = document.createElement('p')
        duration.textContent = this.duration

        const cost = document.createElement('p')
        cost.textContent = this.cost

        div.append(type, name, img, description, bonus, duration, cost)
        return div
    }
}

class Event extends Card {
    constructor(name, description, image, effect) {
        super(name, description, image)
        this.effect = effect
    }

    toHTML() {
        const div = super.toHTML()
        div.classList.add('event')

        const name = document.createElement('h3')
        name.textContent = this.name

        const img = document.createElement('img')
        img.src = this.image
        img.alt = this.name

        const description = document.createElement('p')
        description.textContent = this.description

        const effect = document.createElement('p')
        effect.textContent = this.effect

        div.append(name, img, description, effect)
        return div
    }
}

const defaultCards = [
    new Monster('Крыса Мутант', 'Обычная крыса, но очень злая', 'img/image.png', 2, 'Теряешь уровень', 1),
    new Monster('Огненный Дракон', 'Дракон который очень любит жарить героев', 'img/image.png', 10, 'Теряешь все шмотки', 3),
    new Monster('Гоблин Карманник', 'Крадёт твои вещи пока ты не смотришь', 'img/image.png', 4, 'Теряешь одну шмотку', 2),
    new Clothes('Меч Остренький', 'Выглядит грозно, рубит посредственно', 'img/image.png', '+3', 'две руки', 400),
    new Clothes('Шлем Рогатый', 'Рога для устрашения врагов', 'img/image.png', '+1', 'голова', 200),
    new Race('Эльф', 'Острые уши, высокомерный взгляд', 'img/image.png', 'Можешь помогать другим в бою без спроса'),
    new Race('Дварф', 'Низкий, бородатый, злопамятный', 'img/image.png', 'Можешь носить любое количество доспехов'),
    new Helper('Верный Конь', 'Возит шмотки и иногда лягается', 'img/image.png', '+2 к побегу'),
    new Potion('Зелье Силы', 'Пахнет носками но даёт +5', 'img/image.png', '+5 в бою', 'один бой', 150),
    new Event('Налог на богатство', 'Королевский указ застал всех врасплох', 'img/image.png', 'Все игроки теряют по 100 золота'),
]


function buildPage(cards) {
    const main = document.querySelector('main')
    main.innerHTML = ''

    cards.forEach(card => {
        main.append(card.toHTML())
    })
}

document.addEventListener('DOMContentLoaded', () => {
    buildPage(defaultCards)
})