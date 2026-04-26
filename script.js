const API_KEY = "";

const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");

let imageIndex = 0;
let sliderInterval;
let currentPlaces = [];
let currentCityForSlider = "Mysore";
let currentCityName = "Mysore";
let isCelsius = true;
let currentWeatherData = null;
let currentForecastData = null;
let currentHistoryData = null;

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80";

const cityPlaces = {
  mysore: [
    ["Mysore Palace", "Royal palace and heritage symbol of Karnataka"],
    ["Chamundi Hills", "Famous hill and temple viewpoint"],
    ["Brindavan Gardens Mysore", "Beautiful garden near KRS Dam"],
    ["St. Philomena's Church Mysore", "Historic church in Mysore"]
  ],
  bengaluru: [
    ["Vidhana Soudha", "Iconic government building of Karnataka"],
    ["Bangalore Palace", "Majestic royal palace in Bengaluru"],
    ["Lalbagh Botanical Garden", "Beautiful botanical garden"],
    ["Cubbon Park", "Lush green urban park"]
  ],
  bangalore: [
    ["Vidhana Soudha", "Iconic government building of Karnataka"],
    ["Bangalore Palace", "Majestic royal palace in Bengaluru"],
    ["Lalbagh Botanical Garden", "Beautiful botanical garden"],
    ["Cubbon Park", "Lush green urban park"]
  ],
  mangalore: [
    ["Panambur Beach", "Popular beach in Mangalore"],
    ["Kadri Manjunath Temple", "Ancient temple in Mangalore"]
  ],
  hubli: [
    ["Nrupatunga Betta", "Hill viewpoint in Hubli"],
    ["Chandramouleshwara Temple", "Historic temple in Hubli"]
  ],
  mumbai: [
    ["Gateway of India", "Iconic monument near Arabian Sea"],
    ["Marine Drive Mumbai", "Queen's Necklace of Mumbai"],
    ["Chhatrapati Shivaji Terminus", "Historic railway station"]
  ],
  pune: [
    ["Shaniwar Wada", "Historic fortification in Pune"],
    ["Aga Khan Palace", "Important historical palace"]
  ],
  nagpur: [
    ["Deekshabhoomi", "Important Buddhist monument"],
    ["Sitabuldi Fort", "Historic fort in Nagpur"]
  ],
  nashik: [
    ["Trimbakeshwar Shiva Temple", "Famous temple near Nashik"],
    ["Sula Vineyards", "Popular vineyard destination"]
  ],
  delhi: [
    ["India Gate", "Famous war memorial"],
    ["Red Fort", "Historic Mughal fort"],
    ["Qutub Minar", "UNESCO heritage monument"],
    ["Lotus Temple", "Beautiful lotus-shaped temple"]
  ],
  "new delhi": [
    ["India Gate", "Famous war memorial"],
    ["Red Fort", "Historic Mughal fort"],
    ["Qutub Minar", "UNESCO heritage monument"],
    ["Lotus Temple", "Beautiful lotus-shaped temple"]
  ],
  chennai: [
    ["Marina Beach", "Popular beach in Chennai"],
    ["Kapaleeshwarar Temple", "Historic temple in Mylapore"]
  ],
  madurai: [
    ["Meenakshi Temple", "Famous temple of Madurai"],
    ["Thirumalai Nayakkar Mahal", "Historic palace in Madurai"]
  ],
  coimbatore: [
    ["Marudhamalai Temple", "Hill temple near Coimbatore"],
    ["Adiyogi Shiva Statue", "Famous spiritual landmark"]
  ],
  ooty: [
    ["Ooty Lake", "Beautiful lake in Ooty"],
    ["Botanical Garden Ooty", "Popular garden in Ooty"]
  ],
  kochi: [
    ["Chinese Fishing Nets Kochi", "Famous coastal attraction"],
    ["Fort Kochi", "Historic coastal area"]
  ],
  thiruvananthapuram: [
    ["Padmanabhaswamy Temple", "Famous temple in Kerala"],
    ["Kovalam Beach", "Popular beach near city"]
  ],
  munnar: [
    ["Munnar Tea Gardens", "Beautiful tea gardens"],
    ["Eravikulam National Park", "Popular nature destination"]
  ],
  kozhikode: [
    ["Kozhikode Beach", "Popular beach"],
    ["Mananchira Square", "Known public square"]
  ],
  hyderabad: [
    ["Charminar", "Famous historical monument"],
    ["Golconda Fort", "Historic fort with grand architecture"],
    ["Hussain Sagar", "Beautiful lake in Hyderabad"]
  ],
  warangal: [
    ["Warangal Fort", "Historic fort ruins"],
    ["Thousand Pillar Temple", "Ancient temple architecture"]
  ],
  visakhapatnam: [
    ["RK Beach Visakhapatnam", "Popular beach in Visakhapatnam"],
    ["Kailasagiri", "Hilltop park and viewpoint"]
  ],
  vijayawada: [
    ["Kanaka Durga Temple", "Famous temple in Vijayawada"],
    ["Prakasam Barrage", "Iconic barrage on Krishna River"]
  ],
  tirupati: [
    ["Tirumala Venkateswara Temple", "Famous temple"],
    ["Sri Vari Museum Tirupati", "Known cultural place"]
  ],
  jaipur: [
    ["Hawa Mahal", "Iconic palace of winds"],
    ["Amber Fort", "Grand fort near Jaipur"]
  ],
  udaipur: [
    ["City Palace Udaipur", "Royal palace by Lake Pichola"],
    ["Lake Pichola", "Famous lake in Udaipur"]
  ],
  jodhpur: [
    ["Mehrangarh Fort", "Grand fort in Jodhpur"],
    ["Umaid Bhawan Palace", "Famous palace"]
  ],
  ahmedabad: [
    ["Sabarmati Ashram", "Historic ashram of Mahatma Gandhi"],
    ["Adalaj Stepwell", "Beautiful stepwell near Ahmedabad"]
  ],
  surat: [
    ["Surat Castle", "Historic castle in Surat"],
    ["Dumas Beach", "Popular beach in Surat"]
  ],
  vadodara: [
    ["Laxmi Vilas Palace", "Royal palace in Vadodara"],
    ["Sayaji Baug", "Famous garden"]
  ],
  agra: [
    ["Taj Mahal", "World famous monument of love"],
    ["Agra Fort", "Historic Mughal fort"]
  ],
  varanasi: [
    ["Dashashwamedh Ghat", "Famous ghat on Ganga"],
    ["Kashi Vishwanath Temple", "Famous temple in Varanasi"]
  ],
  lucknow: [
    ["Bara Imambara", "Famous monument"],
    ["Rumi Darwaza", "Historic gateway"]
  ],
  kolkata: [
    ["Victoria Memorial Kolkata", "Iconic marble monument"],
    ["Howrah Bridge", "Famous bridge over Hooghly River"]
  ],
  darjeeling: [
    ["Darjeeling Himalayan Railway", "Famous toy train"],
    ["Darjeeling Tea Garden", "Beautiful tea estates"]
  ],
  bhopal: [
    ["Upper Lake Bhopal", "Beautiful lake in Bhopal"],
    ["Taj-ul-Masajid", "Grand mosque in Bhopal"]
  ],
  indore: [
    ["Rajwada Palace", "Historic palace in Indore"],
    ["Lal Bagh Palace Indore", "Royal palace of Indore"]
  ],
  gwalior: [
    ["Gwalior Fort", "Historic fort"],
    ["Jai Vilas Palace", "Royal palace"]
  ],
  amritsar: [
    ["Golden Temple", "Sacred and beautiful Sikh shrine"],
    ["Jallianwala Bagh", "Historic memorial garden"]
  ],
  ludhiana: [
    ["Lodhi Fort Ludhiana", "Historic fort"],
    ["Nehru Rose Garden Ludhiana", "Popular garden"]
  ],
  gurugram: [
    ["Cyber Hub Gurgaon", "Modern lifestyle destination"],
    ["Kingdom of Dreams Gurgaon", "Entertainment destination"]
  ],
  faridabad: [
    ["Surajkund", "Famous cultural fair location"],
    ["Badkhal Lake", "Known lake area"]
  ],
  patna: [
    ["Golghar Patna", "Historic granary in Patna"],
    ["Takht Sri Patna Sahib", "Important Sikh shrine"]
  ],
  gaya: [
    ["Mahabodhi Temple", "UNESCO heritage Buddhist temple"],
    ["Vishnupad Temple", "Famous temple in Gaya"]
  ],
  bhubaneswar: [
    ["Lingaraja Temple", "Ancient temple in Bhubaneswar"],
    ["Udayagiri Caves Odisha", "Historic rock-cut caves"]
  ],
  puri: [
    ["Jagannath Temple Puri", "Famous temple in Puri"],
    ["Puri Beach", "Popular beach destination"]
  ],
  guwahati: [
    ["Kamakhya Temple", "Famous temple in Assam"],
    ["Brahmaputra River Guwahati", "Beautiful river view"]
  ],
  jorhat: [
    ["Majuli Island", "River island near Jorhat"],
    ["Assam Tea Garden", "Famous tea estates"]
  ],
  panaji: [
    ["Our Lady of the Immaculate Conception Church Goa", "Famous church in Goa"],
    ["Miramar Beach Goa", "Popular beach in Panaji"]
  ],
  margao: [
    ["Colva Beach", "Popular beach near Margao"],
    ["Holy Spirit Church Margao", "Known church"]
  ],
  shimla: [
    ["The Ridge Shimla", "Famous open space in Shimla"],
    ["Christ Church Shimla", "Historic church in Shimla"]
  ],
  manali: [
    ["Hadimba Temple", "Famous temple in Manali"],
    ["Solang Valley", "Popular valley near Manali"]
  ],
  dehradun: [
    ["Robber's Cave Dehradun", "Popular natural cave"],
    ["Forest Research Institute Dehradun", "Iconic institute building"]
  ],
  nainital: [
    ["Naini Lake", "Beautiful lake in Nainital"],
    ["Naina Devi Temple Nainital", "Famous temple"]
  ],
  srinagar: [
    ["Dal Lake", "Beautiful lake in Srinagar"],
    ["Shalimar Bagh Srinagar", "Mughal garden in Kashmir"]
  ],
  jammu: [
    ["Raghunath Temple Jammu", "Famous temple"],
    ["Bahu Fort", "Historic fort in Jammu"]
  ]
};

