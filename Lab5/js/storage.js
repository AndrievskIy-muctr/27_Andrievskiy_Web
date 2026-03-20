const STORAGE_KEY = 'munchkin_cards'

function saveToStorage(cards) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
}

function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    const parsed = JSON.parse(data)
    return parsed.map(card => {
        switch(card.type) {
            case 'Monster': return Object.assign(new Monster(), card)
            case 'Clothes': return Object.assign(new Clothes(), card)
            case 'Race':    return Object.assign(new Race(), card)
            case 'Helper':  return Object.assign(new Helper(), card)
            case 'Potion':  return Object.assign(new Potion(), card)
            case 'Event':   return Object.assign(new Event(), card)
        }
    })
}