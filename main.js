const cards = document.getElementById("CardsPlaceHolder");
const CityName = document.getElementById("CityName");
const Input = document.getElementById("SearchInput");
const Searchbtn = document.getElementById("Searchbtn"); 

async function fetchWeather(city = "Cairo") {
  const link = `http://api.weatherapi.com/v1/forecast.json?key=0c97b8f6851c486b9f2225756253006&q=${city}&days=3`;

  try {
    const response = await fetch(link);
    const data = await response.json();

    CityName.textContent = data.location.name;
      console.log(data)

    let div = "";
    data.forecast.forecastday.forEach((day, index) => {
      const rawDate = new Date(day.date);
      const dayName = getDayName(day.date);
      const dateFormatted = `${rawDate.getDate()} ${rawDate.toLocaleString("en-US", { month: "long" })}`;
      const temp = index === 0 ? data.current.temp_c : day.day.avgtemp_c;
      const minTemp = day.day.mintemp_c;
      const maxTemp = day.day.maxtemp_c;
      const condition = day.day.condition.text;
      const icon = day.day.condition.icon;

      div += `
        <div class="col-md-4">
          <div class="card weather-card text-center p-4 h-100 d-flex flex-column">
            <div class="card-header-wrapper">
              <div class="card-header bg-transparent border-0">
                <p class="weather-day mb-0 d-inline">${dayName} </p>
                <p class="weather-date d-inline">${dateFormatted}</p>
              </div>
            </div>
            <div class="card-body d-flex flex-column justify-content-center">
              <div>
                <img src="https:${icon}" alt="${condition}" class="mb-3" />
                <h1 class="weather-temp">${temp}°C</h1>
                <p class="mb-0 fs-4"> <span style="color: #00A9FF;"> High: </span> ${maxTemp}°C</p>
                <p class="weather-subtemp fs-4"><span style="color: #00A9FF;">Low: </span> ${minTemp}°C </p> 
                <p class="weather-condition fs-3 fw-bolder" style="color: #00A9FF;">${condition}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    cards.innerHTML = div;

  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

function getDayName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

Searchbtn.addEventListener("click", function (e) {
  e.preventDefault();
  const city = Input.value.trim() || "Cairo";
  fetchWeather(city);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
});
