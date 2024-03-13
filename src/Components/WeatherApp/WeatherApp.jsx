import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import { Loader } from "../Loader";
import { StartingLoader } from "../StartingLoader";

import { toast } from "react-toastify";

function WeatherApp() {
  const [searchVal, setSearchVal] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [wicon, setWicon] = useState(cloud_icon);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  let apiKey = "b67211796bb48c267589fa71f87f28c8";

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    if (lat & long) {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
          if (
            data?.weather[0]?.icon === "0ld" ||
            data?.weather[0]?.icon === "0ln"
          ) {
            setWicon(clear_icon);
          } else if (
            data?.weather[0]?.icon === "02d" ||
            data?.weather[0]?.icon === "02n"
          ) {
            setWicon(cloud_icon);
          } else if (
            data?.weather[0]?.icon === "03d" ||
            data?.weather[0]?.icon === "03n"
          ) {
            setWicon(drizzle_icon);
          } else if (
            data?.weather[0]?.icon === "04d" ||
            data?.weather[0]?.icon === "04n"
          ) {
            setWicon(drizzle_icon);
          } else if (
            data?.weather[0]?.icon === "09d" ||
            data?.weather[0]?.icon === "09n"
          ) {
            setWicon(rain_icon);
          } else if (
            data?.weather[0]?.icon === "10d" ||
            data?.weather[0]?.icon === "10n"
          ) {
            setWicon(rain_icon);
          } else if (
            data?.weather[0]?.icon === "13d" ||
            data?.weather[0]?.icon === "13n"
          ) {
            setWicon(snow_icon);
          } else {
            setWicon(clear_icon);
          }
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [lat, long]);

  const search = async () => {
    setSearchLoading(true);
    if (searchVal === "") {
      return 0;
    }
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=Metric&appid=${apiKey}`
      );
      let data = await response.json();
      setWeatherData(data);
      console.log(data);

      if (data.cod !== 200) {
        toast.error(data.message);
        setSearchLoading(false);
        fetchData();
      } else {
        if (
          data?.weather[0]?.icon === "0ld" ||
          data?.weather[0]?.icon === "0ln"
        ) {
          setWicon(clear_icon);
        } else if (
          data?.weather[0]?.icon === "02d" ||
          data?.weather[0]?.icon === "02n"
        ) {
          setWicon(cloud_icon);
        } else if (
          data?.weather[0]?.icon === "03d" ||
          data?.weather[0]?.icon === "03n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data?.weather[0]?.icon === "04d" ||
          data?.weather[0]?.icon === "04n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data?.weather[0]?.icon === "09d" ||
          data?.weather[0]?.icon === "09n"
        ) {
          setWicon(rain_icon);
        } else if (
          data?.weather[0]?.icon === "10d" ||
          data?.weather[0]?.icon === "10n"
        ) {
          setWicon(rain_icon);
        } else if (
          data?.weather[0]?.icon === "13d" ||
          data?.weather[0]?.icon === "13n"
        ) {
          setWicon(snow_icon);
        } else {
          setWicon(clear_icon);
        }
        setSearchVal("");
        setSearchLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("city not found");
    }
  };

  return (
    <>
      {isLoading ? (
        <StartingLoader></StartingLoader>
      ) : (
        <div className="container">
          <div className="top-bar">
            <input
              type="text"
              className="cityInput"
              placeholder="search"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
            <div
              className="search-icon"
              onClick={() => (!searchVal.trim() ? null : search())}
            >
              <img src={search_icon} alt="" />
            </div>
          </div>
          {searchLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <div className="weather-image">
                <img src={wicon} alt="" />
              </div>
              <div className="weather-temp">{weatherData?.main?.temp}°C</div>
              <div className="weather-location">{weatherData?.name}</div>
              <div className="data-container">
                <div className="element">
                  <img src={humidity_icon} alt="" className="icon" />
                  <div className="data">
                    <div className="humidity-percentage">
                      {weatherData?.main?.humidity} %
                    </div>
                    <div className="text">humidity</div>
                  </div>
                </div>
                <div className="element">
                  <img src={wind_icon} alt="" className="icon" />
                  <div className="data">
                    <div className="humidity-percentage">
                      {weatherData?.wind?.speed} km/h
                    </div>
                    <div className="text">wind speed</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default WeatherApp;
