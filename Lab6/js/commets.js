const BASE_URL = 'https://69c6edccf272266f3ead3ebe.mockapi.io/lab6/comments';

// ====================== БЛОКИРОВКА КНОПОК ======================

function setLoading(isLoading) {
  document.querySelectorAll('button, input[type="submit"]').forEach(btn => {
    btn.disabled = isLoading;
  });
}

function setListLoading(isLoading) {
  const list = document.getElementById('list');
  if (!list) return;
  if (isLoading) {
    list.innerHTML = '<li class="loading-indicator">⏳ Загрузка постов...</li>';
  }
}

// ====================== CRUD ======================

async function loadPosts() {
  clearError();
  setLoading(true);
  setListLoading(true);

  const res = await fetch(BASE_URL).catch(() => null);

  if (!res) {
    showError('Не удалось подключиться к серверу');
    document.getElementById('list').innerHTML = '<li>❌ Ошибка загрузки</li>';
    setLoading(false);
    return;
  }

  if (!res.ok) {
    showError(`Ошибка сервера: ${res.status}`);
    document.getElementById('list').innerHTML = '<li>❌ Ошибка загрузки</li>';
    setLoading(false);
    return;
  }

  const posts = await res.json();
  renderList(posts);
  setLoading(false);
}

async function createPost() {
  clearError();

  const title = document.getElementById('input-title').value.trim();
  const bodyText = document.getElementById('input-body').value.trim();

  if (!title && !bodyText) {
    showError('Заполните хотя бы одно поле');
    return;
  }

  setLoading(true);

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title || 'Без заголовка', post: bodyText })
  }).catch(() => null);

  if (!res) {
    showError('Не удалось подключиться к серверу');
    setLoading(false);
    return;
  }

  if (!res.ok) {
    showError(`Ошибка при создании поста: ${res.status}`);
    setLoading(false);
    return;
  }

  document.getElementById('input-title').value = '';
  document.getElementById('input-body').value = '';
  await loadPosts();
}

async function updatePost() {
  clearError();

  const id = document.getElementById('edit-id').value.trim();
  const title = document.getElementById('edit-title').value.trim();
  const bodyText = document.getElementById('edit-body').value.trim();

  if (!id) { showError('Введите ID поста'); return; }
  if (!title && !bodyText) { showError('Заполните хотя бы одно поле для обновления'); return; }

  const payload = {};
  if (title) payload.title = title;
  if (bodyText) payload.post = bodyText;

  setLoading(true);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => null);

  if (!res) {
    showError('Не удалось подключиться к серверу');
    setLoading(false);
    return;
  }

  if (!res.ok) {
    showError(`Ошибка при обновлении: ${res.status}. Проверьте ID`);
    setLoading(false);
    return;
  }

  document.getElementById('edit-id').value = '';
  document.getElementById('edit-title').value = '';
  document.getElementById('edit-body').value = '';
  await loadPosts();
}

async function deletePost(id) {
  if (!confirm('Удалить этот пост?')) return;

  clearError();
  setLoading(true);

  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).catch(() => null);

  if (!res) {
    showError('Не удалось подключиться к серверу');
    setLoading(false);
    return;
  }

  if (!res.ok) {
    showError(`Ошибка при удалении: ${res.status}`);
    setLoading(false);
    return;
  }

  await loadPosts();
}

// ====================== РЕНДЕР ======================

function renderList(posts) {
  const listElement = document.getElementById('list');
  if (!listElement) return;

  listElement.innerHTML = '';

  if (!posts || posts.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = '📭 Нет постов';
    listElement.appendChild(empty);
    return;
  }

  posts.forEach(post => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = `${post.title || '(без заголовка)'} — ${post.post || '(без текста)'} (id: ${post.id})`;

    const btn = document.createElement('button');
    btn.textContent = '🗑️ Удалить';
    btn.className = 'btn danger sm';
    btn.addEventListener('click', () => deletePost(post.id));

    li.appendChild(span);
    li.appendChild(btn);
    listElement.appendChild(li);
  });
}