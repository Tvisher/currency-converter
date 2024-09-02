<script setup>
import CurrencyField from "@/components/CurrencyField.vue";
import { ref, reactive, computed } from "vue";
import { useAppData } from "@/stores/AppData";
const store = useAppData();
const currencyVariants = store.currencyVariants;

const fromData = reactive({
  name: "from",
  currency: currencyVariants[0],
  value: 1,
});

const toData = reactive({
  name: "to",
  currency: currencyVariants[1],
  value:
    store.apiCurrencyPairs[`${currencyVariants[0]}-${currencyVariants[1]}`],
});

const calculateExchangeRate = () => {
  const pairValue =
    store.apiCurrencyPairs[`${fromData.currency}-${toData.currency}`];
  return pairValue ? Number(pairValue.toFixed(2)) : 1;
};

const changeCurrencyHandler = (data) => {
  data.name === "from"
    ? (fromData.currency = data.currency)
    : (toData.currency = data.currency);

  toData.value = Number((fromData.value * calculateExchangeRate()).toFixed(2));
};

const changeValueHandler = (data) => {
  if (data.name === "from") {
    fromData.value = +data.value;
    toData.value = Number(
      (fromData.value * calculateExchangeRate()).toFixed(2)
    );
  } else {
    toData.value = +data.value;
    fromData.value = Number(
      (toData.value / calculateExchangeRate()).toFixed(2)
    );
  }
};
</script>

<template>
  <div class="conversion-wrapper">
    <CurrencyField
      :fieldData="fromData"
      :optionsList="currencyVariants"
      @changeCurrency="changeCurrencyHandler($event)"
      @changeValue="changeValueHandler($event)"
    />
    <CurrencyField
      :fieldData="toData"
      :optionsList="currencyVariants"
      @changeCurrency="changeCurrencyHandler($event)"
      @changeValue="changeValueHandler($event)"
    />
  </div>
</template>

<style>
.conversion-wrapper {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