const cityCategories = {
  "Karnataka": ["Mysore", "Bengaluru", "Mangalore", "Hubli"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Delhi": ["Delhi", "New Delhi"],
  "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore", "Ooty"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Munnar", "Kozhikode"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Uttar Pradesh": ["Agra", "Varanasi", "Lucknow"],
  "West Bengal": ["Kolkata", "Darjeeling"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  "Punjab": ["Amritsar", "Ludhiana"],
  "Haryana": ["Gurugram", "Faridabad"],
  "Bihar": ["Patna", "Gaya"],
  "Odisha": ["Bhubaneswar", "Puri"],
  "Assam": ["Guwahati", "Jorhat"],
  "Goa": ["Panaji", "Margao"],
  "Himachal Pradesh": ["Shimla", "Manali"],
  "Uttarakhand": ["Dehradun", "Nainital"],
  "Jammu & Kashmir": ["Srinagar", "Jammu"]
};

async function getWikiImage(query) {
  try {
    const searchURL =
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&pithumbsize=1200`;

    const response = await fetch(searchURL);
    const data = await response.json();

    if (!data.query || !data.query.pages) return fallbackImage;

    const pages = Object.values(data.query.pages);
    return pages[0].thumbnail ? pages[0].thumbnail.source : fallbackImage;
  } catch {
    return fallbackImage;
  }
}

function getDate(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split("T")[0];
}

function formatDate(dateString) {
  return new Date(dateString).toDateString();
}

function titleCase(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

function showTemp(c) {
  return isCelsius ? `${Math.round(c)}°C` : `${cToF(c)}°F`;
}

function searchWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    message.textContent = "Please enter a city name.";
    return;
  }

  getWeather(city);
}

async function getWeather(city = "Mysore") {
  try {
    message.innerHTML = '<div class="loader"></div>';

    const yesterday = getDate(-1);

    const currentURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=2&aqi=yes&alerts=no`;
    const historyURL = `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${yesterday}`;

    const currentResponse = await fetch(currentURL);
    const historyResponse = await fetch(historyURL);

    const currentData = await currentResponse.json();
    const historyData = await historyResponse.json();

    if (currentData.error || historyData.error) {
      message.textContent = "City not found. Please try again.";
      return;
    }

    currentWeatherData = currentData;
    currentHistoryData = historyData;
    currentCityName = currentData.location.name;
    cityInput.value = currentData.location.name;

    displayCurrentWeather(currentData);
    displayForecast(currentData, historyData);
    await setupCitySlider(currentData.location.name);
    saveSearch(currentData.location.name);
    displaySearchHistory();
    displayFavorites();

    message.textContent = "";

  } catch (error) {
    message.textContent = "Something went wrong. Check your API key or internet connection.";
  }
}

function displayCurrentWeather(data) {
  document.getElementById("currentCity").textContent =
    `${data.location.name}, ${data.location.country}`;

  document.getElementById("currentDate").textContent =
    formatDate(data.location.localtime.split(" ")[0]);

  document.getElementById("weatherIcon").src =
    "https:" + data.current.condition.icon;

  document.getElementById("temperature").textContent =
    showTemp(data.current.temp_c);

  document.getElementById("condition").textContent =
    data.current.condition.text;

  document.getElementById("feelsLike").textContent =
    showTemp(data.current.feelslike_c);

  document.getElementById("humidity").textContent =
    `${data.current.humidity}%`;

  document.getElementById("wind").textContent =
    `${data.current.wind_kph} km/h`;

  document.getElementById("pressure").textContent =
    `${data.current.pressure_mb} mb`;

  document.getElementById("visibility").textContent =
    `${data.current.vis_km} km`;

  document.getElementById("sunrise").textContent =
    data.forecast.forecastday[0].astro.sunrise;

  document.getElementById("sunset").textContent =
    data.forecast.forecastday[0].astro.sunset;

  const pm25 = data.current.air_quality.pm2_5.toFixed(1);

  document.getElementById("airQuality").textContent = `${pm25} PM2.5`;

  document.getElementById("dFeels").textContent = showTemp(data.current.feelslike_c);
  document.getElementById("dHumidity").textContent = `${data.current.humidity}%`;
  document.getElementById("dWind").textContent = `${data.current.wind_kph} km/h`;
  document.getElementById("dPressure").textContent = `${data.current.pressure_mb} mb`;
  document.getElementById("dVisibility").textContent = `${data.current.vis_km} km`;
  document.getElementById("dAir").textContent = `${pm25} PM2.5`;

  setWeatherQuote(data.current.condition.text.toLowerCase());
}

function displayForecast(currentData, historyData) {
  const yesterdayData = historyData.forecast.forecastday[0].day;
  const todayData = currentData.forecast.forecastday[0].day;
  const tomorrowData = currentData.forecast.forecastday[1].day;

  document.getElementById("yesterdayDate").textContent =
    formatDate(historyData.forecast.forecastday[0].date);

  document.getElementById("yesterdayTemp").textContent =
    showTemp(yesterdayData.avgtemp_c);

  document.getElementById("yesterdayCondition").textContent =
    yesterdayData.condition.text;

  document.getElementById("todayDate").textContent =
    formatDate(currentData.forecast.forecastday[0].date);

  document.getElementById("todayTemp").textContent =
    showTemp(todayData.avgtemp_c);

  document.getElementById("todayCondition").textContent =
    todayData.condition.text;

  document.getElementById("tomorrowDate").textContent =
    formatDate(currentData.forecast.forecastday[1].date);

  document.getElementById("tomorrowTemp").textContent =
    showTemp(tomorrowData.avgtemp_c);

  document.getElementById("tomorrowCondition").textContent =
    tomorrowData.condition.text;
}

function setWeatherQuote(condition) {
  let quote = "🌍 Keep going no matter the weather.";

  if (condition.includes("rain")) quote = "🌧 Perfect day for chai and focused work.";
  else if (condition.includes("sun") || condition.includes("clear")) quote = "☀ Bright weather, bright mindset.";
  else if (condition.includes("cloud") || condition.includes("overcast")) quote = "☁ Calm day, stay consistent.";
  else if (condition.includes("mist") || condition.includes("fog")) quote = "🌫 Slow and steady still wins.";
  else if (condition.includes("storm")) quote = "⛈ Strong days build stronger people.";

  document.getElementById("weatherQuote").textContent = quote;
}

async function setupCitySlider(city) {
  currentCityForSlider = city;

  const cityKey = city.toLowerCase();
  let placesRaw = cityPlaces[cityKey];

  if (!placesRaw) {
    placesRaw = [
      [`${city}`, "City view"],
      [`${city} tourism`, "Tourist view"],
      [`${city} landmark`, "Landmark view"],
      [`${city} India`, "Local city view"]
    ];
  }

  currentPlaces = await Promise.all(
    placesRaw.map(async ([name, desc]) => {
      const image = await getWikiImage(`${name} ${city}`);
      return { name, desc, image };
    })
  );

  imageIndex = 0;

  showSlide();
  renderDots();
  renderFamousPlaces();

  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, 3500);
}

function showSlide() {
  const place = currentPlaces[imageIndex];
  const cityImage = document.getElementById("cityImage");

  cityImage.src = place.image;

  cityImage.onerror = function () {
    this.onerror = null;
    this.src = fallbackImage;
  };

  document.getElementById("placeName").textContent = place.name;
  document.getElementById("placeDesc").textContent = place.desc;
  document.getElementById("exploreTag").textContent =
    `📍 Exploring ${currentCityForSlider}`;

  renderDots();
}

function nextSlide() {
  imageIndex = (imageIndex + 1) % currentPlaces.length;
  showSlide();
}

function prevSlide() {
  imageIndex--;

  if (imageIndex < 0) {
    imageIndex = currentPlaces.length - 1;
  }

  showSlide();
}

function renderDots() {
  const dots = document.getElementById("dots");
  dots.innerHTML = "";

  currentPlaces.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === imageIndex ? "dot active" : "dot";

    dot.onclick = () => {
      imageIndex = index;
      showSlide();
    };

    dots.appendChild(dot);
  });
}

