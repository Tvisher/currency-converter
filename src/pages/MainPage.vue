<script setup>
import { ref, computed } from "vue";
import { useAppData } from "@/stores/AppData";
const store = useAppData();

const defaultСurrency = computed(() => store.defaultСurrency);

const tableData = computed(() => {
  const res = Object.entries(store.apiCurrencyPairs)
    .filter((el) => el[0].endsWith(defaultСurrency.value))
    .map(
      (el) => `1 ${el[0].split("-")[0]} = ${el[1]} ${defaultСurrency.value}`
    );

  return res;
});
</script>

<template>
  <div class="table">
    <div class="table-row" v-for="row in tableData">{{ row }}</div>
  </div>
</template>

<style lang="scss">
.table {
  width: fit-content;
  margin: auto;
  padding: 20px;
  //   margin-top: 30px;
}
.table-row {
  text-transform: uppercase;
  padding: 10px;
  font-size: 36px;
  &:not(:last-child) {
    border-bottom: 1px solid #fff;
  }
}
</style>
