/**
 * @fileoverview Модуль для сохранения и загрузки отзывов через cookie
 * @module cookie
 */

/**
 * Сохраняет массив отзывов в cookie
 * @param {Array<{name: string, text: string, img: string|null}>} reviews - массив отзывов
 * @param {number} [days=1] - срок хранения в днях
 * @returns {void}
 */
function saveReviews(reviews, days = 1) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `reviews=${encodeURIComponent(JSON.stringify(reviews))};expires=${expires};path=/`;
}

/**
 * Загружает отзывы из cookie
 * @returns {Array|null} массив отзывов или null если cookie не найден
 */
function loadReviews() {
    const match = document.cookie.match(/(?:^|; )reviews=([^;]*)/);
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match[1]));
    } catch {
        return null;
    }
}