// ====================== FAKER.JS ======================

let fakerLoaded = false;
let fakerLoading = false;

async function loadFaker() {
  if (fakerLoaded) return true;
  if (fakerLoading) return false; // уже грузится — не дублируем запрос

  fakerLoading = true;

  const mod = await import('https://esm.sh/@faker-js/faker@8.4.1').catch(() => null);

  if (!mod) {
    alert('Не удалось загрузить Faker.js. Проверьте подключение к интернету.');
    fakerLoading = false;
    return false;
  }

  window.faker = mod.faker;
  fakerLoaded = true;
  fakerLoading = false;
  return true;
}

async function generateFakeUsers() {
  setLoading(true);

  const ok = await loadFaker();
  if (!ok) {
    setLoading(false);
    return;
  }

  const count = parseInt(document.getElementById('faker-count').value) || 3;
  const container = document.getElementById('faker-result');
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const firstName = window.faker.person.firstName();
    const lastName = window.faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const email = window.faker.internet.email({ firstName, lastName });
    const city = window.faker.location.city();

    let phone = window.faker.phone.number();
    phone = phone.split('x')[0].trim();

    const seed = `${firstName}${lastName}${Date.now()}${i}`;
    const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&radius=50`;

    container.innerHTML += `
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
  }

  setLoading(false);
}

function clearFakeUsers() {
  document.getElementById('faker-result').innerHTML = '';
}