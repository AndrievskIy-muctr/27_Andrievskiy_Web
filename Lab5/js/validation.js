
function validateName(value) {
    if (!value || !value.trim()) return 'Новая карта'
    return value.trim().slice(0, 50)
}

function validateDescription(value) {
    if (!value || !value.trim()) return 'Описание отсутствует'
    return value.trim().slice(0, 200)
}


function validateMonsterLevel(value) {
    let num = parseInt(value)
    if (isNaN(num)) return 1
    if (num < 1) return 1
    if (num > 20) return 20
    return num
}

function validateRiches(value) {
    let num = parseInt(value)
    if (isNaN(num)) return 1
    if (num < 1) return 1
    if (num > 5) return 5
    return num
}


function validateCost(value) {
    let num = parseInt(value)
    if (isNaN(num)) return 100
    
    num = Math.round(num / 100) * 100
    if (num < 100) return 100
    if (num > 1300) return 1300
    return num
}

function validateHands(value) {
    if (!value) return '1'
    const hands = value.toString().trim()
    if (hands === '1' || hands === '2') return hands
    return '1'
}

function validateBonus(value) {
    if (!value || !value.trim()) return '+0'
    
    const trimmed = value.trim()
    
    const signMatch = trimmed.match(/^([+-])(\d+)/)
    if (signMatch) {
        let num = parseInt(signMatch[2])
        const sign = signMatch[1]
        
        if (sign === '-') num = 0
        if (num > 10) num = 10
        
        const rest = trimmed.slice(signMatch[0].length)
        return `+${num}${rest}`
    }
    
    const numMatch = trimmed.match(/^(\d+)/)
    if (numMatch) {
        let num = parseInt(numMatch[1])
        if (num < 0) num = 0
        if (num > 10) num = 10
        
        const rest = trimmed.slice(numMatch[1].length)
        return `+${num}${rest}`
    }
    
    return trimmed.slice(0, 50)
}


function validateAbility(value) {
    if (!value || !value.trim()) return 'Нет способности'
    return value.trim().slice(0, 150)
}



function validateEffect(value) {
    if (!value || !value.trim()) return 'Нет эффекта'
    return value.trim().slice(0, 150)
}


function validateCardData(type, rawValues, image) {
    const base = {
        name: validateName(rawValues.name),
        description: validateDescription(rawValues.description),
        image: image || 'img/image.png'
    }
    
    switch(type) {
        case 'Monster':
            return {
                ...base,
                level: validateMonsterLevel(rawValues.level),
                obscenity: validateAbility(rawValues.obscenity),
                riches: validateRiches(rawValues.riches)
            }
            
        case 'Clothes':
            return {
                ...base,
                bonus: validateBonus(rawValues.bonus),
                busy_hands: validateHands(rawValues.busy_hands),
                cost: validateCost(rawValues.cost)
            }
            
        case 'Race':
            return {
                ...base,
                ability: validateAbility(rawValues.ability)
            }
            
        case 'Helper':
            return {
                ...base,
                bonus: validateBonus(rawValues.bonus)
            }
            
        case 'Potion':
            return {
                ...base,
                bonus: validateBonus(rawValues.bonus),
                cost: validateCost(rawValues.cost)
            }
            
        case 'Event':
            return {
                ...base,
                effect: validateEffect(rawValues.effect)
            }
            
        default:
            return base
    }
}