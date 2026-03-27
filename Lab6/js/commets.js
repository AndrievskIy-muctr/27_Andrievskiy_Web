const BASE_URL = 'https://69c6edccf272266f3ead3ebe.mockapi.io/lab6/comments';


async function loadPosts() {
  clearError();
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

    const posts = await res.json();
    renderList(posts);
  } catch (error) {
    console.error(error);
    showError('Не удалось загрузить список постов');
    document.getElementById('list').innerHTML = '<li>❌ Ошибка загрузки</li>';
  }
}

async function createPost() {
  clearError();
  const title = document.getElementById('input-title').value.trim();
  const bodyText = document.getElementById('input-body').value.trim();

  if (!title && !bodyText) {
    showError('Заполните хотя бы одно поле');
    return;
  }

  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title || 'Без заголовка',
        post: bodyText
      })
    });

    // Очищаем поля
    document.getElementById('input-title').value = '';
    document.getElementById('input-body').value = '';

    loadPosts();
  } catch (error) {
    showError('Ошибка при создании поста');
  }
}

async function updatePost() {
  clearError();
  const id = document.getElementById('edit-id').value.trim();
  const title = document.getElementById('edit-title').value.trim();

  if (!id) return showError('Введите ID поста');
  if (!title) return showError('Введите новый заголовок');

  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    document.getElementById('edit-id').value = '';
    document.getElementById('edit-title').value = '';
    loadPosts();
  } catch (error) {
    showError('Ошибка при обновлении поста');
  }
}

async function deletePost(id) {
  if (!confirm('Удалить этот пост?')) return;

  clearError();
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    loadPosts();
  } catch (error) {
    showError('Ошибка при удалении поста');
  }
}

function renderList(posts) {
  const listElement = document.getElementById('list');
  if (!listElement) return;

  if (!posts || posts.length === 0) {
    listElement.innerHTML = '<li>📭 Нет постов</li>';
    return;
  }

  let html = '';
  posts.forEach(post => {
    html += `
      <li>
        <span>${post.title || '(без заголовка)'} — ${post.post || '(без текста)'} (id: ${post.id})</span>
        <button onclick="deletePost('${post.id}')" class="btn danger sm">🗑️ Удалить</button>
      </li>
    `;
  });

  listElement.innerHTML = html;
}