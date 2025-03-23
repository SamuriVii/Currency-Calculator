<template>
  <div class="min-h-screen bg-[url('/background.png')] bg-cover bg-center text-white font-sans text-center flex flex-col items-center px-4 py-10 overflow-x-hidden">

    <!-- Przycisk powrotu do strony głównej -->
    <div class="px-8 py-6 w-full max-w-xl mb-8 flex justify-center">
      <button
        @click="goToMainPage"
        class="relative overflow-hidden px-10 py-5 text-lg font-semibold border-2 border-[#bfa64b] text-[#bfa64b] bg-[#d32020] rounded-lg transition-all duration-300 shadow-md hover:bg-[#b31919] hover:text-white active:scale-95"
      >
        Main Page
        <span
          class="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
          :class="{ 'animate-shine': true }"
        ></span>
      </button>
    </div>

    <!-- Tytuł -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-8 py-6 w-full max-w-xl mb-6">
      <h1 class="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider drop-shadow-md">Currency History</h1>
    </div>

    <!-- Opis -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-8 py-4 w-full max-w-xl mb-8">
      <p class="italic text-lg md:text-xl text-white">Compare up to 3 currencies over the last 7 days</p>
    </div>

    <!-- Selecty -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-8 py-6 w-full max-w-5xl mb-10 flex flex-col md:flex-row gap-4 justify-center items-center">
      <select v-model="selectedCurrency1" class="p-3 rounded-md text-gray-900 border border-yellow-300 w-full md:w-1/3">
        <option disabled value="">Choose currency</option>
        <option v-for="currency in allCurrencies" :key="currency.code" :value="currency.code">
          {{ currency.name }} ({{ currency.code }})
        </option>
      </select>

      <select v-model="selectedCurrency2" class="p-3 rounded-md text-gray-900 border border-yellow-300 w-full md:w-1/3">
        <option disabled value="">Choose currency</option>
        <option v-for="currency in allCurrencies" :key="currency.code" :value="currency.code">
          {{ currency.name }} ({{ currency.code }})
        </option>
      </select>

      <select v-model="selectedCurrency3" class="p-3 rounded-md text-gray-900 border border-yellow-300 w-full md:w-1/3">
        <option disabled value="">Choose currency</option>
        <option v-for="currency in allCurrencies" :key="currency.code" :value="currency.code">
          {{ currency.name }} ({{ currency.code }})
        </option>
      </select>
    </div>

    <!-- Tabela -->
    <div class="overflow-auto w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl p-4">
      <table class="w-full text-left table-auto border-collapse text-white text-sm md:text-base">
        <thead>
          <tr class="bg-yellow-500 text-white">
            <th class="p-3 font-semibold">Currency</th>
            <th v-for="date in dateLabels" :key="date" class="p-3 font-semibold">{{ date }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in displayedRates" :key="row.code" class="hover:bg-white/10 transition">
            <td class="p-3 font-bold text-white-300">{{ row.currency }} ({{ row.code }})</td>
            <td v-for="(val, i) in row.values" :key="i" class="p-3">{{ val }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted } from 'vue'

  const rates_history = ref([])
  const allCurrencies = ref([])
  const selectedCurrency1 = ref('')
  const selectedCurrency2 = ref('')
  const selectedCurrency3 = ref('')

  // Funkcja obliczająca dane do wyświetlenia w tabeli
  const displayedRates = computed(() => {
    const selectedCodes = [selectedCurrency1.value, selectedCurrency2.value, selectedCurrency3.value].filter(Boolean)

    return selectedCodes.map(code => {
      const currencyName = allCurrencies.value.find(c => c.code === code)?.name || code
      const values = rates_history.value.map(day => {
        const rate = day.rates.find(r => r.code === code)
        return rate ? rate.mid : '-'
      })
      return {
        code,
        currency: currencyName,
        values
      }
    })
  })

  const dateLabels = computed(() => {
    return rates_history.value.map(day => day.effectiveDate)
  })


  const router = useRouter()

  // Funkcja przekierowująca na stronę główną
  const goToMainPage = () => {
      router.push('/')
  }

  // Pobieranie danych z API NBP
  onMounted(async () => {
    const response = await $fetch('/api/rates_history')
    rates_history.value = response.data

    // Ustalamy listę dostępnych walut z pierwszego dnia
    if (response.data.length > 0) {
      const uniqueRates = response.data[0].rates
      allCurrencies.value = uniqueRates.map(rate => ({
        code: rate.code,
        name: rate.currency
      }))
    }
  })



</script>