function renderFamousPlaces() {
  const box = document.getElementById("famousPlaces");
  box.innerHTML = "";

  currentPlaces.forEach((place, index) => {
    const div = document.createElement("div");
    div.className = "place-item";

    div.innerHTML = `
      <img src="${place.image}" onerror="this.onerror=null; this.src='${fallbackImage}'">
      <div>
        <h4>${place.name}</h4>
        <p>${place.desc}</p>
      </div>
    `;

    div.onclick = () => {
      imageIndex = index;
      showSlide();
    };

    box.appendChild(div);
  });
}

function saveSearch(city) {
  let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

  city = titleCase(city);

  searches = searches.filter(item => item.toLowerCase() !== city.toLowerCase());
  searches.unshift(city);

  if (searches.length > 5) searches.pop();

  localStorage.setItem("weatherSearches", JSON.stringify(searches));
}

function displaySearchHistory() {
  const historyDiv = document.getElementById("searchHistory");
  const searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

  historyDiv.innerHTML = "";

  if (searches.length === 0) {
    historyDiv.innerHTML = `<p class="empty-history">No recent searches yet.</p>`;
    return;
  }

  searches.forEach(city => {
    const wrapper = document.createElement("div");
    wrapper.className = "history-item";

    const button = document.createElement("button");
    button.textContent = city;
    button.className = "history-btn";

    button.onclick = () => {
      cityInput.value = city;
      getWeather(city);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-history-btn";

    deleteBtn.onclick = () => deleteSearch(city);

    wrapper.appendChild(button);
    wrapper.appendChild(deleteBtn);
    historyDiv.appendChild(wrapper);
  });

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear All";
  clearBtn.className = "clear-history-btn";
  clearBtn.onclick = clearSearchHistory;

  historyDiv.appendChild(clearBtn);
}

function deleteSearch(city) {
  let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];
  searches = searches.filter(item => item.toLowerCase() !== city.toLowerCase());
  localStorage.setItem("weatherSearches", JSON.stringify(searches));
  displaySearchHistory();
}

