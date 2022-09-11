import React from "react"
import { ToggleButton, Card, CurrentCard, SearchBox } from "./components"
import type { CityWeather } from "./components/SearchBox"

function App(): JSX.Element {
  const [selectedCity, setSelectedCity] = React.useState<CityWeather | null>(null)
  const [selectedDay, setSelectedDay] = React.useState<number>(0)

  // React.useEffect(() => {
  //   console.log(selectedCity)
  // },[selectedCity])

  return (
    <div className="min-h-screen min-w-full p-4">
      <div className="p-4 my-4 min-h-[600px] rounded-lg ">
        <ToggleButton />
        <SearchBox setSelectedCity={setSelectedCity} />
        {selectedCity === null ? (
          <h1 className="text-5xl text-center font-bold tracking-[.5em] text-slate-900 dark:text-slate-200 mt-10">
            ENTER CITY
          </h1>
        ) : (
          <>
            <CurrentCard
              cityName={`${selectedCity?.name}, ${selectedCity?.country}`}
              weather={{
                description:
                  (selectedCity?.weather && selectedCity?.weather[selectedDay]?.description) || "",
                iconID: (selectedCity?.weather && selectedCity?.weather[selectedDay]?.iconId) || "",
                temperature: Math.round(
                  (selectedCity?.weather && selectedCity?.weather[selectedDay]?.temp) || 0,
                ),
                weatherDate:
                  (selectedCity?.weather && selectedCity?.weather[selectedDay]?.dateForecast) ||
                  new Date(),
              }}
            />
            <div className="flex gap-4 sm:justify-center overflow-auto p-2">
              {selectedCity?.weather &&
                selectedCity?.weather?.map((weather, index) => (
                  <Card
                    key={weather?.id}
                    code={weather?.iconId || ""}
                    day={weather?.dateForecast?.getUTCDay() || 0}
                    temperature={Math.round(weather?.temp || 0)}
                    setSelectedDay={setSelectedDay}
                    index={index}
                  />
                ))}
            </div>
          </>
        )}
      </div>
      <footer className="dark:text-slate-400 text-center flex flex-col">
        <span className="text-2xl flex justify-center gap-5">
          <a href="https://github.com/d3vLimpiado" target="_blank" rel="noreferrer">
            <i className="bx bxl-github hover:text-sky-600"></i>
          </a>
          <a href="https://facebook.com/josh.limpiado" target="_blank" rel="noreferrer">
            <i className="bx bxl-facebook hover:text-sky-600"></i>
          </a>
          <a href="mailto:devlimpiado@gmail.com">
            <i className="bx bxl-gmail hover:text-sky-600"></i>
          </a>
        </span>
        <span>&copy; 2022 - Joshua Barcial Limpiado</span>
      </footer>
    </div>
  )
}

export default App
