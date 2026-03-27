// ====================== IP-API ======================
async function getMyLocation() {
  const resultContainer = document.getElementById('ip-result');
  const errorContainer = document.getElementById('ip-error');

  // Сброс предыдущих результатов
  resultContainer.style.display = 'none';
  errorContainer.style.display = 'none';
  errorContainer.textContent = '';

  try {
    const res = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query');

    if (!res.ok) throw new Error('Сервер не ответил');

    const data = await res.json();

    if (data.status !== 'success') {
      throw new Error(data.message || 'Не удалось определить местоположение');
    }

    // Красивый вывод результата
    let html = `
      <h2 style="margin-bottom: 1rem;">📍 Ваше местоположение</h2>
      <p><strong>IP адрес:</strong> ${data.query}</p>
      <p><strong>Страна:</strong> ${data.country} (${data.countryCode})</p>
      <p><strong>Город:</strong> ${data.city || '—'}</p>
      <p><strong>Регион:</strong> ${data.regionName || '—'}</p>
      ${data.zip ? `<p><strong>Почтовый индекс:</strong> ${data.zip}</p>` : ''}
      <p><strong>Координаты:</strong> ${data.lat}°, ${data.lon}°</p>
      <p><strong>Часовой пояс:</strong> ${data.timezone}</p>
      <p><strong>Интернет-провайдер:</strong> ${data.isp}</p>
      ${data.org ? `<p><strong>Организация:</strong> ${data.org}</p>` : ''}
    `;

    resultContainer.innerHTML = html;
    resultContainer.style.display = 'block';

  } catch (err) {
    console.error(err);
    errorContainer.textContent = 'Не удалось получить данные. Попробуйте позже.';
    errorContainer.style.display = 'block';
  }
}