import React from 'react'

// Icon
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'


function Card( { title, amount, color, icon }) {

  return (
    <div className={`border rounded-2xl p-6 ${color === "green" ? "bg-green-200/30 border-green-300/50" : color === "red" ? "bg-red-200/30 border-red-300/50" : "bg-gray-200/30 border-gray-400/50"}`}>
        <div className="flex items-center justify-between">
          <p className='font-medium text-gray-500 text-sm'>{title}</p>
          <div className={`${color === "green" ? " bg-green-200" : color === "red" ? "bg-red-200" : "bg-gray-200 "} rounded-xl h-10 w-10 flex items-center justify-center`}>{icon}</div>
        </div>

        <h3 className={`text-3xl font-bold flex items-center ${color === "green" ? "text-green-600" : color === "red" ? "text-red-600" : "text-black"}`}> ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h3>
    </div>
  )
}

export default Card