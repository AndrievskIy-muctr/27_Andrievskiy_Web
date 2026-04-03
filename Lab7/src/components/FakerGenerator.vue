<template>
  <section class="section active">
    <h1 class="section-title">🎲 Faker.js</h1>
    <p class="section-desc">Создаёт вымышленных пользователей</p>

    <div class="faker-controls" style="margin: 2rem 0; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <label>Количество людей:</label>
      <select v-model="count" class="btn ghost" style="padding: 0.65rem 1rem; font-size: 1rem;">
        <option value="1">1 человек</option>
        <option value="2">2 человека</option>
        <option value="3">3 человека</option>
        <option value="5">5 человек</option>
      </select>
      
      <button @click="generateUsers" class="btn" :disabled="loading">
        {{ loading ? 'Генерация...' : '✨ Сгенерировать' }}
      </button>
      <button @click="users = []" class="btn ghost">Очистить</button>
    </div>

    <div class="grid-3" style="margin-top: 2rem;">
      <div v-for="(user, index) in users" :key="index" class="card" style="text-align: center;">
        <img 
          :src="user.avatar" 
          alt="avatar" 
          style="width: 130px; height: 130px; border-radius: 50%; margin: 15px 0; 
                 object-fit: cover; border: 4px solid var(--surface2); background: #1c1c27;"
        >
        <h3 style="margin: 10px 0 5px;">{{ user.fullName }}</h3>
        <p style="margin: 5px 0; color: var(--text-muted);">{{ user.email }}</p>
        <p style="margin: 5px 0;"><strong>Город:</strong> {{ user.city }}</p>
        <p style="margin: 5px 0;"><strong>Телефон:</strong> {{ user.phone }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { faker } from '@faker-js/faker'; // Импортируем установленный пакет

const count = ref(3);
const users = ref([]);
const loading = ref(false);

const generateUsers = () => {
  loading.value = true;
  const newUsers = [];

  for (let i = 0; i < count.value; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    newUsers.push({
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      city: faker.location.city(),
      phone: faker.phone.number().split('x')[0].trim(),
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${firstName}${i}&radius=50`
    });
  }

  users.value = newUsers; // Обновляем массив, и Vue сам отрендерит карточки
  loading.value = false;
};
</script>