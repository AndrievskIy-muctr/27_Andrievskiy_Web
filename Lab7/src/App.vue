<script setup>
import { ref } from 'vue';
import IpInfo from './components/IpInfo.vue';
import FakerGenerator from './components/FakerGenerator.vue';
import CommentsManager from './components/CommentsManager.vue'; // 1. Импортируем новый компонент

// Управляем текущей вкладкой
const currentTab = ref('comments');
</script>

<template>
  <div>
    <header>
      <div class="header-inner">
        <div class="logo">API<span>Lab</span></div>

        <nav class="main-nav">
          <button 
            :class="{ active: currentTab === 'comments' }" 
            @click="currentTab = 'comments'"
          >💬 Комментарии / Посты</button>
          
          <button 
            :class="{ active: currentTab === 'ip' }" 
            @click="currentTab = 'ip'"
          >🌍 Моё местоположение (IP)</button>
          
          <button 
            :class="{ active: currentTab === 'faker' }" 
            @click="currentTab = 'faker'"
          >🎲 Faker.js — Случайные люди</button>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <CommentsManager v-if="currentTab === 'comments'" />

      <IpInfo v-if="currentTab === 'ip'" />

      <FakerGenerator v-if="currentTab === 'faker'" />
    </main>
  </div>
</template>