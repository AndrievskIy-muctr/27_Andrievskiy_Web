document.addEventListener('DOMContentLoaded', () => {

  // Навигация по API
  document.querySelectorAll('.main-nav button').forEach(button => {
    button.addEventListener('click', () => {
      const api = button.getAttribute('data-api');
      switchApi(api);
    });
  });

  // Форма создания поста
  const createForm = document.getElementById('create-form');
  if (createForm) {
    createForm.addEventListener('submit', function(e) {
      e.preventDefault();
      createPost();
    });
  }

  // Форма редактирования
  const editForm = document.getElementById('edit-form');
  if (editForm) {
    editForm.addEventListener('submit', function(e) {
      e.preventDefault();
      updatePost();
    });
  }

  // Запуск приложения
  switchApi('comments');
  loadPosts();
});