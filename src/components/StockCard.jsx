// State
import {useState, useEffect} from 'react'
// Icon
import { TrendingDown, TrendingUp } from 'lucide-react'

// Animation
import { motion } from 'framer-motion'

import useFetch from '../hooks/useFetch'

function StockPrice( {symbol = "symbol", variants} ) {
    
    
    const API_KEY = "d4a9j71r01qnehvtj96gd4a9j71r01qnehvtj970"
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`

    const { price, previousclose, change, percentChange, formatted, loading, error } = useFetch(url)
    

    if(loading) return (<p className='flex items-center justify-center text-xl text-gray-500'>Loading Price...{loading}</p>)
      
    if(error) return (<p className='min-h-screen flex items-center justify-center text-2xl text-gray-500'>Error to fetching {error}</p>)


  return (
    <motion.div className="max-w-3xl w-full flex flex-col gap-4 border-2 border-gray-200 p-4 rounded-2xl" variants={variants} initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-medium'>Stocks</h1>
        <h1 className="text-lg font-semibold">{symbol}</h1>
      </div>

      <div className='flex items-center justify-between'>
        <h2 className='text-sm text-gray-600'>Current Price</h2>
        <p className="text-md font-medium text-green-600 flex justify-center items-center">${price}</p>
      </div>

      <div className='flex items-center justify-between'>
        <h2 className='text-sm text-gray-600'>Previous Close</h2>
        <p className="text-md font-medium text-green-600 flex justify-center items-center">${previousclose}</p>
      </div>
        
      <div className='flex items-center justify-between'>
        <h2 className='text-sm text-gray-600'>Change</h2>
        <span className={`text-sm mt-2 font-medium w-fill flex items-center justify-end gap-0.5 ${
          percentChange < 0 ? "text-red-600" : "text-green-600"
        }`}> {percentChange < 0 ? <TrendingDown size={16}/> : <TrendingUp size={16}/>} ${change} ({percentChange}%)</span>
      </div>
        
        <div className='flex items-center justify-between'>
          <h2 className='text-sm text-gray-600'>Timestamp</h2>
          <span className='text-sm text-gray-800'>{formatted}</span>
        </div>
    </motion.div>
  )
}

export default StockPrice