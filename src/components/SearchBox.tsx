import React, { ChangeEvent, MouseEvent, useEffect, useRef } from "react"
import axios from "axios"

type CityProps = {
  id: string
  geonameId: number
  name: string
}

type APIResponse = {
  id: string
  geonameId: number
  type: string
  name: string
  population: number
  elevation: number
  timezoneId: string
  country: CityProps
  adminDivision1: CityProps
  adminDivision2: CityProps
  score: number
  coordinates: {
    latitude: number
    longitude: number
  }
}

const useDebounce = (effect: React.EffectCallback, delay: number, deps?: React.DependencyList) => {
  React.useEffect(() => {
    const handler = setTimeout(effect, delay)

    return () => clearTimeout(handler)
  }, [...(deps || []), delay])
}

export type CityWeather = {
  name?: string
  country?: string
  weather?: Array<{
    id?: string
    iconId?: string
    description?: string
    dateForecast?: Date
    temp?: number
  }>
}

type DropdownProps = {
  items: APIResponse[]
  setSearchInput(cityObj: APIResponse): void
  setSelectedCity(cityObj: CityWeather): void
}

const Dropdown = ({ items, setSearchInput, setSelectedCity }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mouseClick = (evt: Event) => {
      const evtObj = evt?.target as Element
      if (dropdownRef.current?.contains(evtObj))
        dropdownRef.current !== evtObj && dropdownRef.current.classList.add("hidden")
      else if (evtObj.id === "dropdownInput") {
        dropdownRef.current?.classList.contains("hidden") &&
          dropdownRef.current.classList.remove("hidden")
      } else dropdownRef.current?.classList.add("hidden")
    }
    window.addEventListener("click", mouseClick)
    return () => window.removeEventListener("click", mouseClick)
  }, [])

  React.useEffect(() => {
    const onFocus = () => {
      dropdownRef.current?.classList.remove("hidden")
    }

    const inputElem = document.getElementById("dropdownInput")

    inputElem?.addEventListener("focus", onFocus)
    return () => inputElem?.removeEventListener("focus", onFocus)
  }, [])

  const handleClick = (evt: MouseEvent) => {
    const elem = evt.target as Element
    const cityObj = items.filter((item) => item.id === elem.id)[0]
    setSearchInput(cityObj)
    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast",
      params: {
        appid: import.meta.env.VITE_WEATHER_API_KEY,
        units: "metric",
        // lat: cityObj.coordinates.latitude,
        // lon: cityObj.coordinates.longitude,
        q: `${cityObj.name}, ${cityObj.country.name}`
      },
    }

    axios
      .request(options)
      .then(function ({ data: { list, city } }) {
        const cityWeather: CityWeather = {}
        cityWeather.name = city?.name
        cityWeather.country = city?.country
        cityWeather.weather = []
        for (let i = 0; i < list?.length; i += 8) {
          cityWeather.weather.push({
            id: list[i]?.dt,
            iconId: list[i]?.weather[0]?.id,
            description: list[i]?.weather[0]?.description,
            dateForecast: new Date(list[i]?.dt * 1000),
            temp: list[i]?.main?.temp,
          })
        }
        setSelectedCity(cityWeather)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <div className="w-full max-h-80 absolute overflow-auto shadow-xl" ref={dropdownRef}>
      {items.length !== 0 &&
        items?.map((city) => (
          <div
            id={city.id}
            key={city.id}
            className="dark:bg-slate-800 bg-slate-200 dark:text-slate-200 text-slate-800 my-1 p-2 rounded-lg dark:hover:bg-slate-200 dark:hover:text-slate-800 hover:bg-slate-800 hover:text-slate-200 cursor-pointer"
            onClick={handleClick}
          >
            {city.name}, {city.country.id}
          </div>
        ))}
    </div>
  )
}

type SearchBoxProps = {
  setSelectedCity(city: CityWeather): void
}

export default function SearchBox({ setSelectedCity }: SearchBoxProps): JSX.Element {
  const [searchCity, setSearchCity] = React.useState<string>("")
  const [cityList, setCityList] = React.useState<APIResponse[]>(() => [])

  const handleSearchCity = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(event.target.value)
  }

  useDebounce(
    () => {
      const options = {
        method: "GET",
        url: "https://spott.p.rapidapi.com/places/autocomplete",
        params: {
          limit: "10",
          skip: "0",
          q: searchCity,
          type: "CITY",
        },
        headers: {
          "X-RapidAPI-Key": "c68c4d1b07msh0850d4fc5806174p1f5d49jsndc8ce82b58ed",
          "X-RapidAPI-Host": "spott.p.rapidapi.com",
        },
      }

      if (searchCity && searchCity !== "" && searchCity.length >= 3) {
        axios
          .request<APIResponse[]>(options)
          .then(function (response) {
            setCityList(response.data)
          })
          .catch(function (error) {
            console.error(error)
          })
        // setCityList(testResponse);
      }
    },
    1000,
    [searchCity],
  )

  React.useEffect(() => {
    if (searchCity.length <= 2 && Array.isArray(cityList) && cityList.length !== 0) {
      setCityList([])
    }
  }, [cityList, searchCity])

  return (
    <div className=" mt-4 flex flex-col items-center">
      <div className="w-fit relative">
        <input
          id="dropdownInput"
          type="text"
          autoComplete="off"
          placeholder="Search"
          className="min-w-[300px] sm:min-w-[500px] text-[20px] p-3 focus:outline-none focus:ring-2 ring-slate-800 dark:ring-slate-200 ring-offset-slate-300 dark:ring-offset-slate-900 ring-offset-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-900"
          value={searchCity}
          onChange={handleSearchCity}
          minLength={3}
        />
        <Dropdown
          items={cityList}
          setSearchInput={(cityObj) => {
            setSearchCity(`${cityObj.name}, ${cityObj.country.id}`)
          }}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </div>
  )
}
