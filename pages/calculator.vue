<template>
  <div class="min-h-screen bg-[url('/background.png')] bg-cover bg-center text-white font-sans text-center flex flex-col items-center px-4 py-10 overflow-x-hidden">

    <!-- Przycisk powrotu do głównej strony -->
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
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-8 py-6 w-full max-w-xl mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider drop-shadow-md">Currency Converter</h1>
    </div>

    <!-- Opis -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-8 py-4 w-full max-w-xl mb-8">
      <p class="italic text-lg md:text-xl text-white">Convert from PLN to any supported currency</p>
    </div>

    <!-- Formularz -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl px-8 py-6 w-full max-w-xl">

      <!-- Kwota -->
      <input
        type="number"
        v-model="inputAmount"
        placeholder="Enter amount in PLN"
        class="w-full p-3 mb-4 rounded-md text-gray-900 placeholder:text-gray-500 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <!-- Waluta -->
      <select
        v-model="selectedCurrency"
        class="w-full p-3 mb-4 rounded-md text-gray-900 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option disabled value="">Select currency</option>
        <option v-for="rate in rates" :key="rate.code" :value="rate.code">
          {{ rate.currency }} ({{ rate.code }})
        </option>
      </select>

      <!-- Przycisk -->
      <button
        @click="convert"
        class="w-full py-2 mb-4 font-semibold text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition duration-300 shadow-md"
      >
        Convert
      </button>

      <!-- Wynik -->
      <div v-if="result !== null" class="mt-4 text-xl font-semibold text-yellow-200">
        {{ inputAmount }} PLN = {{ result }} {{ selectedCurrency }}
      </div>
    </div>
  </div>
</template>







<script setup>

  import { ref, onMounted } from 'vue'

  const rates = ref([])
  const selectedCurrency = ref('')
  const inputAmount = ref(0)
  const result = ref(null)
  const router = useRouter()

  // Funkcja przekierowująca na stronę główną
  const goToMainPage = () => {
      router.push('/')
  }

  // Pobieranie danych z API NBP
  onMounted(async () => {
    const response = await $fetch('/api/rates')
    rates.value = response.data[0].rates
  })

  // Funkcja do przeliczania waluty
  const convert = () => {
    const currency = rates.value.find(rate => rate.code === selectedCurrency.value)
    if (currency) {
      result.value = (inputAmount.value / currency.mid).toFixed(2)
    } else {
      result.value = null
    }
  }

</script>




