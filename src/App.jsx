import { createContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Input from "./components/Input";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import { BASE_URL, API_KEY } from "./services/weather";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

const Container = styled.div`
  margin: 0 auto;
  background-color: #fff;
  color: black;
  overflow: hidden;
  margin-top: 1rem;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  border-top-width: 2px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.55),
    0 4px 6px -2px rgba(0, 0, 0, 0.35);
  width: 50%;

  @media (max-width: 768px) {
    width: 70%;
  }
  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeather = axios(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=sp`
    );
    const dailyWeather = axios(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=sp`
    );

    const [firstResp, secondResp] = await Promise.all([
      currentWeather,
      dailyWeather,
    ]);

    const currentWeatherResponse = firstResp.data;
    const dailyWeatherResponse = secondResp.data;

    setCurrentWeather({
      city: searchData.label,
      ...currentWeatherResponse,
    });

    setDailyWeather({ city: searchData.label, ...dailyWeatherResponse });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Container id={theme}>
        <Input onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {dailyWeather && <DailyWeather data={dailyWeather} />}
        <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </Container>
    </ThemeContext.Provider>
  );
};

export default App;
