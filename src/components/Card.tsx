import React from "react"

export type CardProps = {
  day: number
  temperature: number
  code: string
  index: number
  setSelectedDay(day: number): void
}

const Days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

export default function Card({ temperature, day, code, index, setSelectedDay }: CardProps) {
  const handleClick = () => {
    setSelectedDay(index)
  }

  return (
    <div
      className="w-[225px] h-[250px] border-[1px] border-slate-800 dark:border-slate-200 rounded-xl p-4 flex flex-col cursor-pointer hover:scale-105  hover:shadow-xl transition-transform"
      onClick={handleClick}
    >
      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{Days[day]}</div>
      <div className="text-center my-auto">
        <i className={`wi wi-owm-${code} text-slate-800 dark:text-slate-200 text-7xl`}></i>
      </div>
      <div
        className={`text-4xl sm:text-6xl text-center ${
          temperature > 37
            ? "text-red-500"
            : temperature < 36
            ? "text-sky-500"
            : "text-slate-800 dark:text-slate-200"
        } font-mono`}
      >
        {temperature}°
      </div>
    </div>
  )
}
