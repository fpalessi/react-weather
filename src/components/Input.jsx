import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { config, GEO_API } from "../services/weather";

const Input = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      config
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData); //update the search with the data from the input (searchData)
    onSearchChange(searchData); //fn that's been passed from the parent component
  };

  return (
    <AsyncPaginate
      placeholder="Busca el tiempo actual y previsión de una gran ciudad"
      debounceTimeout={400}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Input;
