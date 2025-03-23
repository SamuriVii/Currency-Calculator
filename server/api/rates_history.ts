// Endpoint API do podłączenia się pod aktualne staki walut

export default defineEventHandler(async () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
  
    // Obliczamy ile dni cofnąć (API nie udostępnia danych z weekendu)
    let offset = 1
    if (dayOfWeek === 1) offset = 3
    else if (dayOfWeek === 0) offset = 2
  
    // Cofamy datę do ostatniego dnia roboczego jako datę końcową i równy tydzień wcześniej jako datę początkową
    const endDate = new Date(today)
    endDate.setDate(today.getDate() - offset)
  
    const startDate = new Date(endDate)
    startDate.setDate(endDate.getDate() - 7)

    // Format daty YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    
    const start = formatDate(startDate)
    const end = formatDate(endDate)

    // Pobieramy kursy NBP z API
    const url = `https://api.nbp.pl/api/exchangerates/tables/A/${start}/${end}/?format=json`
    const response = await $fetch(url)
    
    return {
      startDate: start,
      endDate: end,
      data: response
    }
})
  