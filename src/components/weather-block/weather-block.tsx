import { useEffect, useState } from "react";
import styles from "./weather-block.module.css";
import { createWeatherIcon } from "./utils/icon-weather";
import { WeatherData } from "../../types";

const WEATHER_API_KEY =
  process.env.REACT_APP_OPENWEATHER_API_KEY || "acd4f346c669d7400f4dbbeb7f1350e0";
const DEFAULT_CITY = "Tomsk";

interface WeatherApiResponse {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

interface GeoApiResponse {
  city?: { name_en?: string };
}

export const WeatherBlock = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async (cityName: string) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ru&appid=${WEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as WeatherApiResponse;
        if (cancelled) return;
        setData({
          city: json.name,
          temp: Math.round(json.main.temp),
          desc: json.weather[0].description,
          icon: createWeatherIcon(json.weather[0].description),
        });
      } catch (err) {
        console.warn(
          "Weather fetch failed, trying default city:",
          err instanceof Error ? err.message : String(err)
        );
        if (!cancelled && cityName !== DEFAULT_CITY) {
          fetchWeather(DEFAULT_CITY);
        } else {
          if (!cancelled) setError(true);
        }
      }
    };

    const fetchLocation = async () => {
      try {
        const res = await fetch("https://api.sypexgeo.net/json/");
        if (!res.ok) throw new Error("Geolocation failed");
        const geo = (await res.json()) as GeoApiResponse;
        const cityName = geo?.city?.name_en || DEFAULT_CITY;
        if (!cancelled) fetchWeather(cityName);
      } catch {
        if (!cancelled) fetchWeather(DEFAULT_CITY);
      }
    };

    fetchLocation();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className={styles.footer_weather}>
        <span className={styles.footer_weather_fallback}>Погода: Томск</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.footer_weather}>
        <span className={styles.footer_weather_fallback}>Загрузка погоды...</span>
      </div>
    );
  }

  return (
    <div className={styles.footer_weather}>
      <span>{data.city}, </span>
      <span>
        {new Date().toLocaleDateString("ru", {
          day: "numeric",
          month: "long",
        })}
      </span>
      <span className={styles.footer_weather_block}>
        <span>{data.desc}</span>
        <span>
          {data.temp}°C
          {data.icon && (
            <img
              className={styles.footer_weather_icon}
              src={data.icon}
              alt=""
            />
          )}
        </span>
      </span>
    </div>
  );
};
