// Endpoint API do podłączenia się pod aktualne staki walut

export default defineEventHandler(async () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
  
    // Obliczamy ile dni cofnąć (nie chcemy pobierać danych APi z weekendu)
    let offset = 1
    if (dayOfWeek === 1) offset = 3
    else if (dayOfWeek === 0) offset = 2
  
    // Cofamy datę do ostatniego dnia roboczego
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() - offset)
  
    // Format daty YYYY-MM-DD
    const yyyy = targetDate.getFullYear()
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0')
    const dd = String(targetDate.getDate()).padStart(2, '0')
    const formattedDate = `${yyyy}-${mm}-${dd}`
  
    // Pobieramy kursy NBP z API
    const url = `https://api.nbp.pl/api/exchangerates/tables/A/${formattedDate}?format=json`
    const response = await $fetch(url)
  
    return {
      date: formattedDate,
      data: response
    }
  })
  