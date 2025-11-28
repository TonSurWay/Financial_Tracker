import { useEffect, useState } from 'react'

// Reusable function
import { setLocalStorage } from '../utils/localStorage'
import { formatDate } from '../utils/formatDate';

// Components
import Inputbox from './Inputbox';
import Selectbox from './Selectbox';

// Animation
import { motion } from 'framer-motion';

function TransactionForm({ setTransaction, transaction, variants }) {

    const categories = {
        Income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
        Expense: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Health', 'Other']
    }

    const[form, setForm] = useState({
        types: "Expense",
        amount: "",
        category: "",
        description: ""
    });

    const[loading, setLoading] = useState(false)
    const[showErrors, setShowErrors] = useState(false);
    const errors = {
        types: !form.types ? "Please select a type" : "",
        amount: !form.amount ? "Please enter an amount" : "",
        category: !form.category ? "Please select a category" : ""
    };

    const formattedDate = formatDate(new Date());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        setShowErrors(true);

        if (Object.values(errors).some(err => err !== "")) return;

        const payload = { ...form, date: formattedDate}
        setTransaction(prev => [...prev,  payload ]);
        
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000)

        setForm({ types: "Expense", amount: "", category:"", description: "" });
        setShowErrors(false); 
    }

    useEffect(() => {
        setForm(form => ({
            ...form,
            category: categories[form.types][0]
        }));
    }, [form.types])

    useEffect(() => {
        if (!showErrors) return; // if no error, do nothing

        const timer = setTimeout(() => {
            setShowErrors(false);
        }, 5000);

        return () => clearTimeout(timer); // cleanup
    }, [showErrors]);

    useEffect(()=> {
       setLocalStorage('transaction', transaction);
    }, [transaction]);

  return (

    <div className="container mx-auto max-w-7xl p-4 border-2 border-gray-200 rounded-2xl mt-4">
        <motion.div className='mb-8' variants={variants} initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className='text-2xl font-medium'>Add New Transaction</div>
          <p className='text-sm text-gray-600'>Record your income or expenses</p>
        </motion.div>
        <form onSubmit={handlesubmit} className='w-full flex flex-col gap-0.5'>
            <div className='max-w-7xl w-full flex items-center justify-center gap-4'>
                <Selectbox name="types" value={form.types} onChange={handleChange} label='Type' options={Object.keys(categories)} variants={variants} errormsg={showErrors ? errors.types : ""}/>
                <Inputbox type="number" name='amount' value={form.amount} placeholder='0.00' onChange={handleChange} label='Amount' variants={variants} errormsg={showErrors ? errors.amount : ""}/>
            </div>

            <Selectbox name='category' value={form.category} onChange={handleChange} label='Category' options={categories[form.types]} variants={variants} errormsg={showErrors ? errors.category : ""}/>

            <Inputbox type='text' name='description' value={form.description} onChange={handleChange} placeholder='Add a note about this transaction' label='Description (Optional)' variants={variants} />

            <motion.button className={`bg-indigo-600 p-2 rounded-xl border-black/20 cursor-pointer transition text-white hover:bg-indigo-500 
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`} type="submit" disabled={loading} variants={variants} initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}>{loading ? "Adding..." : "Add Transition"}</motion.button>
        </form>
    </div>
  )
}

export default TransactionForm