function clearSearchHistory() {
  localStorage.removeItem("weatherSearches");
  displaySearchHistory();
}

function addFavorite() {
  let favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  if (!favorites.some(city => city.toLowerCase() === currentCityName.toLowerCase())) {
    favorites.unshift(currentCityName);
  }

  localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  displayFavorites();
}

function displayFavorites() {
  const box = document.getElementById("favoriteCities");
  const favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  box.innerHTML = "";

  if (favorites.length === 0) {
    box.innerHTML = `<p class="empty-history">No favorite cities yet.</p>`;
    return;
  }

  favorites.forEach(city => {
    const wrapper = document.createElement("div");
    wrapper.className = "favorite-item";

    const btn = document.createElement("button");
    btn.className = "favorite-city-btn";
    btn.textContent = city;

    btn.onclick = () => {
      cityInput.value = city;
      getWeather(city);
    };

    const del = document.createElement("button");
    del.textContent = "×";
    del.className = "delete-fav-btn";

    del.onclick = () => deleteFavorite(city);

    wrapper.appendChild(btn);
    wrapper.appendChild(del);
    box.appendChild(wrapper);
  });
}

function deleteFavorite(city) {
  let favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
  favorites = favorites.filter(item => item.toLowerCase() !== city.toLowerCase());
  localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  displayFavorites();
}

