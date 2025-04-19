import React, { useState } from "react";
import lodingGif from './assets/Loading Rings.gif'

const App = () => {
  const [City, setCity] = useState("");
  const [wDetails, setWdetails] = useState();
  const [darkMode, setDarkMode] = useState(false);
  let [isLoding,setIsLoding]=useState(false)

  const getData = (e) => {
    setIsLoding(true)
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
        setIsLoding(false)
      });
    setCity("");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-400 to-indigo-600"
      }`}
    >
      <div
        className={`rounded-2xl shadow-lg p-6 w-full max-w-md transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Weather App</h1>
            <p className="text-sm">Check the current weather</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <form onSubmit={getData} className="mb-4 flex">
          <input
            value={City}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        <div className="flex justify-center">
        <img src={lodingGif} style={{ width: "150px", height:"150px" }} className={isLoding ? "" : "hidden"}/>
        </div>

        {wDetails !== undefined ? (
          <>
            <div className=" bg-gray-800 dark:text-white  rounded-lg p-4 text-center">
              <h2 className="text-xl font-semibold">
                {wDetails.name}, {wDetails.sys.country}
              </h2>
              <p className="text-5xl font-bold text-blue-700 dark:text-blue-400">
                {wDetails.main.temp}℃
              </p>
              <span className="mt-2 flex items-center justify-center space-x-2">
                <img
                  src={`http://openweathermap.org/img/wn/${wDetails.weather[0].icon}.png`}
                  alt="weather icon"
                />
                <p className="text-md">{wDetails.weather[0].description}</p>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
              <div>
                <p className="font-semibold">Humidity</p>
                <p>{wDetails.main.humidity} %</p>
              </div>
              <div>
                <p className="font-semibold">Wind</p>
                <p>{wDetails.wind.speed} km/h</p>
              </div>
              <div>
                <p className="font-semibold">Pressure</p>
                <p>{wDetails.main.pressure} hPa</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default App;
