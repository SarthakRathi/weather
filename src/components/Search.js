import "./Search.css";
import Winfo from "./Winfo";
import axios from "axios";
import cloud from "./icons/cloudy.png";
import clear from "./icons/clear.png";
import drizzle from "./icons/drizzle.png";
import mist from "./icons/mist.png";
import rain from "./icons/rain.png";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

const Search = () => {
  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleClick();
    }
  };

  const [data, setData] = useState({
    celcius: "",
    name: "",
    humidity: "",
    speed: "",
  });

  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=88ab1d926d6f741abc21281cf3ce3df8&units=metric`;
      axios.get(apiUrl).then((res) => {
        setIsEditing(true);

        let imagePath = "";
        if (res.data.weather[0].main === "Clear") {
          imagePath = clear;
        } else if (res.data.weather[0].main === "Rain") {
          imagePath = rain;
        } else if (res.data.weather[0].main === "Drizzle") {
          imagePath = drizzle;
        } else if (res.data.weather[0].main === "Mist") {
          imagePath = mist;
        } else if (res.data.weather[0].main === "Clouds") {
          imagePath = cloud;
        } else {
          imagePath = cloud;
        }

        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath,
        });
      });
    }
  };

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="container" id={theme}>
        <div className="weather">
          <div className="search">
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
            />
            <button onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          {isEditing && (
            <Winfo
              image={data.image}
              celcius={data.celcius}
              name={data.name}
              humidity={data.humidity}
              speed={data.speed}
            />
          )}
          <p>Change Mode</p>{" "}
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Search;
