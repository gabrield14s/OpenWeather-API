const apiKey = "d14c83d80fc0e1f0fa5ae9e6f4f3a188";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");

let tagNameCity = document.getElementById("name-city");
let tagDegress = document.getElementById("degress");
let divBoxWithWheatherData = document.getElementsByName("div-box-wheater");
let divMenssageError = document.getElementById("div-menssage-error");

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  try {
    const response = await fetch(apiWeatherURL);
    const data = await response.json();
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
      let name = weatherData.name
      let temp =  weatherData.main.temp;
      
      console.log(name);     
      console.log(temp);
      
      if (divMenssageError.style.display == "block"){
        divMenssageError.style.display = "none"
        tagNameCity.innerText = name;
        tagDegress.innerText = temp + " C°";
        divBoxWithWheatherData[0].style.display = "block";
        divBoxWithWheatherData[1].style.display = "block";
      }
      tagNameCity.innerText = name;
      tagDegress.innerText = temp + " C°";
      divBoxWithWheatherData[0].style.display = "block";
      divBoxWithWheatherData[1].style.display = "block";
      
    } catch (error) {
      if (divBoxWithWheatherData[0].style.display == "block" & divBoxWithWheatherData[1].style.display == "block"){
        divBoxWithWheatherData[0].style.display = "none";
        divBoxWithWheatherData[1].style.display = "none";
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


        