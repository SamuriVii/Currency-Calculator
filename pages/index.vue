<template>
    <div class="title-page">
        <div class="title">
            <h1>Currency Calculator</h1>
        </div>

        <div class="slogan">
            Your elegant gateway to global exchange rates and smart currency conversions.
        </div>

        <div class="buttons">
            <button class="currency-calculator" @click="goToCalculator">Currency Converter</button>
            <button class="currency-history" @click="goToHistory">Exchange Rate Archive</button>
        </div>

        <div class="table">
            <h2>Exchange Rates for {{ date }}</h2>
            <div class="scroll-wrapper" ref="scrollBox">
                <div class="rate-card" v-for="rate in rates" :key="rate.code">
                    <span class="currency-name">{{ rate.currency }} ({{ rate.code }})</span>
                    <span class="currency-value">1 {{ rate.code }} = {{ rate.mid }} PLN</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { ref, onMounted } from 'vue'

        const rates = ref([])
        const date = ref('')
        const scrollBox = ref(null)
        const router = useRouter()

        // Funkcje przekierowujące na konkretne podstrony
        const goToCalculator = () => {
            router.push('/calculator')
        }

        const goToHistory = () => {
            router.push('/history')
        }

        // Funkcja do pobierania danych z API oraz nadająca animacje przewijania się tabeli
        onMounted(async () => {

            // Pobranie danych z API NBP
            const response = await $fetch('/api/rates')
            rates.value = response.data[0].rates
            date.value = response.data[0].effectiveDate

            // Animacja przewijania się tabeli z walutami
            const el = scrollBox.value
            const scrollSpeed = 1
            const scrollDelay = 40 

            setInterval(() => {
                if (!el) return

                if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
                el.scrollTop = 0
                } else {
                el.scrollTop += scrollSpeed
                }
            }, scrollDelay)
        }
    )

</script>

<style lang="scss" scoped>

    .title-page {
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url('/background.png') center center / cover no-repeat;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
        color: #fff;
        min-height: 100vh;
        padding-bottom: 2rem;
        overflow-x: hidden;

        .title {
            background: rgba(22, 21, 21, 0.08);
            backdrop-filter: blur(14px) saturate(120%);
            -webkit-backdrop-filter: blur(14px) saturate(120%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 2.5rem 3rem;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            width: 60%;
            margin: 3rem;
            
            h1 {
                font-size: 3.2rem;
                font-weight: bold;
                color: #fdbe00;
                letter-spacing: 0.8vw;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
        }

        .slogan {
            background: rgba(22, 21, 21, 0.08);
            backdrop-filter: blur(14px) saturate(120%);
            -webkit-backdrop-filter: blur(14px) saturate(120%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 2.5rem 3rem;
            margin: 1.5rem 0 2.5rem;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            font-size: 2rem;
            font-style: italic;
            font-weight: 600;
            width: 50%;
            color: #fefefe;
        }

        .buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 2rem;

            button {
                position: relative;
                overflow: hidden;
                padding: 0.9rem 2.2rem;
                font-size: 1.5rem;
                font-weight: 600;
                border: 2px solid #bfa64b;
                border-radius: 10px;
                background: #d32020;
                color: #bfa64b;
                cursor: pointer;
                transition: all 0.4s ease;
                z-index: 0;
                max-width: 40%;

                &:hover {
                    background: #b31919;
                    color: #ffffff;
                    box-shadow: 0 4px 18px rgba(191, 166, 75, 0.3);
                    transform: translateY(-2px);
                }

                &:active {
                    transform: scale(0.98);
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -75%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    transform: skewX(-20deg);
                    z-index: 1;
                }

                &:hover::before {
                    animation: shine 0.8s forwards;
                }
            }
        }

        .table {
            background: rgba(22, 21, 21, 0.08);
            backdrop-filter: blur(14px) saturate(120%);
            -webkit-backdrop-filter: blur(14px) saturate(120%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 2.5rem 3rem;
            margin: 1.5rem 0 2.5rem;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            font-size: 2rem;
            font-style: italic;
            font-weight: 600;
            width: 50%;
            color: #fefefe;
            max-height: 60%;
            flex-grow: 1;
            max-height: 50vh; 
            overflow: hidden;

            h2 {
                font-size: 1.6rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                color: #ffe080;
            }

            .scroll-wrapper {
                max-height: 40vh;
                overflow: hidden;
                position: relative;
            }

            .rate-card {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255, 255, 255, 0.08);
                padding: 1rem 1.5rem;
                margin-bottom: 0.8rem;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                font-size: 1.1rem;
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #fff;

                .currency-name {
                    font-weight: 600;
                }

                .currency-value {
                    font-style: italic;
                    color: #ffe080;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .title-page {
            min-height: 100dvh;

            .title {
                padding: 1rem;
                margin: 1rem 0;
                width: 70%;

                h1 {
                    font-size: 1.5rem;
                    letter-spacing: 1px;
                }
            }

            .slogan {
                font-size: 0.9rem;
                margin: 1rem 0 1.5rem;
                width: 80%;
                padding: 1rem;
            }

            .buttons {
                gap: 0.5rem;
                width: 90%;

                button {
                    width: 90%;
                    font-size: 0.8rem;
                    padding: 0.8rem;
                }
            }

            .table {
                width: 80%;
                font-size: 1rem;
                padding: 1.2rem;
                max-height: 40vh;

                h2 {
                    font-size: 1.2rem;
                }

                .scroll-wrapper {
                    max-height: 40vh;
                }

                .rate-card {
                    flex-direction: column;
                    align-items: flex-start;
                    font-size: 1rem;

                    .currency-name {
                        margin-bottom: 0.3rem;
                    }

                    .currency-value {
                        font-size: 0.95rem;
                    }
                }
            }
        }
    }

    @keyframes shine {
        0% {
            left: -75%;
        }
        100% {
            left: 130%;
        }
    }

</style>