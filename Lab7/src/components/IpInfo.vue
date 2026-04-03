<template>
  <section class="section active">
    <h1 class="section-title">🌍 Моё местоположение</h1>
    <p class="section-desc">Определение геолокации по IP-адресу</p>
    
    <div style="margin: 2rem 0;">
      <button @click="getMyLocation" class="btn" :disabled="loading">
        {{ loading ? '⏳ Поиск...' : '🔍 Определить моё местоположение' }}
      </button>
    </div>

    <div v-if="ipData" class="card" style="margin-top: 2rem; padding: 1.5rem;">
      <h2 style="margin-bottom: 1rem;">📍 Ваше местоположение</h2>
      <p><strong>IP адрес:</strong> {{ ipData.query }}</p>
      <p><strong>Страна:</strong> {{ ipData.country }} ({{ ipData.countryCode }})</p>
      <p><strong>Город:</strong> {{ ipData.city || '—' }}</p>
      <p><strong>Координаты:</strong> {{ ipData.lat }}°, {{ ipData.lon }}°</p>
      <p><strong>Интернет-провайдер:</strong> {{ ipData.isp }}</p>
    </div>

    <div v-if="error" class="error" style="display: block; margin-top: 1rem;">
      {{ error }}
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Состояние компонента
const ipData = ref(null)
const error = ref('')
const loading = ref(false)

async function getMyLocation() {
  error.value = ''
  ipData.value = null
  loading.value = true

  try {
    const res = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query')
    
    if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`)
    
    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message || 'Ошибка определения')

    ipData.value = data // Просто сохраняем объект, Vue сам обновит экран
  } catch (err) {
    error.value = err.message || 'Не удалось подключиться к серверу'
  } finally {
    loading.value = false
  }
}
</script>