import React, { useState, useEffect } from "react"

export type CurrentCardProps = {
  cityName: string
  weather: {
    weatherDate: Date
    temperature: number
    description: string
    iconID: string
  }
}

export default function CurrentCard({ cityName, weather }: CurrentCardProps): JSX.Element {
  const [cityData, setCityData] = useState<{
    city: string
    country: string
  } | null>(null)

  useEffect(() => {
    if (cityName) {
      setCityData(() => {
        const tmp = cityName.split(",")
        return {
          city: tmp[0],
          country: tmp[1],
        }
      })
    }
  }, [cityName])

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-center sm:gap-10 my-10 text-slate-800 dark:text-slate-200">
      <div className="flex gap-10">
        <div className="text-center text-2xl sm:text-4xl flex flex-col font-semibold justify-center">
          <div>{cityData?.city}</div>
          <div>{cityData?.country}</div>
        </div>
        <div className="">
          <div className="text-2xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-400">
            {weather.weatherDate.toDateString()}
          </div>
          <div className="font-bold text-4xl sm:text-6xl">{weather.temperature}°</div>
          <div className="text-2xl sm:text-2xl font-bold text-slate-600 dark:text-slate-400">
            {weather.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <i className={`wi wi-owm-${weather.iconID} text-8xl mt-5 sm:mt-0`} />
      </div>
    </div>
  )
}
