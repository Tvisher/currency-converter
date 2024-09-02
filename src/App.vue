<script setup>
import AppHeader from "@/components/AppHeader.vue";
import { ref, onMounted } from "vue";
import { useAppData } from "@/stores/AppData";
const store = useAppData();

const appReady = ref(false);
let apiCurrencyPairs = {};

onMounted(() => {
  store.getCurrencyPairs().then(() => {
    apiCurrencyPairs = store.apiCurrencyPairs;
    appReady.value = true;
  });
});
</script>

<template>
  <Transition name="fade">
    <div class="page-wrapper" v-if="appReady">
      <AppHeader />
      <main class="main">
        <Transition name="fade-translate">
          <router-view></router-view>
        </Transition>
      </main>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-translate-enter-active,
.fade-translate-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.fade-translate-enter-from,
.fade-translate-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
