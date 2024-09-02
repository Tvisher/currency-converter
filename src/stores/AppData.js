import { ref } from 'vue';
import { defineStore } from 'pinia';



export const useAppData = defineStore("AppData ", () => {
    const apiCurrencyPairs = ref(null);
    const defaultСurrency = ref('rub');
    const currencyVariants = ['rub', 'usd', 'eur'];
    const defaultCurrencyPairs = [
        'rub-usd',
        'rub-eur',
        'eur-usd',
        'eur-rub',
        'usd-eur',
        'usd-rub',
    ];

    const getCurrencyPairs = async () => {
        return new Promise((res, rej) => {
            fetch("https://status.neuralgeneration.com/api/currency")
                .then((res) => res.json())
                .then((data) => {
                    apiCurrencyPairs.value = defaultCurrencyPairs.reduce((acc, val) => {
                        acc[val] = Number(data[val].toFixed(2));
                        return acc
                    }, {});
                    res()
                })
                .catch((err) => rej(err));
        })
    }

    return {
        defaultСurrency,
        currencyVariants,
        apiCurrencyPairs,
        getCurrencyPairs
    }
})




