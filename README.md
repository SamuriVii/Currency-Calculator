# Currency Calculator 💱

A modern and elegant **PWA currency calculator** and exchange rate viewer built with [Nuxt 3](https://nuxt.com/), SCSS, and TailwindCSS.

The app fetches real-time and historical exchange rates directly from the [National Bank of Poland (NBP) API](https://api.nbp.pl/), allowing users to:

- 💸 Convert from PLN to other currencies  
- 📊 View current exchange rates  
- 📆 Browse currency trends over the past week

---

## Features

- ✅ Currency Converter (PLN → any supported currency)
- ✅ Historical Rate Table for up to 3 currencies
- ✅ Live scrolling rate list
- ✅ PWA-ready design
- ✅ Custom styles (Glassmorphism + TailwindCSS)
- ✅ Responsive layout (mobile-friendly)

---

## API Source

All exchange rate data is retrieved from the official [NBP API](https://api.nbp.pl/).  
Learn more about the API [here](https://api.nbp.pl/).

---

## Project Setup

```bash
# Install dependencies
npm install
npm install -D sass
npm install -D tailwindcss postcss autoprefixer

# Run the app locally
npm run dev
