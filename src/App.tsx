import React from "react";
import { ToggleButton, Card, CurrentCard, SearchBox } from "./components";
import type { CityWeather } from "./components/SearchBox";

function App(): JSX.Element {
  const [selectedCity, setSelectedCity] = React.useState<CityWeather | null>(null);
  const [selectedDay, setSelectedDay] = React.useState<number>(0);

  return (
    <div className="text-slate-800 dark:text-slate-200 grid grid-rows-[150px_minmax(200px,_1fr)_150px] min-h-screen">
      <div className="flex items-center justify-center">
        <SearchBox setSelectedCity={setSelectedCity} />
      </div>
      <div className="">
        {selectedCity?.name &&
        selectedCity?.country &&
        selectedCity?.weather &&
        selectedCity.weather[selectedDay]?.dateForecast &&
        selectedCity.weather[selectedDay]?.description &&
        selectedCity.weather[selectedDay]?.iconId &&
        selectedCity.weather[selectedDay]?.temp &&
        selectedCity.weather[selectedDay]?.tempMax &&
        selectedCity.weather[selectedDay]?.tempMin &&
        selectedCity.weather[selectedDay]?.humidity ? (
          <>
            <CurrentCard
              cityName={{ city: selectedCity?.name, country: selectedCity?.country }}
              weather={{
                dateForecast: selectedCity.weather[selectedDay]?.dateForecast,
                description: selectedCity.weather[selectedDay]?.description,
                iconID: selectedCity.weather[selectedDay]?.iconId,
                temp: selectedCity.weather[selectedDay]?.temp,
                tempMax: selectedCity.weather[selectedDay]?.tempMax,
                tempMin: selectedCity.weather[selectedDay]?.tempMin,
                humidity: selectedCity.weather[selectedDay]?.humidity,
              }}
            />
            <div className="flex overflow-auto gap-4 p-2 mt-4 w-screen sm:w-full sm:justify-center">
              {selectedCity.weather.map((weather, index) => (
                <Card
                  code={weather.iconId || ""}
                  day={weather.dateForecast?.getUTCDay() || index}
                  setSelectedDay={setSelectedDay}
                  temperature={Math.floor(weather.temp || 0)}
                  index={index}
                />
              ))}
            </div>
          </>
        ) : (
          <CurrentCard />
        )}
      </div>
      <footer className="flex flex-col justify-end items-center">
        <ToggleButton />
        <span>COPYRIGHT &copy; 2022 JOSHUA B. LIMPIADO</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
}

export default App;
