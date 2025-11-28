import { useState, useEffect } from 'react'

// Utilities
import { formatDate } from '../utils/formatDate'

function useFetch(url ,symbol) {

    const [price, setPrice] = useState(null)
    const [previousclose, setPreviousClose] = useState(null)
    const [change, setChange] = useState(null)
    const [percentChange, setPercentChange] = useState(null)
    const [timestamp, setTimeStamp] = useState(null)
    const formatted = formatDate(new Date(timestamp * 1000))
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchPrice = async () => {
          try {
            const res = await fetch(url);

            if(res.status === 429) {
              return (<p className='flex items-center justify-center text-xl text-gray-500'>Too Many request, Please slow down!</p>)
            }

            if(!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`)
            }
            
            const data = await res.json();

            setPrice(data.c);
            setPreviousClose(data.pc)
            setChange(data.d)
            setPercentChange(data.dp);
            setTimeStamp(data.t);

            console.log("Fetched price:", data.c, data.dp, data.t);
           
          }
          catch (err) {
            console.error("Error fetching data:", err);
            setError('Failed to fetch price');
          }
          finally {
            setLoading(false)
          }
        }
    
        fetchPrice();
        const interval = setInterval(fetchPrice, 10000); // refresh every 10s

        return () => clearInterval(interval);
      }, [symbol, url]) 


  return {price, previousclose, change, percentChange, formatted, loading, error}
}

export default useFetch