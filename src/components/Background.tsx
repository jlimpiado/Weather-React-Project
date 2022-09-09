import React from "react"

interface BackgroundProps {
  children?: React.ReactNode
}

export default function Background({ children }: BackgroundProps) {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-900 dark:to-slate-700 ">
      {children}
    </div>
  )
}
