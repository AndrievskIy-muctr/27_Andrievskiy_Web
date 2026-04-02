// ====================== IP-API ======================

async function getMyLocation() {
  const resultContainer = document.getElementById('ip-result');
  const errorContainer = document.getElementById('ip-error');
  const btn = document.querySelector('#section-ip .btn');

  resultContainer.style.display = 'none';
  errorContainer.style.display = 'none';
  errorContainer.textContent = '';

  setLoading(true);

  const res = await fetch(
    'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query'
  ).catch(() => null);

  if (!res) {
    errorContainer.textContent = 'Не удалось подключиться к серверу. Попробуйте позже.';
    errorContainer.style.display = 'block';
    setLoading(false);
    return;
  }

  if (!res.ok) {
    errorContainer.textContent = `Сервер вернул ошибку: ${res.status}`;
    errorContainer.style.display = 'block';
    setLoading(false);
    return;
  }

  const data = await res.json();

  if (data.status !== 'success') {
    errorContainer.textContent = data.message || 'Не удалось определить местоположение';
    errorContainer.style.display = 'block';
    setLoading(false);
    return;
  }

  resultContainer.innerHTML = `
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
  resultContainer.style.display = 'block';
  setLoading(false);
}