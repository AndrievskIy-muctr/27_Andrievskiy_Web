const defaultReviews = [
    { name: "Дядя Вася, 54 года", text: "Доктор спросил чем объяснить такую активность. Я показал банку. Он тоже купил.", img: null, stars: 5 },
    { name: "Тётя Люда, Саратов", text: "Дала мужу — починил кран, покрасил забор, написал роман. Заказала ещё.", img: null, stars: 5 },
    { name: "Анатолий, Краснодар", text: "Жена заказала ящик. Сказала — для хозяйства. Хозяйство процветает.", img: null, stars: 5 },
];

let reviews = loadReviews() || defaultReviews;

function renderReviews(reviews) {
    const grid = document.getElementById("reviews-grid");
    grid.innerHTML = reviews.map(r => `
        <div class="review-card">
            ${r.img ? `<img src="${r.img}" class="review-card__img" alt="фото" />` : ""}
            <p class="review-card__stars">${"⭐".repeat(r.stars)}</p>
            <p class="review-card__text">"${r.text}"</p>
            <p class="review-card__author">— ${r.name}</p>
        </div>
    `).join("");
}

renderReviews(reviews);

document.getElementById("review-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("review-name").value;
    const text = document.getElementById("review-text").value;
    const error = document.getElementById("review-error");
    const stars = parseInt(document.getElementById("review-stars-value").value);

    if (stars === 0) {
        error.textContent = "Поставьте оценку";
        return;
    }
    if (name.trim().length < 2) {
        error.textContent = "Имя слишком короткое (минимум 2 символа)";
        return;
    }
    if (text.trim().length < 5) {
        error.textContent = "Отзыв слишком короткий (минимум 5 символов)";
        return;
    }

    error.textContent = "";

    const imgFile = document.getElementById("review-img").files[0];
    if (imgFile) {

        if (!imgFile.type.startsWith('image/')) {
            error.textContent = "Можно загружать только изображения";
            return;
        }
    

        const reader = new FileReader();
        reader.onload = (ev) => {
            reviews.push({ name, text, img: ev.target.result, stars });
            saveReviews(reviews.map(r => ({ ...r, img: null }))); // ← заменить
            renderReviews(reviews);
        };
        reader.readAsDataURL(imgFile);
    } else {
        reviews.push({ name, text, img: null, stars });
        saveReviews(reviews.map(r => ({ ...r, img: null }))); // ← заменить
        renderReviews(reviews);

    }

    e.target.reset();
});

document.querySelectorAll("#review-stars span").forEach(star => {
    star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-value"));
        document.getElementById("review-stars-value").value = val;
        document.querySelectorAll("#review-stars span").forEach(s => {
            s.classList.toggle("active", parseInt(s.getAttribute("data-value")) <= val);
        });
    });
});