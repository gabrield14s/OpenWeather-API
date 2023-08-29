const apiKey = "d14c83d80fc0e1f0fa5ae9e6f4f3a188";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");

let tagNameCity = document.getElementById("name-city");
let tagCountryIcon = document.getElementById("country-icon");
let tagDegress = document.getElementById("degress");
let tagCloudDescription = document.getElementById("cloud-description");
let descriptionIcon = document.getElementById("description-icon");
let tagHumidity = document.getElementById("humidity");
let tagWind = document.getElementById("wind");
let divBoxWithWheatherData = document.getElementsByName("div-box-wheater");
let divMenssageError = document.getElementById("div-menssage-error");
let cityData = document.getElementById('city-data');

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  try {
    const response = await fetch(apiWeatherURL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const showWeatherData = async () => {
  
  const cityValue = cityInput.value;

  if (cityValue) {
    try {
      const weatherData = await getWeatherData(cityValue);
      const countryIcon = `https://flagsapi.com/${weatherData.sys.country}/flat/32.png`;
      let name = weatherData.name;
      let temp =  weatherData.main.temp;
      let cloudDescription = weatherData.weather[0].description;
      
      // Inserindo os dados obtidos do JSON em nosso HTML
      tagNameCity.innerText = name;
      tagDegress.innerText = parseInt(temp) + " C°";
      tagCountryIcon.setAttribute("src", countryIcon);
      descriptionIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
      tagHumidity.innerText = `${weatherData.main.humidity}%`;
      tagWind.innerText = `${weatherData.wind.speed}km/h`;
      tagCloudDescription.innerText = cloudDescription;

      console.log(name);     
      console.log(temp);
      
      if (divMenssageError.style.display == "block"){
        divMenssageError.style.display = "none";

        divBoxWithWheatherData[0].style.display = "flex";
        divBoxWithWheatherData[1].style.display = "flex";
        divBoxWithWheatherData[2].style.display = "flex";
        divBoxWithWheatherData[3].style.display = "flex";
      }

      divBoxWithWheatherData[0].style.display = "flex";
      divBoxWithWheatherData[1].style.display = "flex";
      divBoxWithWheatherData[2].style.display = "flex";
      divBoxWithWheatherData[3].style.display = "flex";
      
    } catch (error) {
      if (divBoxWithWheatherData[0].style.display == "flex" & divBoxWithWheatherData[1].style.display == "flex" && divBoxWithWheatherData[2].style.display == "flex"){
        divBoxWithWheatherData[0].style.display = "none";
        divBoxWithWheatherData[1].style.display = "none";
        divBoxWithWheatherData[2].style.display = "none";
        divBoxWithWheatherData[3].style.display = "none";
        divMenssageError.style.display = "block";
      }
      divMenssageError.style.display = "block";
      console.log(error);
    }
  }
};

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  showWeatherData();
});


        