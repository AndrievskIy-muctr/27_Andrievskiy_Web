<template>
  <section class="section active">
    <h1 class="section-title">Работа с комментариями</h1>
    <p class="section-desc">CRUD операции с MockAPI (POST, GET, PUT, DELETE)</p>

    <div v-if="error" class="error" style="display: block;">
      {{ error }}
    </div>

    <h2>Новый пост</h2>
    <form @submit.prevent="createPost">
      <input 
        v-model="newPost.title" 
        type="text" 
        placeholder="Заголовок (от 3 до 100 симв.)" 
        required 
        minlength="3"
        maxlength="100" 
      />
      <textarea 
        v-model="newPost.body" 
        placeholder="Текст поста (от 5 до 1000 симв.)" 
        rows="4" 
        required 
        minlength="5"
        maxlength="1000"
      ></textarea>
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? 'Отправка...' : 'Создать пост (POST)' }}
      </button>
    </form>

    <hr>

    <h2>Редактировать пост</h2>
    <form @submit.prevent="updatePost">
      <input v-model="editData.id" type="number" placeholder="ID поста" required />
      <input v-model="editData.title" type="text" placeholder="Новый заголовок (от 3 симв.)" />
      <textarea v-model="editData.body" placeholder="Новый текст поста" rows="4"></textarea>
      <button type="submit" class="btn" :disabled="loading">Сохранить изменения (PUT)</button>
    </form>

    <hr>

    <h2>Список постов</h2>
    <button @click="loadPosts" class="btn ghost" :disabled="loading" style="margin-bottom: 1rem;">
      🔄 Обновить список
    </button>

    <ul id="list">
      <li v-if="posts.length === 0 && !loading">📭 Нет постов</li>
      <li v-if="loading">⏳ Загрузка...</li>
      
      <li v-for="post in posts" :key="post.id">
        <span>
          <strong>{{ post.title || '(без заголовка)' }}</strong> — 
          {{ post.post || '(без текста)' }} 
          <small>(id: {{ post.id }})</small>
        </span>
        <button @click="deletePost(post.id)" class="btn danger sm" :disabled="loading">
          🗑️ Удалить
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const BASE_URL = 'https://69c6edccf272266f3ead3ebe.mockapi.io/lab6/comments';

// Состояние
const posts = ref([]);
const loading = ref(false);
const error = ref('');

const newPost = ref({ title: '', body: '' });
const editData = ref({ id: '', title: '', body: '' });

// Функции
async function loadPosts() {
  error.value = '';
  loading.value = true;
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    posts.value = await res.json();
  } catch (err) {
    error.value = 'Не удалось загрузить посты';
  } finally {
    loading.value = false;
  }
}

async function createPost() {
  loading.value = true;
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newPost.value.title, post: newPost.value.body })
    });
    if (!res.ok) throw new Error('Ошибка при создании');
    newPost.value = { title: '', body: '' }; // Очистка формы
    await loadPosts();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function updatePost() {
  if (!editData.value.id) return;
  loading.value = true;
  try {
    const payload = {};
    if (editData.value.title) payload.title = editData.value.title;
    if (editData.value.body) payload.post = editData.value.body;

    const res = await fetch(`${BASE_URL}/${editData.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Пост не найден или ошибка сервера');
    editData.value = { id: '', title: '', body: '' };
    await loadPosts();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function deletePost(id) {
  if (!confirm('Удалить этот пост?')) return;
  loading.value = true;
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    await loadPosts();
  } catch (err) {
    error.value = 'Ошибка при удалении';
  } finally {
    loading.value = false;
  }
}

// Загружаем данные сразу при открытии
onMounted(loadPosts);
</script>