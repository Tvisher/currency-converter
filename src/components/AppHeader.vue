<script setup>
import { ref, watch } from "vue";
import { useAppData } from "@/stores/AppData";
import { storeToRefs } from "pinia";
const store = useAppData();

const { defaultСurrency } = storeToRefs(store);
const currencyVariants = store.currencyVariants;
const selectedOption = ref(store.currencyVariants[0]);

watch(selectedOption, (newVal) => (defaultСurrency.value = newVal));
</script>

<template>
  <header class="header">
    <RouterLink class="header-link" to="/"> Главная </RouterLink>
    <RouterLink class="header-link" to="/conversion"> Конвертация </RouterLink>
    <select class="header-select" v-model="selectedOption">
      <option
        class="header-select__variant"
        v-for="currency in currencyVariants"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
  </header>
</template>

<style lang="scss">
.header {
  padding: 20px 0;
  border-bottom: 1px solid #fff;
}
.header-select {
  text-transform: uppercase;
  appearance: none;
  padding: 2px 10px;
  padding-right: 30px;
  outline: none !important;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='268' height='134' viewBox='0 0 268 134' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M133.999 133.667L0.666016 0.333984H267.333L133.999 133.667Z' fill='white'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 10px;
  background-position: center right 10px;
  .header-select__variant {
    color: #000;
    font-weight: 400;
  }
}
.header-link {
  font-size: 18px;
  padding: 5px 10px;
  color: #fff;
  transition: color 0.3s ease-in-out;
  position: relative;
  &::before {
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    height: 2px;
    width: 100%;
    background-color: #fff;
    opacity: 0;
    transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  &:hover {
    color: #7ec077;
    &::before {
      background-color: #7ec077;
    }
  }
  &.router-link-active {
    &::before {
      opacity: 1;
    }
  }
}
</style>
