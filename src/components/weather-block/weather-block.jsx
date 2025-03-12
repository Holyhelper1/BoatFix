import { useEffect, useState } from "react";
import styles from "./weather-block.module.css";
import { createWeatherIcon } from "./utils/icon-weather";

export const WeatherBlock = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    const fetchWeather = async (cityName) => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ru&appid=acd4f346c669d7400f4dbbeb7f1350e0`);
        if (!res.ok) {
          throw new Error(`Ошибка при получении погоды: ${res.status} ${res.statusText}`);
        }
        const { main, name, weather } = await res.json();
        setCity(name);
        setTemperature(Math.round(main.temp));
        setWeather(weather[0].description);
        setWeatherIcon(createWeatherIcon(weather[0].description));
      } catch (error) {
        console.error("Ошибка:", error.message);
        await fetchWeather("Tomsk");
      }
    };

    const fetchLocation = async () => {
      try {
        const response = await fetch("https://api.sypexgeo.net/json/");
        if (!response.ok) {
          throw new Error("Не удалось получить данные по местоположению");
        }
        const data = await response.json();
        const currentCityName = data.city.name_en || "Tomsk";
        await fetchWeather(currentCityName);
      } catch (error) {
        console.warn("Не удалось получить данные по местоположению. Используется город по умолчанию: Tomsk");
        await fetchWeather("Tomsk"); 
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className={styles.footer_weather}>
      <div>
        {city},{" "}
        <div>
          {new Date().toLocaleDateString("ru", {
            day: "numeric",
            month: "long",
          })}
        </div>
      </div>
      <div className={styles.footer_weather_text}>
        <div className={styles.footer_weather_block}>
          <div>{weather}</div>
          <div>
            {temperature}°C
            <img
              className={styles.footer_weather_icon}
              src={weatherIcon}
              alt="weather-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


//хуже опретедяет местоположение и идёт запрос локации у клиента но работает
// import { useEffect, useState } from 'react';
// import styles from './weather-block.module.css';
// import { createWetherIcon } from './utils/icon-weather';

// export const WeatherBlock = () => {
//   const [city, setCity] = useState('');
//   const [temperature, setTemperature] = useState('');
//   const [weather, setWeather] = useState('');
//   const [weatherIcon, setWeatherIcon] = useState('');

//   useEffect(() => {
//     const fetchWeatherData = async (lat, lon) => {
//       const API_KEY = 'acd4f346c669d7400f4dbbeb7f1350e0'; // Ваш ключ API
//       const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${API_KEY}`);
//       const { main, name, weather } = await weatherResponse.json();
//       setCity(name);
//       setTemperature(Math.round(main.temp));
//       setWeather(weather[0].description);
//       setWeatherIcon(createWeatherIcon(weather[0].description));
//     };

//     const getLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             const { latitude, longitude } = position.coords;
//             fetchWeatherData(latitude, longitude);
//           },
//           () => {
//             console.error('Ошибка получения местоположения');

// 			fetchWeatherData(56.5011, 84.9895);
//           }
//         );
//       } else {
//         console.error('Geolocation не поддерживается вашим браузером');
// 		fetchWeatherData(56.5011, 84.9895);
//       }
//     };

//     getLocation();
//   }, []);

//   return (
//     <div className={styles.footer_weather}>
//       <div>
//         {city},{' '}
//         <div>
//           {new Date().toLocaleDateString('ru', {
//             day: 'numeric',
//             month: 'long',
//           })}
//         </div>
//       </div>
//       <div className={styles.footer_weather_text}>
//         <div className={styles.footer_weather_block}>
//           <div>{weather}</div>
//           <div>
//             {temperature}°C
//             <img
//               className={styles.footer_weather_icon}
//               src={weatherIcon}
//               alt="weather-icon"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
