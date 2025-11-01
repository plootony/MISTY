<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import ProfileSetupModal from '@/components/ProfileSetupModal.vue';
import { useProfileSetup } from '@/composables/useProfileSetup';

const route = useRoute();
const { showProfileSetup, checkProfileSetup, handleProfileSetupComplete } = useProfileSetup();

// Проверяем профиль при каждой смене роута
watch(() => route.path, () => {
  // Не проверяем на страницах auth и callback
  if (!route.path.startsWith('/auth')) {
    checkProfileSetup();
  }
});
</script>

<template>
  <AppHeader />
  <RouterView />
  
  <!-- Глобальная модалка настройки профиля -->
  <ProfileSetupModal 
    :show="showProfileSetup" 
    @complete="handleProfileSetupComplete"
  />
</template>