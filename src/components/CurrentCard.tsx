import React from "react"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"

export type CurrentCardProps = {
  cityName?: {
    city: string
    country: string
  }
  weather?: {
    dateForecast: Date | null
    description: string | null
    iconID: string | null
    temp: number | null
    tempMax: number | null
    tempMin: number | null
    humidity: number | null
  }
}

export default function CurrentCard({ cityName, weather }: CurrentCardProps): JSX.Element {
  return (
    <div id="currentWeatherDiv" className="flex flex-col items-center sm:justify-center gap-10 text-slate-800 dark:text-slate-200">
      <div className="text-center text-5xl tracking-widest flex flex-col font-extrabold justify-center">
        <div>{cityName?.city || "ENTER"}</div>
        <div>{cityName?.country || "CITY"}</div>
      </div>
      <div className="grid grid-row-2 sm:grid-cols-12 gap-10 items-center">
        <div className="sm:col-span-8">
          <div className="text-2xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-400">
            {(weather && weather.dateForecast) ? weather.dateForecast.toDateString() : new Date().toDateString()}
          </div>
          <div className="font-bold text-6xl grid grid-cols-4">
            <div className="col-span-3">{Math.floor(weather?.temp || 0)}°C</div>
            <div className="text-2xl col-span-1">
              <div className="flex items-center">
                <AiOutlineArrowUp />
                {Math.floor(weather?.tempMax || 0)}°C
              </div>
              <div className="flex items-center">
                <AiOutlineArrowDown />
                {Math.floor(weather?.tempMin || 0)}°C
              </div>
            </div>
          </div>
          <div className="text-2xl sm:text-2xl font-bold text-slate-600 dark:text-slate-400">
            {weather?.description?.toUpperCase() || "NO CITY SELECTED"}
          </div>
        </div>
        <div className="sm:col-span-4 flex flex-col justify-center items-center gap-1">
          <i className={`wi wi-owm-${weather?.iconID || 800} text-8xl mt-5 sm:mt-0`} />
          <div className="text-xl text-center font-semibold">
            {weather?.humidity || 0}%<div>HUMIDITY</div>
          </div>
        </div>
      </div>
    </div>
  )
}
