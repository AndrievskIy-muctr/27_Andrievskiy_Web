function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearError() {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
  }
}

// ====================== Навигация ======================
function switchApi(api) {
  // Убираем класс active у всех кнопок
  document.querySelectorAll('.main-nav button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Делаем активной нужную кнопку
  const activeButton = document.querySelector(`button[data-api="${api}"]`);
  if (activeButton) activeButton.classList.add('active');

  // Скрываем все секции
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Показываем нужную секцию
  const section = document.getElementById(`section-${api}`);
  if (section) section.classList.add('active');
}