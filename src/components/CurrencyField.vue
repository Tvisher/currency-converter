<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  optionsList: Array,
  fieldData: {
    name: String,
    value: Number,
  },
});
const emit = defineEmits(["changeCurrency", "changeValue"]);
const selectedOption = ref(props.fieldData.currency);
const inputValue = ref(props.fieldData.value);
watch(selectedOption, (newVal) => {
  emit("changeCurrency", { name: props.fieldData.name, currency: newVal });
});

watch(props.fieldData, (newVal) => {
  inputValue.value = newVal.value;
});

const inputListener = (event) => {
  let value = event.target.value;

  const filteredValue = value.replace(/[^0-9.]/g, "");

  const dotIndex = filteredValue.indexOf(".");
  if (dotIndex !== -1) {
    value =
      filteredValue.slice(0, dotIndex + 1) +
      filteredValue.slice(dotIndex + 1).replace(/\./g, "");
  } else {
    value = filteredValue;
  }
  inputValue.value = value;

  emit("changeValue", {
    name: props.fieldData.name,
    value,
  });
};
</script>
<template>
  <div class="currency-field">
    <div class="currency-field__input-wrapper">
      <input
        type="text"
        placeholder="0"
        class="currency-field__input"
        v-model.number="inputValue"
        @input="inputListener"
      />
    </div>
    <div class="currency-field__select-wrapper">
      <select class="currency-field__select" v-model="selectedOption">
        <option
          class="select__variant"
          v-for="option in optionsList"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
<style lang="scss">
.currency-field__input-wrapper {
  height: 100%;
  width: 250px;
}
.currency-field__input {
  margin: 0;
  padding: 0px 10px;
}

.currency-field {
  font-size: 24px;
  height: 80px;
  display: flex;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 10px;
  width: fit-content;
  overflow: hidden;
  margin-bottom: 20px;
}

.currency-field__select-wrapper {
  border-left: 2px solid #fff;
  width: 100px;
  height: 100%;
}
.currency-field__select {
  text-align: center;
  padding: 0px 10px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='268' height='134' viewBox='0 0 268 134' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M133.999 133.667L0.666016 0.333984H267.333L133.999 133.667Z' fill='white'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 15px;
  background-position: center right 10px;
  .select__variant {
    color: #000;
    text-align: left;
    padding: 3px;
    font-weight: 400;
  }
}

.currency-field__input,
.currency-field__select {
  color: #fff;
  display: block;
  text-transform: uppercase;
  outline: none !important;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  appearance: none;
}
</style>