function displayCityCategories() {
  const box = document.getElementById("cityCategories");
  box.innerHTML = "";

  Object.keys(cityCategories).forEach(state => {
    const stateDiv = document.createElement("div");
    stateDiv.className = "state-box";

    let buttons = "";

    cityCategories[state].forEach(city => {
      buttons += `<button class="city-btn" onclick="getWeather('${city}')">${city}</button>`;
    });

    stateDiv.innerHTML = `
      <h3>${state}</h3>
      <div>${buttons}</div>
    `;

    box.appendChild(stateDiv);
  });
}

function toggleCities() {
  const cityBox = document.getElementById("cityCategories");
  const icon = document.getElementById("cityToggleIcon");

  cityBox.classList.toggle("show-cities");
  icon.textContent = cityBox.classList.contains("show-cities") ? "▲" : "▼";
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function toggleTemp() {
  isCelsius = !isCelsius;

  if (currentWeatherData && currentHistoryData) {
    displayCurrentWeather(currentWeatherData);
    displayForecast(currentWeatherData, currentHistoryData);
  }
}

function startVoice() {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    message.textContent = "Voice search is not supported in this browser.";
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  message.textContent = "Listening...";

  recognition.onresult = function(event) {
    const city = event.results[0][0].transcript;
    cityInput.value = city;
    getWeather(city);
  };

  recognition.onerror = function() {
    message.textContent = "Voice search failed. Please try again.";
  };
}

function useLocation() {
  if (!navigator.geolocation) {
    message.textContent = "Location is not supported in your browser.";
    return;
  }

  message.innerHTML = '<div class="loader"></div>';

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(`${lat},${lon}`);
    },
    () => {
      message.textContent = "Location permission denied.";
    }
  );
}

cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") searchWeather();
});

window.onload = function() {
  cityInput.value = "Mysore";
  getWeather("Mysore");
  displaySearchHistory();
  displayFavorites();
  displayCityCategories();
};