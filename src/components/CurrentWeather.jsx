import styled from "styled-components";

const Container = styled.div`
  margin: 3rem;
`;
const City = styled.div`
  display: flex;
  flex-direction: row;
`;
const Temperature = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.hr`
  border-top: 1px solid #bbb;
  border-radius: 5px;
  margin-top: 2vh;
  width: 20%;
`;

const CurrentWeather = ({ data }) => {
  const kelvin = 273.15;
  return (
    <Container>
      <City>
        <p style={{ textAlign: "left", flex: "1 1 0%" }}>{data.city}</p>
        <span style={{ marginTop: "-10px" }}>
          <img src={`icons/${data.weather[0].icon}.png`} />
        </span>
        <p style={{ textAlign: "right", flex: "1 1 0%" }}>
          Hoy, {data.weather[0].description}
        </p>
      </City>
      <Temperature>
        <span style={{ margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "33px" }}>
            {parseInt(data.main.temp - kelvin)}ºC{" "}
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0.25rem",
              fontSize: "14px",
            }}
          >
            Sensación térmica: {parseInt(data.main.feels_like - kelvin)}ºC
          </span>
          <span>Humedad: {data.main.humidity}%</span> - {""}
          <span>Viento: {data.wind.speed}50 m/s</span>
        </span>{" "}
      </Temperature>
      <Divider />
    </Container>
  );
};

export default CurrentWeather;
