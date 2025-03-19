import './styles/reset.css';
import './styles/style.css';



// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

});

async function getWeather(city) {
  const apiKey = import.meta.env.VITE_API_KEY;;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const loaderTemp = document.getElementById(`loader-${city}-temp`);
  const loaderHumidity = document.getElementById(`loader-${city}-humidity`);
  const loaderFeelsLike = document.getElementById(`loader-${city}-feels-like`);

  loaderTemp.style.display = 'inline-block';
  loaderHumidity.style.display = 'inline-block';
  loaderFeelsLike.style.display = 'inline-block';

  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(url);
    console.log(json.main.temp);
    console.log(json.main.humidity);
    console.log(json.main.feels_like);

    setTimeout(() => {
      const tempElement = document.getElementById(`temperature-${city}`);
      tempElement.innerText = `${json.main.temp}°C`;

      const humidityElement = document.getElementById(`humidity-${city}`);
      humidityElement.innerText = `${json.main.humidity}%`;

      const feelsLikeElement = document.getElementById(`feels-like-${city}`);
      feelsLikeElement.innerText = `${json.main.feels_like}°C`;

      loaderTemp.style.display = 'none';
      loaderHumidity.style.display = 'none';
      loaderFeelsLike.style.display = 'none';
    }, 3000);
  } catch (error) {
    console.log(error);
    loaderElement.style.display = 'inline-block';
  }
}

async function getWeatherForCities() {
  const cities = ['London', 'Rio De Janeiro', 'Miami', 'Marrakech', 'Riyad'];

  for (let city of cities) {
    await getWeather(city);
  }
}

getWeatherForCities();