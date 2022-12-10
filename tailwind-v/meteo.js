let formSubmit = document.getElementById('formSubmit')
let valueInput = document.getElementById('valueInput')
let result = document.getElementById('result')
let city = ""
let meteo = []
const ApiKey = 'ad8b8388eceddfc6188e49641dca866d'

const fetchMeteo = async ()=>{
  const ApiUri = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${city}`
  meteo = await fetch(ApiUri).then((response) => response.json())
  console.log(meteo);
}

const displayMeteo = async ()=>{
  await fetchMeteo()
  let iconPrecip = ""
    if(meteo.current.precip >=0 && meteo.current.precip >=0.2) {
        iconPrecip= '🌤️'
    } else if (meteo.current.precip >= 0.2 && meteo.current.precip < 0.4) {
        iconPrecip= '🌥️'
    } else if (meteo.current.precip >= 0.4 && meteo.current.precip < 0.6) {
        iconPrecip= '🌦️'
    } else if (meteo.current.precip >= 0.6 && meteo.current.precip < 0.8) {
        iconPrecip= '🌨️'
    } else if (meteo.current.precip >= 0.8 && meteo.current.precip < 1) 
        iconPrecip= '🌩️'

  result.innerHTML = `
  <div class="mx-auto my-auto mx-auto max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <img src="${meteo.current.weather_icons[0]}" alt="Image" class="w-full"></img>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">${meteo.location.name} ${meteo.location.region} ${meteo.location.country}</div>
    <p class="text-gray-700 text-base">
      ${meteo.current.weather_descriptions[0]}
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block mb-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      Temperature : ${meteo.current.temperature}° 🌡️
    </span>
    <span class="inline-block mb-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      Humidité : ${meteo.current.humidity}% 💧
    </span>
    <span class="inline-block mb-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      Force du vent : ${meteo.current.wind_speed} km/h 🌬️
    </span>
    <span class="inline-block mb-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      Index uv : ${meteo.current.uv_index} 🌞
    </span>
    <span class="inline-block mb-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      Precipation : ${meteo.current.precip} ${iconPrecip} 
    </span>
  </div>
</div>
  `

}

formSubmit.addEventListener('submit', e => {
  e.preventDefault()
  city = valueInput.value;
  city.length > 2 ?
    displayMeteo()
  :
    result.innerHTML = `
    <div class="text-center py-4 lg:px-4">
      <div class="p-2 bg-red-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
        <span class="flex rounded-full bg-red-800 uppercase px-2 py-1 text-xs font-bold mr-3">
            ✋
        </span>
        <span class="font-semibold mr-2 text-left flex-auto">
            Veuillez saisir le nom d'une ville!
        </span>
        <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
      </div>
    </div>
    `
})