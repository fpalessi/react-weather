import styled from "styled-components";

const Container = styled.div`
  margin: 1rem;
`;

const Wrapper = styled.div`
  margin-left: 5px;
`;

const DAYS = [
  "Lunes",
  "Martes",
  "Miérc.",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const DailyWeather = ({ data }) => {
  const todaysIndex = new Date().getDay(); //returns idx of today -> Lunes 0 Martes 1...

  const nextDays = DAYS.slice(todaysIndex, DAYS.length).concat(
    DAYS.slice(0, todaysIndex)
  );
  const kelvin = 273.15;
  return (
    <Container>
      <Wrapper>
        {data.list.slice(0, 4).map((item, index) => (
          <ul style={{ marginTop: "5px" }} key={index}>
            <li
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "1rem",
              }}
            >
              <span style={{ flex: "1 1 0%", textAlign: "left" }}>
                {nextDays[index]}
              </span>
              <span>
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  loading="lazy"
                  width={50}
                  style={{ marginTop: "-20px" }}
                />
              </span>
              <span
                style={{
                  flex: "1 1 0%",
                  textAlign: "right",
                  fontWeight: "500",
                }}
              >
                {parseInt(item.main.feels_like - kelvin)}&deg; - {""}
                {item.weather[0].description}
              </span>
            </li>
          </ul>
        ))}
      </Wrapper>
    </Container>
  );
};

export default DailyWeather;
