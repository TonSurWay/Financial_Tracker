import { useState, useEffect} from 'react'
import './App.css'


// Icon
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

// Components
import Navbar from './components/Navbar'
import Card from './components/Card'
import StockCard from './components/StockCard'
import TransactionForm from './components/TransactionForm'
import TransactionHistory from './components/TransactionHistory'

// Utils
import { getLoacalStorage } from './utils/localStorage'
import { motion } from 'framer-motion'


function App() {
  const[transaction, setTransaction] = useState(() => getLoacalStorage('transaction'));

  const totalIncome = transaction
  .filter(i => i.types === "Income")
  .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalExpense = transaction
    .filter(i => i.types === "Expense")
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const netBalance = totalIncome - totalExpense;

  // Animate
  const fadeIn = {
    visible: {opacity: 1, x: 0},
    hidden: {opacity: 0 , x: 30}
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-8 p-4">
          <Card transaction={transaction} setTransaction={setTransaction} title="Total Income" amount={totalIncome} icon={<TrendingUp color='green'/>} color="green"/>
          <Card transaction={transaction} setTransaction={setTransaction} title="Total Expense" amount={totalExpense} icon={<TrendingDown color='red'/>} color="red"/>
          <Card transaction={transaction} setTransaction={setTransaction}  title="Net Balance" amount={netBalance} icon={<DollarSign />} color="black"/>
        </div>
      </div>
      
      <div className='container mx-auto max-w-7xl px-4 py-8 mt-4 w-full border-2 rounded-2xl border-gray-200'>
        <motion.h2 className='flex items-center justify-center lg:text-4xl md:text-3xl sm:text-2xl font-semibold' variants={fadeIn} initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}>
            $ Stocks Price Tracker
        </motion.h2>
        <hr className='my-4 border-gray-300'/>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-8">
          <StockCard symbol="NVDA" variants={fadeIn}/>
          <StockCard symbol="RGTI" variants={fadeIn}/>
          <StockCard symbol="NVTS" variants={fadeIn}/>
        </div>
      </div>
      <TransactionForm setTransaction={setTransaction} transaction={transaction} variants={fadeIn}/>
      
      <TransactionHistory setTransaction={setTransaction} transaction={transaction} variants={fadeIn}/>
      <div className='text-center my-6 text-gray-600'>
        &copy;2025 SurwayTracker. Manage your finances with confidence.
      </div>
    </>
  )
}

export default App
