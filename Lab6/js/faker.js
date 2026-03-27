// ====================== FAKER.JS ======================

let fakerLoaded = false;

async function loadFaker() {
  if (fakerLoaded) return;

  try {
    const { faker } = await import('https://esm.sh/@faker-js/faker@8.4.1');
    window.faker = faker;
    fakerLoaded = true;
    console.log('✅ Faker.js загружен');
  } catch (err) {
    console.error(err);
    alert('Не удалось загрузить Faker.js');
  }
}

async function generateFakeUsers() {
  await loadFaker();
  if (!window.faker) return;

  const countSelect = document.getElementById('faker-count');
  const count = parseInt(countSelect.value) || 3;

  const container = document.getElementById('faker-result');
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const firstName = window.faker.person.firstName();
    const lastName = window.faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = window.faker.internet.email({ firstName, lastName });
    const city = window.faker.location.city();

    // Чистим телефон
    let phone = window.faker.phone.number();
    phone = phone.split('x')[0].trim();

    // === DiceBear — надёжный и разный аватар каждый раз ===
    const seed = `${firstName}${lastName}${Date.now()}${i}`;   // уникальный seed
    const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&radius=50`;

    const cardHTML = `
      <div class="card" style="text-align: center;">
        <img 
          src="${avatarUrl}" 
          alt="avatar" 
          style="width: 130px; height: 130px; border-radius: 50%; margin: 15px 0; 
                 object-fit: cover; border: 4px solid var(--surface2); background: #1c1c27;">
        <h3 style="margin: 10px 0 5px;">${fullName}</h3>
        <p style="margin: 5px 0; color: var(--text-muted);">${email}</p>
        <p style="margin: 5px 0;"><strong>Город:</strong> ${city}</p>
        <p style="margin: 5px 0;"><strong>Телефон:</strong> ${phone}</p>
      </div>
    `;

    container.innerHTML += cardHTML;
  }
}

function clearFakeUsers() {
  document.getElementById('faker-result').innerHTML = '';
}