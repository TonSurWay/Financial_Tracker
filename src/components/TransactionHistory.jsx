import { useEffect, useState } from 'react'

// Icon
import { FileText, Download, TrendingUp, TrendingDown, Trash2 } from 'lucide-react'

// Utilities
import { deleteTransaction, getLoacalStorage } from '../utils/localStorage'

// Animation
import { motion } from 'framer-motion';


function TransactionHistory({ transaction, setTransaction, variants }) {

    const [showAll, setShowAll] = useState(false);
    const limit = -10;
    const displayTransaction = showAll ? transaction : transaction.slice(limit);

    function handleDelete(index) {
        deleteTransaction(index);

        setTransaction(getLoacalStorage('transaction'));
    }

    

  return (
    <div className='container mx-auto max-w-7xl p-4 border-2 border-gray-200 rounded-2xl mt-4'>
        <motion.div className='flex items-center justify-between' variants={variants} initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="flex flex-col">
                <h3 className='text-xl font-medium'>Transaction History</h3>
                <p className='text-sm text-gray-600'>{transaction && `${transaction.length} of ${transaction.length} transactions`}</p>
            </div>

            <div className="flex items-center justify-between gap-2">
                <button className='inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer font-medium text-sm hover:bg-gray-100' ><FileText size={16}/> CSV</button>
                <button className='inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer font-medium text-sm hover:bg-gray-100'><Download size={16}/>PDF</button>
            </div>
        </motion.div>
        
        <div className="overflow-x-auto">
            <motion.table
                className="w-full text-sm caption-bottom min-w-[600px]"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <thead className="border-b transition-colors border-gray-200">
                <tr>
                    <th className="w-10 h-12 px-4 align-middle"></th>
                    <th className="w-20 h-12 px-4 text-center align-middle">Date</th>
                    <th className="w-30 h-12 px-4 text-left align-middle">Category</th>
                    <th className="w-50 h-12 px-4 text-left align-middle">Description</th>
                    <th className="w-30 h-12 text-right px-4">Amount</th>
                    <th className="w-10 h-12 px-4"></th>
                </tr>
                </thead>
                <tbody>
                {displayTransaction.map((item, id) => (
                    <tr
                    className="border-b transition-colors border-gray-200 hover:bg-gray-100 w-full"
                    key={id}
                    >
                    <td
                        className={`p-4 ${
                        item.types === "Income" ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {item.types === "Income" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </td>
                    <td className="p-4 text-center">{item.date.slice(5, 17)}</td>
                    <td className="p-4 font-medium">{item.category}</td>
                    <td className="p-4 text-gray-400">{item.description ? `${item.description}` : "-"}</td>
                    <td
                        className={`${
                        item.types === "Income" ? "text-green-600" : "text-red-500"
                        } p-4 font-semibold text-right`}
                    >
                        {item.types === "Income" ? "+" : "-"}$
                        {Number(item.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        })}
                    </td>
                    <td className="text-red-400 p-4">
                        <button
                        className="cursor-pointer hover:bg-white/30 p-2 rounded-2xl"
                        onClick={() => {
                            handleDelete(id);
                        }}
                        >
                        <Trash2 />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </motion.table>
        </div>

        <motion.div className='max-w-7xl flex items-center justify-center mt-4' variants={variants} initial="hidden"
        animate="visible"
        transition={{ duration: 1, ease: "easeOut" }}>
            <button className=' rounded-xl  px-4 py-2 cursor-pointer font-medium text-md underline-offset-4 hover:text-indigo-600 hover:underline transition-colors' 
            onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show More"}
            </button>
        </motion.div>
         
    </div>
  )
}

export default TransactionHistory